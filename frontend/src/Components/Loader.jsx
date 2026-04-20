import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const codeLines = [
    { text: "Initializing portfolio...", delay: 0 },
    { text: "Loading components...", delay: 0.5 },
    { text: "Importing design system...", delay: 1 },
    { text: "Compiling animations...", delay: 1.5 },
    { text: "Connecting routes...", delay: 2 },
    { text: "Starting development server...", delay: 2.5 },
    { text: "Welcome to Anirudh's portfolio", delay: 3, highlight: true }
  ];

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50 p-4">
      <motion.div
        className="w-full max-w-3xl bg-slate-100 rounded-xl shadow-2xl shadow-slate-300/50 overflow-hidden border border-slate-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header */}
        <div className="relative bg-slate-200/70 px-4 py-3 border-b border-slate-200">
          <div className="absolute left-4 top-1/2 flex -translate-y-1/2 space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-center text-slate-600 text-sm font-semibold">Portfolio Loader - Please wait</div>
        </div>

        {/* Terminal content */}
        <motion.div 
          className="p-6 font-mono text-sm sm:text-base text-slate-700 min-h-52 sm:min-h-60 overflow-y-auto bg-slate-50"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="text-slate-900 text-xl sm:text-3xl mb-6 tracking-tight leading-relaxed">
            Loading portfolio experience.
            <motion.span
              className="inline-block w-[2px] h-7 sm:h-9 bg-indigo-400 ml-1 align-middle"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="text-emerald-700 mb-3">$ npm run portfolio</div>
          
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  delay: line.delay,
                  duration: 0.4
                }
              }}
            >
              <span className="text-emerald-700 mr-2">&gt;</span>
              <span className={line.highlight ? 'text-slate-900 font-bold' : ''}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        className="w-full max-w-3xl h-1 mt-4 bg-slate-300 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="h-full bg-slate-700"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 3.5,
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-slate-500 text-sm tracking-wide uppercase font-medium">
          Preparing portfolio
        </span>
        <div className="flex space-x-1">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-1.5 h-1.5 bg-slate-700 rounded-full"
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: dot * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;