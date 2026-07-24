export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-3">MeuApp</h3>
          <p className="text-gray-400 text-sm">Soluções completas para o seu negócio.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3">Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/sobre" className="hover:text-white">Sobre</a></li>
            <li><a href="/produtos" className="hover:text-white">Produtos</a></li>
            <li><a href="/contato" className="hover:text-white">Contato</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3">Contato</h3>
          <p className="text-gray-400 text-sm">email@meuapp.com</p>
          <p className="text-gray-400 text-sm">(11) 99999-9999</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
        &copy; 2026 MeuApp. Todos os direitos reservados.
      </div>
    </footer>
  );
}
