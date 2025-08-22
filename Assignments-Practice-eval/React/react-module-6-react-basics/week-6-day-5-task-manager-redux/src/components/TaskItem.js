import React from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/taskSlice";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const remove = () => dispatch(removeTask(task.id));

  // ---- STYLES ----
  const styles = {
    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      marginBottom: "12px",
      border: "1px solid #eee",
      borderRadius: "8px",
      backgroundColor: "#fafafa",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    title: {
      fontWeight: "600",
      fontSize: "16px",
      color: "#222",
      marginBottom: "4px",
    },
    date: {
      fontSize: "13px",
      color: "#666",
    },
    button: {
      padding: "6px 12px",
      background: "#ef4444",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.item}>
      <div>
        <div style={styles.title}>{task.title}</div>
        <div style={styles.date}>
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
      <button onClick={remove} style={styles.button}>
        Delete
      </button>
    </div>
  );
}
