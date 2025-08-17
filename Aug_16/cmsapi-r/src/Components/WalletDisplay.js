// WalletDisplay.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const WalletDisplay = ({ custId }) => {
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://localhost:7012/api/Wallet/customer/${custId}`
        );
        
        // Normalize response to always be an array
        const walletData = Array.isArray(res.data) ? res.data : [res.data];
        setWallets(walletData);
        setError("");
      } catch (err) {
        setError("No wallets found for this customer");
        setWallets([]);
      } finally {
        setLoading(false);
      }
    };

    if (custId) {
      fetchWallets();
    }
  }, [custId]);

  // Function to determine wallet color based on type
  const getWalletColor = (type) => {
    const typeColors = {
      credit: "linear-gradient(135deg, #3a7bd5, #00d2ff)",
      debit: "linear-gradient(135deg, #00b09b, #96c93d)",
      loyalty: "linear-gradient(135deg, #f46b45, #eea849)",
      crypto: "linear-gradient(135deg, #8e2de2, #4a00e0)",
      default: "linear-gradient(135deg, #667eea, #764ba2)"
    };
    
    const typeKey = type ? type.toLowerCase() : "default";
    return typeColors[typeKey] || typeColors.default;
  };

  // Styling
  const containerStyle = {
    width: "100%",
    margin: "20px 0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const headerStyle = {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.4rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  const walletsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  };

  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    color: "white",
    position: "relative",
    width: "250px",
    minHeight: "160px",
    display: "flex",
    flexDirection: "column"
  };

  const cardHeaderStyle = {
    padding: "15px 20px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)"
  };

  const cardBodyStyle = {
    padding: "20px",
    // flexGrow: 1,
    display: "flex",
    // flexDirection: "row",
    justifyContent: "space-between"
  };

  const walletIdStyle = {
    fontSize: "1.1rem",
    fontWeight: "700",
    margin: "0 0 10px 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)"
  };

  const amountStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: "10px 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    textAlign: "right"
  };

  const typeStyle = {
    fontSize: "0.9rem",
    opacity: "0.9",
    textAlign: "right",
    marginTop: "5px"
  };

  const loadingStyle = {
    textAlign: "center",
    padding: "30px",
    color: "#7f8c8d",
    fontStyle: "italic"
  };

  const errorStyle = {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "8px",
    fontWeight: "500",
    maxWidth: "500px",
    margin: "0 auto"
  };

  const noWalletStyle = {
    textAlign: "center",
    padding: "30px",
    color: "#7f8c8d",
    fontStyle: "italic",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "0 auto"
  };

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Wallet Information</h3>
      
      {loading ? (
        <p style={loadingStyle}>Loading wallet information...</p>
      ) : error ? (
        <p style={errorStyle}>{error}</p>
      ) : wallets.length === 0 ? (
        <p style={noWalletStyle}>No wallets found</p>
      ) : (
        <div style={walletsContainerStyle}>
          {wallets.map(wallet => (
            <div 
              key={wallet.walletId} 
              style={{
                ...cardStyle,
                background: getWalletColor(wallet.walletType)
              }}
            >
              <div style={cardHeaderStyle}>
                <span>WALLET</span>
                <span>{wallet.walletType || 'General'}</span>
              </div>
              
              <div style={cardBodyStyle}>
                {/* <div>
                  <p style={walletIdStyle}>ID: {wallet.walletId}</p>
                </div> */}
                <div>
                  <p style={amountStyle}>
                    ${typeof wallet.walletAmount === 'number' 
                      ? wallet.walletAmount.toFixed(2) 
                      : '0.00'}
                  </p>
                  {/* <p style={typeStyle}>{wallet.walletType || 'General Wallet'}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletDisplay;