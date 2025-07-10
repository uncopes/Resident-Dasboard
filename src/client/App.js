import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Maintenance from './pages/Maintenance';
import Amenities from './pages/Amenities';
import Payments from './pages/Payments';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="main-content">
        <header className="header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="header-content">
            <h1 className="header-title">Grady Knightsbridge II</h1>
            <div className="header-actions">
              <button className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </button>
              <div className="user-menu">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                  alt="User" 
                  className="user-avatar"
                />
              </div>
            </div>
          </div>
        </header>
        
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App; 