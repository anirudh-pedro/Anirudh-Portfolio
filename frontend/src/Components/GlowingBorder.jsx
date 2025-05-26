import React from 'react';
import { motion } from 'framer-motion';

const GlowingBorder = ({ children, className = '' }) => {
  return (
    <div className="relative">
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="20%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="none" />
          </svg>
        </div>
        <motion.div 
          className="w-1/2 h-1/2 bg-gradient-to-r from-white/30 to-transparent absolute z-0"
          animate={{
            rotate: [0, 360],
            x: ["-50%", "150%"],
            y: ["-50%", "150%"],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ 
            borderRadius: "100%",
            filter: "blur(15px)",
          }}
        />
      </div>
      
      {/* Actual content */}
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default GlowingBorder;