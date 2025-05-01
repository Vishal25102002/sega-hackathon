// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Sparkles, ArrowLeft, Download, Zap, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import ImageDisplay from './ImageDisplay';
import axios from "axios";
import "../App.css"; // Import your CSS file for custom styles
const Chatbot = ({ onSubmit, isGenerating }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Welcome to the SEGA Multiverse! I can help you visualize your favorite SEGA characters in countless alternate universes. What world would you like to explore today?",
      timestamp: new Date(),
      animated: true
    }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    "Sonic racing through a cyberpunk metropolis",
    "Tails in a steampunk laboratory",
    "Knuckles exploring ancient ruins in a fantasy world",
    "Shadow in a neon-lit noir detective scene"
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [typingEffect, setTypingEffect] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    // Add user message to chat
    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date(),
      animated: false
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setShowSuggestions(false);
    
    // Set typing effect
    setTypingEffect(true);
    
    // Process the request
    onGenerateImage(input);
  };

  const onGenerateImage = async (prompt) => {
    setTypingEffect(true);
    setGeneratedImage(null);

    try {
      // 1. Start image generation (POST)
      const res = await axios.post('http://localhost:8000/generate-image', {
        character: { name: "Max Payne" }, // or whatever your UI provides
        worldStyle: { name: "mountain hill", id: "mountain" }, // example
        prompt
      });
      const imageId = res.data.image_id;

      // 2. Poll for image status (GET)
      let status = 'processing';
      let imageData = null;
      while (status === 'processing') {
        await new Promise(r => setTimeout(r, 2000));
        const statusRes = await axios.get(`http://localhost:8000/image-status/${imageId}`);
        status = statusRes.data.status;
        imageData = statusRes.data.image_data;
      }

      // 3. Set the generated image (convert base64 to data URL)
      if (imageData) {
        setGeneratedImage(`data:image/png;base64,${imageData}`);
      }
      // Add bot response
      const botResponse = {
        sender: 'bot',
        text: generateCreativeResponse(prompt),
        timestamp: new Date(),
        animated: true
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      setGeneratedImage(null);
      // Optionally, add error handling here
    }
    setTypingEffect(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  // Helper to generate more creative bot responses
  const generateCreativeResponse = (prompt) => {
    const lowerPrompt = prompt.toLowerCase();
    let character = "your character";
    let universe = "this universe";
    let style = "unique style";
    
    // Detect character
    if (lowerPrompt.includes('sonic')) character = "Sonic";
    else if (lowerPrompt.includes('tails')) character = "Tails";
    else if (lowerPrompt.includes('knuckles')) character = "Knuckles";
    else if (lowerPrompt.includes('shadow')) character = "Shadow";
    else if (lowerPrompt.includes('amy')) character = "Amy Rose";
    else if (lowerPrompt.includes('eggman')) character = "Dr. Eggman";
    else if (lowerPrompt.includes('nights')) character = "NiGHTS";
    else if (lowerPrompt.includes('alex kidd')) character = "Alex Kidd";
    
    // Detect universe/style
    if (lowerPrompt.includes('cyberpunk')) {
      universe = "a cyberpunk metropolis";
      style = "neon-lit futuristic";
    } 
    else if (lowerPrompt.includes('fantasy') || lowerPrompt.includes('medieval')) {
      universe = "a magical fantasy realm";
      style = "enchanted medieval";
    }
    else if (lowerPrompt.includes('space')) {
      universe = "the far reaches of space";
      style = "cosmic sci-fi";
    }
    else if (lowerPrompt.includes('western')) {
      universe = "the Wild West frontier";
      style = "dusty frontier";
    }
    else if (lowerPrompt.includes('anime')) {
      universe = "an anime world";
      style = "Japanese animation";
    }
    else if (lowerPrompt.includes('steampunk')) {
      universe = "a steampunk civilization";
      style = "brass and steam-powered";
    }
    
    // Array of creative responses
    const responses = [
      `Transcending dimensions to bring ${character} into ${universe}! The quantum AI is weaving the quantum fabric of this ${style} universe right now...`,
      
      `Opening a portal to ${universe}! I can see ${character} emerging through the dimensional rift. Capturing this ${style} moment in digital form...`,
      
      `Fascinating request! I'm reimagining ${character} with ${style} aesthetics as they explore ${universe}. The multiverse is bending to your imagination...`,
      
      `The boundaries between worlds are blurring as ${character} steps into ${universe}. Creating this ${style} visualization with quantum-level detail...`,
      
      `Reality is reshaping! ${character} is adapting to the laws of ${universe}, taking on a ${style} appearance that defies conventional dimensions...`
    ];
    
    // Return a random response
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Generate new creative suggestions based on interactions
  useEffect(() => {
    if (messages.length > 2) {
      const lastUserMessage = messages.filter(m => m.sender === 'user').pop()?.text || '';
      
      // If user has mentioned a specific character, tailor suggestions
      let character = "Sonic";
      if (lastUserMessage.toLowerCase().includes('tails')) character = "Tails";
      else if (lastUserMessage.toLowerCase().includes('knuckles')) character = "Knuckles";
      else if (lastUserMessage.toLowerCase().includes('shadow')) character = "Shadow";
      
      // Update suggestions based on previous interactions
      setSuggestions([
        `${character} in a post-apocalyptic wasteland`,
        `${character} as a detective in a film noir setting`,
        `${character} exploring ancient underwater ruins`,
        `${character} in a vaporwave digital landscape`
      ]);
    }
  }, [messages]);

  return (
    <div>
    <motion.div 
      className="flex flex-col h-full bg-gradient-to-br from-black via-indigo-950 to-black min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md px-6 py-4 border-b border-white/10 sticky top-0 z-20 w-full">
      <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </motion.button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-md animate-pulse opacity-70"></div>
              <Sparkles size={24} className="text-blue-400 relative z-10" />
            </div>
            <span className="text-white font-bold text-xl">SEGA Multiverse Chat</span>
          </div>
        </div>
      </header>

      <main className="w-full py-8 flex-grow flex flex-col lg:flex-row gap-8">
        {/* Chat panel */}
        <div className="w-full lg:w-1/2 h-full flex flex-col">
          <div className="flex-grow bg-black/40 backdrop-blur-md rounded-xl shadow-xl p-6 mb-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/5 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-600/5 filter blur-xl pointer-events-none"></div>
            
            {/* Chat messages */}
            <div className="relative z-10 flex flex-col h-[calc(100vh-300px)] overflow-y-auto mb-4 space-y-6 pr-2 scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div 
                  key={index} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-gray-800/80 text-white rounded-tl-none border border-purple-900/30'
                    } ${message.animated && message.sender === 'bot' ? 'animate-message-appear' : ''}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-blue-300" />
                        <span className="text-xs font-medium text-blue-300">SEGA Multiverse AI</span>
                      </div>
                    )}
                    <p className={message.animated && message.sender === 'bot' ? 'animate-text-reveal' : ''}>
                      {message.text}
                    </p>
                    <div className="text-right mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {typingEffect && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-4 rounded-2xl bg-gray-800/80 text-white rounded-tl-none border border-purple-900/30 animate-message-appear">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-blue-300" />
                      <span className="text-xs font-medium text-blue-300">SEGA Multiverse AI</span>
                    </div>
                    <div className="flex space-x-2 h-6 items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe a SEGA character in a new universe..."
                  className="w-full bg-black/30 text-white placeholder-blue-300/70 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/10"
                  disabled={isGenerating || typingEffect}
                />
                <motion.button
                  type="submit"
                  disabled={isGenerating || typingEffect || !input.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SendHorizonal size={18} />
                </motion.button>
              </div>
              
              {/* Suggestions */}
              {showSuggestions && (
                <motion.div 
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {suggestions.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-2 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 text-sm rounded-lg border border-blue-700/30 transition-colors flex items-center gap-1"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 64, 175, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                    >
                      <Lightbulb size={14} />
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </form>
          </div>
          
          {/* Tips */}
          <motion.div 
            className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-yellow-400" />
              <h3 className="text-white text-sm font-medium">Pro Tips</h3>
            </div>
            <ul className="text-xs text-blue-200 space-y-1 ml-5 list-disc">
              <li>Be specific about the character and universe you want to create</li>
              <li>Try different art styles like "pixel art", "watercolor", or "anime"</li>
              <li>Combine universes for unique results (e.g., "steampunk western")</li>
            </ul>
          </motion.div>
        </div>
        
        {/* Image panel */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            className="bg-black/40 backdrop-blur-md rounded-xl shadow-xl p-6 h-full flex flex-col relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-bl from-purple-600/10 to-blue-600/5 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-600/5 filter blur-xl pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
              Generated Universe
            </h2>
            
            <div className="flex-grow relative z-10">
              <ImageDisplay 
                image={generatedImage} 
                isLoading={isGenerating || typingEffect} 
              />
            </div>
            
            {generatedImage && (
              <div className="mt-4 flex justify-center relative z-10">
                <motion.button 
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} />
                  Download Image
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </motion.div>
    </div>
  );
}
export default Chatbot;