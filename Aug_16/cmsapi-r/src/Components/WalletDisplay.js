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

  return (
    <div className="wallets-section">
      <h3>Wallet Information</h3>
      {loading ? (
        <p>Loading wallet information...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : wallets.length === 0 ? (
        <p>No wallets found</p>
      ) : (
        wallets.map(wallet => (
          <div key={wallet.walletId} className="wallet-info">
            <p>Wallet ID: {wallet.walletId}</p>
            <p>Wallet Type: {wallet.walletType}</p>
            <p>Wallet Amount: {wallet.walletAmount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default WalletDisplay;