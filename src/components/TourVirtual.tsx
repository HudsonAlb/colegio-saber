import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Info, CornersOut, ArrowsHorizontal, X, Compass, PlayCircle } from '@phosphor-icons/react';

// Import de imagens panorâmicas geradas
import bibliotecaImg from '../assets/tour_biblioteca.png';
import laboratorioImg from '../assets/tour_laboratorio.png';
import esportesImg from '../assets/tour_esportes.png';
import bosqueImg from '../assets/tour_bosque.png';

interface Hotspot {
  x: number; // Porcentagem horizontal (0 a 100)
  y: number; // Porcentagem vertical (0 a 100)
  title: string;
  desc: string;
}

interface LocationData {
  id: string;
  name: string;
  shortName: string;
  image: string;
  description: string;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
  themeShadow: string;
  hotspots: Hotspot[];
}

const LOCATIONS: LocationData[] = [
  {
    id: 'biblioteca',
    name: 'Biblioteca Central',
    shortName: 'Biblioteca',
    image: bibliotecaImg,
    themeColor: 'text-brand-orange',
    themeBg: 'bg-brand-orange',
    themeBorder: 'border-brand-orange/30',
    themeShadow: 'shadow-brand-orange/30',
    description: 'Um espaço de pesquisa acolhedor e dinâmico, que promove a leitura com milhares de livros mágicos.',
    hotspots: [
      { x: 28, y: 48, title: 'Acervo Físico & Digital', desc: 'Mais de 15.000 títulos catalogados e acesso a bases acadêmicas internacionais via tablets disponíveis aos alunos.' },
      { x: 68, y: 55, title: 'Área de Cocriação', desc: 'Mesas modulares equipadas para trabalhos em grupo, integrando tecnologia, tomadas rápidas e lousas móveis.' }
    ]
  },
  {
    id: 'laboratorio',
    name: 'Laboratório Maker',
    shortName: 'Robótica',
    image: laboratorioImg,
    themeColor: 'text-brand-yellow-dark',
    themeBg: 'bg-brand-yellow',
    themeBorder: 'border-brand-yellow/40',
    themeShadow: 'shadow-brand-yellow/30',
    description: 'Espaço equipado para as mentes mais curiosas inventarem robôs e aprenderem ciências na prática.',
    hotspots: [
      { x: 32, y: 42, title: 'Bancadas STEM & Robótica', desc: 'Kits LEGO Education e microcontroladores Arduino para que estudantes desenvolvam projetos de programação e engenharia real.' },
      { x: 74, y: 52, title: 'Ciências Aplicadas', desc: 'Microscópios eletrônicos digitais conectados a telas compartilhadas, permitindo estudos moleculares em tempo real.' }
    ]
  },
  {
    id: 'esportes',
    name: 'Complexo Esportivo',
    shortName: 'Esportes',
    image: esportesImg,
    themeColor: 'text-brand-blue',
    themeBg: 'bg-brand-blue',
    themeBorder: 'border-brand-blue/30',
    themeShadow: 'shadow-brand-blue/30',
    description: 'Muita energia e movimento em nossas quadras preparadas para saúde física e brincadeiras coletivas.',
    hotspots: [
      { x: 42, y: 62, title: 'Piso Flutuante Antidecíduo', desc: 'Tecnologia de amortecimento de impacto que protege as articulações dos alunos durante treinos de futsal, basquete e vôlei.' },
      { x: 78, y: 35, title: 'Estrutura Sustentável', desc: 'Iluminação zenital translúcida e circulação cruzada de ar, reduzindo o consumo de energia e garantindo temperatura agradável.' }
    ]
  },
  {
    id: 'bosque',
    name: 'Bosque Pedagógico',
    shortName: 'Bosque',
    image: bosqueImg,
    themeColor: 'text-brand-green',
    themeBg: 'bg-brand-green',
    themeBorder: 'border-brand-green/30',
    themeShadow: 'shadow-brand-green/30',
    description: 'Um enorme ecossistema verde integrado para correr, respirar ar puro e aprender cercado de natureza.',
    hotspots: [
      { x: 22, y: 54, title: 'Salas de Aula ao Ar Livre', desc: 'Arquibancadas circulares de madeira sob a sombra de árvores centenárias, muito utilizadas para debates literários e aulas de filosofia.' },
      { x: 68, y: 48, title: 'Horta & Compostagem', desc: 'Espaço prático onde os alunos do Ensino Fundamental aprendem sobre botânica, cultivo orgânico e ciclo de reciclagem de resíduos.' }
    ]
  }
];

