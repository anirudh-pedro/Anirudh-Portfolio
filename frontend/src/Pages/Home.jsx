import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/anirudhphoto.jpg';
import ProfileImage from '../Components/Home/ProfileImage';
import HomeContent from '../Components/Home/HomeContent';

const Home = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <>
    <motion.div 
      className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl text-center md:text-left"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mt-0 md:mt-2 md:gap-12 lg:gap-20 xl:gap-32">
      <ProfileImage imageSrc={profileImage} />
      <HomeContent scrollToSection={scrollToSection} />
      </div>
    </motion.div>
    </>
  );
};

export default Home;