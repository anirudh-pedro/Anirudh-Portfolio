import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const NavItems = ({ isMobile = false, closeMenu = () => {}, activeSection = "home" }) => {
  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Projects', path: 'projects' },
    { name: 'Skills', path: 'skills' },
    { name: 'Contact', path: 'contact' }
  ];

  const navRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Update highlight position when active section or hovered item changes
  useEffect(() => {
    if (navRef.current && !isMobile) {
      const activeIndex = navItems.findIndex(item => item.path === activeSection);
      const targetIndex = hoveredItem !== null ? hoveredItem : activeIndex;
      
      if (targetIndex >= 0) {
        const navElement = navRef.current;
        const itemElement = navElement.children[targetIndex];
        
        if (itemElement) {
          // Calculate position relative to the nav container
          const navRect = navElement.getBoundingClientRect();
          const itemRect = itemElement.getBoundingClientRect();
          
          setHighlightStyle({
            left: itemRect.left - navRect.left,
            width: itemRect.width,
            opacity: 1,
          });
        }
      }
    }
  }, [activeSection, hoveredItem, isMobile, navItems]);

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: i => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Mobile menu animations
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: i => ({
      opacity: 0,
      x: -20,
      transition: {
        delay: 0.05 * i,
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  // Smooth scroll function
  const scrollToSection = (id, e) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMobile) {
      closeMenu();
    }
    
    const element = document.getElementById(id);
    if (element) {
      // Get the height of the navbar to offset the scroll
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      
      // Calculate position with offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      history.pushState(null, null, `#${id}`);
    }
  };

  // Render mobile menu items with enhanced animations
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-6 py-8">
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={`#${item.path}`}
            className={`block w-full text-center px-6 py-4 my-2 rounded-lg text-lg font-medium transition-all duration-300 ${
              activeSection === item.path
                ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-l-4 border-purple-500"
                : "text-gray-300 hover:text-white hover:bg-purple-600/10"
            }`}
            onClick={(e) => scrollToSection(item.path, e)}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileItemVariants}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
          </motion.a>
        ))}
      </div>
    );
  }

  // Render desktop menu items with active state indicators and moving background
  return (
    <div className="hidden md:flex items-center space-x-4 lg:space-x-8 relative" ref={navRef}>
      {/* Moving background highlight */}
      <motion.div 
        className="absolute h-8 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-600/10 -z-10"
        initial={{ opacity: 0 }}
        animate={{
          left: highlightStyle.left,
          width: highlightStyle.width,
          opacity: highlightStyle.opacity,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      {navItems.map((item, index) => (
        <motion.div
          key={item.name}
          className="relative px-2 py-1"
          custom={index}
          initial="hidden"
          animate="visible"
          variants={navItemVariants}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <motion.a
            href={`#${item.path}`}
            className={`relative text-sm lg:text-base font-medium transition-colors duration-300 ${
              activeSection === item.path 
                ? "text-white" 
                : "text-gray-300 hover:text-white"
            }`}
            onClick={(e) => scrollToSection(item.path, e)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
            <motion.span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 ${
                activeSection === item.path ? "w-full" : "w-0"
              }`}
              initial={false}
              animate={{ 
                width: activeSection === item.path ? "100%" : "0%"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          {/* Hover indicator */}
          {activeSection !== item.path && (
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default NavItems;