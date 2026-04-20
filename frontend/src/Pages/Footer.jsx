import React from 'react';
import { motion } from 'framer-motion';
import FooterLogo from '../Components/Footer/FooterLogo';
import FooterSocial from '../Components/Footer/FooterSocial';
import FooterCopyright from '../Components/Footer/FooterCopyright';

const Footer = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Function to handle smooth scrolling
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden pb-8">
      <div className="absolute right-10 top-16 w-60 h-60 bg-slate-300/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-10 bottom-10 w-72 h-72 bg-slate-200/45 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="rounded-3xl border border-slate-300/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-300/30 p-6 sm:p-8 md:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <FooterLogo />
              <p className="mt-5 text-slate-700 text-sm leading-relaxed max-w-md">
                Full-stack engineer focused on shipping polished web products, AI-powered experiences, and scalable backend systems.
              </p>
              <div className="mt-5 space-y-2.5 text-sm text-slate-700">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:anirudh200503@gmail.com" className="hover:text-slate-900 transition-colors">
                    anirudh200503@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Coimbatore, India</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="display-font text-lg font-semibold text-slate-900 mb-4">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                    className="px-3 py-2 rounded-lg border border-slate-300/70 bg-white/85 hover:bg-slate-100 text-sm text-slate-800 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="display-font text-lg font-semibold text-slate-900 mb-4">
                Connect
              </h3>
              <FooterSocial />

              <div className="mt-6 rounded-2xl border border-slate-300/70 bg-slate-50 p-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Interested in collaborating on full-stack or AI projects?
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, 'contact')}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors"
                  >
                    Contact Me
                  </a>
                  <a
                    href="/my-resume-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-sm font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-slate-300/70"
          >
            <FooterCopyright />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
