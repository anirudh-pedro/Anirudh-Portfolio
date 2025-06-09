import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillProgress from './SkillProgress';

const SkillCards = ({ activeCategory }) => {
  // Define all your skills with appropriate categories
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
      icon: '/assets/skills/tailwind.svg', 
      proficiency: 85, 
      category: 'frontend',
      description: 'Utility-first CSS framework for rapid UI development'
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
    { 
      id: 9, 
      name: 'Django', 
      icon: '/assets/skills/django.svg', 
      proficiency: 75, 
      category: 'backend',
      description: 'High-level Python web framework'
    },
    { 
      id: 10, 
      name: 'RESTful APIs', 
      icon: '/assets/skills/api.svg', 
      proficiency: 85, 
      category: 'backend',
      description: 'Design and implementation of RESTful services'
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
      id: 15, 
      name: 'PostgreSQL', 
      icon: '/assets/skills/postgresql.svg', 
      proficiency: 75, 
      category: 'databases',
      description: 'Advanced open-source relational database'
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
    { 
      id: 18, 
      name: 'Docker', 
      icon: '/assets/skills/docker.svg', 
      proficiency: 70, 
      category: 'tools',
      description: 'Platform for developing, shipping, and running applications in containers'
    },
    { 
      id: 19, 
      name: 'AWS', 
      icon: '/assets/skills/aws.svg', 
      proficiency: 75, 
      category: 'tools',
      description: 'Cloud computing services for modern applications'
    },
    { 
      id: 20, 
      name: 'GitHub Actions', 
      icon: '/assets/skills/github-actions.svg', 
      proficiency: 80, 
      category: 'tools',
      description: 'CI/CD automation directly in GitHub repositories'
    }
  ];

  // State for filtered skills
  const [filteredSkills, setFilteredSkills] = useState(allSkills);

  // Filter skills when active category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredSkills(allSkills);
    } else {
      setFilteredSkills(allSkills.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

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
            className="bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all group hover:shadow-lg hover:shadow-purple-500/5"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mr-4 p-2">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/50?text=' + skill.name[0];
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