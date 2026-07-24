export default function DashboardConfig() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Perfil</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input type="text" defaultValue="Usuário" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" defaultValue="user@email.com" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tema</label>
            <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Claro</option>
              <option>Escuro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Idioma</label>
            <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Português</option>
              <option>Inglês</option>
              <option>Espanhol</option>
            </select>
          </div>
          <button type="button" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
