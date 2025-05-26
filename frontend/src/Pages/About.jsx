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
  // Animation variants for page elements
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
    <section id="about" className="py-12 md:py-16 overflow-x-hidden">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        variants={pageVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header with better mobile responsiveness */}
        <motion.div variants={itemVariants} className="mb-5">
          <AboutHeader />
        </motion.div>
        
        {/* Main content using flexbox with minimal gap */}
        <div className="flex flex-col gap-4">
          {/* Top section: Bio on left, Technical Expertise on right */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Bio section with LeetCode stats directly underneath */}
            <motion.div variants={itemVariants} className="lg:w-2/3 flex flex-col ">
              <AboutBio />
              <div className="mt-4"> {/* Increased negative margin to pull stats up more */}
                <LeetCodeStats />
              </div>
            </motion.div>
            
            {/* Technical Expertise and Education on the right */}
            <motion.div variants={itemVariants} className="lg:w-1/3 flex flex-col space-y-5 mt-2">
              <TechnicalExpertise />
              <AboutEducation />
            </motion.div>
          </div>
          
          {/* Bottom section with GitHub and Interests */}
          <div className="flex flex-col lg:flex-row gap-6"> {/* Small negative margin for tighter layout */}
            {/* Left column - GitHub Stats */}
            <motion.div 
              className="lg:w-2/3"
              variants={itemVariants}
            >
              <GitHubStats />
            </motion.div>
            
            {/* Right column - Interests */}
            <motion.div 
              className="lg:w-1/3"
              variants={itemVariants}
            >
              <AboutInterests />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;