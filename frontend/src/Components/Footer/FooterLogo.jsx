import React from 'react';

const FooterLogo = () => {
  return (
    <div>
      <a href="#home" className="inline-block">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300/80 flex items-center justify-center text-slate-700 font-bold text-xl shadow-lg shadow-slate-300/30">
            A
          </div>
          <div className="ml-3">
            <span className="display-font text-slate-900 font-semibold text-xl block">Anirudh T</span>
            <span className="text-xs text-slate-600">Full-Stack Developer</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FooterLogo;