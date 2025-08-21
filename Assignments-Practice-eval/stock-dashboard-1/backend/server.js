// server.js (backend)

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = []; // in-memory storage

// Add user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name;
  res.json(user);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== parseInt(id));
  res.json({ message: 'User deleted' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
