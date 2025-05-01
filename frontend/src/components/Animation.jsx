// src/components/Animation.jsx
import React, { useEffect, useState } from 'react';

const Animation = ({ message }) => {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Make animation visible with slight delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    // Generate random particles
    const generatedParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: getRandomColor(),
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
    
    setParticles(generatedParticles);
    
    return () => clearTimeout(timer);
  }, []);

  const getRandomColor = () => {
    const colors = [
      'bg-blue-400', 'bg-purple-400', 'bg-pink-400', 
      'bg-indigo-400', 'bg-cyan-400', 'bg-sky-400'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 transition-opacity duration-1000 relative overflow-hidden ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background grid with glow effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Random floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} opacity-60`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: 'blur(1px)',
            animation: `float ${particle.duration}s infinite ease-in-out`,
            animationDelay: `${particle.delay}s`
          }}
        ></div>
      ))}
      
      {/* Main animated orb */}
      <div className="relative mb-12 transform-gpu">
        {/* Multiple glowing layers */}
        <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-xl animate-pulse-slow"></div>
        
        {/* Main orb */}
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-spin-slow flex items-center justify-center transform-gpu">
          {/* Inner core */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-b from-indigo-900/90 to-black/80 flex items-center justify-center transform-gpu">
            {/* Energy core */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping-slow opacity-70 transform-gpu"></div>
          </div>
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-6 h-6 bg-blue-400 rounded animate-orbit shadow-lg shadow-blue-500/50" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/4 right-0 translate-x-8 w-4 h-4 bg-purple-400 rounded-sm animate-orbit shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-6 h-6 bg-pink-400 rounded animate-orbit shadow-lg shadow-pink-500/50" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute top-1/4 left-0 -translate-x-8 w-4 h-4 bg-indigo-400 rounded-sm animate-orbit shadow-lg shadow-indigo-500/50" style={{ animationDelay: '2.1s' }}></div>
        
        {/* Energy beams */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse-fast"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rotate-45">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse-fast" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rotate-90">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse-fast" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rotate-135">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse-fast" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      {/* Message with typing animation */}
      <div className="text-center z-10 transform-gpu">
        <h3 className="text-2xl font-bold text-white mb-4 animate-text-glow">
          {message || 'Exploring the SEGA Multiverse'}
        </h3>
        <p className="text-blue-300 text-center max-w-lg leading-relaxed mb-6">
          Where classic SEGA characters transcend dimensions, reimagined through AI-powered creativity.
          Your imagination is the only limit in this boundless digital frontier.
        </p>
        
        {/* Animated button */}
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-700/30 relative overflow-hidden group">
          <span className="relative z-10">Begin Your Journey</span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
        </button>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-6 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default Animation;