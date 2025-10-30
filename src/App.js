import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import RemedyPage from './pages/RemedyPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import Chatbot from './components/Chatbot';
import HerbalPlants from './pages/HerbalPlants';


// 🔹 Import login system pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// 🔹 Import ProtectedRoute for login-required access
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isLoggedIn = !!localStorage.getItem('userEmail'); // check login status

  return (
    <Router>
      <div className="app-container">
        <ConditionalNavbar />
        <Routes>
          {/* ✅ Authentication pages (redirect to Home if already logged in) */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" replace /> : <SignupPage />}
          />

          {/* ✅ Only HomePage requires login */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* 🌿 Public pages (no login needed) */}
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/remedy" element={<RemedyPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage />} />
          <Route path="/herbal-plants" element={<HerbalPlants />} />


          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ConditionalBottomNav />
        <ConditionalChatbot />
      </div>
    </Router>
  );
}

/* 🔹 Hide Navbar on login/signup pages */
function ConditionalNavbar() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') return null;
  return <Navbar />;
}

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    window.location.href = '/login'; // ✅ redirect safely
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span style={{ fontSize: '1.5rem' }}>🌿</span> Herbal Healer
        </Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse">Browse</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
        </ul>
        <ul className="navbar-links">
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* 🔹 Hide Bottom Nav on login/signup pages */
function ConditionalBottomNav() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') return null;
  return <BottomNav />;
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
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </Link>

        <Link to="/browse" className={`nav-item ${isActive('/browse') ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>Browse</span>
        </Link>
       <Link to="/herbal-plants" className={`nav-item ${isActive('/herbal-plants') ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        <span>Herbal Plants</span>
        </Link>


        <Link to="/doctors" className={`nav-item ${isActive('/doctors') || isActive('/doctor/') ? 'active' : ''}`}>
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

/* 🔹 Hide Chatbot on login/signup pages */
function ConditionalChatbot() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') return null;
  return <Chatbot />;
}

export default App;
