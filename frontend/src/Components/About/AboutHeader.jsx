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
    <motion.div variants={headerVariants} className="text-center mb-8 sm:mb-9">
      <h2 className="display-font text-3xl sm:text-4xl md:text-[2.7rem] font-semibold mb-4 sm:mb-5 text-slate-900">
        About Me
      </h2>
      <div className="w-24 h-1 bg-slate-400 mx-auto rounded-full shadow-lg shadow-slate-400/30"></div>
      <p className="text-sm sm:text-base text-slate-600 mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed">
        A passionate developer crafting elegant solutions to complex problems.
        Let me share a bit more about my journey, experience, and what drives me.
      </p>
    </motion.div>
  );
};

export default AboutHeader;