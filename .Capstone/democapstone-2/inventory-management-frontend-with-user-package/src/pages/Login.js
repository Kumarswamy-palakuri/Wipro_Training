import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Registration from '../components/Registration';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleRegistrationSuccess = (message) => {
    setRegistrationMessage(message);
    setShowRegistration(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Inventory Management System</h2>
        
        {registrationMessage && (
          <div className="success-message">{registrationMessage}</div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="register-link">
          <p>Don't have an account? <button type="button" onClick={() => setShowRegistration(true)}>Register here</button></p>
        </div>
        
        <div className="demo-credentials">
          <p>Demo credentials:</p>
          <p>Username: admin | Password: admin123 (Admin)</p>
          <p>Username: manager | Password: manager123 (Manager)</p>
          <p>Username: staff | Password: staff123 (Staff)</p>
        </div>
      </form>

      {showRegistration && (
        <Registration 
          onSuccess={handleRegistrationSuccess}
          onCancel={() => setShowRegistration(false)}
        />
      )}
    </div>
  );
};

export default Login;