import React from 'react';
import { motion } from 'framer-motion';

const AboutBio = () => {
  const terminalSections = [
    {
      command: 'whoami',
      output: (
        <>
          Hello! I'm <span className="font-semibold text-slate-900">Anirudh T</span>, a full-stack developer focused on building efficient and user-friendly applications.
        </>
      )
    },
    {
      command: 'cat specialization.txt',
      output: (
        <>
          I specialize in the <span className="font-semibold text-slate-900">MERN stack</span> (MongoDB, Express, React, Node.js) and enjoy turning ideas into practical digital products.
        </>
      )
    },
    {
      command: 'cat values.txt',
      output: (
        <>
          I value continuous learning, collaboration, and clean maintainable code while keeping up with industry best practices.
        </>
      )
    },
    {
      command: 'cat ai-agents.txt',
      output: (
        <>
          I build <span className="font-semibold text-slate-900">AI agents</span> that automate workflows, connect tools, and deliver practical outcomes for real-world use cases.
        </>
      )
    }
  ];

  const bioVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div 
      className="professional-card p-4 sm:p-5 rounded-2xl shadow-xl shadow-black/25 hover:border-slate-400/60 transition-all duration-300"
      variants={bioVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <h3 className="display-font text-xl sm:text-2xl font-semibold mb-4 text-slate-900">
        My Story
      </h3>

      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100/80 shadow-xl shadow-slate-300/35">
        <div className="relative border-b border-slate-200 bg-slate-200/70 px-3 py-2.5">
          <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-600">
            About Profile - Click to read
          </p>
        </div>

        <div className="bg-slate-50/90 px-4 py-4 sm:px-5 sm:py-5 font-mono text-slate-700">
          <p className="text-lg sm:text-xl leading-relaxed text-slate-900 tracking-tight">
            Crafting efficient and user-friendly digital products.
            <motion.span
              className="ml-1 inline-block h-5 w-[2px] bg-indigo-400 align-middle"
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </p>

          <p className="mt-3 text-sm sm:text-[0.95rem] text-slate-500">
            Full-stack developer with strong MERN expertise, AI/ML integration experience, and a focus on scalable, maintainable code.
          </p>

          <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm sm:text-[0.9rem] leading-7">
            {terminalSections.map((section) => (
              <div key={section.command}>
                <p className="flex items-center gap-2 text-slate-800">
                  <span className="text-emerald-700">$</span>
                  <span>{section.command}</span>
                </p>
                <p className="mt-1 pl-4 text-slate-600">{section.output}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutBio;