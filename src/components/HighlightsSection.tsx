import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Languages, UserCheck, ChevronRight } from 'lucide-react';
import labImg from '../assets/tour_laboratorio.png';
import bibImg from '../assets/tour_biblioteca.png';
import humanImg from '../assets/humanismo.png';

gsap.registerPlugin(ScrollTrigger);

interface HighlightCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  image: string;
  color: string;
  benefits: string[];
}

export default function HighlightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const highlights: HighlightCard[] = [
    {
      id: 'tecnologia',
      tag: 'Inovação',
      title: 'Tecnologia & Robótica',
      description: 'Preparação ativa para os desafios digitais e científicos do futuro.',
      icon: Cpu,
      image: labImg,
      color: 'from-brand-orange/90',
      benefits: [
        'Laboratório Maker e de Robótica de última geração',
        'Programação e lógica integradas à grade curricular',
        'Introdução ética à inteligência artificial'
      ]
    },
    {
      id: 'bilinguismo',
      tag: 'Global',
      title: 'Bilinguismo Prático',
      description: 'Imersão cultural e linguística contínua para fluência natural.',
      icon: Languages,
      image: bibImg,
      color: 'from-brand-yellow/90',
      benefits: [
        'Carga horária estendida em inglês',
        'Projetos interdisciplinares em língua inglesa',
        'Preparação para exames de proficiência internacional'
      ]
    },
    {
      id: 'acompanhamento',
      tag: 'Foco',
      title: 'Acompanhamento Único',
      description: 'Atenção ao ritmo, talentos e bem-estar emocional de cada estudante.',
      icon: UserCheck,
      image: humanImg,
      color: 'from-brand-orange-dark/95',
      benefits: [
        'Planos de desenvolvimento individuais',
        'Apoio psicopedagógico e socioemocional integrado',
        'Mentorias regulares e turmas sob medida'
      ]
    }
  ];

  useEffect(() => {
    // ScrollTrigger animation for the entire section header and cards fade-in
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.highlight-header-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards Entrance Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card Hover GSAP Animation
  const handleMouseEnter = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const overlay = card.querySelector('.card-overlay');
    const benefitsList = card.querySelector('.card-benefits');
    const iconContainer = card.querySelector('.card-icon-container');
    const bgImage = card.querySelector('.card-bg-image');

    gsap.killTweensOf([card, overlay, benefitsList, iconContainer, bgImage]);

    // Animate Card Container
    gsap.to(card, {
      y: -12,
      scale: 1.03,
      borderColor: 'rgba(255, 107, 0, 0.4)',
      boxShadow: '0 20px 40px -15px rgba(17, 17, 18, 0.25)',
      duration: 0.5,
      ease: 'power2.out'
    });

    // Zoom Background Image
    gsap.to(bgImage, {
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Darken Overlay & blend brand color tint
    gsap.to(overlay, {
      opacity: 0.95,
      duration: 0.4,
      ease: 'power2.out'
    });

    // Animate Icon
    gsap.to(iconContainer, {
      rotate: 15,
      scale: 1.1,
      backgroundColor: 'var(--color-brand-orange)',
      color: '#ffffff',
      duration: 0.4,
      ease: 'power2.out'
    });

    // Reveal Benefits
    gsap.to(benefitsList, {
      height: 'auto',
      opacity: 1,
      marginTop: 16,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const overlay = card.querySelector('.card-overlay');
    const benefitsList = card.querySelector('.card-benefits');
    const iconContainer = card.querySelector('.card-icon-container');
    const bgImage = card.querySelector('.card-bg-image');

    gsap.killTweensOf([card, overlay, benefitsList, iconContainer, bgImage]);

    // Reset Card Container
    gsap.to(card, {
      y: 0,
      scale: 1,
      borderColor: 'var(--color-brand-light-border)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      duration: 0.5,
      ease: 'power2.out'
    });

    // Reset Background Image
    gsap.to(bgImage, {
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Reset Overlay
    gsap.to(overlay, {
      opacity: 0.75,
      duration: 0.4,
      ease: 'power2.out'
    });

    // Reset Icon
    gsap.to(iconContainer, {
      rotate: 0,
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--color-brand-orange-light)',
      duration: 0.4,
      ease: 'power2.out'
    });

    // Hide Benefits
    gsap.to(benefitsList, {
      height: 0,
      opacity: 0,
      marginTop: 0,
      duration: 0.4,
      ease: 'power3.inOut'
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 bg-brand-light-card border-t border-brand-light-border"
      aria-labelledby="pedagogical-highlights-title"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="flex flex-col gap-4">
            <div className="highlight-header-item flex items-center gap-3">
              <div className="w-8 h-[1px] bg-brand-orange"></div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-orange-dark font-semibold">
                Diferenciais Pedagógicos
              </span>
            </div>
            <h2 
              id="pedagogical-highlights-title"
              className="highlight-header-item font-serif text-4xl md:text-5xl font-medium text-brand-charcoal leading-tight"
            >
              Nosso Compromisso com o <span className="text-brand-orange">Futuro</span>
            </h2>
          </div>
          <p className="highlight-header-item font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-light max-w-md leading-relaxed">
            Metodologias modernas e acompanhamento humanizado que preparam os alunos para se destacarem acadêmica, social e individualmente.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                onFocus={() => handleMouseEnter(idx)}
                onBlur={() => handleMouseLeave(idx)}
                tabIndex={0}
                className="relative rounded-3xl overflow-hidden border border-brand-light-border bg-brand-charcoal shadow-sm transition-colors duration-500 min-h-[420px] flex flex-col justify-end p-8 md:p-10 cursor-pointer group focus:outline-none"
                aria-label={`Diferencial: ${item.title}`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt=""
                  className="card-bg-image absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                />

                {/* Gradient Color Overlay */}
                <div 
                  className={`card-overlay absolute inset-0 bg-gradient-to-t ${item.color} via-brand-charcoal/70 to-brand-charcoal/30 opacity-75 z-10`}
                ></div>

                {/* Card Content Wrapper */}
                <div className="relative z-20 flex flex-col h-full justify-between items-start w-full">
                  {/* Top Badge & Icon */}
                  <div className="flex w-full justify-between items-start mb-12">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/15">
                      {item.tag}
                    </span>
                    <div className="card-icon-container p-3 rounded-2xl bg-white/10 text-brand-orange-light border border-white/10 transition-all duration-500">
                      <IconComponent size={24} className="stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Text & Key Benefits */}
                  <div className="w-full">
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-3">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-white/80 font-light leading-relaxed max-w-sm">
                      {item.description}
                    </p>

                    {/* Expandable Benefits List (GSAP Animated) */}
                    <div className="card-benefits h-0 opacity-0 overflow-hidden">
                      <div className="w-full h-[1px] bg-white/20 my-4"></div>
                      <ul className="flex flex-col gap-2.5">
                        {item.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 font-sans text-xs text-white font-light leading-snug">
                            <ChevronRight size={14} className="text-brand-yellow shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
