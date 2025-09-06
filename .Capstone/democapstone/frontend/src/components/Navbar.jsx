import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import Button from "./ui/Button";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role } = useSelector((s) => s.auth);

  const onLogout = () => { dispatch(logout()); navigate("/login", { replace: true }); };
  const linkClass = ({ isActive }) => ["navlink", isActive ? "navlink-active" : ""].join(" ");
  const isApprover = token && (role === "Admin" || role === "Manager");

  return (
    <div className="navbar">
      <div className="container navbar-inner">
        <div className="brand">democapstone</div>

        {!token && (
          <>
            <NavLink to="/login" className={linkClass}>Login</NavLink>
            <NavLink to="/register" className={linkClass}>Register</NavLink>
          </>
        )}

        {token && (
          <>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/products?view=low" className={linkClass}>Low Stock</NavLink>
            {(role === "Admin" || role === "Manager") && (
              <NavLink to="/products?view=manage" className={linkClass}>Manage</NavLink>
            )}
            {role === "Admin" && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
            {role === "Admin-dashboard" && <NavLink to="/admin" className={linkClass}>Admin-dashboard</NavLink>}
            {isApprover && <NavLink to="/approvals" className={linkClass}>Approvals</NavLink>}
            <NavLink to="/products" className={linkClass}>Products</NavLink>
<NavLink to="/staff" className={linkClass}>Staff</NavLink>
{(role === "Admin" || role === "Manager") && (
  <NavLink to="/manager" className={linkClass}>Manager</NavLink>
)}
{role === "Admin" && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
          </>
        )}

        <div className="right">
          {token ? (
            <>
              <span>Role: {role || "Unknown"}</span>
              <Button variant="ghost" onClick={onLogout}>Logout</Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
