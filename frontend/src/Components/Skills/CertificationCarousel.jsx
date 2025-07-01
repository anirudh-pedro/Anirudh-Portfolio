import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import your images at the top of the file
import nodejsBootcamp from '../../assets/certifications/nodejs-bootcamp.png';
import pythonEssential from '../../assets/certifications/python-essential.png';
import openaiMcp from '../../assets/certifications/openai-mcp.webp';

const CertificationCarousel = () => {
  // Reference to the scroller container
  const scrollerRef = useRef(null);
  // State to track if carousel is paused (on hover)
  const [isPaused, setIsPaused] = useState(false);
  // State to track if user is dragging
  const [isDragging, setIsDragging] = useState(false);
  // State to track drag start position
  const [dragStart, setDragStart] = useState(0);
  // State to track current scroll position
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // List of your actual certifications
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
    }
  ];

  // Clone the certifications array to create a seamless loop
  const duplicatedCertifications = [...certifications, ...certifications];

  // Mouse drag event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true); // Pause auto-scroll when dragging
    setDragStart(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
    scrollerRef.current.style.cursor = 'grabbing';
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - dragStart) * 2; // Multiply by 2 for faster scrolling
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollerRef.current.style.cursor = 'grab';
    // Resume auto-scroll after a short delay
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollerRef.current.style.cursor = 'grab';
      setTimeout(() => setIsPaused(false), 1000);
    } else {
      setIsPaused(false);
    }
  };

  // Handle click vs drag distinction
  const handleCardClick = (e, link) => {
    if (isDragging) {
      e.preventDefault();
      return false;
    }
    // Only navigate if not dragging
    if (link !== "#") {
      window.open(link, '_blank');
    }
  };

  useEffect(() => {
    // This effect handles the automatic scrolling behavior
    const scrollerElement = scrollerRef.current;
    if (!scrollerElement) return;

    // Calculate scroll width and setup variables
    let scrollPosition = scrollerElement.scrollLeft;
    const scrollWidth = scrollerElement.scrollWidth;
    const containerWidth = scrollerElement.clientWidth;
    const halfWidth = scrollWidth / 2;
    
    // Store animation ID for cleanup
    let animationId = null;
    
    // Scroll animation function
    const scrollAnimation = () => {
      // Only scroll if not paused and not dragging
      if (!isPaused && !isDragging) {
        // Increment scroll position
        scrollPosition += 0.5; // Adjust speed here (lower = slower)
        
        // Reset position when we've scrolled through the first set of duplicates
        if (scrollPosition >= halfWidth) {
          scrollPosition = 0;
        }
        
        // Apply scroll position
        scrollerElement.scrollLeft = scrollPosition;
      } else {
        // Update scrollPosition to current position when paused
        scrollPosition = scrollerElement.scrollLeft;
      }
      
      // Continue animation
      animationId = requestAnimationFrame(scrollAnimation);
    };
    
    // Start animation
    animationId = requestAnimationFrame(scrollAnimation);
    
    // Clean up animation on component unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, isDragging]); // Re-run effect when isPaused or isDragging changes

  return (
    <div className="w-full mt-16 relative overflow-hidden">
      <div className="mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          Professional Certifications
        </h3>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Continuous learning and skill development are core to my professional journey
        </p>
      </div>
      
      {/* Gradient overlays for smoother edges */}
      <div className="absolute left-0 top-0 h-full w-12 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      
      {/* Scrolling container with drag functionality */}
      <div 
        ref={scrollerRef}
        className="flex overflow-x-hidden no-scrollbar py-4 select-none"
        style={{ cursor: 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => !isDragging && setIsPaused(true)}
      >
        <div className="flex gap-6 px-6">
          {duplicatedCertifications.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="flex-shrink-0 w-80 h-[30rem] relative group"
              onClick={(e) => handleCardClick(e, cert.link)}
              style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
            >
              <motion.div 
                className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden group-hover:border-blue-500/50 transition-all duration-300 shadow-lg flex flex-col"
                whileHover={{ 
                  y: isDragging ? 0 : -5, // Don't lift while dragging
                  transition: { duration: 0.2 }
                }}
              >
                {/* Certificate image at the top - 60% of card height */}
                <div className="w-full h-64 overflow-hidden border-b border-gray-700/50 bg-gray-800/50 flex items-center justify-center">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="w-full h-full object-contain p-3 pointer-events-none" // Prevent image dragging
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/320x256/${
                        cert.issuer === 'Udemy' ? 'a435f0' : 
                        cert.issuer === 'LinkedIn Learning' ? '0077b5' : 
                        cert.issuer === 'OpenAI' ? '10a37f' : '6366f1'
                      }/ffffff?text=${encodeURIComponent(cert.issuer)}`;
                    }}
                    style={{ 
                      minHeight: '240px',
                      backgroundColor: 'rgba(75, 85, 99, 0.2)'
                    }}
                    draggable={false} // Prevent default image drag
                  />
                </div>
                
                {/* Certificate details at the bottom - 40% of card height */}
                <div className="p-4 flex-1 flex flex-col justify-between h-44">
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight line-clamp-2 mb-2">{cert.name}</h4>
                    <p className="text-sm text-blue-300 mb-3">Issued by {cert.issuer}</p>
                    
                    {/* Topics section */}
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
                  
                  {/* View button - always at bottom */}
                  <div className="text-center mt-auto">
                    <span className="inline-block text-sm bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full hover:bg-blue-500/30 transition-colors cursor-pointer">
                      View Certificate →
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Updated visual indicator */}
      <div className="text-center mt-4">
        <span className="text-xs text-gray-500">
          Hover to pause • Drag to scroll manually
        </span>
      </div>
    </div>
  );
};

export default CertificationCarousel;