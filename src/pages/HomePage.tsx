import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import HighlightsSection from '../components/HighlightsSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';

export default function HomePage() {
  const quickAccessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = quickAccessRef.current?.querySelectorAll('.quick-access-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quickAccessRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-home">
      <Hero />
      <HighlightsSection />
      <StatsSection />
      <TestimonialsSection />
      
      {/* Quick Access Block for Parents */}
      <section ref={quickAccessRef} className="py-20 bg-brand-light border-t border-brand-light-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="quick-access-card p-8 rounded-3xl border border-brand-light-border bg-brand-light-card hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between h-64">
            <span className="font-serif text-brand-orange text-lg font-medium">Sobre Nós</span>
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Tradição & Visão</h3>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-4">
                Conheça nossa trajetória dedicada à formação de cidadãos completos e éticos.
              </p>
            </div>
            <Link to="/historia" className="flex items-center gap-2 text-xs uppercase font-semibold text-brand-orange hover:text-brand-orange-dark">
              Ler História <ArrowRight size={12} />
            </Link>
          </div>

          <div className="quick-access-card p-8 rounded-3xl border border-brand-light-border bg-brand-light-card hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between h-64">
            <span className="font-serif text-brand-orange text-lg font-medium">Ensino</span>
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Segmentos Escolares</h3>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-4">
                Conheça nossas fases pedagógicas da Educação Infantil ao Ensino Médio.
              </p>
            </div>
            <Link to="/segmentos" className="flex items-center gap-2 text-xs uppercase font-semibold text-brand-orange hover:text-brand-orange-dark">
              Ver Ensino <ArrowRight size={12} />
            </Link>
          </div>

          <div className="quick-access-card p-8 rounded-3xl border border-brand-light-border bg-brand-light-card hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between h-64">
            <span className="font-serif text-brand-orange text-lg font-medium">Admissões</span>
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Matrículas Abertas</h3>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-4">
                Preencha nossa ficha de matrícula digital e agende o teste diagnóstico e a visita guiada.
              </p>
            </div>
            <Link to="/admissao" className="flex items-center gap-2 text-xs uppercase font-semibold text-brand-orange hover:text-brand-orange-dark">
              Iniciar Inscrição <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
