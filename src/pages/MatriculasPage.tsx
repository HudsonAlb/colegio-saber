import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, MagnifyingGlass, FileText, Checks, Sparkle } from '@phosphor-icons/react';
import FaqSection from '../components/FaqSection';

gsap.registerPlugin(ScrollTrigger);

export default function MatriculasPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Anima os passos do caminho
      gsap.fromTo('.step-card',
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.steps-container',
            start: 'top 75%',
          }
        }
      );
      
      // Anima a linha pontilhada
      gsap.fromTo('.dashed-line',
        { height: 0 },
        {
          height: '100%',
          duration: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.steps-container',
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-0 bg-transparent">
      
      {/* HEADER SECTION LÚDICA */}
      <section className="relative w-full py-20 px-6 flex flex-col items-center text-center overflow-x-clip z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-orange/15 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute top-0 right-20 w-80 h-80 bg-brand-yellow/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">
            Junte-se à Família
          </span>
          <h1 className="font-doodle text-4xl sm:text-5xl md:text-6xl text-brand-charcoal drop-shadow-sm mt-2">
            Como ser um aluno Saber?
          </h1>
          <p className="font-sans text-sm md:text-base font-medium text-brand-charcoal-light/80 max-w-2xl mx-auto leading-relaxed">
            Ingressar no Colégio Saber é o começo de uma jornada incrível. Preparamos um caminho simples e acolhedor para que sua família sinta-se em casa desde o primeiro passo.
          </p>
        </div>
      </section>

      {/* CAMINHO DE PEDRAS (STEPS) */}
      <section className="relative w-full py-16 px-6 z-10">
        <div className="max-w-4xl mx-auto steps-container relative">
          
          {/* Linha Pontilhada Central (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 border-l-4 border-dashed border-brand-orange/30 -translate-x-1/2 z-0 dashed-line"></div>

          {/* Passo 1 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 relative z-10 group">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative p-8 rounded-[3rem] rounded-br-2xl bg-white border-2 border-brand-orange/30 shadow-[6px_6px_0_0_rgba(255,126,27,0.15)] group-hover:shadow-[10px_10px_0_0_rgba(255,126,27,0.25)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-md transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <MapPin size={24} weight="fill" />
                </div>
                <h3 className="font-doodle text-2xl text-brand-charcoal mt-2">Visita Mágica</h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed mt-2">
                  Agende um horário e venha tomar um café com nossa equipe. Mostraremos cada cantinho do nosso bosque e laboratórios.
                </p>
              </div>
            </div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-orange items-center justify-center font-doodle text-xl text-brand-orange z-10 shadow-sm group-hover:scale-110 transition-transform">1</div>
            <div className="hidden md:block w-full md:w-1/2"></div>
          </div>

          {/* Passo 2 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 relative z-10 group">
            <div className="hidden md:block w-full md:w-1/2"></div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-yellow-dark items-center justify-center font-doodle text-xl text-brand-yellow-dark z-10 shadow-sm group-hover:scale-110 transition-transform">2</div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="relative p-8 rounded-[3rem] rounded-bl-2xl bg-white border-2 border-brand-yellow/50 shadow-[6px_6px_0_0_rgba(255,203,30,0.15)] group-hover:shadow-[10px_10px_0_0_rgba(255,203,30,0.25)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-yellow-dark rounded-full flex items-center justify-center text-white shadow-md transform rotate-12 group-hover:rotate-0 transition-transform">
                  <MagnifyingGlass size={24} weight="bold" />
                </div>
                <h3 className="font-doodle text-2xl text-brand-charcoal mt-2">Sondagem</h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed mt-2">
                  Um bate-papo lúdico para conhecermos o estudante, entender suas paixões e identificar a melhor forma de acolhê-lo.
                </p>
              </div>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 relative z-10 group">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative p-8 rounded-[3rem] rounded-br-2xl bg-white border-2 border-brand-blue/30 shadow-[6px_6px_0_0_rgba(78,168,222,0.15)] group-hover:shadow-[10px_10px_0_0_rgba(78,168,222,0.25)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-md transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <FileText size={24} weight="fill" />
                </div>
                <h3 className="font-doodle text-2xl text-brand-charcoal mt-2">Entrega da Caixinha</h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed mt-2">
                  Você envia os documentos necessários através do nosso portal online super seguro e simples de usar.
                </p>
              </div>
            </div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-blue items-center justify-center font-doodle text-xl text-brand-blue z-10 shadow-sm group-hover:scale-110 transition-transform">3</div>
            <div className="hidden md:block w-full md:w-1/2"></div>
          </div>

          {/* Passo 4 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10 group">
            <div className="hidden md:block w-full md:w-1/2"></div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-green items-center justify-center font-doodle text-xl text-brand-green z-10 shadow-sm group-hover:scale-110 transition-transform">4</div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="relative p-8 rounded-[3rem] rounded-bl-2xl bg-brand-green/10 border-2 border-brand-green shadow-[6px_6px_0_0_rgba(102,204,51,0.2)] group-hover:shadow-[10px_10px_0_0_rgba(102,204,51,0.3)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white shadow-md transform rotate-12 group-hover:rotate-0 transition-transform">
                  <Sparkle size={24} weight="fill" />
                </div>
                <h3 className="font-doodle text-2xl text-brand-green-dark mt-2">Prontinho!</h3>
                <p className="font-sans text-xs text-brand-green-dark/80 font-medium leading-relaxed mt-2">
                  Sua família agora faz parte do Colégio Saber! Entregaremos o kit de boas-vindas e aguardamos ansiosos pelo primeiro dia de aula.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative w-full py-16 px-6 flex flex-col items-center justify-center text-center z-10">
        <div className="mt-4 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/admissao"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-1 group"
          >
            Iniciar Passo a Passo Agora 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" weight="bold" />
          </Link>
          <a 
            href="tel:551134567890"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-brand-charcoal hover:bg-brand-charcoal hover:text-white text-brand-charcoal font-sans text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
          >
            Falar Por Telefone
          </a>
        </div>
      </section>

      {/* Seção FAQ */}
      <div className="bg-white rounded-t-[4rem] pt-12">
        <FaqSection />
      </div>

    </div>
  );
}
