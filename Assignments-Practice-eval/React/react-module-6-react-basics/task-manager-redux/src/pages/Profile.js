import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const username = useSelector((s) => s.user.username);

  // ---- STYLES ----
  const styles = {
    card: {
      maxWidth: 480,
      margin: "50px auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    heading: {
      marginBottom: "15px",
      fontSize: "22px",
      color: "#333",
    },
    info: {
      marginTop: "10px",
      fontSize: "16px",
    },
    smallNote: {
      marginTop: "8px",
      fontSize: "13px",
      color: "#666",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Profile</h2>
      <div style={styles.info}>
        <div>
          <strong>Username:</strong> {username || "Guest"}
        </div>
        <div style={styles.smallNote}>
          Data is persisted to localStorage after login.
        </div>
      </div>
    </div>
  );
}
