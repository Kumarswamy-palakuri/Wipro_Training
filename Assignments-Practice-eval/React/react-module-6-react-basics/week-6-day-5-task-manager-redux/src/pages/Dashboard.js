import React from "react";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  // ---- STYLES ----
  const styles = {
    container: {
      maxWidth: 800,
      margin: "50px auto",
      padding: "25px",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "26px",
      color: "#222",
      textAlign: "center",
      borderBottom: "2px solid #eee",
      paddingBottom: "10px",
    },
    content: {
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>
      <div style={styles.content}>
        <TaskList />
      </div>
    </div>
  );
}
