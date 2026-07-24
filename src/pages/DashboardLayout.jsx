import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
