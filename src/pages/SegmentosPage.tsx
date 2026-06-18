import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Baby, MusicNotes, BookOpen, Leaf, Hammer, Cpu, PenNib, Smiley, Chats, Code, Compass, Lightbulb, Medal, Sparkle, Target, X, ArrowRight, Quotes, CaretRight, Question, Backpack, Student, GraduationCap } from '@phosphor-icons/react';

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
  shortTitle: string;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
  themeShadow: string;
  navIcon: React.ReactNode;
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
    shortTitle: 'Infantil',
    themeColor: 'text-brand-orange',
    themeBg: 'bg-brand-orange',
    themeBorder: 'border-brand-orange',
    themeShadow: 'shadow-brand-orange/30',
    navIcon: <Baby size={32} weight="duotone" />,
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
      { title: 'Musicalização Infantil', description: 'Introdução ao universo sonoro através de brincadeiras cantadas, exploração de ritmos e contato inicial com instrumentos de percussão simples.', icon: 'MusicNotes' },
      { title: 'Contação de Histórias', description: 'Estímulo à imaginação, ampliação do vocabulário e gosto pela leitura utilizando fantasias, fantoches e cenários de faz de conta.', icon: 'BookOpen' },
      { title: 'Horta & Sustentabilidade', description: 'Vivências práticas onde as crianças colocam as mãos na terra, aprendem sobre o cultivo vegetal e compreendem a importância do cuidado ambiental.', icon: 'Leaf' }
    ]
  },
  {
    id: 'fundamental1',
    title: 'Ensino Fundamental I',
    shortTitle: 'Fund. I',
    themeColor: 'text-brand-green',
    themeBg: 'bg-brand-green',
    themeBorder: 'border-brand-green',
    themeShadow: 'shadow-brand-green/30',
    navIcon: <Backpack size={32} weight="duotone" />,
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
      { title: 'Escrita Criativa', description: 'Oficina dedicada à produção literária autoral, estimulando a estruturação de enredos, poesia e criação de livros ilustrados na biblioteca.', icon: 'PenNib' },
      { title: 'Teatro & Expressão', description: 'Jogos teatrais para o desenvolvimento da oratória, expressão corporal, desinibição e cooperação coletiva entre os colegas.', icon: 'Smiley' }
    ]
  },
  {
    id: 'fundamental2',
    title: 'Ensino Fundamental II',
    shortTitle: 'Fund. II',
    themeColor: 'text-brand-blue',
    themeBg: 'bg-brand-blue',
    themeBorder: 'border-brand-blue',
    themeShadow: 'shadow-brand-blue/30',
    navIcon: <Student size={32} weight="duotone" />,
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
      { title: 'Clube de Debates', description: 'Desenvolvimento de técnicas de retórica, argumentação fundamentada e oratória baseadas nos moldes das conferências das Nações Unidas (ONU).', icon: 'Chats' },
      { title: 'Lógica & Programação', description: 'Aprofundamento de algoritmos lógicos e códigos reais, programando com Scratch e Arduino para criar sistemas funcionais de automação eletrônica.', icon: 'Code' },
      { title: 'Iniciação Científica', description: 'Pesquisa acadêmica aplicada, ensinando técnicas de investigação bibliográfica, escrita científica de relatórios e condução de hipóteses.', icon: 'Compass' },
      { title: 'Empreendedorismo Social', description: 'Elaboração de projetos comunitários de impacto real, ensinando noções de finanças, economia sustentável e elaboração de planos de ação.', icon: 'Lightbulb' }
    ]
  },
  {
    id: 'medio',
    title: 'Ensino Médio',
    shortTitle: 'Médio',
    themeColor: 'text-brand-yellow-dark',
    themeBg: 'bg-brand-yellow',
    themeBorder: 'border-brand-yellow',
    themeShadow: 'shadow-brand-yellow/30',
    navIcon: <GraduationCap size={32} weight="duotone" />,
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
      { title: 'Redação Nota Mil', description: 'Trabalho analítico individual de redação focada no modelo do ENEM e nos principais vestibulares estaduais públicos (FUVEST/UNICAMP).', icon: 'Medal' },
      { title: 'Eletivas Avançadas', description: 'Aprofundamento em trilhas eletivas especiais opcionais como Astrotecnologia, Filosofia Contemporânea e Economia Internacional.', icon: 'Sparkles' },
      { title: 'Mentoria Vocacional', description: 'Encontros individuais periódicos com psicólogos e mentores de carreira para delinear opções profissionais, testes vocacionais e projeto de vida.', icon: 'Target' }
    ]
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Baby': return <Baby size={20} weight="duotone" />;
    case 'MusicNotes': return <MusicNotes size={20} weight="duotone" />;
    case 'BookOpen': return <BookOpen size={20} weight="duotone" />;
    case 'Leaf': return <Leaf size={20} weight="duotone" />;
    case 'Hammer': return <Hammer size={20} weight="duotone" />;
    case 'Cpu': return <Cpu size={20} weight="duotone" />;
    case 'PenNib': return <PenNib size={20} weight="duotone" />;
    case 'Smiley': return <Smiley size={20} weight="duotone" />;
    case 'Chats': return <Chats size={20} weight="duotone" />;
    case 'Code': return <Code size={20} weight="duotone" />;
    case 'Compass': return <Compass size={20} weight="duotone" />;
    case 'Lightbulb': return <Lightbulb size={20} weight="duotone" />;
    case 'Medal': return <Medal size={20} weight="duotone" />;
    case 'Sparkles': return <Sparkle size={20} weight="duotone" />;
    case 'Target': return <Target size={20} weight="duotone" />;
    default: return <Question size={20} weight="duotone" />;
  }
};

