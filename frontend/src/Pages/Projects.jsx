import React from 'react';
import { motion } from 'framer-motion';
import ProjectsHeader from '../Components/Projects/ProjectsHeader';
import ProjectsList from '../Components/Projects/ProjectsList';

const Projects = () => {
  // Animation variants for page elements
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  return (
    <section id="projects" className="min-h-screen py-20 overflow-hidden">
      <motion.div 
        className="container mx-auto px-6 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        variants={pageVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ProjectsHeader />
        
        <ProjectsList />
      </motion.div>
    </section>
  );
};

export default Projects;