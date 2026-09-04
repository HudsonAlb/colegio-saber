import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Envelope, Phone, Student, PaperPlaneRight, ArrowLeft, WhatsappLogo } from '@phosphor-icons/react';

const SERIES = [
  'Educação Infantil (Grupo 3 ao 5)',
  'Ensino Fundamental I (1º ao 5º Ano)',
  'Ensino Fundamental II (6º ao 9º Ano)',
  'Ensino Médio (1ª a 3ª Série)'
];

export default function MatriculaRapidaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    respNome: '',
    respEmail: '',
    respTel: '',
    alunoNome: '',
    alunoSerie: '',
    mensagem: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.respNome.trim()) newErrors.respNome = 'Nome do responsável é obrigatório';
    if (!formData.respEmail.trim()) {
      newErrors.respEmail = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.respEmail)) {
      newErrors.respEmail = 'E-mail inválido';
    }
    if (!formData.respTel.trim()) newErrors.respTel = 'WhatsApp é obrigatório';
    if (!formData.alunoNome.trim()) newErrors.alunoNome = 'Nome do aluno é obrigatório';
    if (!formData.alunoSerie) newErrors.alunoSerie = 'Selecione a série de interesse';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMessage = () => {
    return `Olá! Tenho interesse na campanha de matrículas de meio de ano do Colégio Saber.
Segue os dados do formulário:
- *Responsável:* ${formData.respNome}
- *E-mail:* ${formData.respEmail}
- *Telefone:* ${formData.respTel}
- *Aluno(a):* ${formData.alunoNome}
- *Série de Interesse:* ${formData.alunoSerie}
${formData.mensagem ? `- *Mensagem adicional:* ${formData.mensagem}` : ''}`;
  };

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const message = encodeURIComponent(buildMessage());
    const phone = '558135561122'; // Número do Colégio Saber
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent('Interesse em Matrícula de Meio de Ano - Colégio Saber');
    const body = encodeURIComponent(buildMessage().replace(/\*/g, '')); // Remove negritos do whatsapp para email
    window.location.href = `mailto:colegiosaberescada@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-8 pb-16 px-4 md:px-8 bg-transparent max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-brand-charcoal-light hover:text-brand-orange font-serif font-bold text-sm transition-colors cursor-pointer group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para a página anterior
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Banner Column */}
        <div className="lg:col-span-5 bg-brand-orange/5 border-4 border-brand-charcoal/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-yellow/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-wider text-brand-orange font-bold">
              Campanha Especial
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal mt-4 mb-2 font-bold leading-tight">
              Matrículas de Meio de Ano
            </h1>
            <p className="font-sans text-xs md:text-sm text-brand-charcoal-light/95 leading-relaxed font-semibold">
              Garanta a vaga do seu filho para o segundo semestre! Preencha as informações rápidas ao lado para iniciar o contato com nossa equipe de admissões.
            </p>
          </div>

          <div className="mt-8 relative z-10 rounded-2xl overflow-hidden border-2 border-brand-charcoal/10 bg-white p-2">
            <img 
              src="/campanha_matricula.webp" 
              alt="Ilustração da campanha de matrículas do Colégio Saber" 
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-[#fffcf7] border-4 border-brand-charcoal/10 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative">
          <h2 className="font-serif text-2xl text-brand-charcoal mb-6 font-bold">
            Formulário de Contato Rápido
          </h2>
          
          <form className="flex flex-col gap-5">
            {/* Responsavel */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="respNome" className="font-serif text-xs font-bold text-brand-charcoal-light flex items-center gap-1.5">
                <User size={14} className="text-brand-orange" /> Nome do Responsável
              </label>
              <input
                type="text"
                id="respNome"
                name="respNome"
                value={formData.respNome}
                onChange={handleInputChange}
                placeholder="Ex: Maria Silva"
                className={`w-full px-4 py-3 rounded-2xl border-2 font-serif text-sm font-semibold transition-all outline-none ${
                  errors.respNome ? 'border-brand-pink focus:border-brand-pink-dark bg-brand-pink-light/35' : 'border-brand-light-border focus:border-brand-orange bg-white'
                }`}
              />
              {errors.respNome && <span className="text-[11px] text-brand-pink-dark font-bold font-sans">{errors.respNome}</span>}
            </div>

            {/* Contatos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="respTel" className="font-serif text-xs font-bold text-brand-charcoal-light flex items-center gap-1.5">
                  <Phone size={14} className="text-brand-green" /> WhatsApp
                </label>
                <input
                  type="tel"
                  id="respTel"
                  name="respTel"
                  value={formData.respTel}
                  onChange={handleInputChange}
                  placeholder="Ex: (81) 98888-7777"
                  className={`w-full px-4 py-3 rounded-2xl border-2 font-serif text-sm font-semibold transition-all outline-none ${
                    errors.respTel ? 'border-brand-pink focus:border-brand-pink-dark bg-brand-pink-light/35' : 'border-brand-light-border focus:border-brand-orange bg-white'
                  }`}
                />
                {errors.respTel && <span className="text-[11px] text-brand-pink-dark font-bold font-sans">{errors.respTel}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="respEmail" className="font-serif text-xs font-bold text-brand-charcoal-light flex items-center gap-1.5">
                  <Envelope size={14} className="text-brand-blue" /> E-mail
                </label>
                <input
                  type="email"
                  id="respEmail"
                  name="respEmail"
                  value={formData.respEmail}
                  onChange={handleInputChange}
                  placeholder="Ex: maria.silva@email.com"
                  className={`w-full px-4 py-3 rounded-2xl border-2 font-serif text-sm font-semibold transition-all outline-none ${
                    errors.respEmail ? 'border-brand-pink focus:border-brand-pink-dark bg-brand-pink-light/35' : 'border-brand-light-border focus:border-brand-orange bg-white'
                  }`}
                />
                {errors.respEmail && <span className="text-[11px] text-brand-pink-dark font-bold font-sans">{errors.respEmail}</span>}
              </div>
            </div>

            {/* Aluno & Serie Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="alunoNome" className="font-serif text-xs font-bold text-brand-charcoal-light flex items-center gap-1.5">
                  <Student size={14} className="text-brand-yellow-dark" /> Nome do Aluno
                </label>
                <input
                  type="text"
                  id="alunoNome"
                  name="alunoNome"
                  value={formData.alunoNome}
                  onChange={handleInputChange}
                  placeholder="Ex: João Silva"
                  className={`w-full px-4 py-3 rounded-2xl border-2 font-serif text-sm font-semibold transition-all outline-none ${
                    errors.alunoNome ? 'border-brand-pink focus:border-brand-pink-dark bg-brand-pink-light/35' : 'border-brand-light-border focus:border-brand-orange bg-white'
                  }`}
                />
                {errors.alunoNome && <span className="text-[11px] text-brand-pink-dark font-bold font-sans">{errors.alunoNome}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="alunoSerie" className="font-serif text-xs font-bold text-brand-charcoal-light flex items-center gap-1.5">
                  <Student size={14} className="text-brand-pink" /> Série de Interesse
                </label>
                <select
                  id="alunoSerie"
                  name="alunoSerie"
                  value={formData.alunoSerie}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 font-serif text-sm font-semibold transition-all outline-none bg-white ${
                    errors.alunoSerie ? 'border-brand-pink focus:border-brand-pink-dark bg-brand-pink-light/35' : 'border-brand-light-border focus:border-brand-orange'
                  }`}
                >
                  <option value="">Selecione...</option>
                  {SERIES.map((serie, idx) => (
                    <option key={idx} value={serie}>{serie}</option>
                  ))}
                </select>
                {errors.alunoSerie && <span className="text-[11px] text-brand-pink-dark font-bold font-sans">{errors.alunoSerie}</span>}
              </div>
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mensagem" className="font-serif text-xs font-bold text-brand-charcoal-light">
                Dúvidas ou Observações (Opcional)
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleInputChange}
                placeholder="Escreva sua mensagem aqui..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-brand-light-border focus:border-brand-orange bg-white font-serif text-sm font-semibold transition-all outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                onClick={handleSendWhatsapp}
                className="flex-1 py-4 px-6 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-serif text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-brand-green-dark"
              >
                <WhatsappLogo size={20} weight="fill" />
                Enviar via WhatsApp
              </button>
              
              <button
                type="submit"
                onClick={handleSendEmail}
                className="flex-1 py-4 px-6 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-serif text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-brand-orange-dark"
              >
                <PaperPlaneRight size={20} weight="bold" />
                Enviar via E-mail
              </button>
            </div>
            
            <p className="text-[10px] text-center font-sans font-semibold text-brand-charcoal-light/60 leading-relaxed mt-2">
              Seu contato será direcionado instantaneamente para a equipe de atendimento do Colégio Saber.
            </p>
          </form>
        </div>

      </div>

    </div>
  );
}
