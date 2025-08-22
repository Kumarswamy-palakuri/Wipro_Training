import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { getInitialQuote, startLive, stopLive } from './pricefeed.js';



const app = express();
app.use(cors());
app.use(express.json());

// REST endpoint: fetch initial data (componentDidMount)
app.get('/api/quote', async (req, res) => {
  try {
    const { symbol = 'AAPL' } = req.query;
    const data = await getInitialQuote(symbol);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' }});

// Socket channel: stream updates every 1s
io.on('connection', (socket) => {
  let currentSymbol = null;

  socket.on('subscribe', (symbol) => {
    currentSymbol = symbol?.toUpperCase() || 'AAPL';
    startLive(currentSymbol, (tick) => {
      socket.emit('price', tick);
    });
  });

  socket.on('change-symbol', (symbol) => {
    currentSymbol = symbol?.toUpperCase() || 'AAPL';
    startLive(currentSymbol, (tick) => {
      socket.emit('price', tick);
    });
  });

  socket.on('disconnect', () => {
    if (currentSymbol) stopLive(currentSymbol);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
