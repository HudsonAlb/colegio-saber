import { useState, useEffect } from 'react';
import {
  Calendar,
  Download,
  ArrowsClockwise,
  X,
  Check,
  MapPin,
  Clock,
  CheckCircle,
  BookOpen,
  UsersThree,
  Confetti,
  SunHorizon,
  CalendarPlus
} from '@phosphor-icons/react';

interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  category: 'exames' | 'reunioes' | 'eventos' | 'feriados';
}

const CATEGORIES = {
  exames: {
    id: 'exames',
    label: 'Exames & Provas',
    color: '#ff7e1b',
    bgClass: 'bg-brand-orange text-white',
    borderClass: 'border-brand-orange',
    icon: <BookOpen size={24} weight="duotone" />
  },
  reunioes: {
    id: 'reunioes',
    label: 'Reuniões Pedagógicas',
    color: '#4ea8de',
    bgClass: 'bg-brand-blue text-white',
    borderClass: 'border-brand-blue',
    icon: <UsersThree size={24} weight="duotone" />
  },
  eventos: {
    id: 'eventos',
    label: 'Eventos Sociais',
    color: '#66cc33',
    bgClass: 'bg-brand-green text-white',
    borderClass: 'border-brand-green',
    icon: <Confetti size={24} weight="duotone" />
  },
  feriados: {
    id: 'feriados',
    label: 'Feriados & Recessos',
    color: '#ffcb1e',
    bgClass: 'bg-brand-yellow text-brand-charcoal',
    borderClass: 'border-brand-yellow',
    icon: <SunHorizon size={24} weight="duotone" />
  }
};

