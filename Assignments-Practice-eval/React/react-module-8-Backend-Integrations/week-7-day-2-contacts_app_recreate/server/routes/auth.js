import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_me';

// In-memory users: [{ id, name, email, passwordHash }]
export const users = [];
let idCounter = 1;

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const exists = users.find(u => u.email === email);
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: idCounter++, name, email, passwordHash };
    users.push(user);

    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
