import React from 'react';

const FooterLogo = () => {
  return (
    <div>
      <a href="#home" className="inline-block">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-200/30 flex items-center justify-center text-cyan-100 font-bold text-xl shadow-lg shadow-cyan-400/20">
            A
          </div>
          <div className="ml-3">
            <span className="display-font text-slate-100 font-semibold text-xl block">Anirudh T</span>
            <span className="text-xs text-cyan-200">Full-Stack Developer</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FooterLogo;