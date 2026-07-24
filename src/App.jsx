import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produtos from './pages/Produtos';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DashboardProdutos from './pages/DashboardProdutos';
import DashboardUsuarios from './pages/DashboardUsuarios';
import DashboardConfig from './pages/DashboardConfig';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="produtos" element={<DashboardProdutos />} />
            <Route path="usuarios" element={<DashboardUsuarios />} />
            <Route path="config" element={<DashboardConfig />} />
          </Route>

          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sobre" element={<Sobre />} />
                  <Route path="/contato" element={<Contato />} />
                  <Route path="/produtos" element={<Produtos />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
