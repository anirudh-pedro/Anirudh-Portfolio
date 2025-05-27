import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/anirudhphoto.jpg';
import ProfileImage from '../Components/Home/ProfileImage';
import HomeContent from '../Components/Home/HomeContent';
import SpaceBackground from '../Components/Background';

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
    {/* <SpaceBackground /> */}
    <motion.div 
      className="container mx-auto px-6 py-12 max-w-4xl text-center md:text-left"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 md:gap-10 lg:gap-16">
      <ProfileImage imageSrc={profileImage} />
      <HomeContent scrollToSection={scrollToSection} />
      </div>
    </motion.div>
    </>
  );
};

export default Home;