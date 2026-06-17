import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translate, Basketball, Robot, Heart } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface ExtraActivity {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function ExtracurricularSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const activities: ExtraActivity[] = [
    {
      id: 'bilingual',
      title: 'Inglês Todo Dia',
      description: 'Imersão diária e lúdica na língua inglesa com foco na vivência prática.',
      icon: Translate
    },
    {
      id: 'sports',
      title: 'Esporte & Saúde',
      description: 'Aulas de Judô, Ballet e futsal para o desenvolvimento motor.',
      icon: Basketball
    },
    {
      id: 'maker',
      title: 'Cultura Maker',
      description: 'Robótica educacional e criação de projetos na prática.',
      icon: Robot
    },
    {
      id: 'socioemocional',
      title: 'Socioemocional',
      description: 'Desenvolvimento de empatia, resolução de conflitos e autonomia.',
      icon: Heart
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.extra-card',
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-brand-light overflow-hidden"
      aria-labelledby="extracurricular-title"
    >
      {/* Background doodles */}
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
              Além da Sala de Aula
            </span>
            <div className="w-8 h-[1px] bg-brand-orange"></div>
          </div>
          <h2 
            id="extracurricular-title"
            className="font-serif text-4xl md:text-5xl font-medium text-brand-charcoal leading-tight"
          >
            Atividades <span className="text-brand-orange">Extracurriculares</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-medium leading-relaxed">
            Oferecemos uma grade completa de vivências no contraturno escolar para potencializar os talentos únicos de cada criança.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {activities.map((item, idx) => {
            const rotationClass = idx % 2 === 0 ? 'rotate-2' : '-rotate-2';
            const colors = [
              { bg: 'bg-[#f0f8fc]', border: 'border-[#b9dcf4]', text: 'text-[#0284c7]' }, // Blue
              { bg: 'bg-[#fff5ee]', border: 'border-[#fcd2af]', text: 'text-[#d94a00]' }, // Orange
              { bg: 'bg-[#fefce8]', border: 'border-[#fae69e]', text: 'text-[#d89f00]' }, // Yellow
              { bg: 'bg-[#fdf0f5]', border: 'border-[#f7cddf]', text: 'text-[#d44c82]' }  // Pink
            ];
            const theme = colors[idx % colors.length];
            const PhosphorIcon = item.icon;
            
            return (
              <div 
                key={item.id}
                className={`extra-card flex flex-col items-center text-center p-8 rounded-[3rem] rounded-bl-xl border-4 ${theme.border} ${theme.bg} shadow-[6px_6px_0_0_#2d2a26] hover:shadow-[10px_10px_0_0_#2d2a26] hover:-translate-y-2 transition-all duration-500 ${rotationClass}`}
              >
                {/* Icon Container */}
                <div className="w-20 h-20 rounded-full bg-white/60 border border-white/50 shadow-sm flex items-center justify-center mb-6">
                  <div className={`w-10 h-10 flex items-center justify-center ${theme.text}`}>
                    <PhosphorIcon size={40} weight="duotone" />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-8 h-1 rounded-full bg-brand-charcoal/10 my-2"></div>

                {/* Labels */}
                <h3 className="font-serif text-lg md:text-xl text-brand-charcoal uppercase tracking-wider font-bold mb-2 mt-4">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-bold leading-relaxed max-w-xs mt-2">
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
