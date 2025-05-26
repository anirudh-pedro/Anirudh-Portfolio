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

  // Project data - you should replace this with your own projects
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern portfolio website built with React and Framer Motion, featuring smooth animations and interactive elements.",
      image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
      tags: ["web", "featured"],
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      liveUrl: "https://your-portfolio-url.com",
      githubUrl: "https://github.com/yourusername/portfolio"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration using the MERN stack.",
      image: "https://via.placeholder.com/600x400?text=E-commerce+App",
      tags: ["web", "featured"],
      technologies: ["MongoDB", "Express", "React", "Node.js", "Redux", "Stripe"],
      liveUrl: "https://your-ecommerce-demo.com",
      githubUrl: "https://github.com/yourusername/ecommerce-app"
    },
    {
      id: 3,
      title: "AI Image Generator",
      description: "An AI-powered application that generates custom images based on text descriptions, using OpenAI's DALL-E API and a custom React interface.",
      image: "https://via.placeholder.com/600x400?text=AI+Image+Generator",
      tags: ["ai", "web"],
      technologies: ["React", "Node.js", "OpenAI API", "Canvas API"],
      liveUrl: "https://ai-image-generator-demo.com",
      githubUrl: "https://github.com/yourusername/ai-image-generator"
    },
    {
      id: 4,
      title: "Fitness Tracker Mobile App",
      description: "A cross-platform mobile application for tracking workouts, nutrition, and fitness goals with customizable plans and progress visualization.",
      image: "https://via.placeholder.com/600x400?text=Fitness+App",
      tags: ["mobile"],
      technologies: ["React Native", "Redux", "Firebase", "HealthKit", "Google Fit API"],
      githubUrl: "https://github.com/yourusername/fitness-tracker-app"
    },
    {
      id: 5,
      title: "Task Management System",
      description: "A collaborative task management system with real-time updates, team workspaces, and project analytics dashboard.",
      image: "https://via.placeholder.com/600x400?text=Task+Manager",
      tags: ["web"],
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Chart.js"],
      liveUrl: "https://task-management-demo.com",
      githubUrl: "https://github.com/yourusername/task-management-system"
    },
    {
      id: 6,
      title: "Language Learning Game",
      description: "An interactive game designed to help users learn new languages through gamification, spaced repetition, and speech recognition.",
      image: "https://via.placeholder.com/600x400?text=Language+Game",
      tags: ["mobile", "other"],
      technologies: ["Unity", "C#", "Speech Recognition API", "Firebase"],
      liveUrl: "https://language-game-demo.com"
    }
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