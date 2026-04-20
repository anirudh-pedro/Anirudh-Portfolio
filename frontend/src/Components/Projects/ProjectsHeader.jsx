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
      <h2 className="display-font text-4xl sm:text-5xl font-semibold mb-6 text-slate-100">
        Featured Projects
      </h2>
      <div className="w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
      <p className="text-lg text-slate-300 mt-8 max-w-3xl mx-auto leading-relaxed">
        Showcasing my expertise across full-stack development, real-time applications, and machine learning.
        Each project represents a unique solution to real-world challenges, demonstrating both technical skills
        and thoughtful user experience design.
      </p>
    </motion.div>
  );
};

export default ProjectsHeader;