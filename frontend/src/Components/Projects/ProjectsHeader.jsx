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
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
        My Projects
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      <p className="text-lg text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
        A collection of my work showcasing my skills in web development, 
        mobile applications, and other software projects.
        Each project represents a unique challenge and solution.
      </p>
    </motion.div>
  );
};

export default ProjectsHeader;