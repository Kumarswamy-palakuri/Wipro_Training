import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { v4 as uuid } from 'uuid';

const router = Router();

// In-memory contacts by userId: { [userId]: [{ id, name, email, phone, notes }] }
const store = {};

router.use(requireAuth);

router.get('/', (req, res) => {
  const userId = req.user.sub;
  const contacts = store[userId] || [];
  res.json(contacts);
});

router.post('/', (req, res) => {
  const userId = req.user.sub;
  const { name, email, phone, notes } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const item = { id: uuid(), name, email: email || '', phone: phone || '', notes: notes || '' };
  store[userId] = store[userId] || [];
  store[userId].push(item);
  res.status(201).json(item);
});

router.put('/:id', (req, res) => {
  const userId = req.user.sub;
  const { id } = req.params;
  const list = store[userId] || [];
  const idx = list.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  store[userId][idx] = { ...list[idx], ...req.body, id };
  res.json(store[userId][idx]);
});

router.delete('/:id', (req, res) => {
  const userId = req.user.sub;
  const { id } = req.params;
  const list = store[userId] || [];
  const idx = list.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  list.splice(idx, 1);
  store[userId] = list;
  res.status(204).send();
});

export default router;
