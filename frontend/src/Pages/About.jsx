import React from 'react';
import { motion } from 'framer-motion';
import AboutHeader from '../Components/About/AboutHeader';
import AboutBio from '../Components/About/AboutBio';
import AboutEducation from '../Components/About/AboutEducation';
import LeetCodeStats from '../Components/About/LeetCodeStats';
import GitHubStats from '../Components/About/GitHubStats';
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

        {/* Main Content - 2 Column Layout */}
        <div className="space-y-0">
          
          {/* Top Row - My Story and Education side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-3">
            <motion.div variants={itemVariants}>
              <AboutBio />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AboutEducation />
            </motion.div>
          </div>

          {/* Middle Row - LeetCode and GitHub side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-3">
            <div className="space-y-3">
              <motion.div variants={itemVariants}>
                <LeetCodeStats />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ResumeViewer />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <GitHubStats />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;