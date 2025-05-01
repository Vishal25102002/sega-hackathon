// src/App.jsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Chatbot from './components/Chatbot'

function App() {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async (prompt) => {
    setIsLoading(true);
    
    // Simulate image generation - in a real implementation, this would call your API
    setTimeout(() => {
      // For this demo, we'll just set a dummy image after a delay
      // In a real app, this would be the base64 result from your API
      setGeneratedImage("/placeholder.png");
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/chatbot" 
          element={<Chatbot 
            onSubmit={handleGenerateImage} 
            isGenerating={isLoading} 
          />} 
        />
      </Routes>
    </Router>
  )
}

export default App