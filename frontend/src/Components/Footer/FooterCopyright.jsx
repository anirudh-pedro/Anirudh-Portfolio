import React from 'react';

const FooterCopyright = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
      <div className="mb-4 sm:mb-0 flex items-center">
        <span className="text-blue-400 mr-1">©</span> {currentYear} Anirudh. All rights reserved.
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="#privacy" className="hover:text-blue-400 transition-colors text-xs">Privacy</a>
        <a href="#terms" className="hover:text-blue-400 transition-colors text-xs">Terms</a>
        <a href="#sitemap" className="hover:text-blue-400 transition-colors text-xs">Sitemap</a>
        <div className="text-xs">
          <span>Made with </span>
          <span className="text-red-400">❤</span>
          <span> using React & TailwindCSS</span>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;