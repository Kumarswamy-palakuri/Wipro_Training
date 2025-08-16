import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerAuth = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      setMessage("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await axios.post(
        "https://localhost:7012/api/Customers/authenticate",
        {
          custUserName: loginData.username,
          custPassword: loginData.password
        }
      );
      navigate(`/searchbyun/${loginData.username}`);
    } catch (err) {
      setMessage("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Customer Login</h2>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={loginData.username}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
        </div>
        
        
        
        <button 
          onClick={handleLogin} 
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
        
        {message && <p style={styles.error}>{message}</p>}
        <div style={styles.forgotPassword}>
          <a href="/add" style={styles.link}>New User,Register here?</a>
        </div>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center"
  },
  header: {
    color: "#2d3748",
    marginBottom: "25px",
    fontSize: "24px"
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#4a5568",
    fontWeight: "500",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "16px",
    transition: "border-color 0.3s",
    boxSizing: "border-box"
  },
  inputFocus: {
    borderColor: "#4299e1",
    outline: "none"
  },
  forgotPassword: {
    textAlign: "center",
    marginBottom: "20px"
  },
  link: {
    color: "#3c6f98ff",
    textDecoration: "none",
    fontSize: "16px"
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  buttonHover: {
    backgroundColor: "#3182ce"
  },
  error: {
    color: "#e53e3e",
    marginTop: "15px",
    fontSize: "14px"
  }
};

export default CustomerAuth;