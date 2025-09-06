import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Panel } from "../components/ui/Card";
import { Field, TextInput, Select } from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function StaffPage() {
  const role = useSelector(s => s.auth.role);
  if (!role) return <Navigate to="/login" replace />;
  // Staff, Manager, Admin can access; this page focuses on Staff flows

  const [movement, setMovement] = useState({ productId: 1, quantityChange: 1, type: "In" });
  const [logs, setLogs] = useState([]);
  const [days, setDays] = useState(7);

  const loadLogs = async () => {
    const { data } = await api.get(`/inventory/movements?days=${days}`);
    setLogs(data);
  };

  useEffect(() => { loadLogs(); }, []); // initial

  const recordMovement = async () => {
    await api.post("/inventory/movements", movement);
    setMovement(m => ({ ...m, quantityChange: 1 }));
    await loadLogs();
  };

  return (
    <div className="container" style={{ paddingTop: 24, display: "grid", gap: 16 }}>
      <Panel title="Record Inventory Movement">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Field label="Product ID">
            <TextInput type="number" value={movement.productId} onChange={(e) => setMovement(m => ({ ...m, productId: +e.target.value }))} />
          </Field>
          <Field label="Movement Type">
            <Select value={movement.type} onChange={(e) => setMovement(m => ({ ...m, type: e.target.value }))}>
              <option>In</option><option>Out</option><option>Adjustment</option>
            </Select>
          </Field>
          <Field label="Quantity Change">
            <TextInput type="number" value={movement.quantityChange} onChange={(e) => setMovement(m => ({ ...m, quantityChange: +e.target.value }))} />
          </Field>
          <div style={{ alignSelf: "end" }}>
            <Button variant="primary" onClick={recordMovement}>Record Movement</Button>
          </div>
        </div>
        <div className="label" style={{ marginTop: 8 }}>“Out” will always decrement on server; negative inventory is blocked.</div>
      </Panel>

      <Panel title="Transaction Log" right={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="label">Last</span>
          <TextInput type="number" value={days} onChange={(e) => setDays(Math.max(1, +e.target.value))} style={{ width: 80 }} />
          <span className="label">days</span>
          <Button onClick={loadLogs}>Refresh</Button>
        </div>
      }>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Product</th><th>Type</th><th>Qty Change</th><th>At (UTC)</th><th>By</th></tr></thead>
            <tbody>
              {logs.length === 0 ? <tr><td colSpan="6" style={{ textAlign: "center" }}>No movements</td></tr> :
                logs.map(m => (
                  <tr key={m.id}>
                    <td>{m.id}</td><td>{m.productId}</td><td>{m.type}</td><td>{m.quantityChange}</td><td>{new Date(m.createdAt).toISOString()}</td><td>{m.performedBy}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
