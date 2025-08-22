import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Navbar(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(s => s.user.username);

  const doLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="nav container">
      <div>
        <Link to="/" className="brand">TaskManager</Link>
        <Link to="/" className="small">Home</Link>
        <Link to="/dashboard" className="small">Dashboard</Link>
        <Link to="/profile" className="small">Profile</Link>
      </div>
      <div>
        {username ? (
          <>
            <span className="small" style={{marginRight:8}}>Hi, {username}</span>
            <button className="button" onClick={doLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="button">Login</Link>
        )}
      </div>
    </nav>
  );
}