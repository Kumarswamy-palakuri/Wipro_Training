import { useState } from 'react';
import { useLoginMutation } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button } from '@/components/ui/button'; // shadcn
import { Input } from '@/components/ui/input';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ username, password }).unwrap();
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      localStorage.setItem('role', decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role']);
      localStorage.setItem('userId', decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow">
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" disabled={isLoading}>Login</Button>
      </form>
    </div>
  );
}