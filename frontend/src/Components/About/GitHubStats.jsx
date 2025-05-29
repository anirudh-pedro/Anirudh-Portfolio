import React from 'react';
import { motion } from 'framer-motion';

const GitHubStats = () => {
  const githubUsername = "anirudh-pedro"; // Your GitHub username
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 mt-6"
      variants={containerVariants}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-white flex items-center">
        <span className="mr-2 p-1.5 rounded-full bg-purple-500/20">
          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </span>
        GitHub Stats
      </h3>

      <div className="space-y-4">
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
          {/* GitHub Stats in a more compact grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {/* GitHub Stats Card & Top Languages - Side by side */}
            <div className="overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-[1.02] duration-300">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=radical&hide_border=true&count_private=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e&icon_color=8b949e&card_width=300`}
                alt={`${githubUsername}'s GitHub Stats`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-[1.02] duration-300">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e&icon_color=8b949e&card_width=300`}
                alt={`${githubUsername}'s Top Programming Languages`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* GitHub Contribution Calendar & Streak Stats - More compact */}
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-[1.01] duration-300">
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=0d1117&stroke=58a6ff&ring=58a6ff&fire=58a6ff&currStreakNum=8b949e&sideNums=8b949e&currStreakLabel=58a6ff&sideLabels=58a6ff&dates=8b949e&card_width=750`}
                alt={`${githubUsername}'s GitHub Streak`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
              <img 
                src={`https://ghchart.rshah.org/${githubUsername}`}
                alt={`${githubUsername}'s GitHub Contribution Chart`}
                className="w-full h-auto bg-white/5 p-2 rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Profile link button - more compact */}
        <motion.div variants={itemVariants} className="flex justify-center mt-3">
          <a 
            href={`https://github.com/${githubUsername}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white text-xs sm:text-sm font-medium flex items-center transition-all hover:shadow-lg hover:shadow-purple-500/20"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Visit GitHub Profile
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GitHubStats;