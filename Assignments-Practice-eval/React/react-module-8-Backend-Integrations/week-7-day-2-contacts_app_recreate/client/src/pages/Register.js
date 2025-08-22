import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Stack, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      await register(name, email, password);
      setMsg('Registered! You can log in now.');
      setTimeout(() => nav('/login'), 600);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 520, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required />
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained">Create account</Button>
          <Typography variant="body2">Have an account? <Link to="/login">Login</Link></Typography>
        </Stack>
      </form>
    </Paper>
  );
}