export default function TourVirtual() {
  const [activeLoc, setActiveLoc] = useState<LocationData>(LOCATIONS[0]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Refs de controle de arraste e animações
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPanTween = useRef<gsap.core.Tween | null>(null);

  // Estados de drag
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const maxPan = useRef(0); 

  const updatePanLimits = () => {
    if (viewportRef.current && containerRef.current) {
      const vWidth = viewportRef.current.clientWidth;
      const imgWidth = containerRef.current.scrollWidth;
      maxPan.current = Math.min(0, vWidth - imgWidth);

      const startXPos = maxPan.current / 2;
      currentX.current = startXPos;
      gsap.set(containerRef.current, { x: startXPos });
    }
  };

  useEffect(() => {
    updatePanLimits();
    window.addEventListener('resize', updatePanLimits);
    return () => window.removeEventListener('resize', updatePanLimits);
  }, [activeLoc]);

  useEffect(() => {
    startAutoPan();
    return () => stopAutoPan();
  }, [activeLoc]);

  const startAutoPan = () => {
    stopAutoPan();
    if (containerRef.current) {
      const targetX = maxPan.current * 0.8;
      const currentVal = currentX.current;
      const distance = Math.abs(targetX - currentVal);
      const duration = distance / 15;

      autoPanTween.current = gsap.to(containerRef.current, {
        x: targetX,
        duration: duration,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          if (containerRef.current) {
            currentX.current = gsap.getProperty(containerRef.current, 'x') as number;
          }
        }
      });
    }
  };

  const stopAutoPan = () => {
    if (autoPanTween.current) {
      autoPanTween.current.kill();
      autoPanTween.current = null;
    }
  };

  const handleDragStart = (clientX: number) => {
    stopAutoPan();
    isDragging.current = true;
    startX.current = clientX - currentX.current;
    setActiveHotspot(null);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    let newX = clientX - startX.current;
    if (newX > 0) newX = newX * 0.3;
    if (newX < maxPan.current) newX = maxPan.current + (newX - maxPan.current) * 0.3;
    currentX.current = newX;
    gsap.set(containerRef.current, { x: newX });
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (containerRef.current) {
      let finalX = currentX.current;
      if (finalX > 0) finalX = 0;
      if (finalX < maxPan.current) finalX = maxPan.current;

      currentX.current = finalX;
      gsap.to(containerRef.current, {
        x: finalX,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
          setTimeout(() => {
            if (!isDragging.current && !autoPanTween.current) {
              startAutoPan();
            }
          }, 4000);
        }
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.hotspot-btn') || (e.target as HTMLElement).closest('.hotspot-card')) return;
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.hotspot-btn') || (e.target as HTMLElement).closest('.hotspot-card')) return;
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleLocChange = (loc: LocationData) => {
    if (loc.id === activeLoc.id) return;
    setActiveHotspot(null);
    stopAutoPan();

    gsap.to(viewportRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        setActiveLoc(loc);
        gsap.to(viewportRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoPan();
      let newX = currentX.current + 100;
      if (newX > 0) newX = 0;
      currentX.current = newX;
      gsap.to(containerRef.current, { x: newX, duration: 0.3, ease: 'power2.out' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoPan();
      let newX = currentX.current - 100;
      if (newX < maxPan.current) newX = maxPan.current;
      currentX.current = newX;
      gsap.to(containerRef.current, { x: newX, duration: 0.3, ease: 'power2.out' });
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setActiveHotspot(null);
    }
  };

  return (
    <div
      role="region"
      aria-label="Tour Virtual Interativo do Campus"
      className="w-full flex flex-col gap-8 relative z-10 py-24 bg-white overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-8">

        {/* Desenhos Decorativos Flutuantes */}
        <div className="absolute top-10 left-10 w-16 h-16 text-brand-yellow opacity-60 animate-float-slow pointer-events-none hidden lg:block">
          <svg viewBox="0 0 40 40" fill="currentColor">
            <path d="M20,2 L24,14 L38,14 L26,22 L30,36 L20,26 L10,36 L14,22 L2,14 L16,14 Z" stroke="#d89f00" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Cabeçalho Lúdico */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-3 max-w-xl text-left relative">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold flex items-center gap-1.5 w-max px-4 py-1.5 rounded-full bg-brand-orange/10">
              <Compass size={14} className="animate-spin-slow text-brand-orange" weight="duotone" />
              Passeio Virtual 360°
            </span>
            <h2 className="font-doodle text-4xl sm:text-5xl text-brand-charcoal drop-shadow-sm mt-2">
              Mergulhe no Nosso Espaço
            </h2>
            <p className="font-sans text-sm text-brand-charcoal-light/85 font-medium leading-relaxed">
              Deslize para os lados para explorar todos os cantinhos mágicos do nosso colégio! Clique nas bolinhas para descobrir curiosidades escondidas.
            </p>
          </div>

          {/* Abas Selecionadoras estilo Bolhas/Bento */}
          <div
            role="tablist"
            aria-label="Locais do campus"
            className="flex flex-wrap gap-3 shrink-0 self-start md:self-auto"
          >
            {LOCATIONS.map(loc => {
              const isActive = activeLoc.id === loc.id;
              return (
                <button
                  key={loc.id}
                  id={`tab-${loc.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${loc.id}`}
                  type="button"
                  onClick={() => handleLocChange(loc)}
                  className={`px-5 py-3 font-sans text-xs font-bold tracking-wider transition-all duration-500 rounded-2xl border-2 ${isActive
                      ? `${loc.themeBg} ${loc.themeBorder} text-white shadow-lg ${loc.themeShadow} scale-105`
                      : 'bg-white border-brand-light-border text-brand-charcoal-light/70 hover:-translate-y-1 hover:border-brand-orange/40 hover:text-brand-orange'
                    } cursor-pointer`}
                >
                  {loc.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Descritivo do local com bordas suaves */}
        <div className={`p-6 rounded-3xl bg-white border-2 border-dashed ${activeLoc.themeBorder} shadow-sm text-left font-sans text-sm text-brand-charcoal-light/90 font-medium flex items-center gap-4 animate-fade-in`}>
          <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white shadow-md ${activeLoc.themeBg} animate-wiggle`}>
            <Info size={24} weight="duotone" />
          </div>
          <p>{activeLoc.description}</p>
        </div>

        {/* Viewport do Tour Panorâmico */}
        <div
          ref={viewportRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={handleDragEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="tabpanel"
          id={`panel-${activeLoc.id}`}
          aria-labelledby={`tab-${activeLoc.id}`}
          aria-label={`Visualização panorâmica da ${activeLoc.name}.`}
          className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-[3rem] sm:rounded-[4rem] border-4 ${activeLoc.themeBorder} shadow-2xl bg-white cursor-grab active:cursor-grabbing select-none focus:outline-none`}
        >
          {/* Container Deslizante */}
          <div
            ref={containerRef}
            className="absolute top-0 left-0 h-full w-[2400px] sm:w-[2800px] md:w-[3200px] flex items-center justify-center pointer-events-auto"
            style={{ willChange: 'transform' }}
          >
            {/* Imagem Panorâmica */}
            <img
              src={activeLoc.image}
              alt={`Visualização de 360 graus da ${activeLoc.name}`}
              draggable="false"
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Hotspots */}
            {activeLoc.hotspots.map((hotspot, idx) => {
              const isOpen = activeHotspot?.title === hotspot.title;
              return (
                <div
                  key={idx}
                  className="absolute pointer-events-auto"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(isOpen ? null : hotspot)}
                    className="hotspot-btn relative w-10 h-10 flex items-center justify-center focus:outline-none cursor-pointer"
                    aria-label={`Ver informações sobre ${hotspot.title}`}
                    aria-expanded={isOpen}
                  >
                    <span className={`absolute w-full h-full rounded-full ${activeLoc.themeBg} opacity-40 animate-ping`}></span>
                    <span className={`absolute w-8 h-8 rounded-full ${activeLoc.themeBg} opacity-60 animate-pulse`}></span>
                    <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-colors duration-500 ${isOpen ? 'bg-white text-brand-charcoal' : `${activeLoc.themeBg} text-white`}`}>
                      <PlayCircle size={12} weight="fill" />
                    </div>
                  </button>

                  {/* Popover Lúdico */}
                  {isOpen && (
                    <div className="hotspot-card absolute bottom-14 left-1/2 -translate-x-1/2 w-72 p-6 rounded-[2rem] bg-white border-[3px] border-brand-light-border shadow-[8px_8px_0_0_rgba(0,0,0,0.05)] z-30 flex flex-col gap-3 font-sans text-left animate-fade-in">
                      <div className="flex items-center justify-between gap-3 pb-2 border-b-2 border-brand-light-border/40">
                        <span className={`font-doodle text-xl text-brand-charcoal leading-none`}>
                          {hotspot.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(null)}
                          className="text-brand-charcoal/30 hover:text-brand-orange hover:bg-brand-orange/10 p-1.5 rounded-full transition-colors duration-300 cursor-pointer"
                        >
                          <X size={16} weight="bold" />
                        </button>
                      </div>
                      <p className="text-xs font-medium leading-relaxed text-brand-charcoal-light/80">
                        {hotspot.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex items-center gap-2 bg-white/95 backdrop-blur-md text-brand-charcoal px-5 py-3 rounded-full font-sans text-[10px] uppercase tracking-wider shadow-lg animate-fade-out delay-3000 font-bold border-2 border-brand-light-border">
            <ArrowsHorizontal size={16} className={`${activeLoc.themeColor} transition-transform duration-1000 translate-x-1`} weight="bold" />
            <span>Deslize a imagem</span>
          </div>

          <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md text-brand-charcoal px-4 py-2 rounded-full border-2 border-brand-light-border shadow-md font-sans text-[9px] uppercase tracking-widest font-bold flex items-center gap-2">
            <CornersOut size={14} className={activeLoc.themeColor} weight="bold" />
            <span>Giro 360°</span>
          </div>

        </div>

      </div>
    </div>
  );
}
