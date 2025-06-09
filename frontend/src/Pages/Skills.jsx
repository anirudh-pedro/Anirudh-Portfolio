import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsHeader from '../Components/Skills/SkillsHeader';
import SkillCategories from '../Components/Skills/SkillCategories';
import SkillCards from '../Components/Skills/SkillCards';
import CertificationCarousel from '../Components/Skills/CertificationCarousel';

const Skills = () => {
  // State to track active skill category
  const [activeCategory, setActiveCategory] = useState('all');

  // Define skill categories
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'languages', name: 'Languages' },
    { id: 'tools', name: 'Tools & DevOps' },
    { id: 'databases', name: 'Databases' }
  ];

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

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
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

        <motion.div variants={itemVariants} className="mt-8">
          <SkillCategories 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="mt-10"
        >
          <SkillCards activeCategory={activeCategory} />
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