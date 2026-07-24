import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
  { to: '/dashboard/produtos', label: 'Produtos', icon: Package },
  { to: '/dashboard/usuarios', label: 'Usuários', icon: Users },
  { to: '/dashboard/config', label: 'Configurações', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 px-2">Painel</h2>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === to ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
