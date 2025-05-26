import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Skills from './Pages/Skills';
import Contact from './Pages/Contact';
import Navbar from './Components/Nav/Navbar';
import ParticleBackground from './Components/ParticleBackground';
import Loader from './Components/Loader';
import './App.css';
import UndergroundBackground from './Components/ParticleBackground';

function App() {
  // State for loading screen
  const [loading, setLoading] = useState(true);

  // Simulate loading time and then hide loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="App relative bg-transparent min-h-screen text-white overflow-x-hidden">
      {/* Loading screen with exit animation */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
            className="absolute inset-0 z-50"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Fixed particle background */}
      {/* <UndergroundBackground /> */}

      {/* Global Navigation with animated entrance */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content sections - all on one page */}
      <AnimatePresence>
        {!loading && (
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
              <p>projects</p>
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
            
            {/* Simple footer with animation */}
            <motion.footer 
              className="py-6 text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p>© {new Date().getFullYear()} Anirudh. All rights reserved.</p>
            </motion.footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;