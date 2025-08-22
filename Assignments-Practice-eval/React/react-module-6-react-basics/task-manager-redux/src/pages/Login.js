import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const submit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Enter username");
    dispatch(login(username));
    localStorage.setItem("username", username);
    navigate(from, { replace: true });
  };

  // ---- STYLES ----
  const styles = {
    card: {
      maxWidth: 480,
      margin: "50px auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    heading: {
      marginBottom: "15px",
      fontSize: "22px",
      color: "#333",
    },
    form: {
      display: "grid",
      gap: "12px",
      marginTop: "12px",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      padding: "10px",
      backgroundColor: "#61dafb",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#000",
    },
    note: {
      marginTop: "10px",
      fontSize: "13px",
      color: "#666",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={submit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
      <div style={styles.note}>Demo: any username works.</div>
    </div>
  );
}
