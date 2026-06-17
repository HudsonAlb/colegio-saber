import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Target, Users } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const stats: StatItem[] = [
    {
      id: 'tradicao',
      value: 30,
      suffix: '+',
      label: 'Anos de Tradição',
      description: 'Aliando solidez pedagógica à evolução constante de nossa metodologia.',
      icon: Star
    },
    {
      id: 'aprovacao',
      value: 100,
      suffix: '%',
      label: 'Aprovação Nacional',
      description: 'Estudantes preparados para ingressar nas universidades mais concorridas.',
      icon: Target
    },
    {
      id: 'lideres',
      value: 12,
      suffix: 'k+',
      label: 'Líderes Formados',
      description: 'Cidadãos atuantes, preparados para impactar positivamente a sociedade.',
      icon: Users
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the layout cards
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Count-up animation for numbers using ScrollTrigger
      stats.forEach((stat, idx) => {
        const spanEl = elementsRef.current[idx];
        if (!spanEl) return;

        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: () => {
            if (spanEl) {
              spanEl.textContent = Math.floor(obj.val).toString();
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-brand-light overflow-hidden"
      aria-labelledby="mural-title"
    >
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Estrelas desenhadas no fundo */}
      <div className="absolute top-[20%] left-[10%] w-12 h-12 text-brand-yellow-dark opacity-40 animate-wiggle pointer-events-none hidden lg:block">
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M20,2 L24,14 L38,14 L26,22 L30,36 L20,26 L10,36 L14,22 L2,14 L16,14 Z" stroke="#d89f00" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-[10%] left-[20%] w-8 h-8 text-brand-pink opacity-30 animate-float-slow pointer-events-none hidden lg:block">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
      </div>
      <div className="absolute top-[30%] right-[10%] w-16 h-16 text-brand-blue opacity-25 animate-wiggle pointer-events-none hidden lg:block">
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M20,2 L24,14 L38,14 L26,22 L30,36 L20,26 L10,36 L14,22 L2,14 L16,14 Z" stroke="#0284c7" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col gap-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-[1px] bg-brand-orange"></div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-orange-dark font-semibold">
              Resultados e Tradição
            </span>
            <div className="w-8 h-[1px] bg-brand-orange"></div>
          </div>
          <h2
            id="mural-title"
            className="font-serif text-4xl md:text-5xl font-medium text-brand-charcoal leading-tight"
          >
            Mural de <span className="text-brand-orange">Conquistas</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-medium leading-relaxed">
            Mais do que números, refletimos a excelência diária e a paixão pelo saber compartilhada em nossa história.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-4">
          {stats.map((item, idx) => {
            const rotationClass = idx % 2 === 0 ? 'rotate-2' : '-rotate-3';
            const colors = [
              { bg: 'bg-[#fff5ee]', border: 'border-[#fcd2af]', text: 'text-[#d94a00]' },
              { bg: 'bg-[#f0f8fc]', border: 'border-[#b9dcf4]', text: 'text-[#0284c7]' },
              { bg: 'bg-[#fefce8]', border: 'border-[#fae69e]', text: 'text-[#d89f00]' }
            ];
            const theme = colors[idx % colors.length];
            const PhosphorIcon = item.icon;
            return (
              <div
                key={item.id}
                className={`stat-card flex flex-col items-center text-center p-8 md:p-10 rounded-[3rem] rounded-bl-xl border-4 ${theme.border} ${theme.bg} shadow-[6px_6px_0_0_#2d2a26] hover:shadow-[10px_10px_0_0_#2d2a26] hover:-translate-y-2 transition-all duration-500 ${rotationClass}`}
              >
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-full bg-white/60 border border-white/50 shadow-sm flex items-center justify-center mb-6">
                  <div className={`w-8 h-8 flex items-center justify-center ${theme.text}`}>
                    <PhosphorIcon size={32} weight="duotone" />
                  </div>
                </div>

                {/* Animated Number */}
                <div className="flex flex-nowrap items-baseline whitespace-nowrap font-serif text-6xl md:text-7xl font-bold text-brand-charcoal leading-none tracking-tight mb-4">
                  <span
                    ref={(el) => {
                      elementsRef.current[idx] = el;
                    }}
                  >
                    0
                  </span>
                  <span className={`${theme.text}`}>{item.suffix}</span>
                </div>

                {/* Divider */}
                <div className="w-8 h-1 rounded-full bg-brand-charcoal/10 my-2"></div>

                {/* Labels */}
                <h3 className="font-serif text-lg text-brand-charcoal uppercase tracking-wider font-bold mb-2 mt-2">
                  {item.label}
                </h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-bold leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
