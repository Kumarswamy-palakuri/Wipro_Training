import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // ---- STYLES ----
  const styles = {
    card: {
      maxWidth: 500,
      margin: "60px auto",
      padding: "25px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    heading: {
      marginBottom: "15px",
      fontSize: "24px",
      color: "#333",
    },
    text: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "20px",
    },
    button: {
      marginTop: "8px",
      display: "inline-block",
      padding: "10px 18px",
      backgroundColor: "#61dafb",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#000",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Welcome to TaskManager</h2>
      <p style={styles.text}>
        Login to manage your tasks with protected routes, lazy loading and Redux.
      </p>
      <Link to="/login" style={styles.button}>
        Get Started
      </Link>
    </div>
  );
}
