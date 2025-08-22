import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, status, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ username: "", password: "" });

  const from = location.state?.from?.pathname || "/dashboard";

  if (token) return <Navigate to={from} replace />;

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (!res.error) navigate(from, { replace: true });
  };

  return (
    <section style={{ padding: 16 }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 360 }}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={{ padding: 10, borderRadius: 10, border: "1px solid #d1d5db" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ padding: 10, borderRadius: 10, border: "1px solid #d1d5db" }}
        />
        <button className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Authenticating..." : "Login"}
        </button>
        {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
      </form>

      <style>{`
        .btn { padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background:#111; color:#fff; }
        .btn:disabled { opacity: .6; cursor: not-allowed; }
      `}</style>
    </section>
  );
}
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/actions';
// import { useNavigate, useLocation } from 'react-router-dom';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { isAuthenticated, loading, error } = useSelector((s) => s.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/dashboard';

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(from, { replace: true });
//     }
//   }, [isAuthenticated, navigate, from]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(username, password));
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           autoComplete="username"
//         />
//         <input
//           value={password}
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           autoComplete="current-password"
//         />
//         <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
//         {error && <p style={{ color: 'crimson' }}>{error}</p>}
//       </form>
//       <p style={{ marginTop: 12, color: '#666' }}>Hint: any username/password works for this demo.</p>
//     </div>
//   );
// }
