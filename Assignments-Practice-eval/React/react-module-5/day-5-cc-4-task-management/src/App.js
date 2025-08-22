import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

function ProtectedRoute({ children }) {
  const isAuthed = useSelector((s) => Boolean(s.auth.token));
  const location = useLocation();
  return isAuthed ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default function App() {
  // Simple fade transition wrapper
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
        <div key={location.pathname} className="fade">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Suspense>

      <style>{`
        .fade { animation: fade .18s ease-in; }
        @keyframes fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji","Segoe UI Emoji"; }
      `}</style>
    </div>
  );
}
// import React, { Suspense, lazy } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import { useSelector } from 'react-redux';

// // Lazy-loaded pages
// const Home = lazy(() => import('./pages/Home'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Login = lazy(() => import('./pages/Login'));
// const Profile = lazy(() => import('./pages/Profile'));

// function ProtectedRoute({ children }) {
//   const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// }
