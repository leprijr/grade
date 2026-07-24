import { DollarSign, Users, Package, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardHome() {
  const { user } = useAuth();

  const stats = [
    { label: 'Receita', value: 'R$ 12.450', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Usuários', value: '1.234', icon: Users, color: 'bg-blue-500' },
    { label: 'Produtos', value: '48', icon: Package, color: 'bg-purple-500' },
    { label: 'Crescimento', value: '+24%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user?.name}!</h1>
      <p className="text-gray-600 mb-8">Aqui está o resumo da sua conta.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
              </div>
              <div className={`${color} p-3 rounded-full text-white`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {[
              { text: 'Novo usuário cadastrado', time: 'Há 5 min' },
              { text: 'Pedido #1234 concluído', time: 'Há 15 min' },
              { text: 'Produto adicionado', time: 'Há 1 hora' },
              { text: 'Pagamento recebido', time: 'Há 2 horas' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{item.text}</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Desempenho</h2>
          <div className="space-y-4">
            {[
              { label: 'Vendas', value: 78, color: 'bg-blue-500' },
              { label: 'Visitantes', value: 62, color: 'bg-green-500' },
              { label: 'Conversão', value: 45, color: 'bg-purple-500' },
              { label: 'Retenção', value: 89, color: 'bg-orange-500' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{label}</span>
                  <span className="font-medium">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
