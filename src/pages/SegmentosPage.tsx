import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { 
  Baby, Music, BookOpen, Leaf, Hammer, Cpu, PenTool, Smile, 
  MessagesSquare, Code, Compass, Lightbulb, Award, Sparkles, 
  Target, X, ArrowRight, Quote, Info, ChevronRight
} from 'lucide-react';

import infantilImg from '../assets/segmento_infantil.png';
import fund1Img from '../assets/segmento_fund1.png';
import fund2Img from '../assets/segmento_fund2.png';
import medioImg from '../assets/segmento_medio.png';

interface Oficina {
  title: string;
  description: string;
  icon: string;
}

interface Segmento {
  id: string;
  title: string;
  ageRange: string;
  description: string;
  highlight: string;
  image: string;
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
  oficinas: Oficina[];
}

const SEGMENTOS: Segmento[] = [
  {
    id: 'infantil',
    title: 'Educação Infantil',
    ageRange: 'Grupo 3 ao Grupo 5 (3 a 5 anos)',
    highlight: 'Desenvolvimento motor, ludicidade e bilinguismo inicial em contato constante com a natureza.',
    description: 'Nesta primeira etapa da vida escolar, acolhemos a criança com afeto e estimulamos sua curiosidade nata. Através de atividades lúdicas, vivências práticas no bosque e projetos de bilinguismo, desenvolvemos a socialização, a psicomotricidade e a linguagem em ambientes especialmente planejados para as necessidades da infância.',
    image: infantilImg,
    testimonial: {
      text: 'O acolhimento do colégio na transição para a Educação Infantil foi impecável. Minha filha de 4 anos adora as atividades no bosque e a rotina bilíngue integrada.',
      author: 'Mariana K.',
      role: 'Mãe da Cecília (Grupo 4)'
    },
    oficinas: [
      { title: 'Psicomotricidade Ativa', description: 'Atividades físicas planejadas para o desenvolvimento do equilíbrio, coordenação motora ampla, lateralidade e consciência corporal no espaço.', icon: 'Baby' },
      { title: 'Musicalização Infantil', description: 'Introdução ao universo sonoro através de brincadeiras cantadas, exploração de ritmos e contato inicial com instrumentos de percussão simples.', icon: 'Music' },
      { title: 'Contação de Histórias', description: 'Estímulo à imaginação, ampliação do vocabulário e gosto pela leitura utilizando fantasias, fantoches e cenários de faz de conta.', icon: 'BookOpen' },
      { title: 'Horta & Sustentabilidade', description: 'Vivências práticas onde as crianças colocam as mãos na terra, aprendem sobre o cultivo vegetal e compreendem a importância do cuidado ambiental.', icon: 'Leaf' }
    ]
  },
  {
    id: 'fundamental1',
    title: 'Ensino Fundamental I',
    ageRange: '1º ao 5º Ano (6 a 10 anos)',
    highlight: 'Consolidação da alfabetização, pensamento lógico e iniciação científica por meio de projetos práticos.',
    description: 'O Ensino Fundamental I consolida o processo de alfabetização e introduz novas áreas de investigação do conhecimento. Unindo tradição escolar e inovação pedagógica, desenvolvemos a leitura crítica, o raciocínio matemático e a autonomia nos estudos por meio de metodologias maker e cooperação.',
    image: fund1Img,
    testimonial: {
      text: 'A metodologia de projetos do Fundamental I instiga a curiosidade. Meu filho aprende ciências realizando experimentos práticos e se sente estimulado todos os dias.',
      author: 'Rodrigo M.',
      role: 'Pai do Lucas (3º Ano)'
    },
    oficinas: [
      { title: 'Maker Lab', description: 'Espaço de cocriação onde os alunos planejam e constroem protótipos físicos utilizando materiais diversos para solucionar desafios reais do dia a dia.', icon: 'Hammer' },
      { title: 'Robótica Inicial', description: 'Primeiro contato com lógica de programação básica e montagem de robôs inteligentes através de kits de blocos modulares adaptados.', icon: 'Cpu' },
      { title: 'Escrita Criativa', description: 'Oficina dedicada à produção literária autoral, estimulando a estruturação de enredos, poesia e criação de livros ilustrados na biblioteca.', icon: 'PenTool' },
      { title: 'Teatro & Expressão', description: 'Jogos teatrais para o desenvolvimento da oratória, expressão corporal, desinibição e cooperação coletiva entre os colegas.', icon: 'Smile' }
    ]
  },
  {
    id: 'fundamental2',
    title: 'Ensino Fundamental II',
    ageRange: '6º ao 9º Ano (11 a 14 anos)',
    highlight: 'Pensamento crítico, autonomia acadêmica aprimorada e cidadania digital para os novos tempos.',
    description: 'No Ensino Fundamental II, os estudantes encontram um currículo dinâmico liderado por professores especialistas em cada disciplina. Promovemos a reflexão crítica, a maturidade de hábitos de estudo, a análise de dilemas éticos mundiais e o aprofundamento das ciências experimentais em nossos laboratórios.',
    image: fund2Img,
    testimonial: {
      text: 'A transição para os múltiplos professores foi muito bem coordenada pela equipe pedagógica. Os projetos extracurriculares mantêm os jovens estimulados e conscientes.',
      author: 'Cláudia R.',
      role: 'Mãe da Julia (8º Ano)'
    },
    oficinas: [
      { title: 'Clube de Debates', description: 'Desenvolvimento de técnicas de retórica, argumentação fundamentada e oratória baseadas nos moldes das conferências das Nações Unidas (ONU).', icon: 'MessagesSquare' },
      { title: 'Lógica & Programação', description: 'Aprofundamento de algoritmos lógicos e códigos reais, programando com Scratch e Arduino para criar sistemas funcionais de automação eletrônica.', icon: 'Code' },
      { title: 'Iniciação Científica', description: 'Pesquisa acadêmica aplicada, ensinando técnicas de investigação bibliográfica, escrita científica de relatórios e condução de hipóteses.', icon: 'Compass' },
      { title: 'Empreendedorismo Social', description: 'Elaboração de projetos comunitários de impacto real, ensinando noções de finanças, economia sustentável e elaboração de planos de ação.', icon: 'Lightbulb' }
    ]
  },
  {
    id: 'medio',
    title: 'Ensino Médio',
    ageRange: '1ª a 3ª Série (15 a 17 anos)',
    highlight: 'Alta performance acadêmica, mentoria vocacional contínua e preparação intensiva para o vestibular.',
    description: 'Nossa formação no Ensino Médio é orientada para a excelência acadêmica e o desenvolvimento do projeto de vida de cada jovem. Unimos a excelência teórica e repertório sociocultural a simulados nacionais sistemáticos, mentoria individual de carreira e trilhas de disciplinas eletivas multidisciplinares.',
    image: medioImg,
    testimonial: {
      text: 'O suporte pedagógico e a mentoria individual no Terceirão foram cruciais. Minha filha conseguiu a aprovação em Medicina na USP logo no primeiro vestibular.',
      author: 'André S.',
      role: 'Pai da Gabriela (Egressa de 2025)'
    },
    oficinas: [
      { title: 'Redação Nota Mil', description: 'Trabalho analítico individual de redação focada no modelo do ENEM e nos principais vestibulares estaduais públicos (FUVEST/UNICAMP).', icon: 'Award' },
      { title: 'Eletivas Avançadas', description: 'Aprofundamento em trilhas eletivas especiais opcionais como Astrotecnologia, Filosofia Contemporânea e Economia Internacional.', icon: 'Sparkles' },
      { title: 'Mentoria Vocacional', description: 'Encontros individuais periódicos com psicólogos e mentores de carreira para delinear opções profissionais, testes vocacionais e projeto de vida.', icon: 'Target' }
    ]
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Baby': return <Baby size={18} />;
    case 'Music': return <Music size={18} />;
    case 'BookOpen': return <BookOpen size={18} />;
    case 'Leaf': return <Leaf size={18} />;
    case 'Hammer': return <Hammer size={18} />;
    case 'Cpu': return <Cpu size={18} />;
    case 'PenTool': return <PenTool size={18} />;
    case 'Smile': return <Smile size={18} />;
    case 'MessagesSquare': return <MessagesSquare size={18} />;
    case 'Code': return <Code size={18} />;
    case 'Compass': return <Compass size={18} />;
    case 'Lightbulb': return <Lightbulb size={18} />;
    case 'Award': return <Award size={18} />;
    case 'Sparkles': return <Sparkles size={18} />;
    case 'Target': return <Target size={18} />;
    default: return <Sparkles size={18} />;
  }
};

