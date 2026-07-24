import { products } from '../data/products';

export default function DashboardProdutos() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Produtos</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Preço</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{p.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{p.name}</td>
                <td className="px-6 py-4 text-sm capitalize">{p.category}</td>
                <td className="px-6 py-4 text-sm">R$ {p.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:underline mr-3">Editar</button>
                  <button className="text-red-600 hover:underline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
