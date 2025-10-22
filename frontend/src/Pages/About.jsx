import React from 'react';
import { motion } from 'framer-motion';
import AboutHeader from '../Components/About/AboutHeader';
import AboutBio from '../Components/About/AboutBio';
import AboutEducation from '../Components/About/AboutEducation';
import LeetCodeStats from '../Components/About/LeetCodeStats';
import GitHubStats from '../Components/About/GitHubStats';
import TechnicalExpertise from '../Components/About/TechnicalExpertise';
import ResumeViewer from '../Components/About/ResumeViewer';

const About = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="about" className="min-h-screen py-12 sm:py-16 md:py-20 overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
        initial="hidden"
        whileInView="visible"
        variants={pageVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <AboutHeader />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Bio & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <motion.div variants={itemVariants}>
              <AboutBio />
            </motion.div>

            {/* Coding Stats - Side by Side on Desktop */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="flex flex-col gap-6">
                <LeetCodeStats />
                
                {/* Resume Viewer below LeetCode */}
                <ResumeViewer />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <GitHubStats />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Skills & Info */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <TechnicalExpertise />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <AboutEducation />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;