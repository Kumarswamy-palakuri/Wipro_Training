import React, { useEffect, useState } from 'react';
import { Paper, Typography, Stack, TextField, Button, IconButton, Divider, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = async () => {
    setError('');
    try {
      const { data } = await api.get('/contacts');
      setContacts(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch');
    }
  };

  useEffect(() => { load(); }, []);

  const clearForm = () => setForm({ name: '', email: '', phone: '', notes: '' });

  const submit = async e => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      if (editing) {
        const { data } = await api.put(`/contacts/${editing.id}`, form);
        setContacts(prev => prev.map(c => c.id === data.id ? data : c));
        setSuccess('Contact updated');
      } else {
        const { data } = await api.post('/contacts', form);
        setContacts(prev => [data, ...prev]);
        setSuccess('Contact added');
      }
      setEditing(null); clearForm();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    }
  };

  const remove = async id => {
    setError(''); setSuccess('');
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(prev => prev.filter(c => c.id !== id));
      setSuccess('Contact deleted');
    } catch (err) {
      setError(err?.response?.data?.message || 'Delete failed');
    }
  };

  const startEdit = c => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, notes: c.notes });
  };

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>{editing ? 'Edit Contact' : 'Add Contact'}</Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={submit}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <TextField label="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            <Button type="submit" variant="contained">{editing ? 'Update' : 'Add'}</Button>
            {editing && <Button variant="text" onClick={() => { setEditing(null); clearForm(); }}>Cancel</Button>}
          </Stack>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>My Contacts</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1}>
          {contacts.length === 0 && <Typography variant="body2">No contacts yet.</Typography>}
          {contacts.map(c => (
            <Stack key={c.id} direction="row" alignItems="center" spacing={2}>
              <Typography sx={{ minWidth: 160, fontWeight: 600 }}>{c.name}</Typography>
              <Typography sx={{ minWidth: 200 }}>{c.email}</Typography>
              <Typography sx={{ minWidth: 120 }}>{c.phone}</Typography>
              <Typography sx={{ flex: 1 }}>{c.notes}</Typography>
              <IconButton aria-label="edit" onClick={() => startEdit(c)}><EditIcon /></IconButton>
              <IconButton aria-label="delete" onClick={() => remove(c.id)}><DeleteIcon /></IconButton>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
