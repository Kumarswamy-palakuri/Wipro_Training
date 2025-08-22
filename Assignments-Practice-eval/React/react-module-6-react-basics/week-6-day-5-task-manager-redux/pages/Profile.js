import React from "react";
import { useSelector } from "react-redux";

export default function Profile(){
  const username = useSelector(s => s.user.username);
  return (
    <div className="card">
      <h2>Profile</h2>
      <div style={{marginTop:8}}>
        <div><strong>Username:</strong> {username || "Guest"}</div>
        <div className="small" style={{marginTop:8}}>Data is persisted to localStorage after login.</div>
      </div>
    </div>
  );
}