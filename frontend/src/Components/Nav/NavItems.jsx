// filepath: c:\Users\HP\Desktop\anirudh\AnirudhPortfolio\frontend\src\Components\Nav\NavItems.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NavItems = ({ activeSection = 'home', isMobile = false, closeMenu, navigateToSection }) => {
  // Navigation links data
  const navLinks = [
    { name: 'Home', href: '#home', icon: 'home' },
    { name: 'About', href: '#about', icon: 'user' },
    { name: 'Projects', href: '#projects', icon: 'code' },
    { name: 'Skills', href: '#skills', icon: 'chip' },
    { name: 'Contact', href: '#contact', icon: 'mail' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  // Helper function to render the appropriate icon
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'code':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'chip':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Enhanced navigation click handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    
    // Use the parent navigateToSection function (more reliable)
    if (navigateToSection) {
      navigateToSection(sectionId);
    } else {
      // Fallback to direct DOM manipulation if navigateToSection isn't provided
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Update URL without page reload
        window.history.pushState(null, '', href);
        
        // Close mobile menu if applicable
        if (closeMenu) closeMenu();
      }
    }
  };

  // Mobile menu styling
  if (isMobile) {
    return (
      <motion.nav
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ul className="flex flex-col items-center space-y-6">
          {navLinks.map((link, index) => (
            <motion.li key={link.name} variants={itemVariants} custom={index}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center text-2xl font-medium py-2 px-4 rounded-full 
                  ${activeSection === link.href.substring(1) 
                    ? 'text-white bg-gradient-to-r from-blue-500/40 to-purple-600/40 backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-500/20' 
                    : 'text-gray-300 hover:text-white'
                  } transition-all duration-300`}
              >
                <span className="mr-3">{renderIcon(link.icon)}</span>
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    );
  }

  // Desktop menu styling with glassmorphism effect
  return (
    <motion.nav
      className="hidden md:block"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="relative px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/10"
        whileHover={{ boxShadow: "0 8px 32px rgba(148, 85, 255, 0.15)" }}
      >
        <ul className="flex items-center space-x-1">
          {navLinks.map((link) => (
            <motion.li key={link.name} variants={itemVariants}>
              <motion.a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative flex items-center px-4 py-2 rounded-full text-sm font-medium group transition-all duration-300
                  ${activeSection === link.href.substring(1)
                    ? 'text-white bg-gradient-to-r from-blue-500/50 to-purple-600/50 backdrop-blur-md'
                    : 'text-white/80 hover:text-white'
                  }`}
                whileHover={activeSection !== link.href.substring(1) ? {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center">
                  <span className={`mr-2 transition-transform duration-300 ${activeSection === link.href.substring(1) ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {renderIcon(link.icon)}
                  </span>
                  {link.name}
                </span>
                
                {/* Subtle glow effect for active item */}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.1, 0.2, 0.1], 
                      boxShadow: [
                        "0 0 5px rgba(156, 39, 176, 0.3)", 
                        "0 0 15px rgba(156, 39, 176, 0.5)", 
                        "0 0 5px rgba(156, 39, 176, 0.3)"
                      ] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                )}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default NavItems;