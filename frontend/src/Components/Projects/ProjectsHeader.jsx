import React from 'react';
import { motion } from 'framer-motion';

const ProjectsHeader = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div variants={headerVariants} className="text-center mb-12">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-violet-400">
        Featured Projects
      </h2>
      <div className="w-24 h-1 bg-violet-500 mx-auto rounded-full"></div>
      <p className="text-lg text-gray-200 mt-8 max-w-3xl mx-auto leading-relaxed">
        Showcasing my expertise across full-stack development, real-time applications, and machine learning.
        Each project represents a unique solution to real-world challenges, demonstrating both technical skills
        and thoughtful user experience design.
      </p>
    </motion.div>
  );
};

export default ProjectsHeader;