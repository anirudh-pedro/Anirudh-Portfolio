import React from 'react';
import { motion } from 'framer-motion';
import AboutHeader from '../Components/About/AboutHeader';
import AboutBio from '../Components/About/AboutBio';
import AboutEducation from '../Components/About/AboutEducation';
import LeetCodeStats from '../Components/About/LeetCodeStats';
import GitHubStats from '../Components/About/GitHubStats';
import AboutInterests from '../Components/About/AboutInterests';
import TechnicalExpertise from '../Components/About/TechnicalExpertise';

const About = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };


return (
  <section id="about" className="py-6 sm:py-8 md:py-12 overflow-hidden w-full">
    <motion.div 
      className="container mx-auto px-2 sm:px-3 md:px-4 max-w-6xl"
      initial="hidden"
      whileInView="visible"
      variants={pageVariants}
      viewport={{ once: true, amount: 0.01 }}
    >
      {/* Header with better mobile responsiveness */}
      <motion.div variants={itemVariants} className="mb-2 sm:mb-3">
        <AboutHeader />
      </motion.div>
      
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col lg:flex-row w-full gap-5">
          <motion.div 
            variants={itemVariants} 
            className="w-full lg:w-2/3 flex flex-col gap-0"
          >
            <div className="w-full">
              <AboutBio />
            </div>
            
            <div className="w-full">
              <LeetCodeStats />
            </div>
            
            <div className="w-full *:">
              <GitHubStats />
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="w-full lg:w-1/3 flex flex-col gap-5"
          >
            <div className="w-full">
              <TechnicalExpertise />
            </div>
            
            <div className="w-full">
              <AboutEducation />
            </div>
            
            <div className="w-full">
              <AboutInterests />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

// ...existing code...
};

export default About;