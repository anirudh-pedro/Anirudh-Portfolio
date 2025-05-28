import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import NavItems from './NavItems';

const Navbar = () => {
  // State for menu toggle and scroll detection
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef({});
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu
  const closeMenu = () => setIsOpen(false);

  // Cache section positions to avoid re-calculation
  const updateSectionPositions = () => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const positions = {};
    
    sections.forEach(section => {
      const id = section.getAttribute('id');
      if (!id) return;
      
      positions[id] = {
        top: section.offsetTop,
        height: section.offsetHeight
      };
    });
    
    sectionsRef.current = positions;
  };

  // Handle scroll events for navbar appearance and section detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for navbar styling
      setScrolled(window.scrollY > 50);
      
      // Determine which section is currently visible
      const navHeight = 80; // Approximate navbar height
      const scrollPosition = window.scrollY + navHeight + 20; // Add small offset
      
      // Check cached section positions first
      const positions = sectionsRef.current;
      let currentActive = activeSection;
      let found = false;
      
      // Find the section we're currently viewing
      for (const id in positions) {
        const section = positions[id];
        if (scrollPosition >= section.top && 
            scrollPosition < section.top + section.height) {
          currentActive = id;
          found = true;
          break;
        }
      }
      
      // If we're at the top of the page, always set home as active
      if (window.scrollY < 50) {
        currentActive = 'home';
        found = true;
      }
      
      // Only update state if section changed (prevents re-renders)
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
      
      // If no section was found (might happen during rapid scrolling),
      // recalculate all section positions and try again
      if (!found && Object.keys(positions).length > 0) {
        updateSectionPositions();
      }
    };
    
    // Throttled scroll handler for better performance
    let throttleTimer = null;
    const throttledScrollHandler = () => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          handleScroll();
          throttleTimer = null;
        }, 100);
      }
    };
    
    // Initialize section positions
    updateSectionPositions();
    
    // Attach scroll listener
    window.addEventListener('scroll', throttledScrollHandler);
    window.addEventListener('resize', updateSectionPositions);
    window.addEventListener('load', updateSectionPositions);
    
    // Run once on mount to set initial active section
    handleScroll();
    
    // Recheck after a delay to ensure all content is loaded
    const delayTimer = setTimeout(handleScroll, 500);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('resize', updateSectionPositions);
      window.removeEventListener('load', updateSectionPositions);
      clearTimeout(throttleTimer);
      clearTimeout(delayTimer);
    };
  }, [activeSection]);

  // Function to navigate to a section - will be used if we want to 
  // trigger section changes from other components
  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
      // Scroll to the section
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL without reload
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };
  
  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/30 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Logo />
            
            {/* Desktop Navigation */}
            <NavItems 
              activeSection={activeSection}
            />
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 focus:outline-none transition-colors"
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu Overlay - Separate from the navbar to ensure visibility */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] md:hidden overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button at the top right */}
            <div className="absolute top-4 right-4">
              <motion.button
                className="p-2 rounded-full bg-black/40 text-white"
                onClick={closeMenu}
                whileTap={{ scale: 0.95 }}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
            
            {/* Menu content - centered in the screen */}
            <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-8 px-4">
              {/* Logo for mobile menu */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Anirudh
                </span>
              </motion.div>
              
              {/* Navigation Items - passing activeSection to mobile menu */}
              <NavItems 
                isMobile={true} 
                closeMenu={closeMenu} 
                activeSection={activeSection} 
              />
              
              {/* Social Icons */}
              <motion.div 
                className="mt-12 flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Your social icons... */}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;