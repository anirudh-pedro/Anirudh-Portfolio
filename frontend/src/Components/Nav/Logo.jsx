import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        className="inline-block"
        aria-label="Go to home section"
      >
        <motion.span 
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          whileHover={{
            backgroundPosition: ["0%", "100%"],
            transition: { duration: 1, repeat: Infinity, repeatType: "reverse" }
          }}
          style={{ backgroundSize: "200%" }}
        >
          Anirudh
        </motion.span>
      </a>
    </motion.div>
  );
};

export default Logo;