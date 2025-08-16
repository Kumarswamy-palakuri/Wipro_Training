// src/components/Searchcusbyun.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Searchcusbyun = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(username || "");

  useEffect(() => {
    if (username) {
      handleSearch(username);
      setSearchInput(username);
    }
  }, [username]);

  const handleSearch = async (uname) => {
    try {
      setLoading(true);
      setMessage("");
      setCustomer(null);
      
      const res = await axios.get(
        `https://localhost:7012/api/Customers/search/username/${uname}`
      );
      
      setCustomer(res.data);
    } catch (err) {
      setMessage("Customer not found. Please try another username.");
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/searchbyun/${searchInput.trim()}`);
    }
  };

  // WalletDisplay component with integrated design
  const WalletDisplay = ({ custId }) => {
    const [wallets, setWallets] = useState([]);
    const [walletLoading, setWalletLoading] = useState(false);
    const [walletError, setWalletError] = useState("");

    useEffect(() => {
      const fetchWallets = async () => {
        try {
          setWalletLoading(true);
          setWalletError("");
          
          const res = await axios.get(
            `https://localhost:7012/api/Wallet/customer/${custId}`
          );
          
          // Handle both array and single wallet responses
          const walletData = Array.isArray(res.data) ? res.data : [res.data];
          setWallets(walletData);
        } catch (err) {
          setWalletError("No wallets found for this customer");
        } finally {
          setWalletLoading(false);
        }
      };

      if (custId) {
        fetchWallets();
      }
    }, [custId]);

    return (
      <div className="wallet-section">
        <h3 className="wallet-header">
          <svg className="wallet-icon" viewBox="0 0 24 24">
            <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
          Wallet Information
        </h3>
        
        {walletLoading && (
          <div className="wallet-loading">
            <div className="loading-spinner"></div>
            Loading wallet information...
          </div>
        )}
        
        {walletError && <p className="wallet-error">{walletError}</p>}
        
        {wallets.length > 0 && (
          <div className="wallets-container">
            {wallets.map(wallet => (
              <div key={wallet.walletId} className="wallet-card">
                <div className="wallet-id">Wallet ID: {wallet.walletId}</div>
                <div className="wallet-type">Type: {wallet.walletType}</div>
                <div className="wallet-amount">Amount: ${wallet.walletAmount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="search-container">
      <Menu/>
      <style jsx>{`
        .search-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f1 100%);
          min-height: 100vh;
        }
        
        .header {
          text-align: center;
          padding: 20px 15px;
          background: linear-gradient(120deg, #4b6cb7, #182848);
          color: white;
          border-radius: 10px 10px 0 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          margin-bottom: 30px;
        }
        
        .header h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
        }
        
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }
        
        .search-form {
          background: white;
          padding: 8px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
        }
        
        .form-group {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .search-input {

          flex: 1;
          padding: 15px;
          border: 2px solid #e1e5f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #4b6cb7;
          box-shadow: 0 0 0 3px rgba(75, 108, 183, 0.2);
        }
        
        .search-button {
          background: #4b6cb7;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(75, 108, 183, 0.3);
        }
        
        .search-button:hover {
          background: #3a5999;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(75, 108, 183, 0.4);
        }
        
        .search-button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .loading-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px;
          background: #f0f7ff;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(75, 108, 183, 0.2);
          border-top-color: #4b6cb7;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .message {
          padding: 15px;
          background: #fff3f3;
          border-left: 4px solid #e53e3e;
          border-radius: 0 8px 8px 0;
          margin: 20px 0;
          font-weight: 500;
        }
        
        .customer-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin-bottom: 30px;
        }
        
        .customer-header {
          background: linear-gradient(120deg, #4b6cb7, #3a5999);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
        }
        
        .customer-header h2 {
          margin: 0;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .customer-icon {
          width: 32px;
          height: 32px;
        }
        
        .customer-details {
          padding: 25px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .detail-group {
          margin-bottom: 15px;
        }
        
        .detail-label {
          font-size: 0.9rem;
          color: #718096;
          font-weight: 600;
          margin-bottom: 5px;
          display: block;
        }
        
        .detail-value {
          font-size: 1.1rem;
          font-weight: 500;
          color: #2d3748;
          padding: 8px 0;
          border-bottom: 1px solid #edf2f7;
        }
        
        .highlight {
          color: #4b6cb7;
          font-weight: 600;
        }
        
        .wallet-section {
          background: #f8f9fc;
          padding: 25px;
          border-top: 1px solid #edf2f7;
        }
        
        .wallet-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          color: #2d3748;
          margin-top: 0;
          margin-bottom: 20px;
        }
        
        .wallet-icon {
          width: 28px;
          height: 28px;
          fill: #4b6cb7;
        }
        
        .wallet-loading {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: #f0f7ff;
          border-radius: 8px;
          color: #4b6cb7;
          font-weight: 500;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(75, 108, 183, 0.2);
          border-top-color: #4b6cb7;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .wallet-error {
          padding: 15px;
          background: #fff3f3;
          border-left: 4px solid #e53e3e;
          border-radius: 0 8px 8px 0;
          font-weight: 500;
          color: #e53e3e;
        }
        
        .wallets-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 15px;
        }
        
        .wallet-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .wallet-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e0;
        }
        
        .wallet-id {
          font-size: 0.9rem;
          color: #718096;
          margin-bottom: 8px;
        }
        
        .wallet-type {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }
        
        .wallet-amount {
          font-size: 1.4rem;
          font-weight: 700;
          color: #38a169;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          fill: #cbd5e0;
        }
        
        .empty-state h3 {
          color: #4a5568;
          font-size: 1.5rem;
          margin: 0 0 10px;
        }
        
        .empty-state p {
          color: #718096;
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .form-group {
            flex-direction: column;
          }
          
          .search-button {
            padding: 15px;
          }
          
          .header h1 {
            font-size: 2rem;
          }
          
          .customer-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header" style={{display:"none"}}>
        <h1>Customer Search</h1>
        <p>Find customer details by username</p>
      </div>
      
      <form className="search-form" style={{display:"none"}} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter username..."
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Customer"}
          </button>
        </div>
      </form>
      
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          Searching customer...
        </div>
      )}
      
      {message && <div className="message">{message}</div>}
      
      {customer ? (
        <div className="customer-card">
          <div className="customer-header">
            <h2>
              <svg className="customer-icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Customer Details
            </h2>
          </div>
          
          <div className="customer-details">
            <div>
              <div className="detail-group">
                <span className="detail-label">Customer ID</span>
                <div className="detail-value">{customer.custId}</div>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Full Name</span>
                <div className="detail-value">{customer.custName}</div>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Username</span>
                <div className="detail-value highlight">{customer.custUserName}</div>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Email</span>
                <div className="detail-value">{customer.email}</div>
              </div>
            </div>
            
            <div>
              <div className="detail-group">
                <span className="detail-label">Mobile Number</span>
                <div className="detail-value">{customer.mobileNo}</div>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Location</span>
                <div className="detail-value">{customer.city}, {customer.state}</div>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Account Status</span>
                <div className="detail-value">
                  <span style={{
                    background: "#38a169",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontSize: "0.9rem"
                  }}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <WalletDisplay custId={customer.custId} />
        </div>
      ) : (
        !loading && !message && (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <h3>Search for a Customer</h3>
            <p>
              Enter a username in the search field above to view customer details and wallet information.
              You can search by the customer's unique username identifier.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Searchcusbyun;