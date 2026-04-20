import React from 'react';
import { motion } from 'framer-motion';

const ContactHeader = () => {
  return (
    <div className="text-center mb-10">
      <motion.h2 
        className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Get In Touch
      </motion.h2>
      <motion.p 
        className="mt-4 text-slate-600 max-w-3xl mx-auto text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Have a project in mind or just want to connect? Feel free to reach out through the form below or my social channels.
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </motion.p>
    </div>
  );
};

export default ContactHeader;