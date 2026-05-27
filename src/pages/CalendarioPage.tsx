import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Calendar, List, Search, Download, RefreshCw, X, Check,
  ChevronLeft, ChevronRight, MapPin, Clock, Info, CheckCircle, AlertCircle
} from 'lucide-react';

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
  exames: { label: 'Exames & Provas', color: '#ff6b00', bgClass: 'bg-brand-orange/10 border-brand-orange text-brand-orange-dark', dotClass: 'bg-brand-orange' },
  reunioes: { label: 'Reuniões Pedagógicas', color: '#3b82f6', bgClass: 'bg-blue-50 border-blue-200 text-blue-700', dotClass: 'bg-blue-500' },
  eventos: { label: 'Eventos Sociais', color: '#10b981', bgClass: 'bg-emerald-50 border-emerald-200 text-emerald-700', dotClass: 'bg-emerald-500' },
  feriados: { label: 'Feriados & Recessos', color: '#eab308', bgClass: 'bg-yellow-50 border-yellow-200 text-yellow-700', dotClass: 'bg-yellow-500' }
};

const EVENTS_DATA: SchoolEvent[] = [
  // Maio 2026
  { id: '1', title: 'Avaliação Trimestral - Português', description: 'Exame escrito individual referente ao 1º trimestre para alunos do Ensino Fundamental II e Médio.', date: '2026-05-20', time: '08:00', location: 'Salas de Aula', category: 'exames' },
  { id: '2', title: 'Reunião de Pais e Mestres', description: 'Entrega de boletins informativos e mentoria pedagógica individualizada entre professores e pais.', date: '2026-05-23', time: '09:00', location: 'Auditório Principal', category: 'reunioes' },
  { id: '3', title: 'Mostra Científica e Cultural', description: 'Apresentação pública de projetos científicos e experimentos integrados desenvolvidos pelos alunos.', date: '2026-05-28', time: '10:00', location: 'Pátio Central & Laboratórios', category: 'eventos' },
  { id: '4', title: 'Recesso de Corpus Christi', description: 'Recesso escolar institucional sem atividades acadêmicas ou administrativas.', date: '2026-05-29', time: 'Dia Todo', location: 'Campus', category: 'feriados' },
  
  // Junho 2026
  { id: '5', title: 'Simulado ENEM - 1º Dia', description: 'Primeira fase do simulado nacional preparatório para o Ensino Médio, contendo Ciências Humanas e Linguagens.', date: '2026-06-03', time: '13:00', location: 'Bloco C', category: 'exames' },
  { id: '6', title: 'Dia da Preservação do Meio Ambiente', description: 'Oficinas práticas de plantio, compostagem e palestras educativas no Bosque Pedagógico.', date: '2026-06-05', time: '09:00', location: 'Bosque Externo', category: 'eventos' },
  { id: '7', title: 'Simulado ENEM - 2º Dia', description: 'Segunda fase do simulado nacional preparatório para o Ensino Médio, contendo Matemática e Ciências da Natureza.', date: '2026-06-10', time: '13:00', location: 'Bloco C', category: 'exames' },
  { id: '8', title: 'Festa Junina do Colégio Saber', description: 'Celebração tradicional beneficente com barracas típicas, danças folclóricas e shows musicais de alunos.', date: '2026-06-20', time: '12:00', location: 'Complexo Poliesportivo', category: 'eventos' },
  { id: '9', title: 'Conselho de Classe de Meio de Ano', description: 'Alinhamento acadêmico e pedagógico entre coordenadores e docentes. Sem aula para os alunos.', date: '2026-06-26', time: '08:00', location: 'Sala dos Professores', category: 'reunioes' },

  // Julho 2026 (Férias)
  { id: '10', title: 'Início do Recesso Escolar (Férias)', description: 'Período oficial de férias escolares de meio de ano para alunos e docentes.', date: '2026-07-01', time: 'Dia Todo', location: 'Campus', category: 'feriados' },
  { id: '11', title: 'Fim do Recesso Escolar (Retorno às Aulas)', description: 'Retorno às aulas regulares e início das atividades do 2º semestre.', date: '2026-07-27', time: '07:15', location: 'Salas de Aula', category: 'feriados' },
  
  // Agosto 2026
  { id: '12', title: 'Palestra: Inteligência Emocional e Futuro', description: 'Conversa voltada aos estudantes do Ensino Médio e familiares sobre vestibular e desenvolvimento socioemocional.', date: '2026-08-07', time: '19:30', location: 'Auditório Principal', category: 'reunioes' },
  { id: '13', title: 'Olimpíada Interna de Robótica', description: 'Competição interativa de robôs e automação com desafios de lógica programados pelos alunos.', date: '2026-08-18', time: '09:00', location: 'Laboratório de Robótica', category: 'eventos' },
  { id: '14', title: 'Avaliação Trimestral - Matemática', description: 'Exame de matemática e raciocínio lógico-matemático para todos os segmentos.', date: '2026-08-25', time: '07:30', location: 'Salas de Aula', category: 'exames' },

  // Setembro 2026
  { id: '15', title: 'Independência do Brasil (Feriado)', description: 'Feriado nacional. Campus fechado.', date: '2026-09-07', time: 'Dia Todo', location: 'Campus', category: 'feriados' },
  { id: '16', title: 'Festival de Artes & Teatro', description: 'Apresentações teatrais, mostras de música e galeria de pinturas criadas no semestre.', date: '2026-09-18', time: '14:00', location: 'Teatro do Colégio', category: 'eventos' },
  { id: '17', title: 'Reunião de Planejamento do 3º Trimestre', description: 'Reunião pedagógica de alinhamento estratégico para fechamento de ano.', date: '2026-09-29', time: '18:00', location: 'Auditório Principal', category: 'reunioes' }
];

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function CalendarioPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Data atual de visualização (inicia em Maio de 2026 para alinhar com os eventos criados)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 4, 1)); // 2026-05-01
  const [selectedDayEvents, setSelectedDayEvents] = useState<SchoolEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Estados de busca e filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['exames', 'reunioes', 'eventos', 'feriados']);

  // Estado da Sincronização Google Calendar
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncState, setSyncState] = useState<'idle' | 'auth' | 'syncing' | 'completed'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSynced, setIsSynced] = useState(() => {
    return localStorage.getItem('google_calendar_synced') === 'true';
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Animação de transição do grid ao mudar de mês
  const animateMonthChange = (isNext: boolean) => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current,
        { x: isNext ? 80 : -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
    if (listRef.current) {
      gsap.fromTo(listRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
    setSelectedDay(null);
    setSelectedDayEvents([]);
    setTimeout(() => animateMonthChange(false), 20);
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
    setSelectedDay(null);
    setSelectedDayEvents([]);
    setTimeout(() => animateMonthChange(true), 20);
  };

  // Filtragem dos eventos com base em busca e filtros de categoria
  const filteredEvents = EVENTS_DATA.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.includes(evt.category);
    return matchesSearch && matchesFilter;
  });

  // Eventos filtrados que pertencem ao mês visualizado
  const activeMonthEvents = filteredEvents.filter(evt => {
    const evtDate = new Date(evt.date + 'T00:00:00');
    return evtDate.getFullYear() === currentDate.getFullYear() && evtDate.getMonth() === currentDate.getMonth();
  });

  // Geração da Grade de Dias
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // Dia da semana em que começa o mês (0 = Domingo)
  const totalDays = new Date(year, month + 1, 0).getDate(); // Dias totais no mês

  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  const cells: { day: number; isCurrentMonth: boolean; dateString: string }[] = [];

  // Preenche células do mês anterior (padding)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    const prevDate = new Date(year, month - 1, day);
    const dateString = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({ day, isCurrentMonth: false, dateString });
  }

  // Preenche células do mês atual
  for (let i = 1; i <= totalDays; i++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    cells.push({ day: i, isCurrentMonth: true, dateString });
  }

  // Preenche células do próximo mês até fechar a grade (geralmente múltiplo de 7)
  const remainingCells = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const nextDate = new Date(year, month + 1, i);
    const dateString = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    cells.push({ day: i, isCurrentMonth: false, dateString });
  }

  // Clique em um dia na visualização de grade
  const handleDayClick = (day: number, isCurrentMonth: boolean, dateString: string) => {
    if (!isCurrentMonth) return;
    
    setSelectedDay(day);
    const dayEvents = filteredEvents.filter(evt => evt.date === dateString);
    setSelectedDayEvents(dayEvents);
  };

  const toggleFilter = (catId: string) => {
    setActiveFilters(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId) 
        : [...prev, catId]
    );
  };

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
    <div className="pt-32 pb-24 min-h-screen bg-brand-light flex flex-col justify-center items-center relative z-10">
      <div className="max-w-6xl w-full px-6 flex flex-col gap-10">
        
        {/* Título & Introdução */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2 max-w-xl text-left">
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-brand-orange font-semibold">
              Calendário de Compromissos
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal font-medium">
              Calendário Acadêmico
            </h1>
            <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-light leading-relaxed">
              Consulte datas de avaliações, feriados, recessos e eventos socioculturais. Sincronize com a sua agenda pessoal para não perder nenhum prazo.
            </p>
          </div>

          {/* Botões de Integração */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExportICS}
              className="px-5 py-3 rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-700 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
            >
              <Download size={14} />
              Exportar Agenda (.ics)
            </button>

            {isSynced ? (
              <button
                type="button"
                onClick={handleResetSync}
                className="px-5 py-3 rounded-full bg-green-50 border border-green-200 text-green-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors duration-700 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                title="Desconectar calendário do Google"
              >
                <CheckCircle size={14} className="text-green-600" />
                Sincronizado
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setIsSyncModalOpen(true); handleStartSync(); }}
                className="px-5 py-3 rounded-full bg-brand-charcoal hover:bg-brand-orange text-white transition-colors duration-700 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                Sincronizar Google Agenda
              </button>
            )}
          </div>
        </div>

        {/* Painel de Filtros e Busca */}
        <div className="p-6 rounded-3xl bg-brand-light-card border border-brand-light-border flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Barra de Busca */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar evento, local..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-light-border bg-white font-sans text-xs outline-none focus:border-brand-orange transition-colors duration-500"
            />
          </div>

          {/* Tags de Categoria */}
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-end w-full md:w-auto">
            {Object.entries(CATEGORIES).map(([id, cat]) => {
              const isActive = activeFilters.includes(id);
              const count = EVENTS_DATA.filter(e => e.category === id).length;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFilter(id)}
                  className={`px-4 py-2.5 rounded-xl border font-sans text-xs font-medium flex items-center gap-2.5 transition-all duration-500 ${
                    isActive 
                      ? `${cat.bgClass} shadow-sm font-semibold` 
                      : 'border-brand-light-border bg-white text-brand-charcoal-light/60 hover:border-brand-orange/40 hover:text-brand-orange'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${cat.dotClass}`}></span>
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout do Calendário */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Calendário Grade/Lista (Esquerda) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Controles de Cabeçalho do Mês e ViewMode */}
            <div className="flex justify-between items-center p-5 rounded-2xl border border-brand-light-border bg-brand-light-card">
              {/* Navegador de Mês */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2.5 rounded-xl border border-brand-light-border bg-white hover:border-brand-orange/40 text-brand-charcoal hover:text-brand-orange transition-colors duration-500"
                  aria-label="Mês anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <h3 className="font-serif text-lg md:text-xl font-semibold text-brand-charcoal tracking-wide w-40 text-center select-none">
                  {MONTH_NAMES[month]} {year}
                </h3>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2.5 rounded-xl border border-brand-light-border bg-white hover:border-brand-orange/40 text-brand-charcoal hover:text-brand-orange transition-colors duration-500"
                  aria-label="Próximo mês"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Seletor de Modo de Exibição */}
              <div className="flex bg-brand-light border border-brand-light-border p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                    viewMode === 'grid' ? 'bg-brand-orange text-white' : 'text-brand-charcoal/65 hover:text-brand-orange'
                  }`}
                  title="Exibição em Grade"
                >
                  <Calendar size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                    viewMode === 'list' ? 'bg-brand-orange text-white' : 'text-brand-charcoal/65 hover:text-brand-orange'
                  }`}
                  title="Exibição em Feed"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Visualização de Grade */}
            {viewMode === 'grid' && (
              <div 
                ref={gridRef}
                className="bg-brand-light-card border border-brand-light-border rounded-3xl p-6 shadow-sm select-none"
              >
                {/* Dias da Semana */}
                <div className="grid grid-cols-7 gap-2 text-center border-b border-brand-light-border pb-4 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                    <span key={d} className="font-sans text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/40">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Células de Dias */}
                <div className="grid grid-cols-7 gap-2">
                  {cells.map((cell, idx) => {
                    const hasEvents = filteredEvents.some(e => e.date === cell.dateString);
                    const dayEvents = filteredEvents.filter(e => e.date === cell.dateString);
                    const isSelected = selectedDay === cell.day && cell.isCurrentMonth;
                    
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDayClick(cell.day, cell.isCurrentMonth, cell.dateString)}
                        disabled={!cell.isCurrentMonth}
                        className={`h-16 sm:h-20 p-2 border rounded-2xl flex flex-col justify-between items-start text-left transition-all duration-300 relative ${
                          !cell.isCurrentMonth
                            ? 'border-transparent bg-transparent opacity-20'
                            : isSelected
                            ? 'border-brand-orange bg-brand-orange/5 font-bold shadow-md shadow-brand-orange/5 scale-[1.02]'
                            : 'border-brand-light-border bg-white hover:border-brand-orange/40 text-brand-charcoal'
                        }`}
                      >
                        <span className={`font-sans text-xs font-semibold ${
                          isSelected ? 'text-brand-orange' : 'text-brand-charcoal/80'
                        }`}>
                          {cell.day}
                        </span>

                        {/* Indicadores de Eventos */}
                        {cell.isCurrentMonth && hasEvents && (
                          <div className="flex gap-1 flex-wrap mt-2 w-full">
                            {dayEvents.slice(0, 3).map(evt => (
                              <span 
                                key={evt.id} 
                                className={`w-1.5 h-1.5 rounded-full ${CATEGORIES[evt.category].dotClass}`}
                                title={evt.title}
                              ></span>
                            ))}
                            {dayEvents.length > 3 && (
                              <span className="text-[7px] text-brand-charcoal/40 font-bold">+{dayEvents.length - 3}</span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Visualização em Feed / Lista */}
            {viewMode === 'list' && (
              <div 
                ref={listRef}
                className="flex flex-col gap-4"
              >
                {activeMonthEvents.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl border border-brand-light-border bg-brand-light-card flex flex-col items-center gap-3">
                    <AlertCircle size={24} className="text-brand-charcoal/30" />
                    <p className="font-sans text-xs font-light text-brand-charcoal-light/70">Nenhum compromisso escolar agendado com os filtros ativos para este mês.</p>
                  </div>
                ) : (
                  activeMonthEvents.map(evt => (
                    <div 
                      key={evt.id}
                      className={`p-6 rounded-3xl border border-l-4 bg-brand-light-card border-brand-light-border hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between gap-4 text-left`}
                      style={{ borderLeftColor: CATEGORIES[evt.category].color }}
                    >
                      <div className="flex flex-col gap-2 max-w-xl">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2.5 py-1 rounded-lg font-sans text-[9px] uppercase tracking-wider font-semibold ${CATEGORIES[evt.category].bgClass}`}>
                            {CATEGORIES[evt.category].label}
                          </span>
                          <span className="font-sans text-[10px] text-brand-charcoal/40 font-medium">
                            {new Date(evt.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-semibold text-brand-charcoal">{evt.title}</h4>
                        <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed">{evt.description}</p>
                      </div>

                      <div className="flex md:flex-col justify-start gap-4 text-[10px] uppercase font-semibold text-brand-charcoal/50 shrink-0 border-t md:border-t-0 md:border-l border-brand-light-border pt-3 md:pt-0 md:pl-5">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-brand-orange" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-brand-orange" />
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

          {/* Painel de Eventos do Dia Selecionado (Direita) */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-brand-light-card border border-brand-light-border rounded-3xl p-6 shadow-sm flex flex-col gap-5 text-left">
              <div>
                <h4 className="font-serif text-sm font-semibold text-brand-charcoal uppercase tracking-wider">
                  Compromissos do Dia
                </h4>
                <p className="font-sans text-[10px] text-brand-charcoal-light/60">
                  {selectedDay 
                    ? `Visualizando: ${String(selectedDay).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`
                    : 'Selecione um dia no calendário para detalhar os eventos.'
                  }
                </p>
              </div>

              {selectedDay === null ? (
                <div className="py-8 flex flex-col items-center gap-2.5 text-center border-2 border-dashed border-brand-light-border rounded-2xl bg-white p-4">
                  <Info size={20} className="text-brand-orange" />
                  <p className="font-sans text-[11px] font-light text-brand-charcoal-light/70 leading-relaxed">
                    Clique em um dia ativo no grid mensal do calendário para carregar a pauta de atividades da data.
                  </p>
                </div>
              ) : selectedDayEvents.length === 0 ? (
                <div className="py-8 flex flex-col items-center gap-2.5 text-center border border-brand-light-border rounded-2xl bg-white p-4">
                  <CheckCircle size={20} className="text-green-500" />
                  <p className="font-sans text-[11px] font-light text-brand-charcoal-light/70 leading-relaxed">
                    Nenhum compromisso ou prova marcada para este dia.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {selectedDayEvents.map(evt => (
                    <div 
                      key={evt.id} 
                      className="p-4 rounded-xl border border-brand-light-border bg-white flex flex-col gap-2 transition-shadow duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${CATEGORIES[evt.category].dotClass}`}></span>
                        <span className="font-serif text-[10px] font-bold uppercase tracking-wider text-brand-charcoal-light/80">
                          {CATEGORIES[evt.category].label}
                        </span>
                      </div>
                      
                      <h5 className="font-serif text-xs font-semibold text-brand-charcoal leading-snug">{evt.title}</h5>
                      <p className="font-sans text-[10px] text-brand-charcoal-light/75 font-light leading-relaxed">{evt.description}</p>
                      
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider font-semibold text-brand-charcoal/40 border-t border-brand-light-border/60 pt-2 mt-1">
                        <span className="flex items-center gap-1"><Clock size={10} /> {evt.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} /> {evt.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Aviso Informativo das Férias */}
            <div className="p-5 rounded-3xl bg-brand-orange/5 border border-brand-orange/15 flex gap-3 text-left">
              <Info size={18} className="text-brand-orange shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 font-sans text-xs text-brand-charcoal-light/80 font-light leading-relaxed">
                <span className="font-semibold text-brand-charcoal">Planejamento das Férias:</span>
                <span>O recesso letivo escolar de meio de ano está previsto para o período de 01/07 a 26/07. A secretaria operará em horários diferenciados de plantão.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* --- MODAL DO SIMULADOR DE SINCRONIZAÇÃO GOOGLE CALENDAR --- */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-charcoal/60 backdrop-blur-md animate-fade-in">
          
          <div className="bg-white border border-brand-light-border rounded-3xl max-w-md w-full p-8 shadow-2xl relative flex flex-col gap-6 text-center">
            
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsSyncModalOpen(false)}
              className="absolute top-4 right-4 text-brand-charcoal/40 hover:text-brand-orange transition-colors duration-300 pointer-events-auto"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            {/* Estados da Sincronização */}
            {syncState === 'auth' && (
              <div className="flex flex-col items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange animate-pulse">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal">Sincronizar Google Agenda</h3>
                  <p className="font-sans text-xs text-brand-charcoal-light/70 font-light leading-relaxed mt-2">
                    Conecte sua conta do Google para importar automaticamente todos os compromissos escolares do Colégio Saber para sua agenda móvel.
                  </p>
                </div>

                {/* Botão Google Fictício */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border border-brand-light-border hover:border-brand-charcoal/30 bg-white rounded-xl shadow-sm hover:shadow-md font-sans text-xs font-semibold text-brand-charcoal transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#ea4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.727 5.727 0 0 1 8.24 12.87a5.727 5.727 0 0 1 5.751-5.73c1.554 0 2.973.567 4.072 1.503l3.203-3.2A10.222 10.222 0 0 0 13.991 1.44a10.286 10.286 0 0 0-10.25 10.29 10.286 10.286 0 0 0 10.25 10.29c5.688 0 10.25-4.14 10.25-10.29 0-.64-.067-1.285-.201-1.92H12.24z"/>
                  </svg>
                  <span>Acessar com o Google</span>
                </button>
              </div>
            )}

            {syncState === 'syncing' && (
              <div className="flex flex-col items-center gap-6 py-4">
                <RefreshCw size={36} className="text-brand-orange animate-spin" />
                <div className="w-full flex flex-col gap-2">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-brand-orange">
                    Sincronizando Dados
                  </span>
                  
                  {/* Barra de Progresso */}
                  <div className="w-full bg-brand-light-border h-2 rounded-full overflow-hidden mt-1 relative">
                    <div 
                      className="bg-brand-orange h-full rounded-full transition-all duration-300"
                      style={{ width: `${syncProgress}%` }}
                    ></div>
                  </div>
                  <span className="font-sans text-xs font-bold text-brand-charcoal">{syncProgress}%</span>
                </div>
                <p className="font-sans text-[11px] text-brand-charcoal-light/60 font-light">
                  Aguarde enquanto os eventos do ano de 2026 estão sendo vinculados ao seu calendário escolar.
                </p>
              </div>
            )}

            {syncState === 'completed' && (
              <div className="flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600 animate-bounce">
                  <Check size={32} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal">Sincronização Ativada!</h3>
                  <p className="font-sans text-xs text-brand-charcoal-light/70 font-light leading-relaxed mt-2">
                    Agenda escolar sincronizada com sucesso. Quaisquer novas atualizações pedagógicas serão enviadas diretamente para a sua conta do Google Calendar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSyncModalOpen(false)}
                  className="w-full py-3 bg-brand-charcoal hover:bg-brand-orange text-white rounded-xl shadow-md font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-700"
                >
                  Concluir
                </button>
              </div>
            )}

          </div>
          
        </div>
      )}

    </div>
  );
}
