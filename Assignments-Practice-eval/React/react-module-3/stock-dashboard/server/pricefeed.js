// priceFeed.js
const active = new Map(); // symbol -> { price, intervalId }

function randomWalk(prev) {
  const delta = (Math.random() - 0.5) * 2; // -1..1
  return Math.max(0.01, +(prev + delta).toFixed(2));
}

export async function getInitialQuote(symbol) {
  // Replace with real API call if desired
  const base = 100 + Math.random() * 50;
  return {
    symbol: symbol.toUpperCase(),
    price: +base.toFixed(2),
    time: new Date().toISOString()
  };
}

export function startLive(symbol, onTick) {
  const key = symbol.toUpperCase();
  let state = active.get(key);
  if (!state) {
    state = { price: 100 + Math.random() * 50, intervalId: null };
  }
  if (state.intervalId) return; // already streaming

  state.intervalId = setInterval(() => {
    state.price = randomWalk(state.price);
    onTick({
      symbol: key,
      price: +state.price.toFixed(2),
      time: new Date().toISOString()
    });
  }, 1000);
  active.set(key, state);
}

export function stopLive(symbol) {
  const key = symbol.toUpperCase();
  const state = active.get(key);
  if (state?.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}
