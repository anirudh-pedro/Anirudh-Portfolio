import React from 'react';
import { motion } from 'framer-motion';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';

const MainPage = () => {
  // Animation variants for content sections
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <motion.main 
      className="relative z-10"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      <motion.section 
        id="home" 
        className="min-h-screen flex items-center justify-center"
        variants={sectionVariants}
      >
        <Home />
      </motion.section>

      <motion.section 
        id="about" 
        className="min-h-screen flex items-center justify-center"
        variants={sectionVariants}
      >
        <About />
      </motion.section>

      <motion.section 
        id="projects" 
        className="min-h-screen"
        variants={sectionVariants}
      >
        <Projects />
      </motion.section>

      <motion.section 
        id="skills" 
        className="min-h-screen flex items-center justify-center"
        variants={sectionVariants}
      >
        <Skills />
      </motion.section>

      <motion.section 
        id="contact" 
        className="min-h-screen flex items-center justify-center"
        variants={sectionVariants}
      >
        <Contact />
      </motion.section>
      
      {/* Replace simple footer with new modular Footer component */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </motion.main>
  );
};

export default MainPage;
