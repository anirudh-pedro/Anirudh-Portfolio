import React from 'react';
import { motion } from 'framer-motion';

const ProfileImage = ({ imageSrc }) => {
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.6
      }
    }
  };

  // Floating animation for the image
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className="w-full md:w-1/2 mb-10 md:mb-0 md:order-2 flex justify-center"
      variants={imageVariants}
      animate={floatingAnimation}
    >
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-50"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.img
          src={imageSrc}
          alt="Anirudh T"
          className="relative rounded-full w-full h-full object-cover border-4 border-white/10 shadow-2xl"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        />
      </div>
    </motion.div>
  );
};

export default ProfileImage;