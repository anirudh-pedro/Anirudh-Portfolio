import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">404</h1>
      <p className="text-xl text-gray-400 mb-8">Page not found</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;