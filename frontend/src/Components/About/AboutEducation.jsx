import React from 'react';
import { motion } from 'framer-motion';

const AboutEducation = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Education data - replace with your own details
  const education = [
    {
      degree: "Bachelor of Engineering",
      field: "Computer Science",
      institution: "Srishakthi Institute of Engineering and Technology",
      location: "Coimbatore, India",
      period: "2023 - 2027",
      highlights: ["CGPA: 7.82/10", "Dean's List", "Technical Tutor"]
    },
    {
      degree: "Higher Secondary",
      field: "Science & Mathematics",
      institution: "MGV Global Academy School and Junior College",
      location: "Tirupur, India",
      period: "2021 - 2022",
      highlights: ["80% in 12th Grade", "School Representative"]
    }
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-purple-500/20 shadow-xl shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-300"
      variants={containerVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-violet-400 flex items-center">
        <span className="mr-3 p-2 rounded-lg bg-violet-500/20">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </span>
        Education
      </h3>

      <div className="space-y-6">
        {education.map((item, index) => (
          <motion.div 
            key={index} 
            className="relative pl-6 border-l-2 border-purple-400/30 hover:border-purple-400/50 transition-colors"
            variants={itemVariants}
          >
            <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
            
            <div className="mb-1 flex flex-wrap items-center">
              <h4 className="text-base sm:text-lg font-semibold text-white mr-2">{item.degree}</h4>
              <span className="text-sm sm:text-base text-purple-400">in {item.field}</span>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base">{item.institution}, {item.location}</p>
            
            <div className="flex items-center mt-1 mb-3">
              <svg className="w-4 h-4 text-purple-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-400">{item.period}</span>
            </div>
            
            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-200 space-y-1">
              {item.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutEducation;