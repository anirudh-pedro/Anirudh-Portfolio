import React from 'react';
import { motion } from 'framer-motion';

const SkillCategories = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
            activeCategory === category.id
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
              : 'bg-black/20 backdrop-blur-sm border border-white/10 text-gray-200 hover:text-white hover:border-violet-500/30'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default SkillCategories;