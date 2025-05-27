import React from 'react';
import { motion } from 'framer-motion';
import GlowingBorder from '../GlowingBorder'; 
const GitHubStats = () => {
  const githubUsername = "anirudh-pedro"; // Replace with your GitHub username
  
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
        // <GlowingBorder>

    <motion.div
      className="bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/10 mt-6"
      variants={containerVariants}
    >
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="mr-3 p-2 rounded-full bg-purple-500/20">
          <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </span>
        GitHub Stats
      </h3>

      <div className="space-y-6">
        {/* Main stats grid layout */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center space-y-8"
        >
          {/* GitHub Contribution Calendar - Full width */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <img 
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt={`${githubUsername}'s GitHub Contribution Chart`}
              className="w-full h-auto bg-white/5 p-3 rounded-lg"
              loading="lazy"
              />
          </div>
          
          {/* Two column grid for stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* GitHub Stats Card */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=radical&hide_border=true&count_private=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e&icon_color=8b949e`}
                alt={`${githubUsername}'s GitHub Stats`}
                className="w-full h-auto"
                loading="lazy"
                />
            </div>
            
            {/* Top Languages */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e&icon_color=8b949e`}
                alt={`${githubUsername}'s Top Programming Languages`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* GitHub Streak Stats - Full width */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <img 
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=0d1117&stroke=58a6ff&ring=58a6ff&fire=58a6ff&currStreakNum=8b949e&sideNums=8b949e&currStreakLabel=58a6ff&sideLabels=58a6ff&dates=8b949e`}
              alt={`${githubUsername}'s GitHub Streak`}
              className="w-full h-auto"
              loading="lazy"
              />
          </div>
          
          <p className="text-sm text-gray-400 text-center">
            Data from GitHub API • Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
        
        {/* Profile link button */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center"
          >
          <a 
            href={`https://github.com/${githubUsername}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white text-sm font-medium flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Visit My GitHub Profile
          </a>
        </motion.div>
      </div>
    </motion.div>
    // </GlowingBorder>
  );
};

export default GitHubStats;