import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      id={`project-${project.id}`}
      className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/25 h-full flex flex-col md:flex-row shadow-xl shadow-black/50"
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Project Image - Left side on md+ screens, top on smaller screens */}
      <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[90%]">
          {project.tags.map((tag, index) => (
            tag !== 'featured' && (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white"
              >
                {tag}
              </span>
            )
          ))}
        </div>
        
        {/* "Featured" badge for highlighted projects */}
        {project.tags.includes('featured') && (
          <div className="absolute top-3 right-3">
            <span className="text-xs px-2 py-1 rounded-full bg-violet-600 text-white font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
      
      {/* Project Content - Right side on md+ screens, bottom on smaller screens */}
      <div className="md:w-3/5 p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        
        {/* New: Project subtitle for better description */}
        {project.subtitle && (
          <p className="text-sm text-blue-400 mb-3">{project.subtitle}</p>
        )}
        
        <p className="text-gray-200 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex gap-3">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 rounded-full text-white text-sm font-medium flex items-center flex-1 justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-white/10 hover:bg-white/15 rounded-full text-white text-sm font-medium flex items-center flex-1 justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;