import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Panel } from "../components/ui/Card";
import { Field, TextInput } from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ManagerPage() {
  const role = useSelector(s => s.auth.role);
  if (!(role === "Admin" || role === "Manager")) return <Navigate to="/products" replace />;

  const [staff, setStaff] = useState([]);       // from /admin/users filtered to Staff for simplicity
  const [logs, setLogs] = useState([]);
  const [days, setDays] = useState(7);
  const [low, setLow] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, price: 0 });

  const loadStaff = async () => {
    const { data } = await api.get("/admin/users");
    // If your backend has "active" flag, show it; otherwise assume active=true
    const staffOnly = data.filter(u => u.role === "Staff").map(u => ({ ...u, active: true }));
    setStaff(staffOnly);
  };
  const loadLogs = async () => {
    const { data } = await api.get(`/admin/analytics/movements?days=${days}`); // aggregate; for row log use /inventory/movements
    setLogs(data);
  };
  const loadLow = async () => {
    const { data } = await api.get("/products/low-stock?threshold=5");
    setLow(data);
  };
  const addProduct = async () => {
    await api.post("/products", newProduct); // allowed for Manager/Admin
    setNewProduct({ name: "", quantity: 0, price: 0 });
  };

  useEffect(() => { loadStaff(); loadLogs(); loadLow(); }, []);

  return (
    <div className="container" style={{ paddingTop: 24, display: "grid", gap: 16 }}>
      <h2>Manager Workspace</h2>

      <Panel title="Staff (Active)">
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Username</th><th>Role</th><th>Active</th></tr></thead>
            <tbody>
              {staff.length === 0 ? <tr><td colSpan="4" style={{ textAlign: "center" }}>No staff</td></tr> :
                staff.map(s => <tr key={s.id}><td>{s.id}</td><td>{s.username}</td><td>{s.role}</td><td>{s.active ? "Yes" : "No"}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Transaction Summary" right={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="label">Last</span>
          <TextInput type="number" value={days} onChange={(e) => setDays(Math.max(1, +e.target.value))} style={{ width: 80 }} />
          <span className="label">days</span>
          <Button onClick={loadLogs}>Refresh</Button>
        </div>
      }>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>Day</th><th>Type</th><th>Quantity</th></tr></thead>
            <tbody>
              {logs.length === 0 ? <tr><td colSpan="3" style={{ textAlign: "center" }}>No data</td></tr> :
                logs.map(r => <tr key={`${r.day}-${r.type}`}><td>{new Date(r.day).toISOString().slice(0,10)}</td><td>{r.type}</td><td>{r.quantity}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Low Stock">
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Qty</th><th>Price</th></tr></thead>
            <tbody>
              {low.length === 0 ? <tr><td colSpan="4" style={{ textAlign: "center" }}>None</td></tr> :
                low.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.quantity}</td><td>{p.price}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Add Product (No Delete)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Field label="Name"><TextInput value={newProduct.name} onChange={(e) => setNewProduct(p => ({ ...p, name: e.target.value }))} /></Field>
          <Field label="Quantity"><TextInput type="number" value={newProduct.quantity} onChange={(e) => setNewProduct(p => ({ ...p, quantity: +e.target.value }))} /></Field>
          <Field label="Price"><TextInput type="number" value={newProduct.price} onChange={(e) => setNewProduct(p => ({ ...p, price: +e.target.value }))} /></Field>
          <div style={{ alignSelf: "end" }}>
            <Button variant="primary" onClick={addProduct}>Add</Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
