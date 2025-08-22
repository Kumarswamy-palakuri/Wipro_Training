import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  const [theme, setTheme] = useState('dark'); // Bonus: dynamic theme

  return (
    <div className={theme === 'light' ? 'light' : ''}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0">Real-Time Stock Dashboard</h2>
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ width: 140 }}
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
          </div>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}
