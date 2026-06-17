import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaretLeft, CaretRight, Quotes } from '@phosphor-icons/react';
gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  relation: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Mãe do Pedro (4º ano)",
    relation: "Ensino Fundamental I",
    content: "O Colégio Saber transformou a relação do meu filho com os estudos. O acolhimento pedagógico associado ao foco em tecnologia e bilinguismo deu a ele uma autonomia incrível que não vimos em nenhuma outra escola.",
    avatar: "MS"
  },
  {
    id: 2,
    name: "Roberto Santos",
    role: "Pai da Julia (9º ano)",
    relation: "Ensino Fundamental II",
    content: "Excelente infraestrutura e corpo docente altamente qualificado. Destaco principalmente a preocupação constante com a formação humana e ética dos alunos, preparando-os verdadeiramente para a vida.",
    avatar: "RS"
  },
  {
    id: 3,
    name: "Beatriz Costa",
    role: "Mãe do Lucas (3ª série EM)",
    relation: "Ensino Médio",
    content: "O colégio superou todas as nossas expectativas. A preparação para o vestibular e o ENEM é extremamente forte e focada, mas sem perder em nenhum momento o cuidado socioemocional e o suporte individual.",
    avatar: "BC"
  },
  {
    id: 4,
    name: "Felipe Almeida",
    role: "Pai da Sofia (Pré II)",
    relation: "Educação Infantil",
    content: "O carinho e dedicação das professoras da Educação Infantil são admiráveis. Minha filha vai feliz para a escola todos os dias e o desenvolvimento da fala e da socialização dela foi nítido desde o primeiro mês.",
    avatar: "FA"
  },
  {
    id: 5,
    name: "Carolina Mendes",
    role: "Mãe da Laura (7º ano)",
    relation: "Ensino Fundamental II",
    content: "A parceria escola-família no Colégio Saber realmente funciona na prática. Sempre somos ouvidos, acolhidos e informados detalhadamente sobre o desenvolvimento da nossa filha de forma proativa.",
    avatar: "CM"
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Animações de Entrada GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do cabeçalho
      const headerEl = sectionRef.current?.querySelector('.section-header');
      if (headerEl) {
        gsap.fromTo(
          headerEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Animação dos cartões com stagger
      const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Monitorar rolagem para atualizar índice ativo e botões
  const handleScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    // Atualizar botões de controle
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Calcular o item mais visível
    const items = carouselRef.current.querySelectorAll('.testimonial-card');
    let minDiff = Infinity;
    let newIndex = 0;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const carouselRect = carouselRef.current!.getBoundingClientRect();
      // Diferença entre o centro do item e o centro do carrossel
      const diff = Math.abs((rect.left + rect.width / 2) - (carouselRect.left + carouselRect.width / 2));
      
      if (diff < minDiff) {
        minDiff = diff;
        newIndex = index;
      }
    });

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll, { passive: true });
      // Executa uma vez no início
      handleScroll();
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Navegar via botão/seta
  const scrollTo = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const { scrollLeft } = carouselRef.current;
    const cardWidth = carouselRef.current.querySelector('.testimonial-card')?.clientWidth || 400;
    // Rolar por um ou mais cards dependendo do viewport
    const offset = direction === 'left' ? -cardWidth - 24 : cardWidth + 24; // 24px é o gap (gap-6)
    
    carouselRef.current.scrollTo({
      left: scrollLeft + offset,
      behavior: 'smooth'
    });
  };

  const scrollToIdx = (index: number) => {
    if (!carouselRef.current) return;

    const cards = carouselRef.current.querySelectorAll('.testimonial-card');
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      carouselRef.current.scrollTo({
        left: card.offsetLeft - (carouselRef.current.clientWidth - card.clientWidth) / 2,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-brand-light-card border-t border-b border-brand-light-border relative overflow-hidden z-10"
      aria-labelledby="testimonials-heading"
    >
      {/* Detalhes estéticos no fundo */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header da Seção */}
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange font-bold block mb-3">
              Comunidade Saber
            </span>
            <h2 id="testimonials-heading" className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-charcoal leading-tight relative inline-block">
              A voz de quem vivencia nossa excelência diariamente
              <svg className="absolute -bottom-2 left-0 w-48 h-4 text-brand-yellow/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q25,8 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </h2>
          </div>
          
          {/* Controles de Navegação */}
          <div className="flex gap-3 relative z-20">
            <button
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-[1rem] border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft 
                  ? 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-light shadow-[2px_4px_0_0_#ff7e1b] hover:-translate-y-1 cursor-pointer' 
                  : 'border-brand-light-border text-brand-charcoal/20 cursor-not-allowed bg-brand-light'
              }`}
              aria-label="Depoimento anterior"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-[1rem] border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollRight 
                  ? 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-light shadow-[2px_4px_0_0_#ff7e1b] hover:-translate-y-1 cursor-pointer' 
                  : 'border-brand-light-border text-brand-charcoal/20 cursor-not-allowed bg-brand-light'
              }`}
              aria-label="Próximo depoimento"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Viewport do Carrossel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-10 -mt-10 px-4 -mx-4 scroll-smooth focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Carrossel de depoimentos"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card min-w-[280px] sm:min-w-[380px] md:min-w-[450px] max-w-[500px] flex-shrink-0 snap-center bg-[#fffefc] border-[3px] border-brand-orange/40 rounded-[3rem] rounded-bl-2xl p-8 md:p-10 shadow-[6px_6px_0_0_rgba(255,126,27,0.2)] hover:shadow-[10px_10px_0_0_rgba(255,126,27,0.3)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative group"
            >
              {/* Sticker Flutuante Opcional */}
              {t.id % 2 === 0 && (
                <div className="absolute -top-5 -right-5 w-12 h-12 text-brand-pink animate-wiggle pointer-events-none drop-shadow-md">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                  </svg>
                </div>
              )}
              {t.id % 3 === 0 && (
                <div className="absolute -bottom-6 -right-2 w-14 h-14 text-brand-blue animate-float-slow pointer-events-none drop-shadow-md">
                  <svg viewBox="0 0 40 40" fill="currentColor">
                    <path d="M20,2 L24,14 L38,14 L26,22 L30,36 L20,26 L10,36 L14,22 L2,14 L16,14 Z" stroke="#0284c7" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Ícone de Aspas Flutuante */}
              <div className="absolute top-8 right-8 text-brand-orange/15 group-hover:text-brand-orange/40 group-hover:animate-wiggle-fast transition-colors duration-500">
                <Quotes size={48} weight="duotone" />
              </div>

              {/* Conteúdo do Depoimento */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] font-sans uppercase tracking-wider font-semibold mb-6">
                  {t.relation}
                </span>
                <p className="font-sans text-sm md:text-base text-brand-charcoal-light/90 font-semibold leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Informações do Autor */}
              <div className="flex items-center gap-4 pt-6 border-t border-brand-light-border">
                <div className="w-12 h-12 rounded-full bg-brand-orange-dark/10 flex items-center justify-center text-brand-orange-dark font-serif font-bold text-sm tracking-wider">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-serif text-sm md:text-base font-bold text-brand-charcoal">
                    {t.name}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-charcoal-light/60 font-semibold uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de Paginação */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIdx(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === activeIndex 
                  ? 'w-8 bg-brand-orange' 
                  : 'w-2 bg-brand-light-border hover:bg-brand-charcoal/20'
              }`}
              aria-label={`Ir para depoimento ${idx + 1}`}
              aria-current={idx === activeIndex ? 'true' : 'false'}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
}
