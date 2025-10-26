import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import RemedyPage from './pages/RemedyPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetailPage from './pages/DoctorDetailPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/remedy" element={<RemedyPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span style={{fontSize: '1.5rem'}}>🌿</span>
          Herbal Healer
        </Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse">Browse</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
        </ul>
      </div>
    </nav>
  );
}

function BottomNav() {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-content">
        <Link 
          to="/" 
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </Link>

        <Link 
          to="/browse" 
          className={`nav-item ${isActive('/browse') ? 'active' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>Browse</span>
        </Link>

        <Link 
          to="/doctors" 
          className={`nav-item ${isActive('/doctors') || isActive('/doctor/') ? 'active' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Doctors</span>
        </Link>
      </div>
    </div>
  );
}

export default App;