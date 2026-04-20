import React from 'react';
import { motion } from 'framer-motion';

const AboutBio = () => {
  const bioVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div 
      className="professional-card p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/25 hover:border-cyan-300/30 transition-all duration-300"
      variants={bioVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <h3 className="display-font text-2xl font-semibold mb-6 text-slate-900 flex items-center">
        <div className="bg-cyan-400/15 p-2 rounded-lg mr-3">
          <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        My Story
      </h3>
      <div className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg">
        <p>
          Hello! I'm <span className="font-semibold text-cyan-200">Anirudh T</span>, a passionate full-stack developer with a focus on creating efficient, 
          scalable, and user-friendly applications. My journey in technology began during my undergraduate 
          studies where I discovered my passion for solving complex problems through code.
        </p>
        <p>
          I specialize in modern web technologies, particularly the <span className="font-semibold text-cyan-200">MERN stack</span> (MongoDB, Express, React, Node.js). 
          I enjoy the process of transforming ideas into functional and elegant digital solutions that make a 
          positive impact on users' experiences.
        </p>
        <p>
          Beyond technical skills, I value continuous learning, collaboration, and attention to detail. 
          I believe in writing clean, maintainable code and keeping up with the latest industry trends 
          and best practices.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutBio;