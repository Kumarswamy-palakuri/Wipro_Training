import TaskItem from "./TaskItem";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTaskAsync } from "../redux/taskSlice";

export default function TaskList() {
  const tasks = useSelector((s) => s.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    const t = title.trim();
    if (!t) return;
    await dispatch(addTaskAsync(t));
    setTitle("");
  };

  // ---- STYLES ----
  const styles = {
    card: {
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    heading: {
      marginBottom: "16px",
      fontSize: "20px",
      color: "#333",
      borderBottom: "1px solid #eee",
      paddingBottom: "8px",
    },
    row: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
    },
    button: {
      padding: "10px 16px",
      backgroundColor: "#61dafb",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#000",
    },
    list: {
      display: "grid",
      gap: "10px",
      marginTop: "16px",
    },
    empty: {
      fontSize: "14px",
      color: "#666",
      textAlign: "center",
      padding: "10px 0",
    },
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Tasks</h3>
      <div style={styles.row}>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
        />
        <button style={styles.button} onClick={handleAdd}>
          Add
        </button>
      </div>
      <div style={styles.list}>
        {tasks.length === 0 ? (
          <div style={styles.empty}>No tasks yet — add one!</div>
        ) : (
          tasks.map((t) => <TaskItem key={t.id} task={t} />)
        )}
      </div>
    </div>
  );
}
