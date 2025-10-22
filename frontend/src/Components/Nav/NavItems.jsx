import React from 'react';
import { motion } from 'framer-motion';

const NavItems = ({ activeSection, setActiveSection, isMobile, onItemClick }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navbarHeight = 80; // Approximate navbar height
      const sectionTop = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }

    setActiveSection(sectionId);
    
    // Dispatch custom event for other components
    const event = new CustomEvent('navigationClicked', {
      detail: { sectionId }
    });
    document.dispatchEvent(event);
    
    // Update URL
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Call mobile menu close callback
    if (onItemClick) {
      onItemClick();
    }
  };

  // Desktop variant
  if (!isMobile) {
    return (
      <>
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background glow effect */}
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Hover effect */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              )}

              {/* Text */}
              <span className="relative z-10">
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  layoutId="active-dot"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </>
    );
  }

  // Mobile variant
  return (
    <>
      {navItems.map((item, index) => {
        const isActive = activeSection === item.id;
        
        return (
          <motion.button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`relative w-full text-left px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
              isActive
                ? 'text-white'
                : 'text-gray-300'
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background */}
            <div
              className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/20 border border-white/30 shadow-lg shadow-white/10'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-4">
              <span className="flex-1">{item.label}</span>
              
              {/* Arrow indicator */}
              <motion.svg
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: isActive ? 5 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </div>

            {/* Shimmer effect on active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear',
                }}
              />
            )}
          </motion.button>
        );
      })}

      {/* Decorative element at bottom */}
      <motion.div
        className="mt-8 pt-8 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-center text-gray-400 text-sm">
          Crafted with 🤍 by Anirudh
        </p>
      </motion.div>
    </>
  );
};

export default NavItems;
