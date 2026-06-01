import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange font-semibold block mb-3">
              Comunidade Saber
            </span>
            <h2 id="testimonials-heading" className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-charcoal leading-tight">
              A voz de quem vivencia nossa excelência diariamente
            </h2>
          </div>
          
          {/* Controles de Navegação */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft 
                  ? 'border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-brand-light hover:border-brand-orange cursor-pointer' 
                  : 'border-brand-light-border text-brand-charcoal/20 cursor-not-allowed'
              }`}
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight 
                  ? 'border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-brand-light hover:border-brand-orange cursor-pointer' 
                  : 'border-brand-light-border text-brand-charcoal/20 cursor-not-allowed'
              }`}
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Viewport do Carrossel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-4 -mx-4 scroll-smooth focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Carrossel de depoimentos"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card min-w-[280px] sm:min-w-[380px] md:min-w-[450px] max-w-[500px] flex-shrink-0 snap-center bg-brand-light border border-brand-light-border rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between relative group"
            >
              {/* Ícone de Aspas Flutuante */}
              <div className="absolute top-8 right-8 text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors duration-500">
                <Quote size={40} className="transform rotate-180" />
              </div>

              {/* Conteúdo do Depoimento */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] font-sans uppercase tracking-wider font-semibold mb-6">
                  {t.relation}
                </span>
                <p className="font-sans text-sm md:text-base text-brand-charcoal-light/90 font-light leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Informações do Autor */}
              <div className="flex items-center gap-4 pt-6 border-t border-brand-light-border">
                <div className="w-12 h-12 rounded-full bg-brand-orange-dark/10 flex items-center justify-center text-brand-orange-dark font-serif font-semibold text-sm tracking-wider">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-serif text-sm md:text-base font-semibold text-brand-charcoal">
                    {t.name}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-charcoal-light/60 font-medium uppercase tracking-wider">
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
