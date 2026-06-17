import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from '@phosphor-icons/react';
import FaqSection from '../components/FaqSection';

export default function MatriculasPage() {
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaElements = ctaContentRef.current?.children || [];
      gsap.fromTo(ctaElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-24 pb-0">
      
      {/* CTA Section */}
      <section 
        ref={ctaSectionRef}
        className="relative w-full py-28 px-6 bg-gradient-to-b from-brand-light to-brand-orange/5 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute bottom-[-15vw] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-brand-yellow/5 blur-[150px] pointer-events-none z-0"></div>

        <div 
          ref={ctaContentRef}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-orange font-semibold">
            Admissões Abertas
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-brand-charcoal leading-tight">
            Escreva o Futuro da Sua Jornada Conosco
          </h1>
          <p className="font-sans text-sm md:text-base font-medium text-brand-charcoal-light/80 max-w-xl mx-auto leading-relaxed">
            Agende uma visita exclusiva ao nosso campus e conheça a nossa proposta pedagógica integrada de excelência intelectual e humana.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/admissao"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-brand-light font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-700 shadow-lg group"
            >
              Iniciar Matrícula Online 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-700" weight="duotone" />
            </Link>
            <a 
              href="tel:551134567890"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-charcoal/20 hover:border-brand-orange/50 hover:text-brand-orange text-brand-charcoal font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-700"
            >
              Falar Por Telefone
            </a>
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <FaqSection />

    </div>
  );
}
