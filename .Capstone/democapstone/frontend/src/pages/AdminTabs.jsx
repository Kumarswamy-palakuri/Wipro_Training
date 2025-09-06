import { useEffect, useState, useMemo, useRef } from "react";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Panel } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Select, TextInput } from "../components/ui/Input";
import useTabs from "../hooks/useTabs";
import { downloadCSV } from "../utils/download";

export default function AdminTabs() {
  const role = useSelector(s => s.auth.role);
  if (role !== "Admin") return <Navigate to="/products" replace />;
  const { TabList, Panel: TabPanel } = useTabs("approvals");

  // approvals
  const [pending, setPending] = useState([]);
  const [assignRole, setAssignRole] = useState({});
  const loadPending = async () => {
    const { data } = await api.get("/approvals/pending");
    setPending(data);
    setAssignRole(Object.fromEntries(data.map(p => [p.id, p.requestedRole || "Staff"])));
  };
  const approve = async (id) => { await api.post(`/approvals/${id}/approve`, { role: assignRole[id] }); await loadPending(); };
  const reject = async (id) => { await api.post(`/approvals/${id}/reject`); await loadPending(); };

  // users
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  const loadUsers = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data);
    setUserRoles(Object.fromEntries(data.map(u => [u.id, u.role])));
  };
  const saveUserRole = async (id) => { await api.put(`/admin/users/${id}/role`, { role: userRoles[id] }); };

  // logs
  const [logs, setLogs] = useState([]);
  const [days, setDays] = useState(30);
  const loadLogs = async () => {
    const { data } = await api.get(`/inventory/movements?days=${days}`); // detailed log
    setLogs(data);
  };

  // export inventory
  const [inventory, setInventory] = useState([]);
  const loadInventory = async () => {
    const { data } = await api.get("/products");
    setInventory(data);
  };
  const exportCSV = () => {
    if (!inventory.length) return;
    downloadCSV("inventory.csv", inventory);
  };

  useEffect(() => {
    // initial loads for default tab content
    loadPending(); loadUsers(); loadLogs(); loadInventory();
  }, []);

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h2>Admin</h2>

      <TabList tabs={[
        { key: "approvals", label: "Approvals" },
        { key: "users", label: "Users" },
        { key: "logs", label: "Transaction Log" },
        { key: "inventory", label: "Inventory Export" },
      ]} />

      <TabPanel when="approvals">
        <Panel title="Pending Registrations">
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr><th>ID</th><th>Username</th><th>Requested</th><th>Assign Role</th><th>Actions</th></tr></thead>
              <tbody>
                {pending.length === 0 ? <tr><td colSpan="5" style={{ textAlign: "center" }}>No pending requests</td></tr> :
                  pending.map(p => (
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
                  ))
                }
              </tbody>
            </table>
          </div>
        </Panel>
      </TabPanel>

      <TabPanel when="users">
        <Panel title="Users and Roles">
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr><th>ID</th><th>Username</th><th>Current Role</th><th>Change Role</th><th>Save</th></tr></thead>
              <tbody>
                {users.length === 0 ? <tr><td colSpan="5" style={{ textAlign: "center" }}>No users</td></tr> :
                  users.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td><td>{u.username}</td><td>{u.role}</td>
                      <td>
                        <Select value={userRoles[u.id] ?? u.role} onChange={(e) => setUserRoles(r => ({ ...r, [u.id]: e.target.value }))}>
                          <option>Staff</option><option>Manager</option><option>Admin</option>
                        </Select>
                      </td>
                      <td><Button variant="primary" onClick={() => saveUserRole(u.id)}>Save</Button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </Panel>
      </TabPanel>

      <TabPanel when="logs">
        <Panel title="Transaction Log" right={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="label">Last</span>
            <TextInput type="number" value={days} onChange={(e) => setDays(Math.max(1, +e.target.value))} style={{ width: 90 }} />
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
                      <td>{m.id}</td><td>{m.productId}</td><td>{m.type}</td><td>{m.quantityChange}</td>
                      <td>{new Date(m.createdAt).toISOString()}</td><td>{m.performedBy}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </Panel>
      </TabPanel>

      <TabPanel when="inventory">
        <Panel title="Inventory Export" right={<Button variant="primary" onClick={exportCSV}>Download CSV</Button>}>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr><th>ID</th><th>Name</th><th>Qty</th><th>Price</th></tr></thead>
              <tbody>
                {inventory.length === 0 ? <tr><td colSpan="4" style={{ textAlign: "center" }}>No products</td></tr> :
                  inventory.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.quantity}</td><td>{p.price}</td></tr>)}
              </tbody>
            </table>
          </div>
        </Panel>
      </TabPanel>
    </div>
  );
}
