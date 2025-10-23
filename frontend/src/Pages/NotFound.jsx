import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpaceBackground from '../Components/Background';

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background */}
      <SpaceBackground />
      
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 404 Title */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold mb-4 text-violet-400">
            404
          </h1>
          <div className="w-32 h-1 bg-violet-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Let's get you back to familiar territory.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link 
            to="/"
            className="group px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-full text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Return Home</span>
            <div className="absolute inset-0 bg-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 border-2 border-purple-500/50 rounded-full text-purple-400 font-medium hover:border-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transform hover:-translate-y-1 transition-all duration-300"
          >
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-gray-600 text-sm"
        >
          <p>Error Code: 404 | Page Not Found</p>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-6 h-6 bg-purple-500/30 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-3 h-3 bg-pink-500/30 rounded-full"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
};

export default NotFound;