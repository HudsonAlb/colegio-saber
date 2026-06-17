import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HistoriaPage() {
  const quoteSectionRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLDivElement>(null);
  const quoteAuthorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(quoteTextRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(quoteAuthorRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.0,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-20">
      
      {/* Quote Section */}
      <div 
        ref={quoteSectionRef} 
        className="relative w-full py-20 px-6 bg-brand-light flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute w-[60%] h-[60%] rounded-full bg-brand-yellow/5 blur-[120px] quote-bg-glow origin-center z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-brand-orange/30 flex items-center justify-center mb-8">
            <span className="font-serif text-brand-orange text-lg">“</span>
          </div>
          
          <div 
            ref={quoteTextRef}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-relaxed text-brand-charcoal font-medium"
          >
            "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original."
          </div>

          <div 
            ref={quoteAuthorRef}
            className="mt-8 font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-orange-dark font-medium"
          >
            — Albert Einstein
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 mt-12 text-center md:text-left flex flex-col gap-8">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal">Uma trajetória com Propósito</h1>
        <p className="font-sans text-sm text-brand-charcoal-light/85 font-medium leading-relaxed">
          Fundado em 26 de julho de 1995 sob a razão social <strong>Amara Vandira Santos de Oliveira Colegio</strong>, o <strong>Colégio Saber</strong> nasceu com a missão de ser um farol de ensino humanista de qualidade em Escada, PE. Acreditamos que a educação de excelência deve atuar na formação integral do indivíduo: desenvolvendo o pensamento crítico do estudante, estimulando a criatividade e a exploração desde a Educação Infantil ao Ensino Fundamental, e solidificando valores éticos essenciais de cidadania.
        </p>
        <p className="font-sans text-sm text-brand-charcoal-light/85 font-medium leading-relaxed">
          Nosso corpo docente qualificado atua de forma integrada, prestando mentoria constante e garantindo que cada aluno receba a atenção necessária para alcançar seu pleno potencial intelectual e pessoal.
        </p>
      </section>
    </div>
  );
}
