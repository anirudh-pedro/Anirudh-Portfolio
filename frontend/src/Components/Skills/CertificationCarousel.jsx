import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import nodejsBootcamp from '../../assets/certifications/nodejs-bootcamp.png';
import pythonEssential from '../../assets/certifications/python-essential.png';
import openaiMcp from '../../assets/certifications/openai-mcp.webp';
import kaggleSQL from '../../assets/certifications/image.png'; // Kaggle certificate image

const certifications = [
  {
    id: 1,
    name: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    issuer: "Udemy",
    image: nodejsBootcamp,
    link: "https://www.udemy.com/certificate/UC-3ee03ae6-e282-4a80-882f-92cfbe8b4bfb/",
    topics: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Authentication", "File Upload", "Error Handling"]
  },
  {
    id: 2,
    name: "Python Essential Training",
    issuer: "LinkedIn Learning",
    image: pythonEssential,
    link: "https://www.linkedin.com/learning/certificates/6713a25149c716173b297ce68ce13b606e60e1deee1398606da8f6e252d0b762",
    topics: ["Python Fundamentals", "Data Types", "Functions", "Classes", "File I/O", "Error Handling", "Libraries"]
  },
  {
    id: 3,
    name: "Model Context Protocol (MCP) Certification",
    issuer: "OpenAI",
    image: openaiMcp,
    link: "https://cdn-uploads.huggingface.co/production/uploads/noauth/iZTXOEPWvfiZVNYf9fhEX.webp",
    topics: ["MCP Protocol", "AI Models", "Context Management", "API Integration", "Model Optimization"]
  },
  {
    id: 4,
    name: "Intro to SQL",
    issuer: "Kaggle",
    image: kaggleSQL,
    link: "https://www.kaggle.com/learn/certification/anirudht/intro-to-sql", // Add your actual Kaggle certificate link
    topics: ["SQL Fundamentals", "Data Queries", "Database Operations", "Data Analysis", "Filtering", "Aggregation"]
  }
];

const CertificationCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [screenSize, setScreenSize] = useState('mobile');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  // Create extended array for infinite scroll
  const extendedCertifications = [...certifications, ...certifications];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('medium');
      } else {
        setScreenSize('mobile');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle seamless reset when reaching duplicated section
  useEffect(() => {
    if (current === certifications.length) {
      // We've reached the first duplicate, reset to beginning without animation
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setCurrent(0);
        // Re-enable animation after reset
        setTimeout(() => setIsTransitioning(false), 50);
      }, 800); // Wait for transition to complete
      
      return () => clearTimeout(timer);
    }
  }, [current]);

  // Auto-scroll functionality with seamless infinite loop
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => prev + 1);
      }, 3000); // 3 seconds for better viewing
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrent((prev) => {
      if (prev === 0) {
        return certifications.length - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrent((prev) => {
      if (prev >= certifications.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const pauseAutoScroll = () => setIsPaused(true);
  const resumeAutoScroll = () => setIsPaused(false);

  return (
    <div className="w-full mt-16 relative flex flex-col items-center">
      <div className="mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          Professional Certifications
        </h3>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Continuous learning and skill development are core to my professional journey
        </p>
      </div>

      <div 
        className="relative flex items-center justify-center w-full max-w-7xl mx-auto"
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
      >
        {/* Left Arrow */}
        <button
          aria-label="Previous"
          onClick={handlePrev}
          className="absolute left-4 z-10 bg-gray-800/80 hover:bg-blue-700/80 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Certificate Cards Container */}
        <div className="overflow-hidden w-full max-w-6xl">
          <motion.div 
            className="flex gap-6 px-16"
            animate={{ 
              x: -current * 344 // 344 = 320px card + 24px gap
            }}
            transition={{ 
              duration: isTransitioning ? 0 : 0.8, 
              ease: "easeInOut" 
            }}
            style={{ 
              width: `${extendedCertifications.length * 344}px` // Use extended array
            }}
          >
            {extendedCertifications.map((cert, index) => (
              <motion.div
                key={`${cert.id}-${index}`}
                className={`${
                  screenSize === 'large' ? 'w-80' : 'w-80'
                } h-[30rem] bg-white/10 backdrop-blur-xl rounded-xl border border-white/25 overflow-hidden shadow-xl shadow-black/50 flex flex-col hover:border-blue-400/60 transition-all duration-300 cursor-pointer group flex-shrink-0`}
                onClick={() => window.open(cert.link, '_blank')}
              >
              {/* Certificate image */}
              <div className="w-full h-64 overflow-hidden border-b border-white/20 bg-white/5 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain p-3 pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/320x256/${
                      cert.issuer === 'Udemy' ? 'a435f0' : 
                      cert.issuer === 'LinkedIn Learning' ? '0077b5' : 
                      cert.issuer === 'OpenAI' ? '10a37f' : 
                      cert.issuer === 'Kaggle' ? '20beff' : '6366f1'
                    }/ffffff?text=${encodeURIComponent(cert.issuer)}`;
                  }}
                />
              </div>
              
              {/* Certificate details */}
              <div className="p-4 flex-1 flex flex-col justify-between h-44">
                <div>
                  <h4 className="text-base font-bold text-white leading-tight line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-blue-300 mb-3">Issued by {cert.issuer}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.topics.slice(0, 4).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                    {cert.topics.length > 4 && (
                      <span className="text-xs text-gray-400">+{cert.topics.length - 4} more</span>
                    )}
                  </div>
                </div>
                <div className="text-center mt-auto">
                  <span className="inline-block text-sm bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full hover:bg-blue-500/30 transition-colors">
                    View Certificate →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>

        {/* Right Arrow */}
        <button
          aria-label="Next"
          onClick={handleNext}
          className="absolute right-4 z-10 bg-gray-800/80 hover:bg-blue-700/80 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === (current >= certifications.length ? current - certifications.length : current)
                ? 'bg-blue-500' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to certificate ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-scroll indicator */}
      {/* <div className="text-center mt-4">
        <span className="text-xs text-gray-500 flex items-center justify-center gap-2">
          {isPaused ? 'Paused' : (
            <>
              Auto-scrolling 
              <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )} • Hover to pause • Click dots or arrows to navigate
        </span>
      </div> */}

      {/* Progress bar for auto-scroll */}
      {!isPaused && (
        <div className="w-32 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
};

export default CertificationCarousel;