const EVENTS_DATA: SchoolEvent[] = [
  { id: '1', title: 'Confraternização Universal', description: 'Feriado Nacional. Início de ano e recesso geral.', date: '2026-01-01', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '2', title: 'Carnaval (Recesso)', description: 'Recesso escolar de Carnaval.', date: '2026-02-16', time: 'Dia Todo', location: 'Campus', category: 'feriados' },
  { id: '3', title: 'Carnaval (Feriado)', description: 'Feriado Nacional de Carnaval.', date: '2026-02-17', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '4', title: 'Quarta-feira de Cinzas', description: 'Recesso no período da manhã. Aulas apenas no contraturno.', date: '2026-02-18', time: 'Dia Todo', location: 'Campus', category: 'feriados' },
  { id: '15', title: 'Reunião de Pais e Mestres', description: 'Primeiro encontro do ano para alinhar as expectativas e plano de ensino.', date: '2026-02-25', time: '19:00', location: 'Auditório Principal', category: 'reunioes' },
  { id: '16', title: 'Simulado Diagnóstico', description: 'Avaliação para nivelamento das turmas do Ensino Médio.', date: '2026-03-10', time: '08:00', location: 'Salas de Aula', category: 'exames' },
  { id: '5', title: 'Paixão de Cristo', description: 'Feriado Nacional (Sexta-feira Santa).', date: '2026-04-03', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '6', title: 'Páscoa', description: 'Domingo de Páscoa.', date: '2026-04-05', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '17', title: 'Festa da Família', description: 'Evento lúdico com gincanas e apresentações artísticas.', date: '2026-04-18', time: '10:00', location: 'Quadra Poliesportiva', category: 'eventos' },
  { id: '7', title: 'Tiradentes', description: 'Feriado Nacional. Homenagem ao inconfidente Joaquim José da Silva Xavier.', date: '2026-04-21', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '8', title: 'Dia do Trabalhador', description: 'Feriado Nacional.', date: '2026-05-01', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '18', title: 'Semana de Provas - 1º Trimestre', description: 'Avaliações somativas de todas as disciplinas.', date: '2026-05-15', time: '07:30', location: 'Salas de Aula', category: 'exames' },
  { id: '9', title: 'Corpus Christi', description: 'Feriado Nacional Religioso. Recesso escolar.', date: '2026-06-04', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '19', title: 'Festa Junina do Saber', description: 'Comidas típicas, quadrilha e muita diversão para todas as idades!', date: '2026-06-20', time: '15:00', location: 'Pátio Externo', category: 'eventos' },
  { id: '10', title: 'Independência do Brasil', description: 'Feriado Nacional.', date: '2026-09-07', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '11', title: 'Nossa Sra. Aparecida (Dia das Crianças)', description: 'Feriado Nacional da Padroeira do Brasil.', date: '2026-10-12', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '12', title: 'Finados', description: 'Feriado Nacional.', date: '2026-11-02', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '13', title: 'Proclamação da República', description: 'Feriado Nacional.', date: '2026-11-15', time: 'Dia Todo', location: 'Brasil', category: 'feriados' },
  { id: '20', title: 'Mostra de Ciências e Artes', description: 'Exposição dos trabalhos anuais dos alunos do Fundamental.', date: '2026-11-20', time: '09:00', location: 'Ginásio e Laboratórios', category: 'eventos' },
  { id: '14', title: 'Natal', description: 'Feriado Nacional. Celebração do Natal.', date: '2026-12-25', time: 'Dia Todo', location: 'Brasil', category: 'feriados' }
];

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function CalendarioPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['exames', 'reunioes', 'eventos', 'feriados']);

  // Estado da Sincronização Google Calendar
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncState, setSyncState] = useState<'idle' | 'auth' | 'syncing' | 'completed'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSynced, setIsSynced] = useState(() => {
    return localStorage.getItem('google_calendar_synced') === 'true';
  });

  const toggleFilter = (catId: string) => {
    setActiveFilters(prev =>
      prev.includes(catId)
        ? prev.filter(c => c !== catId)
        : [...prev, catId]
    );
  };

  // Filtragem e Agrupamento por Mês
  const filteredEvents = EVENTS_DATA.filter(evt => activeFilters.includes(evt.category))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const groupedByMonth = filteredEvents.reduce((acc, evt) => {
    const monthIdx = new Date(evt.date + 'T00:00:00').getMonth();
    if (!acc[monthIdx]) acc[monthIdx] = [];
    acc[monthIdx].push(evt);
    return acc;
  }, {} as Record<number, SchoolEvent[]>);

  // --- GERADOR DE ARQUIVO ICS FUNCIONAL (iCalendar) ---
  const handleExportICS = () => {
    if (filteredEvents.length === 0) return;

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Colegio Saber//Calendario Escolar//PT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n') + '\r\n';

    filteredEvents.forEach(evt => {
      const cleanDate = evt.date.replace(/-/g, '');
      const startDateTime = evt.time === 'Dia Todo' ? `${cleanDate}` : `${cleanDate}T${evt.time.replace(/:/g, '')}00`;
      const endDateTime = evt.time === 'Dia Todo' ? `${cleanDate}` : `${cleanDate}T${String(parseInt(evt.time.split(':')[0]) + 2).padStart(2, '0')}${evt.time.split(':')[1]}00`;

      const isDayTodo = evt.time === 'Dia Todo';

      icsContent += [
        'BEGIN:VEVENT',
        `UID:${evt.id}@colegiosaber.com.br`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        isDayTodo ? `DTSTART;VALUE=DATE:${startDateTime}` : `DTSTART:${startDateTime}`,
        isDayTodo ? `DTEND;VALUE=DATE:${endDateTime}` : `DTEND:${endDateTime}`,
        `SUMMARY:${evt.title}`,
        `DESCRIPTION:${evt.description}`,
        `LOCATION:${evt.location}`,
        'END:VEVENT'
      ].join('\r\n') + '\r\n';
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Calendario_Escolar_Colegio_Saber.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- SIMULAÇÃO DE SINCRONIZAÇÃO GOOGLE CALENDAR ---
  const handleStartSync = () => {
    setSyncState('auth');
  };

  const handleGoogleAuth = () => {
    setSyncState('syncing');
    setSyncProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (syncState === 'syncing') {
      interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setSyncState('completed');
              setIsSynced(true);
              localStorage.setItem('google_calendar_synced', 'true');
            }, 600);
            return 100;
          }
          return prev + Math.floor(Math.random() * 20) + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [syncState]);

  const handleResetSync = () => {
    setIsSynced(false);
    localStorage.removeItem('google_calendar_synced');
    setSyncState('idle');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent flex flex-col items-center relative z-10 overflow-x-clip">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-brand-yellow/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl w-full px-6 flex flex-col gap-12 relative z-10">

        {/* Cabeçalho Lúdico */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-brand-orange/10 text-brand-orange rounded-full animate-float-slow">
            <Calendar size={48} weight="duotone" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-charcoal font-bold mt-2">
            Mural Escolar
          </h1>
          <p className="font-sans text-sm sm:text-base text-brand-charcoal-light/80 font-medium max-w-xl mx-auto leading-relaxed">
            Fique por dentro de tudo que rola no Colégio Saber! Filtre pelo que mais importa pra você e adicione as datas na sua agenda pessoal com um clique.
          </p>
        </div>

        {/* Filtros Bento (Humanizados) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {Object.values(CATEGORIES).map((cat) => {
            const isActive = activeFilters.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleFilter(cat.id)}
                className={`group flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border-2 transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                  isActive 
                  ? `${cat.bgClass} ${cat.borderClass} shadow-lg shadow-${cat.id}/20 scale-[1.02]`
                  : 'bg-white border-brand-light-border text-brand-charcoal-light hover:border-brand-orange/30'
                }`}
              >
                <div className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-brand-orange'}`}>
                  {cat.icon}
                </div>
                <span className={`font-sans text-xs font-bold uppercase tracking-wider text-center ${isActive ? 'text-white' : 'text-brand-charcoal/70'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Interativa */}
        <div className="flex flex-col gap-16 mt-8 relative">
          
          {/* Linha Central da Timeline (Escondida no mobile, visível no md+) */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-brand-light-border rounded-full transform -translate-x-1/2"></div>

          {filteredEvents.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center gap-4 bg-white rounded-[3rem] border-2 border-dashed border-brand-light-border">
              <Calendar size={64} className="text-brand-charcoal/20" weight="duotone" />
              <h3 className="font-serif text-xl font-bold text-brand-charcoal/50">Nenhum evento para mostrar</h3>
              <p className="font-sans text-sm text-brand-charcoal/40 font-medium max-w-sm">
                Parece que todos os filtros estão desativados ou não temos eventos programados para esta seleção.
              </p>
            </div>
          ) : (
            Object.entries(groupedByMonth).map(([monthIdx, events], index) => {
              const monthName = MONTH_NAMES[parseInt(monthIdx)];
              return (
                <div key={monthIdx} className="flex flex-col md:flex-row gap-6 md:gap-12 relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  
                  {/* Etiqueta do Mês */}
                  <div className="md:w-32 flex-shrink-0 flex md:justify-end items-start pt-2 relative">
                    <div className="hidden md:flex absolute right-[-2.5rem] top-4 w-5 h-5 bg-white border-4 border-brand-orange rounded-full z-10 shadow-sm"></div>
                    <h2 className="font-serif font-bold text-3xl text-brand-orange drop-shadow-sm rotate-[-3deg] px-4 md:px-0 bg-[#fdfaf5] md:bg-transparent z-10">
                      {monthName}
                    </h2>
                  </div>

                  {/* Lista de Cards do Mês */}
                  <div className="flex flex-col gap-6 w-full relative z-10 pl-4 md:pl-0 border-l-4 border-brand-light-border/50 md:border-none ml-4 md:ml-0">
                    {events.map((evt) => {
                      const catConfig = CATEGORIES[evt.category];
                      const day = new Date(evt.date + 'T00:00:00').getDate();
                      
                      return (
                        <div 
                          key={evt.id} 
                          className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-brand-light-border shadow-sm hover:shadow-xl hover:border-brand-orange/30 transition-all duration-500 flex flex-col sm:flex-row gap-6 group"
                        >
                          {/* Data e Ícone */}
                          <div className="flex flex-col items-center justify-center bg-brand-light-card rounded-2xl p-4 min-w-[100px] border border-brand-light-border group-hover:bg-brand-orange/5 transition-colors duration-500">
                            <span className="font-sans text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest mb-1">{monthName.substring(0,3)}</span>
                            <span className="font-serif text-4xl font-bold text-brand-charcoal">{String(day).padStart(2, '0')}</span>
                            <div className="mt-2 text-brand-charcoal/30 group-hover:text-brand-orange transition-colors duration-500">
                              {catConfig.icon}
                            </div>
                          </div>

                          {/* Conteúdo do Evento */}
                          <div className="flex flex-col justify-center flex-1 gap-3">
                            <div>
                              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${catConfig.bgClass}`}>
                                {catConfig.label}
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal leading-tight">
                                {evt.title}
                              </h3>
                            </div>
                            
                            <p className="font-sans text-sm text-brand-charcoal-light/80 font-medium leading-relaxed">
                              {evt.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mt-2 pt-4 border-t border-brand-light-border/60">
                              <div className="flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                                <Clock size={16} weight="duotone" className="text-brand-orange" />
                                {evt.time}
                              </div>
                              <div className="flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                                <MapPin size={16} weight="duotone" className="text-brand-orange" />
                                {evt.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Bento Card de Sincronização e Download */}
        <div className="mt-12 bg-white rounded-[3rem] p-8 md:p-12 border-2 border-brand-orange/20 shadow-xl shadow-brand-orange/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="flex flex-col gap-4 max-w-xl relative z-10 text-center md:text-left">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">
              A agenda da escola direto no seu celular! 📱
            </h3>
            <p className="font-sans text-sm md:text-base font-medium text-brand-charcoal-light/80 leading-relaxed">
              Você pode sincronizar as datas com o seu Google Agenda ou baixar o arquivo para outros aplicativos. Assim, você recebe notificações automáticas de reuniões e passeios.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto relative z-10 shrink-0">
            {isSynced ? (
              <button
                type="button"
                onClick={handleResetSync}
                className="w-full px-8 py-4 rounded-full bg-green-50 border-2 border-green-200 text-green-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors duration-500 font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} className="text-green-600" weight="fill" />
                Sincronizado com Sucesso
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setIsSyncModalOpen(true); handleStartSync(); }}
                className="w-full px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white transition-all duration-500 font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 hover:shadow-brand-orange/30 cursor-pointer"
              >
                <CalendarPlus size={18} weight="bold" />
                Sincronizar Agenda
              </button>
            )}

            <button
              type="button"
              onClick={handleExportICS}
              className="w-full px-8 py-4 rounded-full bg-white border-2 border-brand-light-border hover:border-brand-orange/50 text-brand-charcoal hover:text-brand-orange transition-all duration-500 font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-1"
            >
              <Download size={18} weight="bold" />
              Baixar Arquivo .ICS
            </button>
          </div>
        </div>

      </div>

      {/* --- MODAL DO SIMULADOR DE SINCRONIZAÇÃO GOOGLE CALENDAR --- */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-charcoal/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-brand-light-border rounded-[2.5rem] max-w-md w-full p-8 shadow-2xl relative flex flex-col gap-6 text-center">

            <button
              type="button"
              onClick={() => setIsSyncModalOpen(false)}
              className="absolute top-6 right-6 text-brand-charcoal/40 hover:text-brand-orange transition-colors duration-300 cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} weight="bold" />
            </button>

            {syncState === 'auth' && (
              <div className="flex flex-col items-center gap-5 mt-4">
                <div className="w-16 h-16 rounded-3xl bg-brand-orange/10 flex items-center justify-center text-brand-orange animate-wiggle">
                  <Calendar size={32} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Sincronizar Google Agenda</h3>
                  <p className="font-sans text-sm text-brand-charcoal-light/70 font-medium leading-relaxed mt-3">
                    Conecte sua conta para importar os compromissos escolares direto para o seu celular.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 mt-2 border-2 border-brand-light-border hover:border-brand-orange/30 bg-white rounded-2xl hover:bg-brand-orange/5 font-sans text-sm font-bold text-brand-charcoal transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#ea4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.727 5.727 0 0 1 8.24 12.87a5.727 5.727 0 0 1 5.751-5.73c1.554 0 2.973.567 4.072 1.503l3.203-3.2A10.222 10.222 0 0 0 13.991 1.44a10.286 10.286 0 0 0-10.25 10.29 10.286 10.286 0 0 0 10.25 10.29c5.688 0 10.25-4.14 10.25-10.29 0-.64-.067-1.285-.201-1.92H12.24z" />
                  </svg>
                  <span>Acessar com o Google</span>
                </button>
              </div>
            )}

            {syncState === 'syncing' && (
              <div className="flex flex-col items-center gap-6 py-6">
                <ArrowsClockwise size={48} className="text-brand-orange animate-spin" weight="duotone" />
                <div className="w-full flex flex-col gap-3">
                  <span className="font-sans text-xs uppercase tracking-wider font-bold text-brand-orange">
                    Sincronizando as datas...
                  </span>
                  <div className="w-full bg-brand-light-border h-3 rounded-full overflow-hidden relative">
                    <div
                      className="bg-brand-orange h-full rounded-full transition-all duration-300"
                      style={{ width: `${syncProgress}%` }}
                    ></div>
                  </div>
                  <span className="font-sans text-sm font-bold text-brand-charcoal">{syncProgress}% concluído</span>
                </div>
              </div>
            )}

            {syncState === 'completed' && (
              <div className="flex flex-col items-center gap-5 mt-4">
                <div className="w-20 h-20 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center text-green-500 animate-fade-in">
                  <Check size={40} weight="bold" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal">Tudo pronto! 🎉</h3>
                  <p className="font-sans text-sm text-brand-charcoal-light/70 font-medium leading-relaxed mt-3">
                    A agenda do Colégio Saber está agora vinculada ao seu calendário. Fique tranquilo(a)!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSyncModalOpen(false)}
                  className="w-full mt-4 py-4 bg-brand-orange hover:bg-brand-orange-light text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors duration-500 shadow-lg cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
