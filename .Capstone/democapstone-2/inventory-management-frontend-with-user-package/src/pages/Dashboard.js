// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { productService } from '../services/productService';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    lowStockCount: 0,
    totalInventoryValue: 0
  });
  const [recentMovements, setRecentMovements] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [staffMovements, setStaffMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load basic stats
      const statsData = await dashboardService.getStats();
      setStats(statsData);
      setRecentMovements(statsData.recentMovements || []);
      
      // Load low stock products
      const lowStock = await productService.getLowStock();
      setLowStockProducts(lowStock);
      
      // Load manager-specific data
      if (user.role === 'Manager' || user.role === 'Admin') {
        const managerData = await dashboardService.getManagerStats();
        setInactiveUsers(managerData.inactiveUsers || []);
        setStaffMovements(managerData.staffMovements || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user.username}. Here's what's happening with your inventory today.</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <i className="fas fa-boxes"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.lowStockCount}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>${stats.totalInventoryValue?.toLocaleString()}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>

        {user.role === 'Admin' && (
          <div className="stat-card">
            <div className="stat-icon info">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="dashboard-section">
          <h2>Recent Inventory Movements</h2>
          <div className="card">
            {recentMovements.length > 0 ? (
              <div className="movements-list">
                {recentMovements.map(movement => (
                  <div key={movement.id} className="movement-item">
                    <div className="movement-type">
                      <span className={`badge ${movement.movementType.toLowerCase()}`}>
                        {movement.movementType}
                      </span>
                    </div>
                    <div className="movement-details">
                      <h4>{movement.product?.name}</h4>
                      <p>Quantity: {movement.quantityChanged}</p>
                      <p>Reason: {movement.reason}</p>
                    </div>
                    <div className="movement-meta">
                      <span className="user">{movement.user?.username || 'System'}</span>
                      <span className="date">
                        {new Date(movement.movementDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent movements</p>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        {(user.role === 'Manager' || user.role === 'Admin') && (
        <div className="dashboard-section">
          <h2>Low Stock Alerts</h2>
          <div className="card">
            {lowStockProducts.length > 0 ? (
              <div className="alerts-list">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="alert-item">
                    <div className="alert-icon">
                      <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="alert-content">
                      <h4>{product.name}</h4>
                      <p>Current stock: {product.quantity} (Threshold: {product.lowStockThreshold})</p>
                    </div>
                    <div className="alert-actions">
                      <button className="btn-primary btn-sm">Reorder</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No low stock items</p>
            )}
          </div>
         
        </div>
         )}


        {/* Manager/Admin Specific Sections */}
        {(user.role === 'Manager' || user.role === 'Admin') && (
          <>
            {/* Inactive Users */}
            <div className="dashboard-section">
              <h2>Inactive Users</h2>
              <div className="card">
                {inactiveUsers.length > 0 ? (
                  <div className="users-list">
                    {inactiveUsers.map(user => (
                      <div key={user.id} className="user-item">
                        <div className="user-avatar">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="user-details">
                          <h4>{user.username}</h4>
                          <p>{user.email} • {user.role}</p>
                          <p>Last active: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No inactive users</p>
                )}
              </div>
            </div>

            {/* Staff Movements */}
            <div className="dashboard-section">
              <h2>Recent Staff Movements</h2>
              <div className="card">
                {staffMovements.length > 0 ? (
                  <div className="movements-list">
                    {staffMovements.map(movement => (
                      <div key={movement.id} className="movement-item">
                        <div className="movement-type">
                          <span className={`badge ${movement.movementType.toLowerCase()}`}>
                            {movement.movementType}
                          </span>
                        </div>
                        <div className="movement-details">
                          <h4>{movement.product?.name}</h4>
                          <p>Quantity: {movement.quantityChanged}</p>
                          <p>Reason: {movement.reason}</p>
                        </div>
                        <div className="movement-meta">
                          <span className="user">{movement.user?.username}</span>
                          <span className="date">
                            {new Date(movement.movementDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No staff movements</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;