import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { reportService } from '../services/reportService';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('approvals');
  const [approvals, setApprovals] = useState([]);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'approvals') {
        const data = await userService.getPendingApprovals();
        setApprovals(data);
      } else if (activeTab === 'registrations') {
        const data = await userService.getPendingRegistrations();
        setPendingRegistrations(data);
      } else if (activeTab === 'users') {
        const data = await userService.getAll();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessApproval = async (approvalId, status, comments) => {
    try {
      await userService.processApproval(approvalId, status, comments);
      loadData(); // Reload the approvals list
    } catch (error) {
      console.error('Failed to process approval:', error);
      alert('Failed to process approval. Please try again.');
    }
  };

  const handleRegistrationApproval = async (userId, status, comments) => {
    try {
      // Find the approval for this user
      const allApprovals = await userService.getPendingApprovals();
      const userApproval = allApprovals.find(a => a.userId === userId);
      
      if (userApproval) {
        await userService.processApproval(userApproval.id, status, comments);
        loadData(); // Reload the data
      } else {
        console.error('No approval found for user:', userId);
        alert('No approval record found for this user.');
      }
    } catch (error) {
      console.error('Failed to process registration approval:', error);
      alert('Failed to process registration approval. Please try again.');
    }
  };

  const handleDownloadMovementsReport = async () => {
    try {
      await reportService.downloadMovementsReport();
    } catch (error) {
      console.error('Failed to download report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'approvals' ? 'active' : ''}
          onClick={() => setActiveTab('approvals')}
        >
          Pending Approvals ({approvals.length})
        </button>
        <button 
          className={activeTab === 'registrations' ? 'active' : ''}
          onClick={() => setActiveTab('registrations')}
        >
          Pending Registrations ({pendingRegistrations.length})
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'approvals' && (
          <div className="approvals-list">
            <h2>Pending Role Approvals</h2>
            {approvals.length > 0 ? (
              approvals.map(approval => (
                <div key={approval.id} className="approval-item">
                  <div className="approval-info">
                    <h3>{approval.user?.username || 'Unknown User'}</h3>
                    <p>Current Role: {approval.user?.role || 'N/A'}</p>
                    <p>Requested Role: {approval.requestedRole}</p>
                    <p>Requested: {new Date(approval.requestedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="approval-actions">
                    <button 
                      className="btn-success"
                      onClick={() => handleProcessApproval(approval.id, 'Approved', 'Role approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => {
                        const comments = prompt('Please provide reason for rejection:');
                        if (comments) {
                          handleProcessApproval(approval.id, 'Rejected', comments);
                        }
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending approvals</p>
            )}
          </div>
        )}
        
        {activeTab === 'registrations' && (
          <div className="registrations-list">
            <h2>Pending Registrations</h2>
            {pendingRegistrations.length > 0 ? (
              pendingRegistrations.map(user => (
                <div key={user.id} className="registration-item">
                  <div className="registration-info">
                    <h3>{user.username}</h3>
                    <p>Email: {user.email}</p>
                    <p>Status: Pending Approval</p>
                    <p>Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="registration-actions">
                    <button 
                      className="btn-success"
                      onClick={() => handleRegistrationApproval(user.id, 'Approved', 'Registration approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => {
                        const comments = prompt('Please provide reason for rejection:');
                        if (comments) {
                          handleRegistrationApproval(user.id, 'Rejected', comments);
                        }
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending registrations</p>
            )}
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="users-management">
            <h2>User Management</h2>
            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-secondary">Edit</button>
                        <button className="btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="reports-section">
            <h2>Reports</h2>
            <div className="report-actions">
              <button 
                className="btn-primary" 
                onClick={reportService.downloadInventoryReport}
              >
                Download Inventory Report
              </button>
              <button 
                className="btn-primary" 
                onClick={handleDownloadMovementsReport}
              >
                Download Movements Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;