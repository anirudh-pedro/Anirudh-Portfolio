import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubStats = () => {
  const githubUsername = "anirudh-pedro"; // Your GitHub username
  
  const [githubData, setGithubData] = useState({
    totalContributions: 0,
    totalActiveDays: 0,
    maxStreak: 0,
    currentStreak: 0,
    stats: {
      stars: 0,
      commits: 0,
      prs: 0,
      issues: 0,
      repositories: 0
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Primary: Fetch contribution data (no auth required, no rate limits)
        const contributionResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        
        if (!contributionResponse.ok) {
          throw new Error('Failed to fetch contribution data');
        }

        const contributionData = await contributionResponse.json();
        const contributions = contributionData.contributions || [];
        
        // Calculate all stats from contribution data
        const totalContributions = contributionData.total?.['lastYear'] || 0;
        const activeDays = contributions.filter(day => day.count > 0);
        const totalActiveDays = activeDays.length;
        const totalCommits = contributions.reduce((sum, day) => sum + day.count, 0);
        
        // Sort by date ascending for streak calculation
        const sortedContributions = [...contributions].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Calculate max streak
        let tempStreak = 0;
        let maxStreakCount = 0;
        for (let i = 0; i < sortedContributions.length; i++) {
          if (sortedContributions[i].count > 0) {
            tempStreak++;
            maxStreakCount = Math.max(maxStreakCount, tempStreak);
          } else {
            tempStreak = 0;
          }
        }
        
        // Calculate current streak
        const today = new Date().toISOString().split('T')[0];
        let currentStreakCount = 0;
        const todayIndex = sortedContributions.findIndex(c => c.date === today);
        if (todayIndex !== -1) {
          for (let i = todayIndex; i >= 0; i--) {
            if (sortedContributions[i].count > 0) {
              currentStreakCount++;
            } else {
              break;
            }
          }
        } else {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          const yesterdayIndex = sortedContributions.findIndex(c => c.date === yesterday);
          if (yesterdayIndex !== -1) {
            for (let i = yesterdayIndex; i >= 0; i--) {
              if (sortedContributions[i].count > 0) {
                currentStreakCount++;
              } else {
                break;
              }
            }
          }
        }
        
        // Try to fetch additional stats (with graceful fallback)
        let totalStars = 7;
        let totalPRs = 1;
        let totalIssues = 0;
        let totalRepos = 0;
        
        try {
          const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
          if (userResponse.ok) {
            const userData = await userResponse.json();
            totalRepos = userData.public_repos || 0;
          }
        } catch (err) {
          // Silent fail, use defaults
        }
        
        try {
          const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
          if (reposResponse.ok) {
            const reposData = await reposResponse.json();
            totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
          }
        } catch (err) {
          // Silent fail, use defaults
        }
        
        try {
          const prsResponse = await fetch(`https://api.github.com/search/issues?q=author:${githubUsername}+type:pr`);
          if (prsResponse.ok) {
            const prsData = await prsResponse.json();
            totalPRs = prsData.total_count || 1;
          }
        } catch (err) {
          // Silent fail, use defaults
        }
        
        try {
          const issuesResponse = await fetch(`https://api.github.com/search/issues?q=author:${githubUsername}+type:issue`);
          if (issuesResponse.ok) {
            const issuesData = await issuesResponse.json();
            totalIssues = issuesData.total_count || 0;
          }
        } catch (err) {
          // Silent fail, use defaults
        }

        setGithubData({
          totalContributions: totalContributions,
          totalActiveDays: totalActiveDays,
          maxStreak: maxStreakCount,
          currentStreak: currentStreakCount,
          stats: {
            stars: totalStars,
            commits: totalCommits,
            prs: totalPRs,
            issues: totalIssues,
            repositories: totalRepos
          }
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub stats');
        // Set fallback data
        setGithubData({
          totalContributions: 367,
          totalActiveDays: 116,
          maxStreak: 12,
          currentStreak: 1,
          stats: {
            stars: 7,
            commits: 295,
            prs: 1,
            issues: 0,
            repositories: 0
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchGitHubData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [githubUsername]);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 pt-4 rounded-2xl border border-gray-700/50 shadow-xl shadow-gray-500/10 hover:border-gray-600/50 transition-all duration-300 h-full"
      variants={containerVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-100 flex items-center">
        <span className="mr-3 p-2 rounded-lg bg-gray-700/30">
          <svg className="w-5 h-5 text-gray-100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </span>
        GitHub Stats
        {loading && <span className="ml-2 text-xs text-gray-400 animate-pulse">Updating...</span>}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error} - Showing cached data
        </div>
      )}

      <div className="space-y-4">
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
          
          {/* Contribution Stats Cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Total Contributions */}
            <motion.div 
              className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-6 h-6 text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-xl md:text-2xl font-bold text-white">{githubData.totalContributions}</p>
                <p className="text-xs text-gray-400 mt-1">Contributions</p>
              </div>
            </motion.div>

            {/* Active Days */}
            <motion.div 
              className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-6 h-6 text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xl md:text-2xl font-bold text-white">{githubData.totalActiveDays}</p>
                <p className="text-xs text-gray-400 mt-1">Active Days</p>
              </div>
            </motion.div>

            {/* Max Streak */}
            <motion.div 
              className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-6 h-6 text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <p className="text-xl md:text-2xl font-bold text-white">{githubData.maxStreak}</p>
                <p className="text-xs text-gray-400 mt-1">Max Streak</p>
              </div>
            </motion.div>

            {/* Current Streak */}
            <motion.div 
              className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-6 h-6 text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xl md:text-2xl font-bold text-white">{githubData.currentStreak}</p>
                <p className="text-xs text-gray-400 mt-1">Current Streak</p>
              </div>
            </motion.div>
          </div>

          {/* GitHub Activity Heatmap */}
          <div className="w-full rounded-xl shadow-lg border border-gray-700/30 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm p-4 md:p-6 overflow-hidden">
            <h4 className="text-base md:text-lg font-semibold text-gray-100 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Contribution Activity
            </h4>
            <div className="w-full overflow-hidden rounded-lg">
              <img 
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=github-compact&bg_color=0d1117&color=ffffff&line=39d353&point=ffffff&area=true&hide_border=true&custom_title=GitHub%20Contribution%20Graph`}
                alt={`${githubUsername}'s GitHub Contribution Graph`}
                className="w-full h-auto max-w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Repository Stats */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Stars */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-gray-100">{githubData.stats.stars}</p>
                  <p className="text-xs text-gray-400 mt-1">Stars</p>
                </div>
                <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </motion.div>

            {/* Commits */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-gray-100">{githubData.stats.commits}</p>
                  <p className="text-xs text-gray-400 mt-1">Commits</p>
                </div>
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </motion.div>

            {/* Pull Requests */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-gray-100">{githubData.stats.prs}</p>
                  <p className="text-xs text-gray-400 mt-1">PRs</p>
                </div>
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </motion.div>

            {/* Issues */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-gray-100">{githubData.stats.issues}</p>
                  <p className="text-xs text-gray-400 mt-1">Issues</p>
                </div>
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Profile link button */}
        <motion.div variants={itemVariants} className="flex justify-center mt-4">
          <a 
            href={`https://github.com/${githubUsername}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-full text-white text-sm font-medium flex items-center transition-all shadow-lg hover:shadow-gray-500/50 hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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