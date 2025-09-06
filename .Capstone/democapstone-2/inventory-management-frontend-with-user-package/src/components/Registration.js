import React, { useState } from 'react';
import { authService } from '../services/authService';
import './Registration.css';

const Registration = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    requestedRole: 'Staff'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (formData.password !== formData.confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }
    
  //   if (formData.password.length < 6) {
  //     setError('Password must be at least 6 characters long');
  //     return;
  //   }
    
  //   setLoading(true);
  //   setError('');
    
  //   try {
  //     const response = await authService.register(
  //       formData.username,
  //       formData.email,
  //       formData.password,
  //       formData.requestedRole
  //     );
      
  //     if (onSuccess) {
  //       onSuccess(response.message);
  //     }
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Registration failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  
  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters long');
    return;
  }
  
  setLoading(true);
  setError('');
  
  try {
    const response = await authService.register(
      formData.username,
      formData.email,
      formData.password,
      formData.requestedRole
    );
    
    if (onSuccess) {
      onSuccess(response.message);
    }
  } catch (error) {
    setError(error.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Register New Account</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="requestedRole">Requested Role</label>
            <select
              id="requestedRole"
              name="requestedRole"
              value={formData.requestedRole}
              onChange={handleChange}
              required
            >
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;