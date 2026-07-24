import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Star } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Zap, title: 'Rápido', desc: 'Performance otimizada para melhor experiência.' },
    { icon: Shield, title: 'Seguro', desc: 'Dados protegidos com criptografia avançada.' },
    { icon: Star, title: 'Qualidade', desc: 'Produtos e serviços de alta qualidade.' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Bem-vindo ao MeuApp</h1>
          <p className="text-xl mb-8 text-blue-100">Soluções completas para transformar seu negócio digital.</p>
          <div className="flex justify-center gap-4">
            <Link to="/produtos" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2">
              Ver Produtos <ArrowRight size={20} />
            </Link>
            <Link to="/contato" className="px-6 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10">
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que nos escolher?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <Icon size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-gray-600 mb-8">Cadastre-se agora e comece a usar nossas soluções.</p>
          <Link to="/cadastro" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  );
}
