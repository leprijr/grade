import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { Search } from 'lucide-react';

export default function Produtos() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('busca') || '';
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState('todos');

  const categories = ['todos', ...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'todos' || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Produtos e Serviços</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 outline-none w-64"
          />
          <button className="px-3 bg-blue-600 text-white"><Search size={18} /></button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">{product.category}</span>
              <h3 className="text-xl font-bold mt-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Contratar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
