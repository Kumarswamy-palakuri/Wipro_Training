// import React, { useState } from "react";
// import axios from "axios";
// import Menu from "./Menu";
// import WalletDisplay from "./WalletDisplay";

// const SearchCusById = () => {
//   const [id, setId] = useState("");
//   const [customer, setCustomer] = useState(null);
//   const [wallets, setWallets] = useState([]);
//   const [message, setMessage] = useState("");
//   const [walletError, setWalletError] = useState("");

//   const handleSearch = async () => {
//     try {
//       // Reset states
//       setCustomer(null);
//       setWallets([]);
//       setMessage("");
//       setWalletError("");
      
//       // Search for customer by ID
//       const customerRes = await axios.get(
//         `https://localhost:7012/api/Customers/search/id/${id}`
//       );
      
//       setCustomer(customerRes.data);
      
//       // Fetch wallets for the customer

//     } catch (err) {
//       setMessage("Customer not found");
//       setCustomer(null);
//       setWallets([]);
//     }
//   };

//   return (
//     <div>
//       <Menu />
//       <h2>Search Customer by ID</h2>
//       <input 
//         type="text" 
//         value={id} 
//         onChange={(e) => setId(e.target.value)} 
//         placeholder="Enter Customer ID" 
//       />
//       <button onClick={handleSearch}>Search</button>
      
//       {message && <p className="error">{message}</p>}
      
//       {customer && (
//         <div className="customer-info">
//           <h3>Customer Details</h3>
//           <p>ID: {customer.custId}</p>
//           <p>Name: {customer.custName}</p>
//           <p>Username: {customer.custUserName}</p>
//           <p>City: {customer.city}</p>
//           <p>State: {customer.state}</p>
//           <p>Email: {customer.email}</p>
//           <p>Mobile No: {customer.mobileNo}</p>

//           <WalletDisplay custId={customer.custId} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchCusById;

import React, { useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import WalletDisplay from "./WalletDisplay";

const SearchCusById = () => {
  const [id, setId] = useState("");
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      // Reset states
      setCustomer(null);
      setMessage("");
      
      // Search for customer by ID
      const customerRes = await axios.get(
        `https://localhost:7012/api/Customers/search/id/${id}`
      );
      
      setCustomer(customerRes.data);
      
    } catch (err) {
      setMessage("Customer not found");
      setCustomer(null);
    }
  };

  // CSS styles object
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "30px"
    },
    searchContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "30px",
      justifyContent: "center"
    },
    input: {
      padding: "10px 15px",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "300px",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)"
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      fontWeight: "600",
      ":hover": {
        backgroundColor: "#2980b9"
      }
    },
    error: {
      color: "#e74c3c",
      textAlign: "center",
      margin: "20px 0",
      fontSize: "18px"
    },
    customerCard: {
      backgroundColor: "#f9f9f9",
      border: "1px solid #eee",
      borderRadius: "8px",
      padding: "25px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      marginBottom: "30px"
    },
    cardHeader: {
      color: "#2c3e50",
      borderBottom: "2px solid #3498db",
      paddingBottom: "15px",
      marginBottom: "20px"
    },
    detailGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px"
    },
    detailItem: {
      marginBottom: "12px"
    },
    detailLabel: {
      fontWeight: "600",
      color: "#7f8c8d",
      fontSize: "14px",
      textTransform: "uppercase"
    },
    detailValue: {
      fontSize: "16px",
      color: "#2c3e50"
    }
  };

  return (
    <div style={styles.container}>
      <Menu />
      <h2 style={styles.header}>Search Customer by ID</h2>
      
      <div style={styles.searchContainer}>
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Enter Customer ID" 
          style={styles.input}
        />
        <button 
          onClick={handleSearch}
          style={styles.button}
          onMouseOver={e => e.target.style.backgroundColor = "#2980b9"}
          onMouseOut={e => e.target.style.backgroundColor = "#3498db"}
        >
          Search
        </button>
      </div>
      
      {message && <p style={styles.error}>{message}</p>}
      
      {customer && (
        <div style={styles.customerCard}>
          <h3 style={styles.cardHeader}>Customer Details</h3>
          <div style={styles.detailGrid}>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>ID</div>
              <div style={styles.detailValue}>{customer.custId}</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Name</div>
              <div style={styles.detailValue}>{customer.custName}</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Username</div>
              <div style={styles.detailValue}>{customer.custUserName}</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Email</div>
              <div style={styles.detailValue}>{customer.email}</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Mobile</div>
              <div style={styles.detailValue}>{customer.mobileNo}</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>City</div>
              <div style={styles.detailValue}>{customer.city}</div>
            </div>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>State</div>
              <div style={styles.detailValue}>{customer.state}</div>
            </div>
          </div>

          <WalletDisplay custId={customer.custId} />
        </div>
      )}
    </div>
  );
};

export default SearchCusById;