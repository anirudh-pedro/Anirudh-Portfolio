import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsHeader from '../Components/Skills/SkillsHeader';
import SkillsArsenal from '../Components/Skills/SkillsArsenal';
import CertificationCarousel from '../Components/Skills/CertificationCarousel';

const Skills = () => {
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-10 sm:py-16 overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        variants={pageVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants}>
          <SkillsHeader />
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="mt-10"
        >
          <SkillsArsenal />
        </motion.div>
        
        {/* Add certification carousel */}
        <motion.div 
          variants={itemVariants}
          className="mt-16"
        >
          <CertificationCarousel />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;