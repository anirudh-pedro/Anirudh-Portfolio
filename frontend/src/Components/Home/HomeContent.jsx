import React from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './TypingAnimation';
import SocialIcons from './SocialIcons';

const HomeContent = ({ scrollToSection }) => {
  const phrases = [
    'Full-Stack Developer',
    'MERN Engineer',
    'Machine Learning Practitioner',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="w-full md:w-1/2 flex flex-col items-center md:items-start md:order-1"
      variants={containerVariants}
    >
      <motion.p
        className="mb-3 text-sm tracking-[0.22em] uppercase text-slate-500"
        variants={itemVariants}
      >
        Computer Science Engineer
      </motion.p>
      <motion.h1 
        className="display-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-slate-900 leading-tight"
        variants={itemVariants}
        >
        Building reliable web products that people enjoy using.
      </motion.h1>
      
      <motion.div 
        className="h-20 flex items-center justify-center md:justify-start"
        variants={itemVariants}
      >
        <TypingAnimation phrases={phrases} />
      </motion.div>
      
      <motion.p 
        className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed"
        variants={itemVariants}
      >
        I am Anirudh T, a full-stack developer focused on shipping clean interfaces, scalable backend services, and thoughtful user experiences from idea to deployment.
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap gap-4 justify-center md:justify-start"
        variants={itemVariants}
      >
        <motion.button 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white font-semibold transition-all duration-300 shadow-lg shadow-slate-500/25"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
        >
            Let us Work Together
        </motion.button>
        <motion.button 
          onClick={() => scrollToSection('projects')}
          className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 rounded-full text-slate-800 font-medium transition-all duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          View Selected Projects
        </motion.button>
      </motion.div>
    <SocialIcons />

    </motion.div>
  );
};

export default HomeContent;