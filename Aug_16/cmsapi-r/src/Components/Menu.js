import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  // Style objects
  const navStyle = {
    backgroundColor: "#f5f5f5",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    margin: "20px",
    fontSize: "18px"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    padding: "8px 15px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    margin: "0 5px"
  };

  const separatorStyle = {
    color: "#999",
    fontWeight: "300"
  };

  return (
    <nav style={navStyle}>
      {/* <Link to="/add" style={linkStyle}>Add Customer</Link> */}
      <span style={separatorStyle}>|</span>
      <Link to="/searchbyid" style={linkStyle}>Search By ID</Link>
      <span style={separatorStyle}>|</span>
      {/* <Link style={linkStyle} to="/searchbyun">Search By Username</Link> | */}
      <Link to="/show" style={linkStyle}>Show Customers</Link>
      <span style={separatorStyle}>|</span>
      <Link to="/" style={{ ...linkStyle, backgroundColor: "#e0e0e0" }}>Log-out</Link>
    </nav>
  );
}

export default Menu;