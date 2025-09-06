import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token');
    if (t) {
      localStorage.setItem('token', t);
      setToken(t);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.pathname);
    }
  }, []);

  const loginWithGitHub = () => {
    const returnUrl = window.location.origin;
    window.location.href = `${API}/api/auth/github?returnUrl=${encodeURIComponent(returnUrl)}`;
  };

  const loadAvailableCars = async () => {
    const res = await fetch(`${API}/api/cars/available`);
    if (!res.ok) {
      alert('Failed to load cars');
      return;
    }
    const data = await res.json();
    setCars(data);
  };

  const addCar = async () => {
    if (!token) {
      alert('Please sign in first');
      return;
    }
    const body = {
      vehicleID: 3001,
      make: 'Tata',
      model: 'Punch',
      year: 2024,
      dailyRate: 2000,
      status: 'available',
      passengerCapacity: 5,
      engineCapacity: 1200
    };
    const res = await fetch(`${API}/api/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    alert(res.ok ? 'Car added' : 'Add car failed');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Car Rental Frontend</h2>
      {!token ? (
        <button onClick={loginWithGitHub}>Sign in with GitHub</button>
      ) : (
        <p>Signed in</p>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={loadAvailableCars}>Load Available Cars</button>
        {token && <button onClick={addCar} style={{ marginLeft: 10 }}>Add Car (auth)</button>}
      </div>

      <ul>
        {cars.map(c => (
          <li key={c.vehicleID}>
            {c.vehicleID} {c.make} {c.model} {c.year} ₹{c.dailyRate} {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
