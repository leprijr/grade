export default function DashboardUsuarios() {
  const users = [
    { id: 1, name: 'Ana Silva', email: 'ana@email.com', role: 'Admin', status: 'Ativo' },
    { id: 2, name: 'Carlos Souza', email: 'carlos@email.com', role: 'Editor', status: 'Ativo' },
    { id: 3, name: 'Maria Lima', email: 'maria@email.com', role: 'Usuário', status: 'Inativo' },
    { id: 4, name: 'João Santos', email: 'joao@email.com', role: 'Usuário', status: 'Ativo' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Usuários</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Função</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{u.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
                <td className="px-6 py-4 text-sm">{u.email}</td>
                <td className="px-6 py-4 text-sm">{u.role}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
