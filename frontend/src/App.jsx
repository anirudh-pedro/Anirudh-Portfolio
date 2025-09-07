import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Nav/Navbar';
import Loader from './Components/Loader';
import './App.css';
import SpaceBackground from './Components/Background';

function App() {
  // State for loading screen
  const [loading, setLoading] = useState(true);

  // Simulate loading time and then hide loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App relative min-h-screen text-white overflow-x-hidden z-0">
        {/* Loading screen with exit animation */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loader"
              exit={{ 
                opacity: 0,
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              className="absolute inset-0 z-50"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Fixed particle background */}
        {/* <div className="w-full absolute h-screen -z-10 pointer-events-none">
          <SpaceBackground />
        </div> */}

        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Navbar />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Routes */}
        <AnimatePresence>
          {!loading && (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;