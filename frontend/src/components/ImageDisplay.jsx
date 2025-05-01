// src/components/ImageDisplay.jsx
import React, { useEffect, useState } from 'react';
import { Download, Share2, Repeat, Camera } from 'lucide-react';
import { motion } from 'framer-motion'; // Import framer-motion

const ImageDisplay = ({ image, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation on mount and when image changes
  useEffect(() => {
    if (image) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
    }
  }, [image]);

  // Function to get image source
  const getImageSrc = (imageData) => {
    if (!imageData) return null;
    
    // If it's already a data URL, return it
    if (imageData.startsWith('data:image')) {
      return imageData;
    }
    
    // Otherwise, assume it's a base64 string and format it
    return `data:image/png;base64,${imageData}`;
  };
  
  // Function to download image
  const downloadImage = () => {
    if (!image) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = getImageSrc(image);
    link.download = `sega-multiverse-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/40 rounded-lg p-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Energy orb */}
          <motion.div 
            className="relative mb-8 mx-auto"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut" 
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-xl animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-spin-slow flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-indigo-900/80 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping-slow opacity-70"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-blue-200 font-medium mb-2 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Creating Your Universe
          </motion.p>
          <motion.p 
            className="text-blue-300/70 text-sm max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            The AI is weaving digital reality to manifest your SEGA multiverse. This cosmic process takes up to 30 seconds.
          </motion.p>
          
          {/* Progress bar */}
          <motion.div 
            className="mt-6 w-48 h-1.5 bg-blue-900/50 rounded-full overflow-hidden mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-progress-indeterminate"></div>
          </motion.div>
          
          {/* Particle effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-1 bg-blue-400/70 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%", 
                  opacity: 0 
                }}
                animate={{ opacity: 0.7 }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.5
                }}
                style={{
                  animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/40 rounded-lg p-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-blue-900/10 to-transparent opacity-70"></div>
        </div>
        
        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="mb-6 relative mx-auto w-24 h-24 rounded-full bg-black/50 flex items-center justify-center border border-white/10"
            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }}
          >
            <Camera className="w-10 h-10 text-blue-400/50" />
            <motion.div 
              className="absolute -inset-1 border border-blue-500/20 rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
          
          <motion.p 
            className="text-blue-200 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            No Image Generated Yet
          </motion.p>
          <motion.p 
            className="text-blue-300/70 text-sm mt-2 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Describe a SEGA character and universe in the chat to create a unique visualization
          </motion.p>
          
          {/* Examples */}
          <motion.div 
            className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {[
              "Sonic in a cyberpunk city with neon lights",
              "Tails as a steampunk inventor in his workshop",
              "Knuckles in a medieval fantasy kingdom",
              "Shadow in a film noir detective scene"
            ].map((example, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-lg p-3 text-xs text-left text-blue-300 border border-white/10"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  borderColor: "rgba(59, 130, 246, 0.3)" 
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
              >
                {example}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow bg-black/40 rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
        {/* Image reveal animation container */}
        <motion.div 
          className="w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.95 
          }}
          transition={{ duration: 1 }}
        >
          {/* Animated frame */}
          <motion.div 
            className="absolute inset-4 border-2 border-blue-500/30 rounded-lg"
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: animationComplete ? 0 : 1,
              borderColor: [
                "rgba(59, 130, 246, 0.3)",
                "rgba(139, 92, 246, 0.3)",
                "rgba(236, 72, 153, 0.3)",
                "rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              opacity: { duration: 0.7 }
            }}
          ></motion.div>
          
          {/* Image */}
          <motion.img 
            src={getImageSrc(image)} 
            alt="Generated SEGA character" 
            className="max-w-full max-h-full object-contain rounded shadow-2xl shadow-blue-900/30"
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 1.2 }}
            onError={(e) => {
              console.error("Image failed to load:", e);
              e.target.src = "/placeholder.png";
            }}
          />
          
          {/* Animated overlay that fades out */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 mix-blend-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: animationComplete ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
          
          {/* Corner decorations */}
          <motion.div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"
            animate={{ borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.5)", "rgba(59, 130, 246, 0.5)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          ></motion.div>
          <motion.div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"
            animate={{ borderColor: ["rgba(139, 92, 246, 0.5)", "rgba(236, 72, 153, 0.5)", "rgba(139, 92, 246, 0.5)"] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          ></motion.div>
          <motion.div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"
            animate={{ borderColor: ["rgba(236, 72, 153, 0.5)", "rgba(59, 130, 246, 0.5)", "rgba(236, 72, 153, 0.5)"] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          ></motion.div>
          <motion.div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"
            animate={{ borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(236, 72, 153, 0.5)", "rgba(59, 130, 246, 0.5)"] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          ></motion.div>
        </motion.div>
      </div>
      
      {/* Image controls */}
      {image && (
        <motion.div 
          className="mt-4 flex justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            <motion.button 
              className="p-2 bg-white/5 hover:bg-white/10 text-blue-300 rounded-lg transition-colors border border-white/10 flex items-center gap-1"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Repeat size={16} />
              <span className="text-xs">Regenerate</span>
            </motion.button>
            <motion.button 
              className="p-2 bg-white/5 hover:bg-white/10 text-blue-300 rounded-lg transition-colors border border-white/10 flex items-center gap-1"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} />
              <span className="text-xs">Share</span>
            </motion.button>
          </div>
          
          <motion.button 
            onClick={downloadImage}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ImageDisplay;