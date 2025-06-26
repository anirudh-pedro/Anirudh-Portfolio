import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const ProjectsList = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Updated projects array with your new projects
  const projects = [
    {
      id: "flashchat",
      title: "FlashChat",
      description: "A modern, real-time chat application focused on privacy and seamless connectivity. Features include private rooms, proximity-based chat, ephemeral messaging, and real-time communication.",
      image: "/projects/flashchat.png", // Add this image to your public/projects folder
      tags: ["web", "featured"],
      technologies: ["React", "Socket.IO", "Express.js", "Node.js", "Tailwind CSS"],
      liveUrl: "https://flash-chat-phi.vercel.app/join",
      githubUrl: "https://github.com/anirudh-pedro/FlashChat"
    },
    {
      id: "typomaster",
      title: "TypoMaster",
      description: "A full-stack typing practice platform designed to help users improve their typing speed and accuracy through interactive tests, real-time feedback, and personalized analytics.",
      image: "/projects/typomaster.png", // Add this image to your public/projects folder
      tags: ["web", "featured"],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind CSS"],
      liveUrl: "https://typo-master-alpha.vercel.app/",
      githubUrl: "https://github.com/anirudh-pedro/TypoMaster"
    },
    {
      id: "sentiment-analysis",
      title: "Advanced Sentiment Analysis",
      description: "A robust sentiment analysis web app that combines rule-based logic with machine learning to provide nuanced analysis of text sentiment, with an interactive interface for real-time results.",
      image: "/projects/sentiment-analysis.png", // Add this image to your public/projects folder
      tags: ["ai", "featured"],
      technologies: ["Python", "Streamlit", "scikit-learn", "NLTK", "Docker", "Heroku"],
      liveUrl: "https://sentiment0analyzer.streamlit.app/",
      githubUrl: "https://github.com/anirudh-pedro/Sentiment-Analysis-App"
    }
    // You can keep your existing projects below if desired
    // {
    //   id: 1,
    //   title: "Portfolio Website",
    //   description: "A modern portfolio website built with React and Framer Motion, featuring smooth animations and interactive elements.",
    //   image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
    //   tags: ["web", "featured"],
    //   technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    //   liveUrl: "https://your-portfolio-url.com",
    //   githubUrl: "https://github.com/yourusername/portfolio"
    // },
    // {
    //   id: 2,
    //   title: "E-commerce Platform",
    //   description: "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration using the MERN stack.",
    //   image: "https://via.placeholder.com/600x400?text=E-commerce+App",
    //   tags: ["web", "featured"],
    //   technologies: ["MongoDB", "Express", "React", "Node.js", "Redux", "Stripe"],
    //   liveUrl: "https://your-ecommerce-demo.com",
    //   githubUrl: "https://github.com/yourusername/ecommerce-app"
    // },
    // {
    //   id: 3,
    //   title: "AI Image Generator",
    //   description: "An AI-powered application that generates custom images based on text descriptions, using OpenAI's DALL-E API and a custom React interface.",
    //   image: "https://via.placeholder.com/600x400?text=AI+Image+Generator",
    //   tags: ["ai", "web"],
    //   technologies: ["React", "Node.js", "OpenAI API", "Canvas API"],
    //   liveUrl: "https://ai-image-generator-demo.com",
    //   githubUrl: "https://github.com/yourusername/ai-image-generator"
    // }
    // You can remove or keep the other existing projects as needed
  ];

  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {projects.map((project) => (
        <ProjectCard 
          key={project.id}
          project={project}
        />
      ))}
    </motion.div>
  );
};

export default ProjectsList;