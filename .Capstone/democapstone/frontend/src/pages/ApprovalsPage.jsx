// src/pages/ApprovalsPage.jsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Panel } from "../components/ui/Card";
import Button from "../components/ui/Button";
// import { Select } from "../components/ui/Input"; // corrected import path

export default function ApprovalsPage() {
  const role = useSelector(s => s.auth.role);
  const allowed = role === "Admin" || role === "Manager";
  const [items, setItems] = useState([]);
  const [assignRole, setAssignRole] = useState({});
  const [error, setError] = useState(null);
  if (!allowed) return <Navigate to="/products" replace />;

  const load = async () => {
    setError(null);
    try {
      const { data } = await api.get("/approvals/pending");
      setItems(data);
      setAssignRole(Object.fromEntries(data.map(p => [p.id, p.requestedRole || "Staff"])));
    } catch {
      setError("Failed to load pending requests");
    }
  };

  const approve = async (id) => {
    try { await api.post(`/approvals/${id}/approve`, { role: assignRole[id] }); await load(); }
    catch { setError("Approve failed"); }
  };
  const reject = async (id) => {
    try { await api.post(`/approvals/${id}/reject`); await load(); }
    catch { setError("Reject failed"); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <Panel title="Pending Registrations">
        {error && <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>}
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Username</th><th>Requested</th><th>Assign Role</th><th>Actions</th></tr></thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>No pending requests</td></tr>
              ) : items.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.username}</td><td>{p.requestedRole}</td>
                  <td>
                    <Select value={assignRole[p.id]} onChange={(e) => setAssignRole(r => ({ ...r, [p.id]: e.target.value }))}>
                      <option>Staff</option><option>Manager</option><option>Admin</option>
                    </Select>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => approve(p.id)}>Approve</Button>{" "}
                    <Button variant="danger" onClick={() => reject(p.id)}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
