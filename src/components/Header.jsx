import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">MeuApp</Link>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-4`}>
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/sobre" className="hover:text-blue-600">Sobre</Link>
          <Link to="/produtos" className="hover:text-blue-600">Produtos</Link>
          <Link to="/contato" className="hover:text-blue-600">Contato</Link>

          <form onSubmit={handleSearch} className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1 text-sm outline-none"
            />
            <button type="submit" className="px-2 bg-blue-600 text-white"><Search size={16} /></button>
          </form>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <span className="text-sm text-gray-500">{user.name}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="text-red-500 hover:text-red-700 text-sm">Sair</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</Link>
              <Link to="/cadastro" className="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Cadastro</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
