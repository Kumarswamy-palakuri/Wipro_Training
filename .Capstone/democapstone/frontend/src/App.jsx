import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import ApprovalsPage from "./pages/ApprovalsPage"; // if you still keep this page
import AdminTabs from "./pages/AdminTabs";
import StaffPage from "./pages/StaffPage";
import ManagerPage from "./pages/ManagerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />
        <Route path="/manager" element={<ProtectedRoute><ManagerPage /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute><AdminTabs /></ProtectedRoute>} />
        <Route path="/approvals" element={<ProtectedRoute><ApprovalsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
