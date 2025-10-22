import React from 'react';
import { motion } from 'framer-motion';

const SkillProgress = ({ proficiency }) => {
  // Define colors based on proficiency level
  const getColor = (level) => {
    if (level >= 90) return 'from-green-400 to-emerald-500';
    if (level >= 80) return 'from-blue-400 to-indigo-500';
    if (level >= 70) return 'from-purple-400 to-purple-500';
    if (level >= 60) return 'from-amber-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  // Get label based on proficiency
  const getLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Basic';
    return 'Beginner';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-gray-400">{getLabel(proficiency)}</span>
        <span className="text-[10px] font-medium text-white">{proficiency}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full bg-gradient-to-r ${getColor(proficiency)}`}
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SkillProgress;