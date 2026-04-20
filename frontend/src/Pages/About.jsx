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
    <section id="about" className="py-6 sm:py-8 md:py-10 overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        variants={pageVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <AboutHeader />
        </motion.div>

        {/* Main Content - 2 Compact Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-3">
            <motion.div variants={itemVariants}>
              <AboutBio />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LeetCodeStats />
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div variants={itemVariants}>
              <AboutEducation />
            </motion.div>

            <motion.div variants={itemVariants}>
              <GitHubStats />
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="mt-4 sm:mt-5 max-w-2xl mx-auto">
          <ResumeViewer />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;