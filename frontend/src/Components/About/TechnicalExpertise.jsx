import React from 'react';
import { motion } from 'framer-motion';

const TechnicalExpertise = () => {
  // Define your technical expertise with proficiency levels and colors
  const skills = [
    { name: 'Frontend Development', percentage: 95, color: 'bg-blue-500', shadow: 'shadow-blue-500/50', border: 'border-blue-500/10' },
    { name: 'Backend Development', percentage: 90, color: 'bg-green-500', shadow: 'shadow-green-500/50', border: 'border-green-500/10' },
    { name: 'Database Management', percentage: 85, color: 'bg-purple-500', shadow: 'shadow-purple-500/50', border: 'border-purple-500/10' },
    { name: 'Machine Learning', percentage: 75, color: 'bg-orange-500', shadow: 'shadow-orange-500/50', border: 'border-orange-500/10' },
    { name: 'UI/UX Design', percentage: 50, color: 'bg-pink-500', shadow: 'shadow-pink-500/50', border: 'border-pink-500/10' },
    { name: 'Mobile Development', percentage: 60, color: 'bg-cyan-500', shadow: 'shadow-cyan-500/50', border: 'border-cyan-500/10' },
    { name: 'Data Analysis', percentage: 75, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/50', border: 'border-indigo-500/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-purple-500/20 shadow-xl shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-300"
      variants={containerVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-violet-400 flex items-center">
        <span className="mr-3 p-2 rounded-lg bg-violet-500/20">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </span>
        Technical Expertise
      </h3>

      <div className="space-y-5">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-medium text-sm">{skill.name}</span>
              <span className="text-xs font-semibold text-violet-400">{skill.percentage}%</span>
            </div>
            
            <div className={`w-full h-2.5 bg-black/40 rounded-full overflow-hidden border ${skill.border}`}>
              <motion.div 
                className={`h-full ${skill.color} rounded-full shadow-lg ${skill.shadow}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnicalExpertise;