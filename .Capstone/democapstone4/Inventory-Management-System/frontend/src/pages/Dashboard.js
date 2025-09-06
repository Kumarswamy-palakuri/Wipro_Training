import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import StaffDashboard from './StaffDashboard';

export default function Dashboard() {
  const role = localStorage.getItem('role');

  if (role === 'Admin') return <AdminDashboard />;
  if (role === 'Manager') return <ManagerDashboard />;
  if (role === 'Staff') return <StaffDashboard />;
  return <div className="p-4">Invalid role. Please log out.</div>;
}