export default function SegmentosPage() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState<Segmento>(SEGMENTOS[0]);
  const [activeOficina, setActiveOficina] = useState<Oficina | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  // Animação de Entrada na Troca de Segmento
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { scale: 1.05, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
      );
    }
  }, [activeSegment]);

  // Acessibilidade Modal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveOficina(null);
      }
    };
    if (activeOficina) {
      window.addEventListener('keydown', handleGlobalKeyDown);
      setTimeout(() => {
        modalCloseBtnRef.current?.focus();
      }, 50);
    }
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeOficina]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent relative z-10 flex flex-col items-center overflow-x-clip">
      
      {/* Background Blobs Lúdicos */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-brand-yellow/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl w-full px-6 flex flex-col gap-12 relative z-10">

        {/* Título & Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">
            Jornada do Conhecimento
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-charcoal font-bold mt-2">
            Nossas Etapas
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-charcoal-light/80 font-medium leading-relaxed">
            Descubra como o Colégio Saber acompanha seu filho em cada fase: desde as primeiras brincadeiras até a sonhada vaga na universidade!
          </p>
        </div>

        {/* BENTO TABS de Navegação */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {SEGMENTOS.map((seg) => {
            const isActive = activeSegment.id === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => setActiveSegment(seg)}
                className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-4 transition-all duration-500 cursor-pointer ${
                  isActive 
                  ? `${seg.themeBg} ${seg.themeBorder} shadow-xl ${seg.themeShadow} scale-105 text-brand-light z-10`
                  : `bg-white border-brand-light-border text-brand-charcoal-light/70 hover:border-brand-light-border/80 hover:-translate-y-1`
                }`}
              >
                <div className={`transition-transform duration-500 ${isActive ? 'scale-110 text-brand-charcoal' : `group-hover:scale-110 ${seg.themeColor}`}`}>
                  {seg.navIcon}
                </div>
                <span className={`font-serif text-sm md:text-base font-bold tracking-wide text-center ${isActive ? (seg.id === 'medio' ? 'text-brand-charcoal' : 'text-white') : 'text-brand-charcoal/80'}`}>
                  {seg.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONTEÚDO ATIVO DO SEGMENTO */}
        <div className={`p-8 md:p-12 rounded-[3rem] bg-white border-2 border-brand-light-border shadow-2xl shadow-brand-charcoal/5 flex flex-col gap-10 overflow-hidden relative transition-all duration-700`}>
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            
            {/* Texto Descritivo */}
            <div ref={contentRef} className="flex-1 flex flex-col gap-6 text-left order-2 lg:order-1">
              <div className="flex flex-col gap-3">
                <span className={`self-start px-4 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-widest font-bold border ${activeSegment.id === 'medio' ? 'bg-brand-yellow/20 text-brand-yellow-dark border-brand-yellow/30' : `bg-white ${activeSegment.themeColor} ${activeSegment.themeBorder}`}`}>
                  {activeSegment.ageRange}
                </span>
                <h2 className="font-serif font-bold text-4xl sm:text-5xl text-brand-charcoal drop-shadow-sm mt-2">
                  {activeSegment.title}
                </h2>
              </div>

              <p className={`font-serif text-lg md:text-xl italic font-medium leading-relaxed border-l-4 pl-5 py-2 ${activeSegment.themeBorder} ${activeSegment.themeColor}`}>
                "{activeSegment.highlight}"
              </p>

              <p className="font-sans text-sm md:text-base text-brand-charcoal-light/85 font-medium leading-relaxed">
                {activeSegment.description}
              </p>

              {/* Botão Call to Action Integrado */}
              <button
                type="button"
                onClick={() => navigate('/admissao')}
                className={`self-start mt-4 px-8 py-4 rounded-full ${activeSegment.themeBg} ${activeSegment.id === 'medio' ? 'text-brand-charcoal' : 'text-white'} font-sans text-xs uppercase tracking-wider font-bold transition-all duration-500 shadow-lg ${activeSegment.themeShadow} hover:-translate-y-1 hover:shadow-xl cursor-pointer flex items-center gap-2`}
              >
                Matricular no {activeSegment.shortTitle}
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>

            {/* Imagem do Segmento com Bordas Orgânicas */}
            <div className="w-full lg:w-5/12 h-[300px] md:h-[450px] overflow-hidden rounded-[3rem] border-4 border-brand-light-card shadow-lg relative order-1 lg:order-2">
              <img
                ref={imageRef}
                src={activeSegment.image}
                alt={`Atividade do ${activeSegment.title}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className={`absolute inset-0 border-[8px] rounded-[3rem] pointer-events-none opacity-20 ${activeSegment.themeBorder}`}></div>
            </div>

          </div>

          <hr className="border-brand-light-border/60" />

          {/* Destaques (Oficinas & Depoimento) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Bloco Oficinas */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex items-center gap-3 text-brand-charcoal">
                <Sparkle size={24} className={activeSegment.themeColor} weight="duotone" />
                <h3 className="font-serif text-2xl font-bold">Experiências Práticas</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeSegment.oficinas.map(oficina => (
                  <button
                    key={oficina.title}
                    type="button"
                    onClick={() => setActiveOficina(oficina)}
                    className="p-5 rounded-3xl border-2 border-brand-light-border bg-[#fdfaf5] text-left flex flex-col gap-3 transition-all duration-500 group focus:outline-none cursor-pointer hover:border-brand-orange/40 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl bg-white border border-brand-light-border shadow-sm group-hover:scale-110 transition-transform duration-300 ${activeSegment.themeColor}`}>
                        {getIcon(oficina.icon)}
                      </div>
                      <span className="font-serif text-base font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
                        {oficina.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1 mt-auto">
                      Saber mais <CaretRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" weight="bold" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Depoimento Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-3 text-brand-charcoal">
                <Chats size={24} className={activeSegment.themeColor} weight="duotone" />
                <h3 className="font-serif text-2xl font-bold">O que dizem</h3>
              </div>
              <div className={`p-8 rounded-[2.5rem] bg-white border-2 border-brand-light-border shadow-lg relative flex flex-col gap-5 overflow-hidden group hover:border-brand-orange/30 transition-colors duration-500`}>
                <Quotes size={64} className={`absolute -right-4 -bottom-4 opacity-10 transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 ${activeSegment.themeColor}`} weight="fill" />
                <p className="font-sans text-sm md:text-base italic text-brand-charcoal-light/90 leading-relaxed font-medium relative z-10">
                  "{activeSegment.testimonial.text}"
                </p>
                <div className="flex flex-col text-left relative z-10 pt-4">
                  <span className="font-serif text-sm font-bold text-brand-charcoal">
                    {activeSegment.testimonial.author}
                  </span>
                  <span className="font-sans text-[11px] font-bold text-brand-orange">
                    {activeSegment.testimonial.role}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* DIALOG/MODAL DE DETALHES DA OFICINA */}
      {activeOficina && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-charcoal/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveOficina(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`bg-white border-4 rounded-[3rem] max-w-sm w-full p-8 relative shadow-2xl flex flex-col gap-6 text-center ${activeSegment.themeBorder}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={modalCloseBtnRef}
              type="button"
              onClick={() => setActiveOficina(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-light-card text-brand-charcoal-light/50 hover:text-brand-orange transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="flex flex-col items-center gap-4 mt-2">
              <div className={`p-4 rounded-3xl bg-white border-2 shadow-md ${activeSegment.themeBorder} ${activeSegment.themeColor} animate-wiggle`}>
                {getIcon(activeOficina.icon)}
              </div>
              <div className="flex flex-col">
                <span className={`font-sans text-[9px] uppercase tracking-widest font-bold ${activeSegment.themeColor}`}>Oficina de Ensino</span>
                <h4 className="font-serif font-bold text-2xl text-brand-charcoal mt-1">
                  {activeOficina.title}
                </h4>
              </div>
            </div>

            <p className="font-sans text-sm text-brand-charcoal-light/80 leading-relaxed font-medium px-2">
              {activeOficina.description}
            </p>

            <button
              type="button"
              onClick={() => { setActiveOficina(null); navigate('/admissao'); }}
              className={`w-full py-4 mt-4 rounded-full ${activeSegment.themeBg} ${activeSegment.id === 'medio' ? 'text-brand-charcoal' : 'text-white'} font-sans text-xs font-bold uppercase tracking-wider transition-all duration-500 shadow-md ${activeSegment.themeShadow} hover:-translate-y-1 cursor-pointer`}
            >
              Gostei! Matricular Agora
            </button>
          </div>
        </div>
      )}

    </div>
  );
}