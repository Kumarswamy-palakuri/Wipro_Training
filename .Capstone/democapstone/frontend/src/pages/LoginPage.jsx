import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { Navigate, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
// import { Field, TextInput, Select } from "../components/ui/Input";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((s) => s.auth);
  if (token) return <Navigate to="/products" replace />;

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 60 }}>
      <Card>
        <h2>Login</h2>
        <div style={{ height: 16 }} />
        <Field label="Username">
          <TextInput placeholder="Enter username" value={form.username}
                     onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </Field>
        <Field label="Password">
          <TextInput type="password" placeholder="Enter password" value={form.password}
                     onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <div style={{ height: 8 }} />
        <Button variant="primary" onClick={() => dispatch(login(form))} disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Login"}
        </Button>
        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
        <div style={{ marginTop: 10 }}>
          <span style={{ color: "var(--color-text-muted)" }}>No account?</span>{" "}
          <Link to="/register">Register</Link>
        </div>
        <div style={{ color: "var(--color-text-muted)", marginTop: 8, fontSize: 12 }}>
          Demo users: admin/admin123 • manager/manager123 • staff/staff123
        </div>
      </Card>
    </div>
  );
}
