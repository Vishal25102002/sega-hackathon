# main.py
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
import logging
import uuid
from typing import Optional, Dict, Any
import base64
from fastapi.responses import JSONResponse
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Character Multiverse API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Environment variables
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

# Temporary storage for generated images (in a production environment, use a proper database)
generated_images = {}

class ImageRequest(BaseModel):
    character: dict
    worldStyle: dict
    prompt: str

class StatusResponse(BaseModel):
    status: str
    message: str
    image_id: Optional[str] = None

async def call_together_api(prompt: str):
    """Call the Together.ai API to generate an image using the FLUX.1 model."""
    logger.info(f"Calling Together.ai API with prompt: {prompt}")

    try:
        from together import Together

        client = Together(api_key=TOGETHER_API_KEY)
        response = client.images.generate(
            prompt=prompt,
            model="black-forest-labs/FLUX.1-schnell-Free",
            width=1024,
            height=768,
            steps=4,
            n=1,
            response_format="b64_json",
            stop=[]
        )

        # Extract the base64 image data from the response
        if hasattr(response, 'data') and len(response.data) > 0 and hasattr(response.data[0], 'b64_json'):
            image_b64 = response.data[0].b64_json
            if image_b64 is None:
                logger.error("Received None for image_b64 from Together.ai")
                raise HTTPException(status_code=500, detail="No image data returned from image generation API")
            logger.info(f"Received base64 image data with length: {len(image_b64)}")
            if len(image_b64) > 50:
                logger.info(f"Base64 snippet: {image_b64[:30]}...{image_b64[-10:]}")
            return image_b64
        else:
            logger.error(f"Unexpected response structure from Together.ai: {response}")
            logger.error(f"Together API raw response: {response}")
            raise HTTPException(status_code=500, detail="Invalid response from image generation API")

    except Exception as e:
        logger.error(f"Error calling Together.ai API: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Request to image generation API failed: {str(e)}")

async def generate_image_task(image_id: str, character, world_style, prompt: Optional[str] = None):
    """Background task to generate an image using the Together API with FLUX.1 model."""
    try:
        final_prompt = prompt
        
        # Use Together.ai API with FLUX.1 model which returns base64 image data
        image_b64 = await call_together_api(final_prompt)
        
        # In a production environment, you would save this to cloud storage
        # For this example, we'll just store it in memory
        generated_images[image_id] = {
            "status": "completed",
            "base64": image_b64,  # Store the pure base64 data
            "timestamp": datetime.now().isoformat(),
        }
            
        logger.info(f"Image generation completed for ID: {image_id}")
    except Exception as e:
        logger.error(f"Error generating image: {str(e)}")
        generated_images[image_id] = {
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat(),
        }

@app.post("/generate-image", response_model=StatusResponse)
async def generate_image(request: ImageRequest, background_tasks: BackgroundTasks):
    """
    Endpoint to generate an image of a SEGA character in a specified world/style.
    This starts the generation in the background and returns an ID to check status.
    """
    image_id = str(uuid.uuid4())
    
    # Store initial status
    generated_images[image_id] = {
        "status": "processing",
        "timestamp": datetime.now().isoformat(),
    }
    
    # Start background task
    background_tasks.add_task(
        generate_image_task, 
        image_id=image_id,
        character=None,
        world_style=None,
        prompt=request.prompt
    )
    
    return StatusResponse(
        status="processing",
        message="Image generation started",
        image_id=image_id
    )

@app.get("/image-status/{image_id}")
async def get_image_status(image_id: str):
    """Check the status of an image generation request."""
    if image_id not in generated_images:
        raise HTTPException(status_code=404, detail="Image ID not found")
    
    image_data = generated_images[image_id]
    
    if image_data["status"] == "error":
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": image_data.get("error", "Unknown error occurred")
            }
        )
    
    if image_data["status"] == "processing":
        return JSONResponse(
            content={
                "status": "processing",
                "message": "Image is still being generated"
            }
        )
    
    # If completed - return the base64 image data directly
    # Log for debugging
    base64_data = image_data["base64"]
    logger.info(f"Returning base64 data with length: {len(base64_data)}")
    if len(base64_data) > 50:
        logger.info(f"First characters: {base64_data[:30]}...")
    
    return JSONResponse(
        content={
            "status": "completed",
            "message": "Image generation completed",
            "image_data": base64_data  # Return the pure base64 string
        }
    )

@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)