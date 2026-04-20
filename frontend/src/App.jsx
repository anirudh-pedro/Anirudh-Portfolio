import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Nav/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App relative min-h-screen overflow-x-hidden z-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;