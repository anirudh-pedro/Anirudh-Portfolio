import React from 'react';
import { motion } from 'framer-motion';
import FooterLogo from '../Components/Footer/FooterLogo';
import FooterNav from '../Components/Footer/FooterNav';
import FooterSocial from '../Components/Footer/FooterSocial';
import FooterCopyright from '../Components/Footer/FooterCopyright';

const Footer = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Function to handle smooth scrolling
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Removed the top gradient border div */}
      
      {/* Background decoration */}
      <div className="absolute right-10 top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-20 bottom-40 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="pt-16 pb-8 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
          >
            {/* Logo and about section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <FooterLogo />
              <p className="mt-6 text-gray-400 text-sm leading-relaxed">
                I'm a full-stack developer passionate about creating elegant, 
                user-friendly applications that solve real-world problems. 
                With expertise in modern web technologies, I focus on delivering 
                high-quality code and exceptional user experiences.
              </p>
              
              {/* Contact info */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@yourportfolio.com" className="hover:text-blue-400 transition-colors">contact@yourportfolio.com</a>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Coimbatore, India</span>
                </div>
              </div>
            </motion.div>
            
            {/* Navigation links with smooth scrolling */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-gray-800">Navigation</h3>
              <ul className="space-y-3">
                {["Home", "About", "Projects", "Skills", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center text-sm cursor-pointer"
                    >
                      <svg className="w-3 h-3 mr-2 text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Social and tech section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-gray-800">Connect</h3>
              
              {/* Social links */}
              <div className="mb-8">
                <FooterSocial />
              </div>
              
              {/* Call to action with smooth scrolling */}
              <div className="mt-6">
                <a 
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "contact")}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 cursor-pointer"
                >
                  <span>Get in touch</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Copyright section */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FooterCopyright />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;