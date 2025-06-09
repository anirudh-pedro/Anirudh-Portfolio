import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CertificationCarousel = () => {
  // Reference to the scroller container
  const scrollerRef = useRef(null);
  // State to track if carousel is paused (on hover)
  const [isPaused, setIsPaused] = useState(false);
  
  // List of certifications with images, links and topics learned
  const certifications = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      image: "/assets/certifications/aws-certified.png",
      link: "https://www.credly.com/badges/example-link-1",
      topics: ["Cloud Architecture", "EC2", "S3", "Lambda", "DynamoDB"]
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      image: "/assets/certifications/meta-cert.png",
      link: "https://www.credly.com/badges/example-link-2",
      topics: ["Hooks", "Context API", "Redux", "Performance Optimization"]
    },
    {
      id: 3,
      name: "Machine Learning Specialization",
      issuer: "Stanford University & Coursera",
      image: "/assets/certifications/coursera-ml.png",
      link: "https://www.coursera.org/example-certification-3",
      topics: ["Neural Networks", "Deep Learning", "TensorFlow", "NLP"]
    },
    {
      id: 4,
      name: "Professional JavaScript Certification",
      issuer: "Udemy",
      image: "/assets/certifications/javascript-cert.png",
      link: "https://www.udemy.com/example-certification-4",
      topics: ["ES6+", "Async/Await", "Promises", "Functional Programming"]
    },
    {
      id: 5,
      name: "Python for Data Science",
      issuer: "IBM",
      image: "/assets/certifications/ibm-python.png",
      link: "https://www.credly.com/badges/example-link-5",
      topics: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter"]
    },
    {
      id: 6,
      name: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      image: "/assets/certifications/freecodecamp-cert.png",
      link: "https://www.freecodecamp.org/example-certification-6",
      topics: ["HTML/CSS", "JavaScript", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 7,
      name: "Google Cloud Associate Engineer",
      issuer: "Google Cloud",
      image: "/assets/certifications/google-cloud.png",
      link: "https://www.credential.net/example-certification-7",
      topics: ["GCP", "Kubernetes", "Cloud Functions", "BigQuery"]
    },
    {
      id: 8,
      name: "Azure Fundamentals",
      issuer: "Microsoft",
      image: "/assets/certifications/azure-cert.png",
      link: "https://www.credly.com/badges/example-link-8",
      topics: ["Azure Services", "Security", "Networking", "Compute", "Storage"]
    }
  ];

  // Clone the certifications array to create a seamless loop
  const duplicatedCertifications = [...certifications, ...certifications];

  useEffect(() => {
    // This effect handles the automatic scrolling behavior
    const scrollerElement = scrollerRef.current;
    if (!scrollerElement) return;

    // Calculate scroll width and setup variables
    let scrollPosition = 0;
    const scrollWidth = scrollerElement.scrollWidth;
    const containerWidth = scrollerElement.clientWidth;
    const halfWidth = scrollWidth / 2;
    
    // Store animation ID for cleanup
    let animationId = null;
    
    // Scroll animation function
    const scrollAnimation = () => {
      // Only scroll if not paused
      if (!isPaused) {
        // Increment scroll position
        scrollPosition += 0.5; // Adjust speed here (lower = slower)
        
        // Reset position when we've scrolled through the first set of duplicates
        if (scrollPosition >= halfWidth) {
          scrollPosition = 0;
        }
        
        // Apply scroll position
        scrollerElement.scrollLeft = scrollPosition;
      }
      
      // Continue animation
      animationId = requestAnimationFrame(scrollAnimation);
    };
    
    // Start animation
    animationId = requestAnimationFrame(scrollAnimation);
    
    // Clean up animation on component unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]); // Re-run effect when isPaused changes

  return (
    <div className="w-full mt-16 relative overflow-hidden">
      <div className="mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          Professional Certifications
        </h3>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Continuous learning and skill development are core to my professional journey
        </p>
      </div>
      
      {/* Gradient overlays for smoother edges */}
      <div className="absolute left-0 top-0 h-full w-12 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      
      {/* Scrolling container with pause on hover */}
      <div 
        ref={scrollerRef}
        className="flex overflow-x-hidden no-scrollbar py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-6 px-6">
          {duplicatedCertifications.map((cert, index) => (
            <a 
              key={`${cert.id}-${index}`}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-80 h-52 relative group"
            >
              <motion.div 
                className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden group-hover:border-blue-500/50 transition-all duration-300 shadow-lg flex flex-col"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Certificate image at the top */}
                <div className="w-full h-20 overflow-hidden border-b border-gray-700/50">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x120?text=Certificate';
                    }}
                  />
                </div>
                
                {/* Certificate info */}
                <div className="p-3 flex-1 flex flex-col">
                  <div className="mb-1">
                    <h4 className="text-lg font-bold text-white leading-tight">{cert.name}</h4>
                    <p className="text-xs text-blue-300">Issued by {cert.issuer}</p>
                  </div>
                  
                  {/* Topics learned */}
                  <div className="mt-1 flex-1">
                    <p className="text-xs text-gray-400 mb-1">Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.topics.slice(0, 4).map((topic, i) => (
                        <span 
                          key={i} 
                          className="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        >
                          {topic}
                        </span>
                      ))}
                      {cert.topics.length > 4 && (
                        <span className="text-[10px] text-gray-400">+{cert.topics.length - 4} more</span>
                      )}
                    </div>
                  </div>
                  
                  {/* View button */}
                  <div className="mt-auto pt-1 text-center">
                    <span className="inline-block text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full hover:bg-blue-500/30 transition-colors">
                      View Certificate →
                    </span>
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Visual indicator that carousel pauses on hover */}
      <div className="text-center mt-4">
        <span className="text-xs text-gray-500">Hover over certificates to pause scrolling</span>
      </div>
    </div>
  );
};

export default CertificationCarousel;