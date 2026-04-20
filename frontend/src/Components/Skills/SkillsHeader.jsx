import React from 'react';
import { motion } from 'framer-motion';

const SkillsHeader = () => {
  return (
    <div className="text-center">
      <motion.h2 
        className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Technical Skills
      </motion.h2>
      <motion.p 
        className="mt-4 text-slate-300 max-w-3xl mx-auto text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        These are the technologies I've worked with and the skills I've developed throughout my journey as a developer.
        I'm constantly learning and exploring new technologies to expand my expertise.
      </motion.p>
    </div>
  );
};

export default SkillsHeader;