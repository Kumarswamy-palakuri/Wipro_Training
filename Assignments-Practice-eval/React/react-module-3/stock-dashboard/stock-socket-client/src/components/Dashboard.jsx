import React, { Component, createRef } from 'react';
import io from 'socket.io-client';
import StockChart from './StockChart';

const API_BASE = 'http://localhost:4000';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbolInput: 'AAPL', // Controlled component
      currentSymbol: 'AAPL',
      price: null,
      prevPrice: null,
      lastUpdate: null,
      history: [], // for chart
      isConnected: false
    };
    this.socket = null;

    // Uncontrolled component to store previous search symbols
    this.prevSearchesRef = createRef();
  }

  // Lifecycle: componentDidMount -> fetch initial data, open socket
  async componentDidMount() {
    await this.fetchInitial(this.state.currentSymbol);
    this.initSocket(this.state.currentSymbol);
  }

  // Lifecycle: componentDidUpdate -> respond to symbol changes
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSymbol !== this.state.currentSymbol) {
      await this.fetchInitial(this.state.currentSymbol);
      if (this.socket) {
        this.socket.emit('change-symbol', this.state.currentSymbol);
      }
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  initSocket = (symbol) => {
    this.socket = io(API_BASE, { transports: ['websocket'] });
    this.socket.on('connect', () => {
      this.setState({ isConnected: true });
      this.socket.emit('subscribe', symbol);
    });
    this.socket.on('price', (tick) => {
      this.setState((s) => ({
        prevPrice: s.price,
        price: tick.price,
        lastUpdate: tick.time,
        history: [...s.history, { time: tick.time, price: tick.price }].slice(-120) // last 2 minutes
      }));
    });
    this.socket.on('disconnect', () => this.setState({ isConnected: false }));
  };

  fetchInitial = async (symbol) => {
    try {
      const res = await fetch(`${API_BASE}/api/quote?symbol=${encodeURIComponent(symbol)}`);
      const data = await res.json();
      this.setState({
        price: data.price,
        prevPrice: null,
        lastUpdate: data.time,
        history: [{ time: data.time, price: data.price }]
      });
    } catch (e) {
      console.error('Initial fetch failed', e);
    }
  };

  onSubmitSymbol = (e) => {
    e.preventDefault();
    const sym = this.state.symbolInput.trim().toUpperCase();
    if (!sym) return;

    // Update current symbol (triggers componentDidUpdate)
    this.setState({ currentSymbol: sym });

    // Append to uncontrolled list
    if (this.prevSearchesRef.current) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = sym;
      this.prevSearchesRef.current.appendChild(li);
    }
  };

  render() {
    const { symbolInput, currentSymbol, price, prevPrice, lastUpdate, history, isConnected } = this.state;
    const delta = prevPrice != null && price != null ? +(price - prevPrice).toFixed(2) : null;
    const dir = delta == null ? '' : delta >= 0 ? 'price-up' : 'price-down';

    return (
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">{currentSymbol}</h4>
                <div className={`fs-4 ${dir}`}>
                  {price != null ? `$${price}` : '—'} {delta != null && (
                    <small className={`ms-2 ${dir}`}>{delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}</small>
                  )}
                </div>
                <small className="text-muted">Last update: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : '—'}</small>
              </div>
              <span className={`badge ${isConnected ? 'bg-success' : 'bg-secondary'}`}>
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>

            <div className="mt-3">
              <StockChart points={history} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-3">
            <h5>Track a Stock</h5>
            <form className="d-flex gap-2 mt-2" onSubmit={this.onSubmitSymbol}>
              <input
                className="form-control"
                placeholder="Enter symbol (e.g., AAPL)"
                value={symbolInput}
                onChange={(e) => this.setState({ symbolInput: e.target.value })} // Controlled component
              />
              <button className="btn btn-accent" type="submit">Go</button>
            </form>

            <div className="mt-4">
              <h6>Previous Searches (Uncontrolled)</h6>
              <ul className="list-group" ref={this.prevSearchesRef} />
            </div>

            <div className="mt-4">
              <h6>Styles & Bootstrap</h6>
              <p className="mb-2">
                This dashboard uses Bootstrap layout and custom CSS variables for themes.
              </p>
              <div className="d-flex gap-2">
                <span className="badge bg-primary">Bootstrap</span>
                <span className="badge bg-info text-dark">CSS Vars</span>
              </div>
            </div>

            <div className="mt-4">
              <h6>Lifecycle Methods</h6>
              <ul className="mb-0">
                <li>componentDidMount: fetch initial quote + open socket</li>
                <li>componentDidUpdate: refetch on symbol change</li>
                <li>componentWillUnmount: disconnect socket</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
