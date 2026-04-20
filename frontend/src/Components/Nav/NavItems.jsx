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
              className="relative px-4 py-2 rounded-md text-sm font-medium group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background - unified hover state */}
              <motion.div
                className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400/10 border border-cyan-200/30 shadow-lg shadow-cyan-500/10 backdrop-blur-sm'
                    : 'bg-transparent border border-transparent group-hover:bg-slate-700/30 group-hover:border-slate-200/15'
                }`}
                layoutId={isActive ? "navbar-indicator" : undefined}
                transition={isActive ? { type: 'spring', bounce: 0.2, duration: 0.6 } : { duration: 0.3 }}
              />

              {/* Text with gradient - unified hover state */}
              <span 
                className={`relative z-10 transition-all duration-300 ${
                  isActive 
                    ? 'text-cyan-200 font-semibold' 
                    : 'text-slate-200 group-hover:text-white group-hover:font-medium'
                }`}
              >
                {item.label}
              </span>
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
                : 'text-slate-200'
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
                  ? 'bg-cyan-400/10 border border-cyan-200/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-800/40 border border-slate-200/10 hover:bg-slate-700/40 hover:border-slate-100/20'
              }`}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-4">
              <span className={`flex-1 ${isActive ? 'text-cyan-200 font-semibold' : ''}`}>
                {item.label}
              </span>
              
              {/* Arrow indicator */}
              <motion.svg
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-cyan-200' : 'text-slate-400'
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
        className="mt-8 pt-8 border-t border-slate-200/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-center text-slate-400 text-sm">
          Crafted by Anirudh T
        </p>
      </motion.div>
    </>
  );
};

export default NavItems;
