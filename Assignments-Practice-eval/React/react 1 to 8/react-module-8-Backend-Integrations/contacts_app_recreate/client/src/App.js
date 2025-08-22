import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import PrivateRoute from './components/PrivateRoute';

function Nav() {
  const { user, logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Contacts</Typography>
        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>{user.name}</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<PrivateRoute><Contacts /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}
