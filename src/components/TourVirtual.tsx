import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Info, Maximize2, MoveHorizontal, 
  X, Sparkles, Compass
} from 'lucide-react';

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
  image: string;
  description: string;
  hotspots: Hotspot[];
}

const LOCATIONS: LocationData[] = [
  {
    id: 'biblioteca',
    name: 'Biblioteca Central',
    image: bibliotecaImg,
    description: 'Um espaço de pesquisa acolhedor e dinâmico, que promove a leitura através de acervo físico amplo e biblioteca digital moderna.',
    hotspots: [
      { x: 28, y: 48, title: 'Acervo Físico & Digital', desc: 'Mais de 15.000 títulos catalogados e acesso a bases acadêmicas internacionais via tablets disponíveis aos alunos.' },
      { x: 68, y: 55, title: 'Área de Cocriação', desc: 'Mesas modulares equipadas para trabalhos em grupo, integrando tecnologia, tomadas rápidas e lousas móveis.' }
    ]
  },
  {
    id: 'laboratorio',
    name: 'Laboratório de Ciências & Robótica',
    image: laboratorioImg,
    description: 'Espaço equipado com tecnologia de ponta para o ensino prático de física, química, biologia e robótica STEM.',
    hotspots: [
      { x: 32, y: 42, title: 'Bancadas STEM & Robótica', desc: 'Kits LEGO Education e microcontroladores Arduino para que estudantes desenvolvam projetos de programação e engenharia real.' },
      { x: 74, y: 52, title: 'Ciências Aplicadas', desc: 'Microscópios eletrônicos digitais conectados a telas compartilhadas, permitindo estudos moleculares em tempo real.' }
    ]
  },
  {
    id: 'esportes',
    name: 'Complexo Poliesportivo',
    image: esportesImg,
    description: 'Nossa quadra coberta e quadras externas incentivam a cooperação, saúde física e práticas esportivas integradas.',
    hotspots: [
      { x: 42, y: 62, title: 'Piso Flutuante Antidecíduo', desc: 'Tecnologia de amortecimento de impacto que protege as articulações dos alunos durante treinos de futsal, basquete e vôlei.' },
      { x: 78, y: 35, title: 'Estrutura Sustentável', desc: 'Iluminação zenital translúcida e circulação cruzada de ar, reduzindo o consumo de energia e garantindo temperatura agradável.' }
    ]
  },
  {
    id: 'bosque',
    name: 'Bosque Pedagógico (Área Verde)',
    image: bosqueImg,
    description: 'Um ecossistema natural de 2.000m² integrado para aulas ao ar livre, relaxamento e conscientização ambiental.',
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
  const maxPan = useRef(0); // Limite de pan (viewportWidth - imageWidth)

  // Recalcula o tamanho da imagem e limites de pan ao mudar de local ou redimensionar a tela
  const updatePanLimits = () => {
    if (viewportRef.current && containerRef.current) {
      const vWidth = viewportRef.current.clientWidth;
      const imgWidth = containerRef.current.scrollWidth;
      maxPan.current = Math.min(0, vWidth - imgWidth);
      
      // Reseta a posição no meio ao trocar de local
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

  // Efeito Auto-Pan
  useEffect(() => {
    // Inicia auto-pan sutil e lento
    startAutoPan();

    return () => {
      stopAutoPan();
    };
  }, [activeLoc]);

  const startAutoPan = () => {
    stopAutoPan();
    if (containerRef.current) {
      // Panora lentamente em direção ao limite esquerdo
      const targetX = maxPan.current * 0.8; // Não vai até o final extremo
      const currentVal = currentX.current;
      const distance = Math.abs(targetX - currentVal);
      const duration = distance / 15; // Velocidade lenta: 15px por segundo

      autoPanTween.current = gsap.to(containerRef.current, {
        x: targetX,
        duration: duration,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          if (containerRef.current) {
            // Sincroniza o valor de currentX com a animação
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

  // --- HANDLERS DE EVENTOS DE DRAG ---

  const handleDragStart = (clientX: number) => {
    stopAutoPan();
    isDragging.current = true;
    startX.current = clientX - currentX.current;
    setActiveHotspot(null); // Fecha hotspot aberto ao arrastar
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    
    // Novo translate X baseado no movimento
    let newX = clientX - startX.current;
    
    // Bounce suave nas bordas
    if (newX > 0) newX = newX * 0.3;
    if (newX < maxPan.current) newX = maxPan.current + (newX - maxPan.current) * 0.3;

    currentX.current = newX;
    gsap.set(containerRef.current, { x: newX });
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Ajusta os limites caso tenha passado
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
          // Reinicia o auto-pan após 4 segundos de inatividade
          setTimeout(() => {
            if (!isDragging.current && !autoPanTween.current) {
              startAutoPan();
            }
          }, 4000);
        }
      });
    }
  };

  // Suporte a Mouse
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.hotspot-btn') || (e.target as HTMLElement).closest('.hotspot-card')) return;
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  // Suporte a Toque Mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.hotspot-btn') || (e.target as HTMLElement).closest('.hotspot-card')) return;
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  // Troca de localização com transição GSAP
  const handleLocChange = (loc: LocationData) => {
    if (loc.id === activeLoc.id) return;
    
    setActiveHotspot(null);
    stopAutoPan();

    // Animação de fade-out do panorama anterior
    gsap.to(viewportRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        setActiveLoc(loc);
        // Animação de fade-in do novo
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
      let newX = currentX.current + 100; // Mover 100px para a esquerda
      if (newX > 0) newX = 0;
      currentX.current = newX;
      gsap.to(containerRef.current, { x: newX, duration: 0.3, ease: 'power2.out' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoPan();
      let newX = currentX.current - 100; // Mover 100px para a direita
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
      className="w-full flex flex-col gap-8 relative z-10 py-16 border-t border-brand-light-border bg-brand-light-card"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-6">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl text-left">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold flex items-center gap-1.5">
              <Compass size={12} className="animate-spin-slow" />
              Tour Virtual Interativo
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">
              Conheça Nossa Infraestrutura
            </h2>
            <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed">
              Arraste a imagem para navegar lateralmente e clique nos pontos azuis/laranjas piscantes para detalhar nossa estrutura acadêmica de ponta.
            </p>
          </div>

           {/* Abas Selecionadoras */}
          <div 
            role="tablist" 
            aria-label="Locais do campus" 
            className="flex flex-wrap gap-2 md:gap-3 bg-brand-light p-1.5 rounded-2xl border border-brand-light-border shrink-0 self-start md:self-auto"
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
                  className={`px-4 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wider transition-all duration-700 ${
                    isActive 
                      ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/15' 
                      : 'text-brand-charcoal-light hover:bg-brand-light-card hover:text-brand-orange'
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Descritivo do local selecionado */}
        <div className="p-5 rounded-2xl bg-brand-light border border-brand-light-border text-left font-sans text-xs text-brand-charcoal-light/85 font-light flex items-center gap-3">
          <Info size={16} className="text-brand-orange shrink-0" />
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
          aria-label={`Visualização panorâmica da ${activeLoc.name}. Use as setas Esquerda e Direita para navegar pela imagem e ESC para fechar detalhes.`}
          className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] overflow-hidden rounded-3xl border border-brand-light-border bg-brand-light-card cursor-grab active:cursor-grabbing select-none focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          {/* Container Deslizante */}
          <div 
            ref={containerRef}
            className="absolute top-0 left-0 h-full w-[2400px] sm:w-[2800px] md:w-[3200px] flex items-center justify-center pointer-events-auto"
            style={{ willChange: 'transform' }}
          >
            {/* Imagem de Fundo (Panorâmica) */}
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
                  {/* Botão Pulsante do Hotspot */}
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(isOpen ? null : hotspot)}
                    className="hotspot-btn relative w-8 h-8 flex items-center justify-center focus:outline-none"
                    aria-label={`Ver informações sobre ${hotspot.title}`}
                    aria-expanded={isOpen}
                  >
                    {/* Anéis de Pulsar */}
                    <span className="absolute w-full h-full rounded-full bg-brand-orange opacity-40 animate-ping"></span>
                    <span className="absolute w-6 h-6 rounded-full bg-brand-orange opacity-60 animate-pulse"></span>
                    {/* Círculo Principal */}
                    <div className={`w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center shadow-lg transition-colors duration-500 ${
                      isOpen ? 'bg-brand-charcoal text-white' : 'bg-brand-orange text-white'
                    }`}>
                      <Sparkles size={8} />
                    </div>
                  </button>

                  {/* Popover Card */}
                  {isOpen && (
                    <div className="hotspot-card absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-5 rounded-2xl bg-brand-charcoal/95 backdrop-blur-md text-brand-light border border-brand-orange/40 shadow-2xl z-30 flex flex-col gap-2 font-sans text-left animate-fade-in">
                      <div className="flex items-center justify-between gap-3 border-b border-brand-light-border/20 pb-2">
                        <span className="font-serif text-xs font-semibold text-brand-yellow uppercase tracking-wider">
                          {hotspot.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(null)}
                          aria-label="Fechar detalhes"
                          className="text-brand-light/50 hover:text-brand-orange transition-colors duration-300 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] font-light leading-relaxed text-brand-light/90">
                        {hotspot.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dica de Controle Overlay (Some após 4s) */}
          <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex items-center gap-2 bg-brand-charcoal/80 backdrop-blur-md text-brand-light px-4 py-2.5 rounded-full font-sans text-[10px] uppercase tracking-wider border border-white/10 animate-fade-out delay-3000">
            <MoveHorizontal size={14} className="text-brand-orange animate-bounce" />
            <span>Arraste para explorar</span>
          </div>

          {/* Botão de feedback visual do centro */}
          <div className="absolute top-6 right-6 z-20 bg-brand-light/90 backdrop-blur-md text-brand-charcoal px-3 py-1.5 rounded-xl border border-brand-light-border font-sans text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Maximize2 size={10} className="text-brand-orange" />
            <span>Pan 360°</span>
          </div>

        </div>

      </div>
    </div>
  );
}
