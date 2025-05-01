// src/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MessageSquare, Globe, Gamepad2, Sparkles, ChevronLeft, ChevronRight, Menu, X, Instagram, Twitter, Github, Twitch } from 'lucide-react';
import Animation from './Animation';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import sonic1 from '../assets/sonic1.jpg';
import sonic2 from '../assets/sonic2.jpg';
import sonic3 from '../assets/sega-multiverse-1746131596770.png';
import sonic4 from "../assets/image.png"
import sonic5 from "../assets/sonic5.png"
import sonic6 from "../assets/sonic6.png"
const Home = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Animation on component mount
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current && autoScroll) {
      scrollInterval.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
          const totalWidth = scrollRef.current.scrollWidth;
          const containerWidth = scrollRef.current.clientWidth;
          const scrollPosition = scrollRef.current.scrollLeft;
          const firstSetWidth = totalWidth / 3;
          if (scrollPosition > (firstSetWidth * 1.8)) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 30);
    } else if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, [autoScroll]);

  const navigateToChatbot = () => {
    navigate('/chatbot');
  };

  // Enhanced SEGA characters data with image paths
  const characters = [
    { 
      id: 'sonic', 
      name: 'Sonic', 
      color: 'from-blue-500 to-blue-600',
      traits: ['Speed', 'Adventure', 'Heroic'],
      universeType: '3D',
      imagePath: sonic1
    },
    { 
      id: 'tails', 
      name: 'Tails', 
      color: 'from-yellow-500 to-orange-500',
      traits: ['Flight', 'Inventor', 'Loyal'],
      universeType: '3D',
      imagePath: sonic2
    },
    { 
      id: 'knuckles', 
      name: 'Knuckles', 
      color: 'from-red-500 to-red-700',
      traits: ['Power', 'Guardian', 'Strength'],
      universeType: '3D',
      imagePath: sonic3
    },
    { 
      id: 'shadow', 
      name: 'Shadow', 
      color: 'from-black to-red-800',
      traits: ['Speed', 'Mystery', 'Power'],
      universeType: '3D',
      imagePath: sonic4
    },
    { 
      id: 'amy', 
      name: 'Amy Rose', 
      color: 'from-pink-400 to-pink-600',
      traits: ['Energy', 'Determined', 'Cheerful'],
      universeType: '3D',
      imagePath: sonic5
    },
    { 
      id: 'eggman', 
      name: 'Dr. Eggman', 
      color: 'from-red-600 to-red-800',
      traits: ['Genius', 'Villain', 'Machines'],
      universeType: '3D',
      imagePath: sonic6
    },
    { 
      id: 'nights', 
      name: 'NiGHTS', 
      color: 'from-purple-500 to-indigo-600',
      traits: ['Dreams', 'Flight', 'Mystical'],
      universeType: '3D',
      imagePath: sonic4
    },
    { 
      id: 'alex_kidd', 
      name: 'Alex Kidd', 
      color: 'from-green-500 to-blue-500',
      traits: ['Classic', 'Adventure', 'Retro'],
      universeType: '3D',
      imagePath: sonic1
    }
  ];

  // NavItems for the navigation menu
  const navItems = [
    { id: 'gallery', label: 'Gallery', icon: <Camera size={16} /> },
    { id: 'characters', label: 'Characters', icon: <Gamepad2 size={16} /> },
    { id: 'universes', label: 'Universes', icon: <Globe size={16} /> },
    { id: 'about', label: 'About', icon: <Sparkles size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-blue-950 overflow-hidden relative w-full">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-600/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating particles */}
        <div className="particles-container absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-blue-400/50 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Enhanced Navbar */}
      <header className={`fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-lg border-b border-white/10 z-50 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white font-bold text-xl tracking-wider">SEGA Multiverse</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${activeNavItem === item.id 
                      ? 'bg-blue-500/20 text-white' 
                      : 'text-blue-200 hover:text-white'}`}
                  onMouseEnter={() => setActiveNavItem(item.id)}
                  onMouseLeave={() => setActiveNavItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * navItems.indexOf(item) }}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                onClick={navigateToChatbot}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MessageSquare size={16} />
                Multiverse AI
              </motion.button>
            </nav>
            
            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-blue-200 p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-black/90 backdrop-blur-lg border-b border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-2 px-4 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className="w-full px-4 py-3 rounded-lg text-left text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-500/20 transition-all flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => {
                    navigateToChatbot();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center gap-2 justify-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <MessageSquare size={16} />
                  Multiverse AI
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="w-full pt-24 pb-20 relative z-10">
        {/* Hero section */}
        <div className={`flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <motion.div 
            className="mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-xl animate-pulse"></div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white relative">
              SEGA 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 ml-4">
                Multiverse
              </span>
            </h1>
          </motion.div>
          <motion.p 
            className="text-blue-200 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Step into boundless creativity where classic SEGA characters transcend dimensions. 
            Explore infinite universes reimagined through AI-powered visualization.
          </motion.p>
          <motion.button 
            onClick={navigateToChatbot}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg text-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-900/40 relative overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 font-mono cursor-pointer">
              <MessageSquare className="w-5 h-5" />
              Multiverse AI
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          </motion.button>
        </div>

        {/* Features section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <FeatureCard
            icon={<Globe className="text-blue-400 group-hover:text-blue-300" />}
            title="Infinite Worlds"
            immagePath="/images/universes.png"
            description="Seamlessly transport SEGA characters across dimensions into cyberpunk cityscapes, medieval realms, space frontiers, and beyond."
            gradient="from-blue-600/20 to-blue-600/5"
          />
          
          <FeatureCard
            icon={<Gamepad2 className="text-purple-400 group-hover:text-purple-300" />}
            title="Iconic Characters"
            description="From Sonic to NiGHTS, reimagine your favorite SEGA heroes in stunning detail across alternate realities and artistic styles."
            gradient="from-purple-600/20 to-purple-600/5"
          />
          
          <FeatureCard
            icon={<Sparkles className="text-pink-400 group-hover:text-pink-300" />}
            title="AI Artistry"
            description="Powered by cutting-edge AI, our platform transforms your ideas into vivid, high-quality visualizations with remarkable detail."
            gradient="from-pink-600/20 to-pink-600/5"
          />
        </div>

        {/* Character carousel */}
        <div className={`mb-24 px-2 sm:px-6 lg:px-8 max-w-full mx-auto transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="mb-10 max-w-7xl mx-auto">
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Legendary Characters
            </motion.h2>
            <motion.p
              className="text-center text-blue-200 mt-3 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Reimagine iconic SEGA heroes across infinite dimensions and artistic styles
            </motion.p>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex space-x-8 py-6 no-scrollbar overflow-x-auto"
            style={{ scrollBehavior: 'smooth', minWidth: '100%' }}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {/* First set of characters for infinite scrolling */}
            {characters.map((character, index) => (
              <CharacterCard 
                key={`set1-${character.id}`} 
                character={character} 
                index={index} 
              />
            ))}
            
            {/* Second set of characters (duplicate) */}
            {characters.map((character, index) => (
              <CharacterCard 
                key={`set2-${character.id}`} 
                character={character} 
                index={index + characters.length} 
              />
            ))}
            
            {/* Third set of characters (duplicate) */}
            {characters.map((character, index) => (
              <CharacterCard 
                key={`set3-${character.id}`} 
                character={character} 
                index={index + (characters.length * 2)} 
              />
            ))}
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-8 gap-2">
            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                animate={{ 
                  x: ['-100%', '0%', '100%'],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </div>
            <div className="w-10 h-1 bg-white/10 rounded-full"></div>
            <div className="w-10 h-1 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Animation showcase */}
        <div className={`w-max max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-xl overflow-hidden mb-24 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="min-h-[24rem] ">
                <Animation message="Welcome to SEGA Multiverse" />
            </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className={`relative z-10 transition-all duration-700 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Footer top with diagonal cutout */}
        <div className="h-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 skew-y-[2deg] translate-y-8 transform-gpu"></div>
        
        {/* Main footer content */}
        <div className="bg-black/80 backdrop-blur-lg pt-16 pb-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top section with logo and newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
              {/* Logo and tagline */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-0.5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-70 blur-sm"></div>
                    <div className="relative h-full w-full rounded-full bg-black/70 flex items-center justify-center">
                      <Camera size={22} className="text-blue-400" />
                    </div>
                  </div>
                  <span className="text-white font-bold text-xl tracking-wider">SEGA Multiverse</span>
                </div>
                <p className="text-blue-200/80 max-w-md mb-6">
                  Step into boundless creativity where classic SEGA characters transcend dimensions. Reimagine iconic heroes across infinite universes with AI-powered visualization.
                </p>
                
                {/* Social media links */}
                <div className="flex gap-4">
                  <SocialButton icon={<Instagram size={18} />} />
                  <SocialButton icon={<Twitter size={18} />} />
                  <SocialButton icon={<Github size={18} />} />
                  <SocialButton icon={<Twitch size={18} />} />
                </div>
              </div>
              
              {/* Newsletter signup */}
              <div className="lg:col-span-3 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-white text-lg font-bold mb-2">Join the Multiverse Community</h3>
                <p className="text-blue-200/80 mb-4">
                  Get early access to new features, character universes, and exclusive content.
                </p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow bg-black/40 text-white placeholder-blue-300/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500:border border-white/10"
                  />
                  <motion.button
                    className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Footer links in columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <FooterColumn 
                title="Explore" 
                links={[
                  { label: "Gallery", href: "#" },
                  { label: "Characters", href: "#" },
                  { label: "Universes", href: "#" },
                  { label: "Creations", href: "#" }
                ]} 
              />
              
              <FooterColumn 
                title="Resources" 
                links={[
                  { label: "Documentation", href: "#" },
                  { label: "Tutorials", href: "#" },
                  { label: "API", href: "#" },
                  { label: "Support", href: "#" }
                ]} 
              />
              
              <FooterColumn 
                title="Company" 
                links={[
                  { label: "About Us", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "#" }
                ]} 
              />
              
              <FooterColumn 
                title="Legal" 
                links={[
                  { label: "Terms of Service", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                  { label: "Licensing", href: "#" }
                ]} 
              />
            </div>
            
            {/* Copyright and additional links */}
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-300/70 text-sm">
                © 2025 SEGA Multiverse. All rights reserved.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors">Status</a>
                <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors">Sitemap</a>
                <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors">Accessibility</a>
                <a href="#" className="text-sm text-blue-300 hover:text-white transition-colors">Do Not Sell My Info</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Character Card Component
const CharacterCard = ({ character, index }) => {
  return (
    <motion.div 
      className={`flex-none w-72 h-96 bg-gradient-to-b ${character.color} rounded-xl overflow-hidden shadow-xl shadow-black/40 relative group cursor-pointer`}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        zIndex: 20
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: (index % 8) * 0.05, // Only delay based on position within a set
        duration: 0.6,
        scale: { type: "spring", stiffness: 300 }
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-60 transition-opacity duration-300"></div>
      
      {/* Character image - conditionally render if path exists */}
      {character.imagePath && (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={character.imagePath} 
            alt={character.name}
            className="w-full h-full object-cover  transform group-hover:scale-110 transition-transform duration-700"
            
          />
        </div>
      )}
      
      {/* Character details */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
        <h3 className="text-white text-3xl font-bold mb-3 drop-shadow-lg">{character.name}</h3>
        
        <div className="flex items-center justify-center gap-2 mb-4 w-full">
          <div className="flex-grow h-[2px] bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white" 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.2 + ((index % 8) * 0.05) }}
            ></motion.div>
          </div>
          <div className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full">
            <span className="text-white text-xs font-semibold">{character.universeType}</span>
          </div>
        </div>
        
        <div className="w-full">
          <motion.div 
            className="flex flex-wrap gap-2 justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + ((index % 8) * 0.05), duration: 0.5 }}
          >
            {character.traits.map((trait, traitIndex) => (
              <span 
                key={`${character.id}-${index}-${traitIndex}`}
                className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-blue-200"
              >
                {trait}
              </span>
            ))}
          </motion.div>
          <motion.button
            className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-sm rounded-lg transition-all duration-300 group-hover:bg-blue-500/70"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Universes
          </motion.button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/80 to-white/20"></div>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <motion.div 
      className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/5 overflow-hidden"
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-lg bg-black/40 flex items-center justify-center mb-4 border border-white/5">
          {icon}
        </div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-blue-200">{description}</p>
      </div>
    </motion.div>
  );
};

// Social Media Button Component
const SocialButton = ({ icon }) => {
  return (
    <motion.a
      href="#"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-300 hover:text-white border border-white/10"
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

// Footer Column Component
const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h4 className="text-white font-medium mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href}
              className="text-blue-300 hover:text-white transition-colors text-sm inline-block"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
