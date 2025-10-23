import React from 'react';
import { motion } from 'framer-motion';

import nodejsBootcamp from '../../assets/certifications/nodejs-bootcamp.png';
import pythonEssential from '../../assets/certifications/python-essential.png';
import openaiMcp from '../../assets/certifications/openai-mcp.webp';
import kaggleSQL from '../../assets/certifications/image.png';

const certifications = [
  {
    id: 1,
    name: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    issuer: "Udemy",
    image: nodejsBootcamp,
    link: "https://www.udemy.com/certificate/UC-3ee03ae6-e282-4a80-882f-92cfbe8b4bfb/",
    topics: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Authentication", "File Upload", "Error Handling"]
  },
  {
    id: 2,
    name: "Python Essential Training",
    issuer: "LinkedIn Learning",
    image: pythonEssential,
    link: "https://www.linkedin.com/learning/certificates/6713a25149c716173b297ce68ce13b606e60e1deee1398606da8f6e252d0b762",
    topics: ["Python Fundamentals", "Data Types", "Functions", "Classes", "File I/O", "Error Handling", "Libraries"]
  },
  {
    id: 3,
    name: "Model Context Protocol (MCP) Certification",
    issuer: "OpenAI",
    image: openaiMcp,
    link: "https://cdn-uploads.huggingface.co/production/uploads/noauth/iZTXOEPWvfiZVNYf9fhEX.webp",
    topics: ["MCP Protocol", "AI Models", "Context Management", "API Integration", "Model Optimization"]
  },
  {
    id: 4,
    name: "Intro to SQL",
    issuer: "Kaggle",
    image: kaggleSQL,
    link: "https://www.kaggle.com/learn/certification/anirudht/intro-to-sql",
    topics: ["SQL Fundamentals", "Data Queries", "Database Operations", "Data Analysis", "Filtering", "Aggregation"]
  }
];

const CertificationCarousel = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full mt-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-violet-400 mb-3">
          Certifications
        </h3>
        <p className="text-gray-200 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Continuous learning and skill development are core to my professional journey
        </p>
      </div>

      {/* Certificates Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-2xl border border-violet-500/20 overflow-hidden shadow-xl shadow-violet-500/10 hover:border-violet-400/40 transition-all duration-300 cursor-pointer group flex flex-col"
            onClick={() => window.open(cert.link, '_blank')}
          >
            {/* Certificate Image */}
            <div className="w-full h-48 overflow-hidden border-b border-violet-500/20 bg-black/20 flex items-center justify-center p-4">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                draggable={false}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/320x256/${
                    cert.issuer === 'Udemy' ? 'a435f0' : 
                    cert.issuer === 'LinkedIn Learning' ? '0077b5' : 
                    cert.issuer === 'OpenAI' ? '10a37f' : 
                    cert.issuer === 'Kaggle' ? '20beff' : '6366f1'
                  }/ffffff?text=${encodeURIComponent(cert.issuer)}`;
                }}
              />
            </div>
            
            {/* Certificate Details */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex-1">
                <h4 className="text-base font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
                  {cert.name}
                </h4>
                <p className="text-sm text-violet-400 mb-4">Issued by {cert.issuer}</p>
                
                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* View Button */}
              <div className="mt-auto pt-4 border-t border-violet-500/20">
                <div className="flex items-center justify-between text-violet-400 group-hover:text-violet-300 transition-colors">
                  <span className="text-sm font-medium">View Certificate</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CertificationCarousel;