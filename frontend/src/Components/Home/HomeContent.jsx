import React from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './TypingAnimation';
import SocialIcons from './SocialIcons';

const HomeContent = ({ scrollToSection }) => {
  const phrases = [
    "Web Developer",
    "Machine Learning Enthusiast",
    "CSE Student",
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
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 whitespace-nowrap text-violet-400 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.3)]"
        variants={itemVariants}
        >
        Hi, I'm Anirudh T
      </motion.h1>
      
      <motion.div 
        className="h-20 flex items-center justify-center md:justify-start"
        variants={itemVariants}
      >
        <TypingAnimation phrases={phrases} />
      </motion.div>
      
      <motion.p 
        className="text-lg text-gray-200 mb-8 max-w-lg"
        variants={itemVariants}
      >
        I build full-stack web applications and solve real-world problems with code.
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap gap-4 justify-center md:justify-start"
        variants={itemVariants}
      >
        <motion.button 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-3 bg-violet-500 hover:bg-violet-600 rounded-full text-white font-medium transition-all duration-300 shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
        >
            Contact Me
        </motion.button>
        <motion.button 
          onClick={() => scrollToSection('projects')}
          className="px-6 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500/20 rounded-full text-white font-medium transition-all duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          View My Work
        </motion.button>
      </motion.div>
    <SocialIcons />

    </motion.div>
  );
};

export default HomeContent;