import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsShowcase = ({ project, onClose }) => {
  if (!project) return null;

  const showcaseVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="mb-16 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        variants={showcaseVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        layoutId={`project-${project.id}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Image/Video */}
          <div className="relative h-64 lg:h-auto">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover rounded-tl-2xl lg:rounded-l-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:bg-gradient-to-r" />
          </div>
          
          {/* Project Details */}
          <div className="p-8 lg:py-10">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                aria-label="Close showcase"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Preview
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white/10 hover:bg-white/15 rounded-full text-white font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Code
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectsShowcase;