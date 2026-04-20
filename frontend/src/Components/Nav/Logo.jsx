import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ onLogoClick }) => {
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Smooth scroll to top function
  const handleLogoClick = (e) => {
    e.preventDefault();
    
    // If parent provided a click handler, use it
    if (onLogoClick) {
      onLogoClick();
      return;
    }
    
    // Otherwise fall back to default behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Dispatch event to notify navbar about the section change
    const event = new CustomEvent('navigationClicked', {
      detail: { sectionId: 'home' }
    });
    document.dispatchEvent(event);
    
    // Update URL
    window.history.pushState(null, '', '#home');
  };

  return (
    <motion.div 
      className="flex-shrink-0"
      initial="hidden"
      animate="visible"
      variants={logoVariants}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <a 
        href="#home" 
        onClick={handleLogoClick}
        className="inline-block"
        aria-label="Go to home section"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-300"></span>
          <motion.span 
            className="display-font text-lg sm:text-xl lg:text-2xl font-semibold text-slate-100 tracking-wide"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.25 }
            }}
          >
            Anirudh T
          </motion.span>
        </div>
      </a>
    </motion.div>
  );
};

export default Logo;