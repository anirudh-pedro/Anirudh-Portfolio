import React from 'react';

const FooterNav = () => {
  const links = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Skills', path: '#skills' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.path} 
            className="text-gray-400 hover:text-blue-400 transition-colors flex items-center text-sm group"
          >
            <span className="w-0 h-px bg-blue-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
            {link.name}
          </a>
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-white font-medium mb-2">Looking for My Work?</h4>
        <a 
          href="#portfolio" 
          className="inline-block px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/40 rounded-lg text-blue-400 text-sm transition-colors"
        >
          View My Portfolio →
        </a>
      </div>
    </div>
  );
};

export default FooterNav;