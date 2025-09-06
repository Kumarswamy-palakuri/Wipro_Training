// frontend/src/components/Layout.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1 className="logo">Inventory Manager</h1>
        </div>
        <div className="header-right">
          <span className="user-info">Welcome, {user?.username}</span>
          <span className="user-role">({user?.role})</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/dashboard">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/products">
                <i className="fas fa-boxes"></i>
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="/movements">
                <i className="fas fa-exchange-alt"></i>
                <span>Inventory Movements</span>
              </a>
            </li>
            {(user?.role === 'Admin' || user?.role === 'Manager') && (
              <li>
                <a href="/reports">
                  <i className="fas fa-chart-bar"></i>
                  <span>Reports</span>
                </a>
              </li>
            )}
            {user?.role === 'Admin' && (
              <>
                <li>
                  <a href="/users">
                    <i className="fas fa-users"></i>
                    <span>User Management</span>
                  </a>
                </li>
                <li>
                  <a href="/admin">
                    <i className="fas fa-cog"></i>
                    <span>Admin Panel</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <main className="main-content">
        {children}
      </main>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Layout;