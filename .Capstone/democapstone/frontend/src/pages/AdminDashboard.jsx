// src/pages/AdminDashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Panel } from "../components/ui/Card";
import Button from "../components/ui/Button";
// import { TextInput, Select } from "../components/ui/Input";

export default function AdminDashboard() {
  const role = useSelector((s) => s.auth.role);
  if (role !== "Admin") return <Navigate to="/products" replace />;

  const [loading, setLoading] = useState(true);
  const [kpi, setKpi] = useState({ totalSkus: 0, totalUnits: 0, inventoryValue: 0 });
  const [lowStock, setLowStock] = useState([]);
  const [pending, setPending] = useState([]);
  const [assignRole, setAssignRole] = useState({});
  const [threshold, setThreshold] = useState(5);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState({}); // { [userId]: "Role" }

  const currency = useMemo(() => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }), []);

  const loadAll = async (t = threshold) => {
    setLoading(true); setError(null);
    try {
      const [kRes, lRes, pRes, uRes] = await Promise.all([
        api.get("/admin/analytics/stock-summary"),
        api.get(`/products/low-stock?threshold=${t}`),
        api.get("/approvals/pending"),
        api.get("/admin/users"),
      ]);
      setKpi(kRes.data);
      setLowStock(lRes.data);
      setPending(pRes.data);
      setAssignRole(Object.fromEntries(pRes.data.map(p => [p.id, p.requestedRole || "Staff"])));
      setUsers(uRes.data);
      setUserRoles(Object.fromEntries(uRes.data.map(u => [u.id, u.role])));
    } catch {
      setError("Failed to load dashboard data");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadAll(); }, []);

  const approve = async (id) => {
    try { await api.post(`/approvals/${id}/approve`, { role: assignRole[id] }); await loadAll(); }
    catch { setError("Approve failed"); }
  };
  const reject = async (id) => {
    try { await api.post(`/approvals/${id}/reject`); await loadAll(); }
    catch { setError("Reject failed"); }
  };

  const saveUserRole = async (userId) => {
    try {
      const newRole = userRoles[userId];
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      // Optionally reload users; here we just keep local state in sync
    } catch {
      setError("Failed to update user role");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 24, display: "grid", gap: 16 }}>
      <h2>Admin Dashboard</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      {loading && <div>Loading...</div>}

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <Kpi title="Total SKUs" value={kpi.totalSkus} />
        <Kpi title="Total Units" value={kpi.totalUnits} />
        <Kpi title="Inventory Value" value={currency.format(kpi.inventoryValue || 0)} />
      </div>

      {/* Low stock */}
      <Panel title="Low Stock" right={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="label">Threshold</span>
          <TextInput type="number" value={threshold} onChange={(e) => setThreshold(Math.max(0, Number(e.target.value)))} style={{ width: 90 }} />
          <Button onClick={() => loadAll(threshold)}>Refresh</Button>
        </div>
      }>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Qty</th><th>Price</th></tr></thead>
            <tbody>
              {lowStock.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: "center" }}>No low stock items</td></tr>
              ) : lowStock.map(p => (
                <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.quantity}</td><td>{currency.format(p.price)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Pending registrations */}
      <Panel title="Pending Registrations">
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Username</th><th>Requested</th><th>Assign Role</th><th>Actions</th></tr></thead>
            <tbody>
              {pending.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>No pending requests</td></tr>
              ) : pending.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.username}</td><td>{p.requestedRole}</td>
                  <td>
                    <select className="select" value={assignRole[p.id]} onChange={(e) => setAssignRole(r => ({ ...r, [p.id]: e.target.value }))}>
                      <option>Staff</option><option>Manager</option><option>Admin</option>
                    </select>
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

      {/* Users management */}
      <Panel title="Users">
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Username</th><th>Current Role</th><th>Change Role</th><th>Save</th></tr></thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>No users</td></tr>
              ) : users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <select
                      className="select"
                      value={userRoles[u.id] ?? u.role}
                      onChange={(e) => setUserRoles(r => ({ ...r, [u.id]: e.target.value }))}
                    >
                      <option>Staff</option>
                      <option>Manager</option>
                      <option>Admin</option>
                    </select>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => saveUserRole(u.id)}>Save</Button>
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

function Kpi({ title, value }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="label">{title}</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
}
