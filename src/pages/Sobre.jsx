export default function Sobre() {
  const team = [
    { name: 'Ana Silva', role: 'CEO', image: 'https://placehold.co/150x150/3b82f6/ffffff?text=AS' },
    { name: 'Carlos Souza', role: 'CTO', image: 'https://placehold.co/150x150/8b5cf6/ffffff?text=CS' },
    { name: 'Maria Lima', role: 'Design', image: 'https://placehold.co/150x150/ec4899/ffffff?text=ML' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Sobre Nós</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Somos uma empresa dedicada a fornecer soluções digitais inovadoras.
          Desde 2020, ajudamos empresas a crescer no mundo digital com tecnologia de ponta.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nossa Equipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map(({ name, role, image }) => (
            <div key={name} className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="text-blue-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-lg mb-2">Inovação</h3>
            <p className="text-gray-600">Sempre buscamos as melhores e mais modernas soluções.</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-lg mb-2">Qualidade</h3>
            <p className="text-gray-600">Excelência em tudo o que fazemos.</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-lg mb-2">Transparência</h3>
            <p className="text-gray-600">Relações claras e honestas com nossos clientes.</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-lg mb-2">Compromisso</h3>
            <p className="text-gray-600">Cumprimos o que prometemos, sempre.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
