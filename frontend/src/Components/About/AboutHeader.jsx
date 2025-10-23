import React from 'react';
import { motion } from 'framer-motion';

const AboutHeader = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div variants={headerVariants} className="text-center mb-12">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-violet-400">
        About Me
      </h2>
      <div className="w-24 h-1 bg-violet-500 mx-auto rounded-full shadow-lg shadow-violet-500/50"></div>
      <p className="text-base sm:text-lg text-gray-200 mt-6 max-w-3xl mx-auto leading-relaxed">
        A passionate developer crafting elegant solutions to complex problems.
        Let me share a bit more about my journey, experience, and what drives me.
      </p>
    </motion.div>
  );
};

export default AboutHeader;