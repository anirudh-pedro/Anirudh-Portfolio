import React from 'react';
import { motion } from 'framer-motion';

const LeetCodeStats = () => {
  const leetcodeUsername = "anirudh_pedro"; // Your LeetCode username
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3
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
      className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 rounded-2xl border border-orange-500/20 shadow-xl shadow-orange-500/10 hover:border-orange-400/30 transition-all duration-300"
      variants={containerVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center">
        <span className="mr-2 p-2 rounded-lg bg-orange-500/20">
          <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.661 1.837-.661s1.357.194 1.823.66l2.697 2.606c.514.515 1.111.744 1.714.744.603 0 1.2-.229 1.714-.744.514-.514.75-1.146.75-1.823s-.236-1.309-.75-1.823l-2.684-2.606c-.953-.915-2.211-1.427-3.62-1.427-1.41 0-2.667.493-3.62 1.424l-4.305 4.352c-.966.977-1.478 2.256-1.478 3.653C4.5 14.815 5.012 16.094 6 17.088l4.347 4.373c.953.932 2.211 1.425 3.622 1.425 1.41 0 2.667-.493 3.62-1.425l2.697-2.606c.514-.514.75-1.146.75-1.823s-.236-1.309-.75-1.823c-.515-.514-1.111-.743-1.714-.743-.603 0-1.2.229-1.714.744l.242-.33z" />
          </svg>
        </span>
        LeetCode Stats
      </h3>

      <div className="space-y-4">
        <motion.div 
          variants={itemVariants}
          className="flex justify-center items-center flex-col"
        >
          {/* LeetCard API Integration */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg border border-orange-500/10">
            <img 
              src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Nunito&ext=heatmap`}
              alt={`${leetcodeUsername}'s LeetCode stats`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex justify-center"
        >
          <a 
            href={`https://leetcode.com/${leetcodeUsername}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 rounded-full text-white text-sm font-medium flex items-center transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.661 1.837-.661s1.357.194 1.823.66l2.697 2.606c.514.515 1.111.744 1.714.744.603 0 1.2-.229 1.714-.744.514-.514.75-1.146.75-1.823s-.236-1.309-.75-1.823l-2.684-2.606c-.953-.915-2.211-1.427-3.62-1.427-1.41 0-2.667.493-3.62 1.424l-4.305 4.352c-.966.977-1.478 2.256-1.478 3.653C4.5 14.815 5.012 16.094 6 17.088l4.347 4.373c.953.932 2.211 1.425 3.622 1.425 1.41 0 2.667-.493 3.62-1.425l2.697-2.606c.514-.514.75-1.146.75-1.823s-.236-1.309-.75-1.823c-.515-.514-1.111-.743-1.714-.743-.603 0-1.2.229-1.714.744l.242-.33z" />
            </svg>
            Visit LeetCode Profile
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeetCodeStats;