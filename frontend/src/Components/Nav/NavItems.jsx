import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Define nav links outside component to prevent recreating on every render
const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' }
];

const NavItems = ({ isMobile = false, closeMenu }) => {
  const [activeSection, setActiveSection] = useState('home');

  // Detect which section is currently visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          const newSection = section.id;
          if (newSection !== activeSection) {
            setActiveSection(newSection);
            window.history.replaceState(null, '', `#${newSection}`);
          }
          break;
        }
      }
    };

    // Initial check
    const hash = window.location.hash.replace('#', '');
    if (hash && NAV_LINKS.find(link => link.id === hash)) {
      setActiveSection(hash);
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Handle navigation click
  const handleClick = useCallback((e, sectionId) => {
    e.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Update active section immediately
    setActiveSection(sectionId);
    window.history.replaceState(null, '', `#${sectionId}`);

    // Smooth scroll to section
    const navbarHeight = 80;
    const targetPosition = section.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    if (closeMenu) {
      setTimeout(() => closeMenu(), 300);
    }
  }, [closeMenu]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };


  // Mobile Navigation
  if (isMobile) {
    return (
      <motion.nav
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ul className="flex flex-col items-center space-y-6 py-8">
          {NAV_LINKS.map((link) => (
            <motion.li key={link.id} variants={itemVariants}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={`text-2xl font-semibold py-3 px-8 rounded-full transition-all duration-300
                  ${activeSection === link.id
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    );
  }

  // Desktop Navigation
  return (
    <motion.nav
      className="hidden md:block"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="px-2 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <ul className="flex items-center space-x-2">
          {NAV_LINKS.map((link) => (
            <motion.li key={link.id} variants={itemVariants}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={`relative block px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSection === link.id
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.name}
                
                {/* Active indicator glow */}
                {activeSection === link.id && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-sm"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default NavItems;