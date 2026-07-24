import { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Fale Conosco</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">contato@meuapp.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold">Endereço</p>
                <p className="text-gray-600">São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">Mensagem enviada!</h3>
              <p className="text-green-600">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Seu email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Assunto"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Sua mensagem"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Send size={18} /> Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
