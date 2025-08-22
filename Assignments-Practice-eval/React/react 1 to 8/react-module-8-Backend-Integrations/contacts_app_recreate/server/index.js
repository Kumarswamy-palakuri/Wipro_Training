import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import contactsRouter from './routes/contacts.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'OK', service: 'Contacts API' });
});

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
