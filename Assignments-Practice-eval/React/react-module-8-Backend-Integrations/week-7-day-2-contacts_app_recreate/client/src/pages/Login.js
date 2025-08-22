import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Stack, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained">Login</Button>
          <Typography variant="body2">No account? <Link to="/register">Register</Link></Typography>
        </Stack>
      </form>
    </Paper>
  );
}
