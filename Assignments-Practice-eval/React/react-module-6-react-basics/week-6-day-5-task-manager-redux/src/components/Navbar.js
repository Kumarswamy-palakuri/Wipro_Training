import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((s) => s.user.username);

  const doLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ---- STYLES HERE ----
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      backgroundColor: "#282c34",
      color: "#fff",
    },
    brand: {
      fontSize: "20px",
      fontWeight: "bold",
      marginRight: "15px",
      textDecoration: "none",
      color: "#61dafb",
    },
    link: {
      marginRight: "12px",
      textDecoration: "none",
      fontSize: "14px",
      color: "#ddd",
    },
    linkHover: {
      color: "#fff",
    },
    button: {
      padding: "6px 12px",
      backgroundColor: "#61dafb",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#000",
    },
    greeting: {
      marginRight: "10px",
      fontSize: "14px",
    },
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.brand}>
          TaskManager
        </Link>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/profile" style={styles.link}>
          Profile
        </Link>
      </div>
      <div>
        {username ? (
          <>
            <span style={styles.greeting}>Hi, {username}</span>
            <button style={styles.button} onClick={doLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.button}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
