import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { 
  User, Mail, Phone, Calendar, UploadCloud, CheckCircle, 
  FileText, ArrowLeft, ArrowRight, File, 
  Trash2, Loader2, Send, Download, Check, AlertCircle 
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// Tipos para os dados do formulário
interface FormData {
  // Responsável
  respNome: string;
  respCpf: string;
  respEmail: string;
  respTel: string;
  
  // Aluno
  alunoNome: string;
  alunoNasc: string;
  alunoSerie: string;
  
  // Agendamento
  dataTeste: string;
  horarioTeste: string;
  dataVisita: string;
  horarioVisita: string;
  interesses: string[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

const SERIES = [
  'Educação Infantil - Grupo 3',
  'Educação Infantil - Grupo 4',
  'Educação Infantil - Grupo 5',
  'Ensino Fundamental I - 1º Ano',
  'Ensino Fundamental I - 2º Ano',
  'Ensino Fundamental I - 3º Ano',
  'Ensino Fundamental I - 4º Ano',
  'Ensino Fundamental I - 5º Ano',
  'Ensino Fundamental II - 6º Ano',
  'Ensino Fundamental II - 7º Ano',
  'Ensino Fundamental II - 8º Ano',
  'Ensino Fundamental II - 9º Ano',
  'Ensino Médio - 1ª Série',
  'Ensino Médio - 2ª Série',
  'Ensino Médio - 3ª Série (Terceirão)'
];

const INTERESSES_OPCOES = [
  { id: 'tecnologia', label: 'Tecnologia & Robótica' },
  { id: 'esportes', label: 'Esportes & Atividades Físicas' },
  { id: 'artes', label: 'Artes Plásticas & Teatro' },
  { id: 'idiomas', label: 'Bilinguismo & Cidadania Global' },
  { id: 'ciencias', label: 'Ciências & Laboratório Científico' },
  { id: 'humanas', label: 'Debates & Filosofia Prática' }
];

export default function AdmissaoPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form State
  const [formData, setFormData] = useState<FormData>({
    respNome: '',
    respCpf: '',
    respEmail: '',
    respTel: '',
    alunoNome: '',
    alunoNasc: '',
    alunoSerie: '',
    dataTeste: '',
    horarioTeste: '',
    dataVisita: '',
    horarioVisita: '',
    interesses: []
  });

  // Files State
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs para animações GSAP
  const stepContainerRef = useRef<HTMLFormElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  // Animação de troca de passos
  useEffect(() => {
    if (stepContainerRef.current) {
      gsap.fromTo(stepContainerRef.current.children,
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out' 
        }
      );
    }
  }, [step]);

  // Função para exibir toast temporário
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Formatações auxiliares
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  // Handler de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'respCpf') formattedValue = formatCPF(value);
    if (name === 'respTel') formattedValue = formatPhone(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Handler de checkboxes de interesse
  const handleInteresseChange = (id: string) => {
    setFormData(prev => {
      const interests = prev.interesses.includes(id)
        ? prev.interesses.filter(item => item !== id)
        : [...prev.interesses, id];
      return { ...prev, interesses: interests };
    });
  };

  // Validação do Passo 1
  const validateStep1 = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.respNome.trim()) tempErrors.respNome = 'Nome do responsável é obrigatório.';
    if (formData.respCpf.replace(/\D/g, '').length !== 11) tempErrors.respCpf = 'Insira um CPF válido.';
    if (!formData.respEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.respEmail = 'Insira um e-mail válido.';
    if (formData.respTel.replace(/\D/g, '').length < 10) tempErrors.respTel = 'Insira um telefone válido.';
    if (!formData.alunoNome.trim()) tempErrors.alunoNome = 'Nome do aluno é obrigatório.';
    if (!formData.alunoNasc) tempErrors.alunoNasc = 'Data de nascimento é obrigatória.';
    if (!formData.alunoSerie) tempErrors.alunoSerie = 'Selecione a série pretendida.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Validação do Passo 2
  const validateStep2 = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.dataTeste) tempErrors.dataTeste = 'Selecione uma data para o teste diagnóstico.';
    if (!formData.horarioTeste) tempErrors.horarioTeste = 'Selecione um horário para o teste.';
    if (!formData.dataVisita) tempErrors.dataVisita = 'Selecione uma data para a visita guiada.';
    if (!formData.horarioVisita) tempErrors.horarioVisita = 'Selecione um horário para a visita.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- ARQUIVOS (Passo 3) ---
  const simulateFileUpload = (fileObj: File) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newUploaded: UploadedFile = {
      id,
      name: fileObj.name,
      size: fileObj.size,
      type: fileObj.type,
      progress: 0,
      status: 'uploading'
    };

    setFiles(prev => [...prev, newUploaded]);

    // Simulação do progresso do upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 100, status: 'completed' } : f));
      } else {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress } : f));
      }
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => {
        simulateFileUpload(file);
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        simulateFileUpload(file);
      });
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // --- GERAR PDF (Passo 4) ---
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Cabeçalho / Estilo da Instituição
    doc.setFillColor(17, 17, 18); // Carvão
    doc.rect(0, 0, 210, 40, 'F');

    // Logo / Texto do Colégio
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('COLÉGIO SABER', 20, 22);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(255, 107, 0); // Laranja
    doc.text('EXCELÊNCIA & VALORES — FICHA DE INSCRIÇÃO DE INTERESSE', 20, 29);

    // Linha divisória
    doc.setDrawColor(255, 107, 0);
    doc.setLineWidth(1);
    doc.line(0, 40, 210, 40);

    // Título da Ficha
    doc.setTextColor(17, 17, 18);
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('FICHA DE INTERESSE DE MATRÍCULA', 20, 55);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(68, 68, 71);
    doc.text(`Gerada em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`, 20, 61);

    // Seção 1: Dados do Responsável
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 107, 0);
    doc.text('1. DADOS DO RESPONSÁVEL', 20, 75);
    doc.line(20, 77, 190, 77);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(17, 17, 18);
    doc.text(`Nome Completo: ${formData.respNome}`, 25, 84);
    doc.text(`CPF: ${formData.respCpf}`, 25, 90);
    doc.text(`E-mail: ${formData.respEmail}`, 25, 96);
    doc.text(`Telefone: ${formData.respTel}`, 25, 102);

    // Seção 2: Dados do Candidato (Aluno)
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 107, 0);
    doc.text('2. DADOS DO ESTUDANTE', 20, 115);
    doc.line(20, 117, 190, 117);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(17, 17, 18);
    doc.text(`Nome do Aluno: ${formData.alunoNome}`, 25, 124);
    doc.text(`Data de Nascimento: ${new Date(formData.alunoNasc + 'T00:00:00').toLocaleDateString('pt-BR')}`, 25, 130);
    doc.text(`Série Pretendida: ${formData.alunoSerie}`, 25, 136);

    const interessesString = formData.interesses.map(id => INTERESSES_OPCOES.find(opt => opt.id === id)?.label).filter(Boolean).join(', ');
    doc.text(`Áreas de Interesse Pedagógico: ${interessesString || 'Nenhuma selecionada'}`, 25, 142);

    // Seção 3: Agendamentos
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 107, 0);
    doc.text('3. AGENDAMENTOS CONFIRMADOS', 20, 155);
    doc.line(20, 157, 190, 157);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(17, 17, 18);
    doc.text(`Teste Diagnóstico: ${new Date(formData.dataTeste + 'T00:00:00').toLocaleDateString('pt-BR')} às ${formData.horarioTeste}`, 25, 164);
    doc.text(`Visita Guiada no Campus: ${new Date(formData.dataVisita + 'T00:00:00').toLocaleDateString('pt-BR')} às ${formData.horarioVisita}`, 25, 170);

    // Seção 4: Documentos Anexados
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 107, 0);
    doc.text('4. DOCUMENTAÇÃO PRELIMINAR', 20, 183);
    doc.line(20, 185, 190, 185);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(17, 17, 18);
    if (files.length === 0) {
      doc.text('Nenhum documento anexado preliminarmente.', 25, 192);
    } else {
      let yPos = 192;
      files.forEach((file) => {
        doc.text(`• ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB) - Status: Recebido`, 25, yPos);
        yPos += 6;
      });
    }

    // Selo / Rodapé de validade
    doc.setFillColor(252, 251, 249); // Card Light
    doc.rect(20, 225, 170, 25, 'F');
    doc.setDrawColor(238, 233, 224); // Border Light
    doc.rect(20, 225, 170, 25, 'S');

    doc.setFontSize(8);
    doc.setTextColor(68, 68, 71);
    doc.setFont('Helvetica', 'oblique');
    doc.text('Este documento confirma o interesse formal na vaga solicitada. Nosso departamento de admissões', 25, 233);
    doc.text('entrará em contato para formalização do processo de matrícula após o Teste Diagnóstico agendado.', 25, 238);
    doc.text('Código de Autenticação Digital: SABER-' + Math.random().toString(36).substring(2, 10).toUpperCase(), 25, 245);

    // Salvar PDF
    doc.save(`Ficha_Interesse_Saber_${formData.alunoNome.replace(/\s+/g, '_')}.pdf`);
    showToast('Ficha de Interesse em PDF baixada com sucesso!');
  };

  // --- FINALIZAR SUBMISSÃO ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula envio para a secretaria (animação do e-mail e processamento)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Animação de envio de e-mail usando GSAP
      if (envelopeRef.current) {
        gsap.timeline()
          .to(envelopeRef.current, { scale: 1.1, rotation: 10, duration: 0.4, ease: 'power3.out' })
          .to(envelopeRef.current, { x: 400, y: -200, opacity: 0, scale: 0.2, duration: 0.8, ease: 'expo.in' });
      }
    }, 2500);
  };

  // Gerador de Calendário Simples
  const getNextDays = (count: number) => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    
    while (dates.length < count) {
      current.setDate(current.getDate() + 1);
      // Ignorar finais de semana
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        dates.push(new Date(current));
      }
    }
    return dates;
  };

  const nextDays = getNextDays(12);

  const HORARIOS = ['08:30', '10:00', '13:30', '15:00'];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-light flex flex-col justify-center items-center">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-brand-charcoal text-brand-light shadow-xl border border-brand-orange/30 animate-fade-in font-sans text-xs uppercase tracking-wider">
          <CheckCircle size={18} className="text-brand-orange animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-3xl w-full px-6 flex flex-col">
        
        {/* Título & Progresso */}
        <div className="text-center mb-12 flex flex-col gap-4">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-orange font-semibold">
            Processo de Admissão 2026 / 2027
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal font-medium">
            Formulário de Ingresso
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-light max-w-lg mx-auto">
            Dê o primeiro passo para garantir a formação de excelência intelectual e humana do seu filho no Colégio Saber.
          </p>

          {/* Stepper Visual */}
          <div className="mt-8 flex items-center justify-between relative max-w-md mx-auto w-full px-4">
            {/* Linha de fundo */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-brand-light-border -translate-y-1/2 z-0"></div>
            
            {/* Linha preenchida */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 z-0 transition-all duration-700 ease-out"
              style={{ 
                width: `${((step - 1) / 3) * 100}%`,
                backgroundColor: step === 2 ? '#ff7e1b' : step === 3 ? '#4ea8de' : step === 4 ? '#ffd166' : '#ff7e1b'
              }}
            ></div>

            {[
              { num: 1, label: 'Cadastro', activeClass: 'bg-[#ff7e1b] text-white border-[#ff7e1b] shadow-lg shadow-[#ff7e1b]/20 scale-110', completedClass: 'bg-[#fcd2af] text-[#433832] border-[#fcd2af]', textActive: 'text-[#ff7e1b]' },
              { num: 2, label: 'Agendamento', activeClass: 'bg-[#4ea8de] text-white border-[#4ea8de] shadow-lg shadow-[#4ea8de]/20 scale-110', completedClass: 'bg-[#b9dcf4] text-[#433832] border-[#b9dcf4]', textActive: 'text-[#4ea8de]' },
              { num: 3, label: 'Documentos', activeClass: 'bg-[#ffd166] text-[#433832] border-[#ffd166] shadow-lg shadow-[#ffd166]/20 scale-110', completedClass: 'bg-[#fde293] text-[#433832] border-[#fde293]', textActive: 'text-[#ffd166]' },
              { num: 4, label: 'Ficha', activeClass: 'bg-[#ff7e1b] text-white border-[#ff7e1b] shadow-lg shadow-[#ff7e1b]/20 scale-110', completedClass: 'bg-[#fcd2af] text-[#433832] border-[#fcd2af]', textActive: 'text-[#ff7e1b]' }
            ].map(s => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => s.num < step && !isSuccess && setStep(s.num)}
                    disabled={s.num >= step || isSuccess}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs font-semibold border transition-all duration-700 ${
                      isCurrent
                        ? s.activeClass
                        : isPast
                        ? s.completedClass
                        : 'bg-white text-brand-charcoal/50 border-brand-light-border'
                    }`}
                  >
                    {isPast ? <Check size={14} /> : s.num}
                  </button>
                  <span className={`font-sans text-[10px] uppercase tracking-wider font-medium ${
                    isCurrent ? s.textActive : 'text-brand-charcoal/50'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulário Principal */}
        <div className="bg-brand-light-card border border-brand-light-border rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          {/* Fundo decorativo sutil */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-brand-orange/2 blur-[80px] pointer-events-none"></div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} ref={stepContainerRef} className="flex flex-col gap-8">
              
              {/* PASSO 1: IDENTIFICAÇÃO */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-xl text-brand-charcoal mb-1">Dados do Responsável</h3>
                    <p className="font-sans text-xs text-brand-charcoal-light/70 font-light">Insira as informações de contato para comunicação institucional.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nome do Responsável */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="respNome" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30" size={16} />
                        <input
                          id="respNome"
                          name="respNome"
                          type="text"
                          value={formData.respNome}
                          onChange={handleChange}
                          placeholder="Ex: Maria Silva"
                          aria-required="true"
                          aria-invalid={errors.respNome ? "true" : "false"}
                          aria-describedby={errors.respNome ? "respNome-error" : undefined}
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                            errors.respNome ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                          }`}
                        />
                      </div>
                      {errors.respNome && <span id="respNome-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.respNome}</span>}
                    </div>

                    {/* CPF do Responsável */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="respCpf" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">CPF</label>
                      <input
                        id="respCpf"
                        name="respCpf"
                        type="text"
                        value={formData.respCpf}
                        onChange={handleChange}
                        placeholder="000.000.000-00"
                        aria-required="true"
                        aria-invalid={errors.respCpf ? "true" : "false"}
                        aria-describedby={errors.respCpf ? "respCpf-error" : undefined}
                        className={`w-full px-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                          errors.respCpf ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                        }`}
                      />
                      {errors.respCpf && <span id="respCpf-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.respCpf}</span>}
                    </div>

                    {/* E-mail */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="respEmail" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">E-mail de Contato</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30" size={16} />
                        <input
                          id="respEmail"
                          name="respEmail"
                          type="email"
                          value={formData.respEmail}
                          onChange={handleChange}
                          placeholder="exemplo@email.com"
                          aria-required="true"
                          aria-invalid={errors.respEmail ? "true" : "false"}
                          aria-describedby={errors.respEmail ? "respEmail-error" : undefined}
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                            errors.respEmail ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                          }`}
                        />
                      </div>
                      {errors.respEmail && <span id="respEmail-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.respEmail}</span>}
                    </div>

                    {/* Telefone/WhatsApp */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="respTel" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">Telefone / WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30" size={16} />
                        <input
                          id="respTel"
                          name="respTel"
                          type="text"
                          value={formData.respTel}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                          aria-required="true"
                          aria-invalid={errors.respTel ? "true" : "false"}
                          aria-describedby={errors.respTel ? "respTel-error" : undefined}
                          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                            errors.respTel ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                          }`}
                        />
                      </div>
                      {errors.respTel && <span id="respTel-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.respTel}</span>}
                    </div>
                  </div>

                  <hr className="border-brand-light-border my-2" />

                  <div>
                    <h3 className="font-serif text-xl text-brand-charcoal mb-1">Dados do Candidato (Estudante)</h3>
                    <p className="font-sans text-xs text-brand-charcoal-light/77 font-light">Informe os dados básicos da criança ou jovem.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nome do Aluno */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label htmlFor="alunoNome" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">Nome Completo do Aluno</label>
                      <input
                        id="alunoNome"
                        name="alunoNome"
                        type="text"
                        value={formData.alunoNome}
                        onChange={handleChange}
                        placeholder="Ex: Carlos Silva"
                        aria-required="true"
                        aria-invalid={errors.alunoNome ? "true" : "false"}
                        aria-describedby={errors.alunoNome ? "alunoNome-error" : undefined}
                        className={`w-full px-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                          errors.alunoNome ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                        }`}
                      />
                      {errors.alunoNome && <span id="alunoNome-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.alunoNome}</span>}
                    </div>

                    {/* Data de Nascimento */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="alunoNasc" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">Data de Nascimento</label>
                      <input
                        id="alunoNasc"
                        name="alunoNasc"
                        type="date"
                        value={formData.alunoNasc}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errors.alunoNasc ? "true" : "false"}
                        aria-describedby={errors.alunoNasc ? "alunoNasc-error" : undefined}
                        className={`w-full px-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                          errors.alunoNasc ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                        }`}
                      />
                      {errors.alunoNasc && <span id="alunoNasc-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.alunoNasc}</span>}
                    </div>

                    {/* Série Pretendida */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="alunoSerie" className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-charcoal/80">Série Pretendida</label>
                      <select
                        id="alunoSerie"
                        name="alunoSerie"
                        value={formData.alunoSerie}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errors.alunoSerie ? "true" : "false"}
                        aria-describedby={errors.alunoSerie ? "alunoSerie-error" : undefined}
                        className={`w-full px-4 py-3.5 rounded-2xl border bg-white font-sans text-xs outline-none transition-all duration-500 ${
                          errors.alunoSerie ? 'border-red-400 focus:border-red-400' : 'border-brand-light-border focus:border-[#ff7e1b]'
                        }`}
                      >
                        <option value="">Selecione...</option>
                        {SERIES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.alunoSerie && <span id="alunoSerie-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle size={10} /> {errors.alunoSerie}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 2: AGENDAMENTO DE TESTE E VISITA */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-xl text-brand-charcoal mb-1">Agendamento de Avaliação</h3>
                    <p className="font-sans text-xs text-brand-charcoal-light/70 font-light">Selecione uma data para o Teste Diagnóstico do aluno e uma data para a Visita Guiada dos pais.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Agendamento do Teste */}
                    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-brand-light-border bg-white">
                      <div className="flex items-center gap-2 text-brand-orange">
                        <Calendar size={16} />
                        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">1. Teste Diagnóstico</h4>
                      </div>

                      <div className="flex flex-col gap-1.5" aria-describedby={errors.dataTeste ? "dataTeste-error" : undefined}>
                        <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70">Escolha a Data</label>
                        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Datas disponíveis para Teste Diagnóstico">
                          {nextDays.slice(0, 6).map(date => {
                            const dateString = date.toISOString().split('T')[0];
                            const isSelected = formData.dataTeste === dateString;
                            const fullDateStr = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
                            return (
                              <button
                                key={dateString}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, dataTeste: dateString }))}
                                aria-pressed={isSelected}
                                aria-label={`${fullDateStr}${isSelected ? ', selecionada' : ''}`}
                                className={`py-2 rounded-full border text-center font-sans text-[10px] transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-[#ff7e1b] text-white border-[#ff7e1b] font-semibold shadow-md' 
                                    : 'border-brand-light-border hover:border-[#ff7e1b]/50 text-brand-charcoal bg-white'
                                }`}
                              >
                                {date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                                <span className="block text-xs font-bold mt-0.5">
                                  {date.getDate()}/{date.getMonth() + 1}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.dataTeste && (
                          <span id="dataTeste-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1">
                            <AlertCircle size={10} />
                            {errors.dataTeste}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2" aria-describedby={errors.horarioTeste ? "horarioTeste-error" : undefined}>
                        <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70">Escolha o Horário</label>
                        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Horários disponíveis para Teste Diagnóstico">
                          {HORARIOS.map(time => {
                            const isSelected = formData.horarioTeste === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, horarioTeste: time }))}
                                aria-pressed={isSelected}
                                aria-label={`${time}${isSelected ? ', selecionado' : ''}`}
                                className={`py-2 rounded-full border text-center font-sans text-xs transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-[#ff7e1b] text-white border-[#ff7e1b] font-semibold shadow-md' 
                                    : 'border-brand-light-border hover:border-[#ff7e1b]/50 text-brand-charcoal bg-white'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                        {errors.horarioTeste && (
                          <span id="horarioTeste-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1">
                            <AlertCircle size={10} />
                            {errors.horarioTeste}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Agendamento da Visita */}
                    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-brand-light-border bg-white">
                      <div className="flex items-center gap-2 text-brand-orange">
                        <Calendar size={16} />
                        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">2. Visita ao Campus</h4>
                      </div>

                      <div className="flex flex-col gap-1.5" aria-describedby={errors.dataVisita ? "dataVisita-error" : undefined}>
                        <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70">Escolha a Data</label>
                        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Datas disponíveis para Visita ao Campus">
                          {nextDays.slice(6, 12).map(date => {
                            const dateString = date.toISOString().split('T')[0];
                            const isSelected = formData.dataVisita === dateString;
                            const fullDateStr = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
                            return (
                              <button
                                key={dateString}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, dataVisita: dateString }))}
                                aria-pressed={isSelected}
                                aria-label={`${fullDateStr}${isSelected ? ', selecionada' : ''}`}
                                className={`py-2 rounded-full border text-center font-sans text-[10px] transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-[#4ea8de] text-white border-[#4ea8de] font-semibold shadow-md' 
                                    : 'border-brand-light-border hover:border-[#4ea8de]/50 text-brand-charcoal bg-white'
                                }`}
                              >
                                {date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                                <span className="block text-xs font-bold mt-0.5">
                                  {date.getDate()}/{date.getMonth() + 1}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.dataVisita && (
                          <span id="dataVisita-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1">
                            <AlertCircle size={10} />
                            {errors.dataVisita}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2" aria-describedby={errors.horarioVisita ? "horarioVisita-error" : undefined}>
                        <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70">Escolha o Horário</label>
                        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Horários disponíveis para Visita ao Campus">
                          {HORARIOS.map(time => {
                            const isSelected = formData.horarioVisita === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, horarioVisita: time }))}
                                aria-pressed={isSelected}
                                aria-label={`${time}${isSelected ? ', selecionado' : ''}`}
                                className={`py-2 rounded-full border text-center font-sans text-xs transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-[#4ea8de] text-white border-[#4ea8de] font-semibold shadow-md' 
                                    : 'border-brand-light-border hover:border-[#4ea8de]/50 text-brand-charcoal bg-white'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                        {errors.horarioVisita && (
                          <span id="horarioVisita-error" role="alert" className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1">
                            <AlertCircle size={10} />
                            {errors.horarioVisita}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                  <hr className="border-brand-light-border my-2" />

                  {/* Interesses pedagógicos adicionais */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-charcoal">Foco Pedagógico & Interesses</h4>
                      <p className="font-sans text-xs text-brand-charcoal-light/70 font-light">Selecione as áreas extracurriculares ou acadêmicas que mais interessam ao candidato.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3" role="group" aria-label="Interesses pedagógicos">
                      {INTERESSES_OPCOES.map(opt => {
                        const isChecked = formData.interesses.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleInteresseChange(opt.id)}
                            aria-pressed={isChecked}
                            aria-label={`${opt.label}${isChecked ? ', selecionado' : ''}`}
                            className={`p-3.5 px-5 rounded-full border text-left font-sans text-xs flex items-center justify-between transition-all duration-300 cursor-pointer ${
                              isChecked 
                                ? 'bg-[#ff7e1b]/10 border-[#ff7e1b] text-brand-charcoal font-semibold' 
                                : 'border-brand-light-border hover:border-[#ff7e1b]/30 text-brand-charcoal-light bg-white'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                              isChecked ? 'bg-[#ff7e1b] border-[#ff7e1b] text-white' : 'border-brand-light-border bg-white'
                            }`}>
                              {isChecked && <Check size={10} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 3: UPLOAD DE DOCUMENTOS */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-xl text-brand-charcoal mb-1">Documentação Preliminar</h3>
                    <p className="font-sans text-xs text-brand-charcoal-light/70 font-light">Anexe os arquivos preliminares para agilizar a análise da secretaria. O envio é recomendado, mas você pode avançar sem arquivos e enviá-los posteriormente.</p>
                  </div>

                  {/* Área Drag & Drop */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                    tabIndex={0}
                    role="button"
                    aria-label="Área de upload de documentos. Pressione Enter ou Espaço para selecionar arquivos."
                    aria-describedby="upload-description"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('file-upload')?.click();
                      }
                    }}
                    className={`w-full py-12 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 outline-none focus:border-[#ff7e1b] ${
                      isDragging 
                        ? 'border-[#ff7e1b] bg-[#fffcf7] scale-[1.01]' 
                        : 'border-brand-light-border hover:border-[#ff7e1b]/50 bg-[#fffcf7]'
                    }`}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      tabIndex={-1}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#ff7e1b]/10 flex items-center justify-center text-[#ff7e1b] animate-pulse">
                        <UploadCloud size={24} />
                      </div>
                      <div className="flex flex-col gap-1 px-4">
                        <span className="font-sans text-xs font-semibold text-brand-charcoal">Arrastar arquivos aqui ou clicar para selecionar</span>
                        <span id="upload-description" className="font-sans text-[10px] text-brand-charcoal-light/60">PDF, JPG, PNG ou DOC (Máximo 10MB por arquivo)</span>
                      </div>
                    </label>
                  </div>

                  {/* Lista de Arquivos */}
                  {files.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h4 className="font-serif text-xs uppercase tracking-wider text-brand-charcoal/80 font-bold">Arquivos Anexados ({files.length})</h4>
                      
                      <div className="flex flex-col gap-2" role="list" aria-live="polite">
                        {files.map(file => (
                          <div 
                            key={file.id}
                            role="listitem"
                            className="p-4 rounded-2xl border border-brand-light-border bg-white flex items-center justify-between gap-4 transition-all duration-500"
                          >
                            <div className="flex items-center gap-3 w-full min-w-0">
                              <div className="p-2 rounded-lg bg-brand-light-card border border-brand-light-border text-[#ff7e1b] shrink-0">
                                <FileText size={18} />
                              </div>
                              <div className="flex flex-col gap-1 w-full min-w-0">
                                <span className="font-sans text-xs font-medium text-brand-charcoal truncate">{file.name}</span>
                                <span className="font-sans text-[9px] text-brand-charcoal-light/65">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                
                                {/* Barra de progresso */}
                                {file.status === 'uploading' && (
                                  <div className="w-full bg-brand-light-border h-1.5 rounded-full overflow-hidden mt-1">
                                    <div 
                                      role="progressbar"
                                      aria-valuenow={file.progress}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      aria-label={`Progresso de upload para ${file.name}`}
                                      className="bg-brand-orange h-full rounded-full transition-all duration-300"
                                      style={{ width: `${file.progress}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {file.status === 'completed' && <CheckCircle size={16} className="text-green-500 animate-bounce" aria-label="Upload concluído" />}
                              {file.status === 'uploading' && <Loader2 size={16} className="text-brand-orange animate-spin" aria-label="Enviando arquivo" />}
                              
                              <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-brand-charcoal-light/50 hover:text-red-500 transition-colors duration-300"
                                aria-label={`Remover arquivo ${file.name}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Informativo sutil sobre quais documentos trazer */}
                  <div className="p-4 rounded-2xl bg-brand-light border border-brand-light-border flex gap-3">
                    <AlertCircle size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1 font-sans text-xs font-light text-brand-charcoal-light/75 leading-relaxed">
                      <span className="font-semibold text-brand-charcoal">Documentação recomendada para o dia da visita:</span>
                      <span>• RG e CPF do estudante e do responsável legal.</span>
                      <span>• Cópia do último boletim de notas ou declaração escolar.</span>
                      <span>• Comprovante de residência atualizado.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 4: RESUMO & CONFIRMAÇÃO */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-xl text-brand-charcoal mb-1">Confirmação de Inscrição</h3>
                    <p className="font-sans text-xs text-brand-charcoal-light/70 font-light">Revise todas as informações abaixo. Você poderá baixar sua Ficha de Interesse em formato PDF no botão abaixo.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
                    
                    {/* Resumo Responsável */}
                    <div className="p-5 rounded-2xl border border-brand-light-border bg-white flex flex-col gap-3">
                      <h4 className="font-serif text-xs uppercase tracking-wider text-brand-orange font-bold">Responsável Legal</h4>
                      <div className="flex flex-col gap-1.5 font-light text-brand-charcoal-light">
                        <p><strong className="font-medium text-brand-charcoal">Nome:</strong> {formData.respNome}</p>
                        <p><strong className="font-medium text-brand-charcoal">CPF:</strong> {formData.respCpf}</p>
                        <p><strong className="font-medium text-brand-charcoal">E-mail:</strong> {formData.respEmail}</p>
                        <p><strong className="font-medium text-brand-charcoal">WhatsApp:</strong> {formData.respTel}</p>
                      </div>
                    </div>

                    {/* Resumo Aluno */}
                    <div className="p-5 rounded-2xl border border-brand-light-border bg-white flex flex-col gap-3">
                      <h4 className="font-serif text-xs uppercase tracking-wider text-brand-orange font-bold">Candidato(a)</h4>
                      <div className="flex flex-col gap-1.5 font-light text-brand-charcoal-light">
                        <p><strong className="font-medium text-brand-charcoal">Nome:</strong> {formData.alunoNome}</p>
                        <p><strong className="font-medium text-brand-charcoal">Nascimento:</strong> {formData.alunoNasc ? new Date(formData.alunoNasc + 'T00:00:00').toLocaleDateString('pt-BR') : ''}</p>
                        <p><strong className="font-medium text-brand-charcoal">Série Pretendida:</strong> {formData.alunoSerie}</p>
                        <p>
                          <strong className="font-medium text-brand-charcoal">Focos Pedagógicos:</strong>{' '}
                          {formData.interesses.map(id => INTERESSES_OPCOES.find(o => o.id === id)?.label).join(', ') || 'Nenhum selecionado'}
                        </p>
                      </div>
                    </div>

                    {/* Resumo Agendamentos */}
                    <div className="p-5 rounded-2xl border border-brand-light-border bg-white flex flex-col gap-3 md:col-span-2">
                      <h4 className="font-serif text-xs uppercase tracking-wider text-brand-orange font-bold">Agendamentos Agendados</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-light text-brand-charcoal-light">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <p className="font-medium text-brand-charcoal text-xs">Teste Diagnóstico</p>
                            <p className="text-[11px]">{formData.dataTeste ? new Date(formData.dataTeste + 'T00:00:00').toLocaleDateString('pt-BR') : ''} às {formData.horarioTeste}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <p className="font-medium text-brand-charcoal text-xs">Visita ao Campus</p>
                            <p className="text-[11px]">{formData.dataVisita ? new Date(formData.dataVisita + 'T00:00:00').toLocaleDateString('pt-BR') : ''} às {formData.horarioVisita}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resumo Documentos */}
                    <div className="p-5 rounded-2xl border border-brand-light-border bg-white flex flex-col gap-3 md:col-span-2">
                      <h4 className="font-serif text-xs uppercase tracking-wider text-brand-orange font-bold">Documentos Anexados ({files.length})</h4>
                      {files.length === 0 ? (
                        <p className="font-light text-brand-charcoal-light/70 italic">Nenhum documento preliminar foi anexado.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {files.map(f => (
                            <span key={f.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-light-border bg-brand-light-card text-[10px] text-brand-charcoal font-medium">
                              <File size={10} className="text-brand-orange" />
                              {f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gerador de Ficha Oficial (Visualmente Premium) */}
                  <div className="mt-4 p-6 rounded-[2rem] bg-[#fffcf7] border-2 border-[#ff7e1b]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-2xl bg-[#ff7e1b] text-white flex items-center justify-center shrink-0">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-brand-charcoal">Ficha de Inscrição Digital</h4>
                        <p className="font-sans text-[10px] text-brand-charcoal-light/60">Gere e salve a cópia em PDF preenchida com as datas e dados.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={generatePDF}
                      aria-label="Baixar Ficha de Inscrição em PDF"
                      className="px-6 py-3 rounded-full border-2 border-[#ff7e1b] text-[#ff7e1b] hover:bg-[#ff7e1b] hover:text-white transition-all duration-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={14} />
                      Baixar PDF
                    </button>
                  </div>
                </div>
              )}

              {/* CONTROLES / BOTÕES DO FORMULÁRIO */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-brand-light-border">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Voltar para o passo anterior"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-brand-charcoal/20 hover:border-[#ff7e1b] hover:text-[#ff7e1b] text-brand-charcoal font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-500 cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    Voltar
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Continuar para o próximo passo"
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#ff7e1b] hover:bg-[#e78b53] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all duration-700 shadow-md shadow-[#ff7e1b]/20 cursor-pointer"
                  >
                    Continuar
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Finalizar inscrição e enviar dados"
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#4ea8de] hover:bg-[#3a96c4] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all duration-700 shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Finalizar & Enviar
                        <Send size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          ) : (
            
            /* TELA DE SUCESSO E SIMULAÇÃO DE E-MAIL */
            <div role="status" aria-live="polite" className="flex flex-col items-center text-center py-12 px-4 gap-6 animate-fade-in">
              
              {/* Animação do Envelope e Sucesso */}
              <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-[30px] animate-pulse"></div>
                <div 
                  ref={envelopeRef}
                  className="w-20 h-20 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-lg relative z-10"
                >
                  <Send size={36} />
                </div>
              </div>

              <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-orange font-bold">
                Inscrição Enviada com Sucesso
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">
                Seja Bem-vindo ao Processo de Admissão
              </h2>
              
              <div className="max-w-md font-sans text-xs sm:text-sm font-light text-brand-charcoal-light/80 leading-relaxed flex flex-col gap-3">
                <p>
                  A ficha de matrícula e o interesse no ingresso do estudante <strong className="font-medium text-brand-charcoal">{formData.alunoNome}</strong> foram registrados em nosso sistema.
                </p>
                <p>
                  A equipe de secretaria do <strong className="font-medium text-brand-charcoal">Colégio Saber</strong> foi notificada e uma cópia da inscrição com todos os agendamentos foi enviada para o e-mail: <span className="text-brand-orange font-medium">{formData.respEmail}</span>.
                </p>
              </div>

              {/* Informações Resumidas do Agendamento de Teste */}
              <div className="w-full max-w-sm mt-4 p-5 rounded-2xl bg-brand-light border border-brand-light-border flex flex-col gap-3 text-left">
                <span className="font-serif text-[11px] uppercase tracking-wider text-brand-orange font-bold">Guarde as datas:</span>
                <div className="flex flex-col gap-2 font-sans text-xs text-brand-charcoal-light">
                  <p>📅 <strong>Teste Diagnóstico:</strong> {formData.dataTeste ? new Date(formData.dataTeste + 'T00:00:00').toLocaleDateString('pt-BR') : ''} às {formData.horarioTeste}</p>
                  <p>🏫 <strong>Visita ao Campus:</strong> {formData.dataVisita ? new Date(formData.dataVisita + 'T00:00:00').toLocaleDateString('pt-BR') : ''} às {formData.horarioVisita}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="button"
                  onClick={generatePDF}
                  className="px-8 py-3.5 rounded-full border-2 border-[#ff7e1b] text-[#ff7e1b] hover:bg-[#ff7e1b] hover:text-white transition-all duration-700 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  Baixar Ficha (PDF)
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    navigate('/');
                    // Força recálculo do Lenis/GSAP scroll
                    window.scrollTo({ top: 0 });
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#ff7e1b] hover:bg-[#e78b53] text-white transition-all duration-700 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  Voltar ao Início
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
