import { useState } from "react";
import { api } from "../services/api";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
// import { Field, TextInput, Select } from "../components/ui/Input";

export default function RegisterPage() {
  const token = useSelector(s => s.auth.token);
  const [form, setForm] = useState({ username: "", password: "", requestedRole: "Staff" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  if (token) return <Navigate to="/products" replace />;

  const submit = async () => {
    setError(null);
    try {
      await api.post("/registration", form);
      setDone(true);
    } catch (e) {
      setError(e?.response?.data || "Failed to submit");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, paddingTop: 60 }}>
      <Card>
        <h2>Register</h2>
        <div style={{ height: 16 }} />
        {done ? (
          <>
            <p>Request submitted for approval. Come back after Admin/Manager approval.</p>
            <Link to="/login">Go to Login</Link>
          </>
        ) : (
          <>
            <Field label="Username">
              <TextInput value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </Field>
            <Field label="Password">
              <TextInput type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </Field>
            <Field label="Requested Role">
              <Select value={form.requestedRole} onChange={(e) => setForm({ ...form, requestedRole: e.target.value })}>
                <option>Staff</option>
                <option>Manager</option>
              </Select>
            </Field>
            <Button variant="primary" onClick={submit}>Submit</Button>
            {error && <div style={{ color: "crimson", marginTop: 8 }}>{String(error)}</div>}
          </>
        )}
      </Card>
    </div>
  );
}
