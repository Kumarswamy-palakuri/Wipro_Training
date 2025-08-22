import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";

const linkClass =
  ({ isActive }) =>
    `px-3 py-2 rounded ${isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"}`;

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthed = useSelector((s) => Boolean(s.auth.token));
  const username = useSelector((s) => s.auth.user?.username);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <nav style={{ display: "flex", gap: 8, padding: 12, borderBottom: "1px solid #e5e7eb" }}>
      <NavLink to="/" className={linkClass}>Home</NavLink>
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/profile" className={linkClass}>Profile</NavLink>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        {isAuthed ? (
          <>
            <span style={{ fontSize: 14, color: "#374151" }}>Hi, {username}</span>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        )}
      </div>
      <style>{`
        .btn { padding: 6px 12px; border: 1px solid #111; border-radius: 8px; background: #111; color: #fff; }
        .btn:hover { opacity: .9; }
      `}</style>
    </nav>
  );
}
// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../redux/actions';

// export default function Navbar() {
//   const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
//   const user = useSelector((s) => s.auth.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const linkStyle = ({ isActive }) => ({
//     marginRight: 16,
//     textDecoration: 'none',
//     color: isActive ? '#0b5ed7' : '#333',
//     fontWeight: isActive ? 600 : 400,
//   });

//   return (
//     <nav style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12 }}>
//       <NavLink to="/" style={linkStyle}>Home</NavLink>
//       <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
//       <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
//       <div style={{ marginLeft: 'auto' }}>
//         {isAuthenticated ? (
//           <span>
//             <span style={{ marginRight: 12 }}>Signed in as {user?.username}</span>
//             <button onClick={handleLogout}>Logout</button>
//           </span>
//         ) : (
//           <NavLink to="/login" style={linkStyle}>Login</NavLink>
//         )}
//       </div>
//     </nav>
//   );
// }
