import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Trophy, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const stats: StatItem[] = [
    {
      id: 'tradicao',
      value: 85,
      suffix: '+',
      label: 'Anos de Tradição',
      description: 'Aliando solidez pedagógica à evolução constante de nossa metodologia.',
      icon: Trophy
    },
    {
      id: 'aprovacao',
      value: 100,
      suffix: '%',
      label: 'Aprovação Nacional',
      description: 'Estudantes preparados para ingressar nas universidades mais concorridas.',
      icon: Award
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
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-light leading-relaxed">
            Mais do que números, refletimos a excelência diária e a paixão pelo saber compartilhada em nossa história.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="stat-card flex flex-col items-center text-center p-8 md:p-10 rounded-[2rem] border border-brand-light-border bg-brand-light-card/85 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
                  <Icon size={24} className="stroke-[1.5]" />
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
                  <span className="text-brand-orange">{item.suffix}</span>
                </div>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-brand-light-border my-2"></div>

                {/* Labels */}
                <h3 className="font-serif text-lg text-brand-charcoal uppercase tracking-wider font-bold mb-2 mt-2">
                  {item.label}
                </h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-light leading-relaxed max-w-xs">
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
