import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillProgress from './SkillProgress';

const SkillCards = ({ activeCategory }) => {
  // Define all your skills with appropriate categories and updated icon paths
  const allSkills = [
    // Frontend
    { 
      id: 1, 
      name: 'React', 
      icon: '/assets/skills/react.svg', 
      proficiency: 90, 
      category: 'frontend',
      description: 'Component-based UI library for building interactive user interfaces'
    },
    { 
      id: 2, 
      name: 'JavaScript', 
      icon: '/assets/skills/javascript.svg', 
      proficiency: 85, 
      category: 'frontend',
      description: 'Core language for web development and interactive applications'
    },
    { 
      id: 3, 
      name: 'TypeScript', 
      icon: '/assets/skills/typescript.svg', 
      proficiency: 80, 
      category: 'frontend',
      description: 'Typed superset of JavaScript for safer code'
    },
    { 
      id: 4, 
      name: 'HTML5', 
      icon: '/assets/skills/html5.svg', 
      proficiency: 95, 
      category: 'frontend',
      description: 'Markup language for structuring web content'
    },
    { 
      id: 5, 
      name: 'CSS3', 
      icon: '/assets/skills/css3.svg', 
      proficiency: 90, 
      category: 'frontend',
      description: 'Styling language for designing web pages'
    },
    { 
      id: 6, 
      name: 'Tailwind CSS', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', // Direct CDN link
      proficiency: 85, 
      category: 'frontend',
      description: 'Utility-first CSS framework for rapid UI development'
    },
    // Add Socket.IO for Flash Chat
    { 
      id: 101, 
      name: 'Socket.IO', 
      icon: '/assets/skills/socketio.svg', 
      proficiency: 85, 
      category: 'frontend',
      description: 'Library for real-time web applications with bidirectional communication'
    },
    // Add Firebase for TypoMaster
    {
      id: 102,
      name: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      proficiency: 80,
      category: 'frontend',
      description: 'Platform for building web and mobile applications with authentication and databases'
    },
    // Add Chart.js for TypoMaster
    {
      id: 103,
      name: 'Chart.js',
      icon: '/assets/skills/chartjs.svg',
      proficiency: 80,
      category: 'frontend',
      description: 'JavaScript charting library for interactive data visualizations'
    },
    
    // Backend
    { 
      id: 7, 
      name: 'Node.js', 
      icon: '/assets/skills/nodejs.svg', 
      proficiency: 85, 
      category: 'backend',
      description: 'JavaScript runtime for server-side applications'
    },
    { 
      id: 8, 
      name: 'Express.js', 
      icon: '/assets/skills/express.svg', 
      proficiency: 80, 
      category: 'backend',
      description: 'Web application framework for Node.js'
    },
    // Add Flask as requested
    {
      id: 104,
      name: 'Flask',
      icon: '/assets/skills/flask.svg',
      proficiency: 80,
      category: 'backend',
      description: 'Lightweight Python web framework for building web applications'
    },
    { 
      id: 10, 
      name: 'RESTful APIs', 
      icon: '/assets/skills/api.svg', 
      proficiency: 85, 
      category: 'backend',
      description: 'Design and implementation of RESTful services'
    },
    // Add Streamlit for Sentiment Analysis App
    {
      id: 105,
      name: 'Streamlit',
      icon: '/assets/skills/streamlit.svg',
      proficiency: 80,
      category: 'backend',
      description: 'Python framework for rapidly building data applications'
    },
    
    // Languages
    { 
      id: 11, 
      name: 'Python', 
      icon: '/assets/skills/python.svg', 
      proficiency: 85, 
      category: 'languages',
      description: 'General-purpose programming language'
    },
    { 
      id: 12, 
      name: 'Java', 
      icon: '/assets/skills/java.svg', 
      proficiency: 75, 
      category: 'languages',
      description: 'Object-oriented programming language'
    },
    // Add C language as requested
    {
      id: 106,
      name: 'C',
      icon: '/assets/skills/c.svg',
      proficiency: 75,
      category: 'languages',
      description: 'General-purpose procedural programming language'
    },
    { 
      id: 13, 
      name: 'C++', 
      icon: '/assets/skills/cpp.svg', 
      proficiency: 70, 
      category: 'languages',
      description: 'Low-level programming with object-oriented features'
    },
    
    // Databases
    { 
      id: 14, 
      name: 'MongoDB', 
      icon: '/assets/skills/mongodb.svg', 
      proficiency: 80, 
      category: 'databases',
      description: 'NoSQL document database for modern applications'
    },
    { 
      id: 16, 
      name: 'MySQL', 
      icon: '/assets/skills/mysql.svg', 
      proficiency: 80, 
      category: 'databases',
      description: 'Open-source relational database management system'
    },
    
    // Tools & DevOps
    { 
      id: 17, 
      name: 'Git', 
      icon: '/assets/skills/git.svg', 
      proficiency: 90, 
      category: 'tools',
      description: 'Version control system for tracking code changes'
    },
    // Add Netlify as requested
    {
      id: 107,
      name: 'Netlify',
      icon: '/assets/skills/netlify.svg',
      proficiency: 80,
      category: 'tools',
      description: 'Platform for automated deployment, serverless functions, and forms'
    },
    // Add Render as requested
    {
      id: 108,
      name: 'Render',
      icon: '/assets/skills/render.svg',
      proficiency: 80,
      category: 'tools',
      description: 'Cloud platform for hosting web services, static sites, and databases'
    },

    // Add other skills from Sentiment Analysis project
    {
      id: 110,
      name: 'Machine Learning',
      icon: '/assets/skills/machine-learning.svg',
      proficiency: 75,
      category: 'tools',
      description: 'Algorithms and models for predictive analysis and pattern recognition'
    },
    {
      id: 111,
      name: 'NLP',
      icon: '/assets/skills/nlp.svg',
      proficiency: 75,
      category: 'tools',
      description: 'Natural Language Processing for text analysis and understanding'
    },
    // GitHub Actions
    { 
      id: 20, 
      name: 'GitHub Actions', 
      icon: '/assets/skills/github-actions.svg', // Update this to point to your new saved image
      proficiency: 80, 
      category: 'tools',
      description: 'CI/CD automation directly in GitHub repositories'
    }
  ];

  // State for filtered skills
  const [filteredSkills, setFilteredSkills] = useState(allSkills);
  
  // State to track image loading errors
  const [imageErrors, setImageErrors] = useState({});

  // Filter skills when active category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredSkills(allSkills);
    } else {
      setFilteredSkills(allSkills.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle image error and use appropriate fallback
  const handleImageError = (skillId, skillName) => {
    setImageErrors(prev => ({
      ...prev,
      [skillId]: true
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  // Get icon based on skill name for fallback
  const getFallbackIcon = (skillName) => {
    // Direct mapping for exact skill names - more specific than partial matches
    const exactIcons = {
      'Socket.IO': 'https://cdn.simpleicons.org/socketdotio/black/white',
      'RESTful APIs': 'https://cdn.svgporn.com/logos/postman-icon.svg',
      'Chart.js': 'https://www.chartjs.org/img/chartjs-logo.svg',
      'Tailwind CSS': '/assets/skills/tailwind.svg', // Update to your local path
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Machine Learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      'NLP': 'https://cdn.simpleicons.org/openai/10a37f',
      'GitHub Actions': '/assets/skills/github-actions.svg' // Add this line
    };

    // If we have an exact match, use that
    if (exactIcons[skillName]) {
      return exactIcons[skillName];
    }

    // Otherwise use the existing partial match logic
    const cdnIcons = {
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'html5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'css3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'tailwind': '/assets/skills/tailwind.svg', // Update path
      'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'c': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'github': '/assets/skills/github-actions.svg', // Update path
      'netlify': 'https://cdn.simpleicons.org/netlify/00C7B7',
      'render': 'https://cdn.simpleicons.org/render/46E3B7',
      'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'chart': 'https://cdn.simpleicons.org/chartdotjs/FF6384',
      'socket': 'https://cdn.simpleicons.org/socketdotio/white',
      'streamlit': 'https://cdn.simpleicons.org/streamlit/FF4B4B',
      'machine': 'https://cdn.simpleicons.org/tensorflow/FF6F00',
      'nlp': 'https://cdn.simpleicons.org/openai/10a37f',
      'api': 'https://cdn.svgporn.com/logos/postman-icon.svg',
      'rest': 'https://cdn.svgporn.com/logos/postman-icon.svg'
    };
    
    // Try to match the skill name with one of our CDN icons
    const key = Object.keys(cdnIcons).find(key => 
      skillName.toLowerCase().includes(key.toLowerCase())
    );
    
    // Return the matched CDN icon or a general placeholder
    return key 
      ? cdnIcons[key]
      : `https://via.placeholder.com/50?text=${skillName.charAt(0)}`;
  };

  // Preload critical icons
  useEffect(() => {
    const criticalIcons = [
      'https://cdn.simpleicons.org/socketdotio/white',
      'https://www.chartjs.org/img/chartjs-logo.svg',
      'https://cdn.svgporn.com/logos/postman-icon.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    ];
    
    criticalIcons.forEach(iconUrl => {
      const img = new Image();
      img.src = iconUrl;
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.id}
            variants={cardVariants}
            className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/25 hover:border-purple-400/50 transition-all group hover:shadow-lg hover:shadow-purple-500/10 shadow-xl shadow-black/50"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mr-4 p-2 overflow-hidden">
                {/* First attempt with original icon */}
                <img 
                  src={imageErrors[skill.id] ? getFallbackIcon(skill.name) : skill.icon} 
                  alt={`${skill.name} logo`} 
                  className="w-full h-full object-contain" 
                  onError={() => handleImageError(skill.id, skill.name)}
                  style={{ 
                    filter: skill.name === 'Socket.IO' ? 'invert(1)' : 'none',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{skill.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{skill.description}</p>
                
                <SkillProgress proficiency={skill.proficiency} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillCards;