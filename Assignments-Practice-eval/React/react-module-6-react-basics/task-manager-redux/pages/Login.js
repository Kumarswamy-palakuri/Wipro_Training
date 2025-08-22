import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";

export default function Login(){
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const submit = (e) => {
    e.preventDefault();
    if(!username.trim()) return alert("Enter username");
    dispatch(login(username));
    localStorage.setItem("username", username);
    navigate(from, { replace: true });
  };

  return (
    <div className="card" style={{maxWidth:480,margin:"0 auto"}}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{display:'grid',gap:10,marginTop:12}}>
        <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <button className="button" type="submit">Login</button>
      </form>
      <div className="small" style={{marginTop:8}}>Demo: any username works.</div>
    </div>
  );
}