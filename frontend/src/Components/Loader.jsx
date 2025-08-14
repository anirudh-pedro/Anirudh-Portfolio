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

  const cursorVariants = {
    animate: {
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        // Fixed: Using standard easing instead of steps
        ease: "linear"
      }
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
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4">
      <motion.div
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header */}
        <div className="bg-gray-700 px-4 py-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-300 text-sm font-medium">portfolio-loader.jsx</div>
        </div>

        {/* Terminal content */}
        <motion.div 
          className="p-4 font-mono text-sm text-gray-300 h-64 overflow-y-auto"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="text-blue-400 mb-2">$ npm run portfolio</div>
          
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
              <span className="text-green-400 mr-2">&gt;</span>
              <span className={line.highlight ? "text-purple-400 font-bold" : ""}>
                {line.text}
                {index === codeLines.length - 1 && (
                  <motion.span 
                    className="inline-block w-2 h-4 bg-purple-400 ml-1"
                    animate={{
                      opacity: [1, 0, 1],
                      transition: {
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        className="w-full max-w-md h-1 mt-4 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
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
        <span className="text-gray-400 text-sm tracking-wide uppercase font-medium">
          Portfolio loading
        </span>
        <div className="flex space-x-1">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-1.5 h-1.5 bg-purple-500 rounded-full"
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