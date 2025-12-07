import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TechnicalExpertise = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const skillsData = [
    { 
      id: 'frontend',
      name: 'Frontend Development', 
      level: 95, 
      gradient: 'from-blue-500 to-cyan-500',
      color: 'blue',
      icon: '⚛️',
      techs: ['React', 'Vue', 'TypeScript', 'Tailwind']
    },
    { 
      id: 'backend',
      name: 'Backend Development', 
      level: 90, 
      gradient: 'from-green-500 to-emerald-500',
      color: 'green',
      icon: '🚀',
      techs: ['Node.js', 'Express', 'MongoDB', 'REST']
    },
    { 
      id: 'database',
      name: 'Database Management', 
      level: 85, 
      gradient: 'from-purple-500 to-violet-500',
      color: 'purple',
      icon: '💾',
      techs: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis']
    },
    { 
      id: 'ml',
      name: 'Machine Learning', 
      level: 75, 
      gradient: 'from-orange-500 to-amber-500',
      color: 'orange',
      icon: '🤖',
      techs: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn']
    },
    { 
      id: 'mobile',
      name: 'Mobile Development', 
      level: 60, 
      gradient: 'from-cyan-500 to-teal-500',
      color: 'cyan',
      icon: '📱',
      techs: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    { 
      id: 'uiux',
      name: 'UI/UX Design', 
      level: 50, 
      gradient: 'from-pink-500 to-rose-500',
      color: 'pink',
      icon: '🎨',
      techs: ['Figma', 'Adobe XD', 'Framer', 'Prototyping']
    },
    { 
      id: 'data',
      name: 'Data Analysis', 
      level: 75, 
      gradient: 'from-indigo-500 to-blue-500',
      color: 'indigo',
      icon: '📊',
      techs: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-purple-500/20 shadow-xl shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      {/* Header with Code Style */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
            Technical Expertise
          </h3>
          <p className="text-gray-500 text-xs font-mono">// Skill proficiency levels</p>
        </div>
        <motion.div
          className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-mono"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Active</span>
          </div>
        </motion.div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.id}
            variants={itemVariants}
            className="group relative"
            onMouseEnter={() => setHoveredCard(skill.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Container */}
            <motion.div
              className="relative bg-gradient-to-br from-gray-900/80 to-black/60 rounded-xl p-5 border border-gray-700/30 overflow-hidden"
              whileHover={{ 
                scale: 1.03,
                borderColor: 'rgba(168, 85, 247, 0.5)',
                boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.4)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Animated Corner Accent */}
              <motion.div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${skill.gradient} opacity-10 blur-3xl`}
                animate={{
                  scale: hoveredCard === skill.id ? [1, 1.2, 1] : 1,
                  opacity: hoveredCard === skill.id ? [0.1, 0.2, 0.1] : 0.1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10">
                {/* Icon and Title Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`text-3xl`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-gray-500 font-mono">
                        level: {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar with Percentage */}
                <div className="mb-3">
                  <div className="relative h-2.5 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700/40">
                    <motion.div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.gradient} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.1 + 0.3, 
                        ease: "easeOut" 
                      }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Tech Tags */}
                <motion.div
                  className="flex flex-wrap gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {skill.techs.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="text-[10px] px-2 py-1 rounded-md bg-gray-800/60 text-gray-400 border border-gray-700/40 font-mono group-hover:border-violet-500/40 group-hover:text-violet-300 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 + i * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: 'rgba(168, 85, 247, 0.2)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Hover Line Effect */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${skill.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === skill.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <motion.div
        className="mt-6 pt-4 border-t border-gray-700/30 flex items-center justify-between text-xs text-gray-500 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>Total Skills: {skillsData.length}</span>
        <span>Average Proficiency: {Math.round(skillsData.reduce((acc, s) => acc + s.level, 0) / skillsData.length)}%</span>
      </motion.div>
    </motion.div>
  );
};

export default TechnicalExpertise;