import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  // Clean Reveal Timeline on mount (No preloader delay)
  useEffect(() => {
    const tl = gsap.timeline();

    // 1. HERO REVEAL
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.char-word');
      tl.fromTo(words, 
        { y: '110%' },
        {
          y: '0%',
          duration: 1.4,
          stagger: 0.15, // fast but premium stagger
          ease: 'expo.out'
        }
      );
    }

    // Revela o subtítulo e elementos do cabeçalho
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 0.85,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      },
      '-=0.9'
    );

    // Revela o Scroll Indicator
    tl.fromTo(indicatorRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out'
      },
      '-=0.8'
    );

  }, []);

  // GSAP ScrollTrigger para fazer o Scroll Indicator sumir no scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        y: -20,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120',
          scrub: true,
        }
      });

      // Efeito de zoom lento e cinematográfico da câmera no fundo no início do scroll
      gsap.to('.hero-bg-overlay', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-light select-none">
      
      {/* BACKGROUND IMAGE WITH LIGHT LAYERS */}
      <div className="absolute inset-0 z-0 hero-bg-overlay origin-center">
        {/* Gradients em branco balanceados para dar nitidez à foto e alto contraste ao texto escuro */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-light/10 via-brand-light/45 to-brand-light"></div>
        <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent to-brand-light/45"></div>
        <img
          src={heroImg}
          alt="Criança escrevendo em uma carteira escolar"
          className="w-full h-full object-cover pointer-events-none scale-105 opacity-100"
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6 text-center">
        <div className="max-w-6xl mt-12">
          {/* TÍTULO PRINCIPAL COM REVEAL MASCARADO */}
          <h1 
            ref={titleRef} 
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-[1.05] tracking-tight text-brand-charcoal text-reveal-wrapper"
          >
            <span className="inline-block mr-4 md:mr-6 text-reveal-line char-word">COLÉGIO</span>
            <span className="inline-block text-brand-orange-dark text-reveal-line char-word">SABER</span>
          </h1>
          
          {/* SUBTÍTULO REVELADO DEVAGAR */}
          <p 
            ref={subtitleRef}
            className="mt-6 md:mt-8 font-sans text-sm sm:text-base md:text-lg lg:text-xl font-normal uppercase tracking-[0.25em] text-brand-charcoal/90 max-w-2xl mx-auto"
          >
            Uma jornada intelectual e humana que ecoa no tempo.
          </p>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div 
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-orange-dark/80">
          Rolar para Explorar
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-orange to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-yellow animate-pulse"></div>
        </div>
      </div>
      
    </div>
  );
}
