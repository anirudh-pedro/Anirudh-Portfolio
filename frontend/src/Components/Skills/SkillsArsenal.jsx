import React from 'react';
import { motion } from 'framer-motion';

const SkillsArsenal = () => {
  const skillsData = {
    frontend: {
      title: "Frontend",
      icon: "✨",
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Socket.IO", "Firebase", "Chart.js"]
    },
    backend: {
      title: "Backend", 
      icon: "⚡",
      skills: ["Node.js", "Express.js", "Flask", "RESTful APIs", "Streamlit"]
    },
    languages: {
      title: "Languages",
      icon: "🔮", 
      skills: ["Python", "JavaScript", "Java", "C", "C++"]
    },
    databases: {
      title: "Databases",
      icon: "🗄️",
      skills: ["MongoDB", "MySQL"]
    },
    tools: {
      title: "Tools & DevOps",
      icon: "🛠️",
      skills: ["Git", "GitHub Actions", "Netlify", "Render", "Machine Learning", "NLP"]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="w-full">
      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {Object.entries(skillsData).map(([key, category]) => (
          <motion.div
            key={key}
            variants={itemVariants}
            className="professional-card rounded-xl p-6 shadow-xl shadow-black/30 hover:border-cyan-300/40 transition-all duration-300 group"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Category Header */}
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{category.icon}</span>
              <h3 className="display-font text-xl font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                {category.title}
              </h3>
            </div>

            {/* Skills Tags */}
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={containerVariants}
            >
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={skillVariants}
                  className="px-3 py-1.5 bg-slate-700/35 hover:bg-slate-600/45 border border-slate-300/20 rounded-full text-sm text-slate-200 hover:text-white transition-all duration-200 cursor-default"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsArsenal;
