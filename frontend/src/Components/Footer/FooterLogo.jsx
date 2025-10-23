import React from 'react';

const FooterLogo = () => {
  return (
    <div>
      <a href="#home" className="inline-block">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20">
            A
          </div>
          <div className="ml-3">
            <span className="text-white font-bold text-xl block">Anirudh</span>
            <span className="text-xs text-blue-400">Full-Stack Developer</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FooterLogo;