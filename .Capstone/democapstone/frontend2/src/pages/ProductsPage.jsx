import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../store/slices/productsSlice";
import { api } from "../services/api";
import { Field, TextInput, Select } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Panel } from "../components/ui/Card";
import { useLocation } from "react-router-dom";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);
  const role = useSelector((s) => s.auth.role);
  const canEdit = role === "Admin" || role === "Manager";
  const { search } = useLocation();

  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, price: 0 });
  const [movement, setMovement] = useState({ productId: 1, quantityChange: 1, type: "In" });
  const [low, setLow] = useState([]);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("view") === "low") loadLowStock();
  }, [search]);

  const loadLowStock = async () => {
    const { data } = await api.get("/products/low-stock?threshold=5");
    setLow(data);
  };

  const recordMovement = async () => {
    await api.post("/inventory/movements", movement);
    dispatch(fetchProducts());
    setMovement(m => ({ ...m, quantityChange: 1 }));
  };

  return (
    <div className="container" style={{ paddingTop: 24, display: "grid", gap: 16 }}>
      {canEdit && (
        <Panel title="Manage Products" right={<Button onClick={loadLowStock}>View Low Stock</Button>}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <Field label="Name"><TextInput placeholder="e.g., Keyboard" onChange={(e) => setNewProduct(p => ({ ...p, name: e.target.value }))} /></Field>
            <Field label="Quantity"><TextInput type="number" placeholder="0" onChange={(e) => setNewProduct(p => ({ ...p, quantity: +e.target.value }))} /></Field>
            <Field label="Price"><TextInput type="number" placeholder="0" onChange={(e) => setNewProduct(p => ({ ...p, price: +e.target.value }))} /></Field>
            <div style={{ alignSelf: "end" }}><Button variant="primary" onClick={() => dispatch(createProduct(newProduct))}>Add Product</Button></div>
          </div>
          {low.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h3 style={{ marginBottom: 8 }}>Low Stock</h3>
              <table className="table"><thead><tr><th>ID</th><th>Name</th><th>Qty</th><th>Price</th></tr></thead>
                <tbody>{low.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.quantity}</td><td>{p.price}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </Panel>
      )}

      <Panel title="Record Inventory Movement">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Field label="Product ID"><TextInput type="number" value={movement.productId} onChange={(e) => setMovement(m => ({ ...m, productId: +e.target.value }))} /></Field>
          <Field label="Movement Type">
            <Select value={movement.type} onChange={(e) => setMovement(m => ({ ...m, type: e.target.value }))}>
              <option>In</option><option>Out</option><option>Adjustment</option>
            </Select>
          </Field>
          <Field label="Quantity Change"><TextInput type="number" value={movement.quantityChange} onChange={(e) => setMovement(m => ({ ...m, quantityChange: +e.target.value }))} /></Field>
          <div style={{ alignSelf: "end" }}><Button variant="primary" onClick={recordMovement}>Record Movement</Button></div>
        </div>
      </Panel>

      <Panel title="Products">
        {status === "loading" && <div>Loading...</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Qty</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.name}</td><td>{p.quantity}</td><td>{p.price}</td>
                  <td>
                    {canEdit && (
                      <>
                        <Button onClick={() => dispatch(updateProduct({ id: p.id, changes: { quantity: p.quantity + 1 } }))}>+1</Button>{" "}
                        <Button onClick={() => dispatch(updateProduct({ id: p.id, changes: { quantity: Math.max(0, p.quantity - 1) } }))}>-1</Button>{" "}
                        <Button variant="danger" onClick={() => dispatch(deleteProduct(p.id))}>Delete</Button>
                      </>
                    )}
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
