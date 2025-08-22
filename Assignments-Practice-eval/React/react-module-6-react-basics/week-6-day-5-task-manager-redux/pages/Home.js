import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="card">
      <h2>Welcome to TaskManager</h2>
      <p className="small">Login to manage your tasks with protected routes, lazy loading and Redux.</p>
      <Link to="/login" className="button" style={{marginTop:8,display:'inline-block'}}>Get Started</Link>
    </div>
  );
}