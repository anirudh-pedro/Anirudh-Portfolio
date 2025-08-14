import React from 'react';
import { motion } from 'framer-motion';

const TechnicalExpertise = () => {
  // Define your technical expertise with proficiency levels
  const skills = [
    { name: 'Frontend Development', percentage: 95, color: 'text-purple-400' },
    { name: 'Backend Development', percentage: 90, color: 'from-green-400 to-green-600' },
    { name: 'Database Management', percentage: 85, color: 'from-yellow-400 to-amber-500' },
    // { name: 'Cloud Infrastructure', percentage: 80, color: 'from-sky-400 to-sky-600' },
    { name: 'Machine Learning', percentage: 75, color: 'from-red-400 to-red-600' },
    { name: 'UI/UX Design', percentage: 50, color: 'from-purple-400 to-purple-600' },
    { name: 'Mobile Development', percentage: 60, color: 'from-orange-400 to-orange-600' },
    { name: 'Data Analysis', percentage: 75, color: 'from-teal-400 to-teal-600' },
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
      className="bg-black/50 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl shadow-black/60"
      variants={containerVariants}
    >
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="mr-3 p-2 rounded-full bg-purple-500/20">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </span>
        Technical Expertise
      </h3>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-medium">{skill.name}</span>
              <span className="text-gray-400 text-sm font-medium">{skill.percentage}%</span>
            </div>
            
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
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