export default function SegmentosPage() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState<Segmento>(SEGMENTOS[0]);
  const [activeOficina, setActiveOficina] = useState<Oficina | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  const activeIndex = SEGMENTOS.findIndex(s => s.id === activeSegment.id);

  // GSAP: Animação na mudança de segmento
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { yPercent: 12, opacity: 0.8 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [activeSegment]);

  // Tecla Escape para fechar modal e escuta global
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveOficina(null);
      }
    };
    if (activeOficina) {
      window.addEventListener('keydown', handleGlobalKeyDown);
      // Foca no botão de fechar quando o modal abrir
      setTimeout(() => {
        modalCloseBtnRef.current?.focus();
      }, 50);
    }
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeOficina]);

  // Navegação por teclado nas abas verticais (ArrowUp / ArrowDown)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % SEGMENTOS.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + SEGMENTOS.length) % SEGMENTOS.length;
    } else {
      return;
    }
    setActiveSegment(SEGMENTOS[nextIndex]);
    setTimeout(() => {
      const btn = document.getElementById(`tab-${SEGMENTOS[nextIndex].id}`);
      btn?.focus();
    }, 20);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-light relative z-10 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-12">
        
        {/* Título & Cabeçalho de Introdução */}
        <div className="flex flex-col gap-3 text-left max-w-2xl">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-orange font-semibold">
            Nossa Proposta Pedagógica
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal font-medium">
            Segmentos de Ensino
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-light leading-relaxed">
            Conheça as etapas de desenvolvimento oferecidas pelo Colégio Saber, desenhadas com foco no aprendizado ativo, autonomia intelectual e acolhimento socioemocional.
          </p>
        </div>

        {/* Layout Grid Separador (Split Screen) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start mt-4">
          
          {/* PAINEL DA ESQUERDA: Menu de Navegação Vertical (Sticky) */}
          <div className="md:col-span-4 md:sticky md:top-36 flex flex-col gap-6 self-start z-10">
            <span className="font-sans text-[9px] uppercase tracking-widest text-brand-charcoal/45 font-bold">
              Etapas Escolares
            </span>
            
            {/* Lista de Abas */}
            <div 
              role="tablist" 
              aria-label="Segmentos de ensino"
              className="relative flex flex-col gap-4 pl-6 border-l border-brand-light-border"
            >
              {/* Linha indicadora ativa que desliza de cima para baixo */}
              <div 
                ref={indicatorRef}
                className="absolute left-[-1px] w-[2px] bg-brand-orange transition-all duration-700 ease-out"
                style={{ 
                  height: '24px', 
                  top: '10px',
                  transform: `translateY(${activeIndex * 48}px)` // altura de espaçamento entre as abas
                }}
              ></div>

              {SEGMENTOS.map((seg, idx) => {
                const isActive = activeSegment.id === seg.id;
                return (
                  <button
                    key={seg.id}
                    id={`tab-${seg.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${seg.id}`}
                    type="button"
                    onClick={() => setActiveSegment(seg)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`w-full text-left py-2 font-serif text-sm transition-all duration-300 focus:outline-none cursor-pointer ${
                      isActive 
                        ? 'text-brand-orange font-bold text-base scale-x-[1.01] translate-x-1' 
                        : 'text-brand-charcoal-light/70 hover:text-brand-orange hover:translate-x-0.5'
                    }`}
                  >
                    <span className="font-sans text-[10px] opacity-40 font-semibold mr-2">{String(idx + 1).padStart(2, '0')}.</span>
                    {seg.title}
                  </button>
                );
              })}
            </div>

            {/* Banner de Admissão Rápido */}
            <div className="hidden md:flex flex-col gap-4 p-6 rounded-2xl bg-brand-light-card border border-brand-light-border mt-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/2 rounded-full blur-2xl pointer-events-none"></div>
              <h4 className="font-serif text-xs font-semibold text-brand-charcoal uppercase tracking-wider">Ingresso 2026/2027</h4>
              <p className="font-sans text-[10px] text-brand-charcoal-light/75 leading-relaxed font-light">Garanta a matrícula do seu filho através do nosso processo digital interativo.</p>
              <button
                type="button"
                onClick={() => navigate('/admissao')}
                className="self-start text-[10px] uppercase font-bold text-brand-orange hover:text-brand-orange-dark flex items-center gap-1.5 transition-colors duration-300 focus:outline-none focus:text-brand-orange-dark cursor-pointer"
                aria-label="Ir para formulário de admissão"
              >
                Matricular agora
                <ArrowRight size={10} />
              </button>
            </div>
          </div>

          {/* PAINEL DA DIREITA: Exibição do Conteúdo do Segmento */}
          <div 
            id={`panel-${activeSegment.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeSegment.id}`}
            className="md:col-span-8 flex flex-col gap-8 w-full"
          >
            {/* Bloco de Imagem com Máscara e Animação */}
            <div className="w-full h-[260px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-3xl border border-brand-light-border bg-brand-light-card relative">
              <img 
                ref={imageRef}
                src={activeSegment.image} 
                alt={`Estudantes em atividade do segmento ${activeSegment.title}`} 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent pointer-events-none"></div>
            </div>

            {/* Conteúdo Detalhado (Animado via GSAP Ref) */}
            <div ref={contentRef} className="flex flex-col gap-6 text-left">
              
              {/* Idade Indicada e Título */}
              <div className="flex flex-col gap-2">
                <span className="self-start px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange font-sans text-[9px] uppercase tracking-widest font-semibold border border-brand-orange/15">
                  {activeSegment.ageRange}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-medium">
                  {activeSegment.title}
                </h2>
              </div>

              {/* Destaque Curricular */}
              <p className="font-serif text-base sm:text-lg italic text-brand-orange-dark font-light leading-relaxed border-l-2 border-brand-orange/30 pl-4 py-1">
                "{activeSegment.highlight}"
              </p>

              {/* Descrição Longa */}
              <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/85 font-light leading-relaxed">
                {activeSegment.description}
              </p>

              {/* Disciplinas Complementares e Oficinas */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 text-brand-charcoal">
                  <Info size={14} className="text-brand-orange shrink-0" />
                  <h3 className="font-serif text-sm font-semibold uppercase tracking-wider">
                    Diferenciais Curriculares & Oficinas
                  </h3>
                </div>
                
                {/* Grid das Oficinas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSegment.oficinas.map(oficina => (
                    <button
                      key={oficina.title}
                      type="button"
                      onClick={() => setActiveOficina(oficina)}
                      className="p-5 rounded-2xl border border-brand-light-border bg-white text-left font-sans flex flex-col justify-between gap-4 hover:border-brand-orange/40 hover:shadow-md transition-all duration-500 group focus:outline-none focus:border-brand-orange cursor-pointer"
                      aria-haspopup="dialog"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500 shrink-0">
                          {getIcon(oficina.icon)}
                        </div>
                        <span className="text-xs font-semibold text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
                          {oficina.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1">
                        Saber mais
                        <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Depoimento do Responsável (Testimonial Card) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-brand-light-card border border-brand-light-border mt-6 relative overflow-hidden flex flex-col gap-4">
                <Quote size={40} className="absolute -right-4 -bottom-4 text-brand-orange/4 opacity-40 transform rotate-12" />
                <p className="font-sans text-xs italic text-brand-charcoal-light/90 leading-relaxed font-light relative z-10">
                  "{activeSegment.testimonial.text}"
                </p>
                <div className="flex flex-col text-left relative z-10 border-t border-brand-light-border/40 pt-3.5">
                  <span className="font-serif text-xs font-semibold text-brand-charcoal">
                    {activeSegment.testimonial.author}
                  </span>
                  <span className="font-sans text-[10px] text-brand-charcoal-light/60">
                    {activeSegment.testimonial.role}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DIALOG/MODAL DE DETALHES DA OFICINA (Glassmorphism Premium) */}
      {activeOficina && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-charcoal/40 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveOficina(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div 
            className="bg-white border border-brand-light-border rounded-3xl max-w-md w-full p-8 relative shadow-2xl flex flex-col gap-6 text-left"
            onClick={(e) => e.stopPropagation()} // impede fechamento ao clicar no card
          >
            {/* Botão de Fechar */}
            <button
              ref={modalCloseBtnRef}
              type="button"
              onClick={() => setActiveOficina(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg hover:bg-brand-light-card text-brand-charcoal-light/50 hover:text-brand-orange transition-colors duration-300 focus:outline-none focus:text-brand-orange cursor-pointer"
              aria-label="Fechar informações da oficina"
            >
              <X size={16} />
            </button>

            {/* Ícone & Categoria */}
            <div className="flex items-center gap-3 mt-2">
              <div className="p-3 rounded-2xl bg-brand-orange/10 text-brand-orange shrink-0">
                {getIcon(activeOficina.icon)}
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[9px] uppercase tracking-widest text-brand-orange font-bold">Oficina Curricular</span>
                <h4 id="modal-title" className="font-serif text-sm font-semibold text-brand-charcoal uppercase tracking-wider">
                  {activeOficina.title}
                </h4>
              </div>
            </div>

            {/* Descritivo */}
            <p id="modal-description" className="font-sans text-xs text-brand-charcoal-light/85 leading-relaxed font-light">
              {activeOficina.description}
            </p>

            {/* Rodapé do Modal */}
            <div className="border-t border-brand-light-border pt-5 flex items-center justify-between mt-2">
              <span className="font-sans text-[9px] uppercase tracking-wider text-brand-charcoal/40 font-semibold">Colégio Saber</span>
              <button
                type="button"
                onClick={() => { setActiveOficina(null); navigate('/admissao'); }}
                className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-sans text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 focus:outline-none focus:bg-brand-orange-dark cursor-pointer"
              >
                Agendar Visita
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
