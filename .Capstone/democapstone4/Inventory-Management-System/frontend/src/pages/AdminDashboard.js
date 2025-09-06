import { useGetPendingApprovalsQuery, useApproveMutation, useRejectMutation } from '../api/apiSlice';
import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../api/apiSlice';
import { useGetLogsQuery } from '../api/apiSlice';
import { useGetLowStockQuery } from '../api/apiSlice';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Toaster, toast } from 'sonner'; // For toasts, install sonner

export default function AdminDashboard() {
  const { data: approvals } = useGetPendingApprovalsQuery();
  const [approve] = useApproveMutation();
  const [reject] = useRejectMutation();
  const { data: products } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: logs } = useGetLogsQuery();
  const { data: lowStock } = useGetLowStockQuery();

  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0, price: 0, lowThreshold: 5 });

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct).unwrap();
      setNewProduct({ name: '', quantity: 0, price: 0, lowThreshold: 5 });
    } catch {}
  };

  const handleUpdate = async (id, data) => {
    await updateProduct({ id, ...data });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handleApprove = async (id, role) => {
    await approve({ id, role });
  };

  const handleReject = async (id) => {
    await reject(id);
  };

  const exportLogs = () => window.open('http://localhost:5000/api/reports/logs.csv');
  const exportInventory = () => window.open('http://localhost:5000/api/reports/inventory.csv');

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl">Admin Dashboard</h1>
      
      {lowStock?.length > 0 && <Badge variant="destructive">Low Stock Alerts: {lowStock.length}</Badge>}
      
      <section>
        <h2>Pending Approvals</h2>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Username</TableHead><TableHead>Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {approvals?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button onClick={() => handleApprove(user.id, 'Manager')}>Approve as Manager</Button>
                  <Button onClick={() => handleApprove(user.id, 'Staff')}>Approve as Staff</Button>
                  <Button variant="destructive" onClick={() => handleReject(user.id)}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      
      <section>
        <h2>Products (Full CRUD)</h2>
        <div>
          <Input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
          <Input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value)})} />
          <Input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} />
          <Input type="number" placeholder="Low Threshold" value={newProduct.lowThreshold} onChange={(e) => setNewProduct({...newProduct, lowThreshold: parseInt(e.target.value)})} />
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Name</TableHead><TableHead>Quantity</TableHead><TableHead>Price</TableHead><TableHead>Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdate(p.id, { quantity: p.quantity + 1 })}>Increment Qty</Button> {/* Example, add form for full update */}
                  <Button variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      
      <section>
        <h2>Inventory Logs</h2>
        <Table>{/* Render logs similar to above */}</Table>
      </section>
      
      <section>
        <h2>Exports</h2>
        <Button onClick={exportLogs}>Export Logs CSV</Button>
        <Button onClick={exportInventory}>Export Inventory CSV</Button>
      </section>
      
      <section>
        <h2>Low Stock</h2>
        <Table>{/* Render lowStock */}</Table>
      </section>
    </div>
  );
}