import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaretRight, BookOpen, Lightbulb, Heart } from '@phosphor-icons/react';
import tradicaoImg from '../assets/tradicao.png';
import inovacaoImg from '../assets/inovacao.png';
import humanismoImg from '../assets/humanismo.png';

gsap.registerPlugin(ScrollTrigger);

export default function PillarsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in de todos os cards bento
      gsap.fromTo('.bento-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#fdfaf5] flex flex-col gap-16 overflow-hidden">

      {/* Blobs Coloridos Decorativos no Fundo */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-orange/15 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* SEÇÃO TÍTULO DE INTRODUÇÃO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center gap-4 relative z-10">
        <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">
          Proposta Pedagógica
        </span>
        <h2 className="font-doodle text-4xl sm:text-5xl md:text-6xl text-brand-charcoal drop-shadow-sm mt-2">
          Os Três Pilares do Saber
        </h2>
        <p className="font-sans text-sm md:text-base text-brand-charcoal-light/80 font-medium leading-relaxed max-w-2xl mt-4">
          Nossa metodologia une a solidez do ensino clássico à inovação das novas tecnologias, com foco no desenvolvimento ético e emocional dos estudantes.
        </p>
      </div>

      {/* GRID BENTO LÚDICO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">

        {/* PILLAR 1: TRADIÇÃO */}
        <div className="bento-card group flex flex-col rounded-[3rem] bg-white border-2 border-brand-orange/30 shadow-[6px_6px_0_0_rgba(255,126,27,0.15)] hover:shadow-[12px_12px_0_0_rgba(255,126,27,0.25)] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default">
          <div className="h-64 relative overflow-hidden border-b-2 border-brand-orange/20">
            <img src={tradicaoImg} alt="Tradição" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-md transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
              <BookOpen size={28} weight="duotone" />
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4 flex-grow bg-gradient-to-b from-white to-brand-orange/5">
            <span className="font-sans text-[10px] font-bold text-brand-orange uppercase tracking-wider">01 • Tradição</span>
            <h3 className="font-doodle text-3xl text-brand-charcoal">Excelência Acadêmica</h3>
            <p className="font-sans text-sm text-brand-charcoal-light/80 font-medium leading-relaxed flex-grow">
              Rigor intelectual, leitura crítica e redação analítica. Uma base sólida para mentes pensantes e livres.
            </p>
            <button onClick={() => navigate('/historia')} className="self-start mt-2 px-5 py-2.5 rounded-full bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-300 font-sans text-xs uppercase tracking-wide font-bold flex items-center gap-2">
              Nossa História <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* PILLAR 2: INOVAÇÃO */}
        <div className="bento-card group flex flex-col rounded-[3rem] bg-white border-2 border-brand-yellow/40 shadow-[6px_6px_0_0_rgba(255,203,30,0.15)] hover:shadow-[12px_12px_0_0_rgba(255,203,30,0.3)] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default">
          <div className="h-64 relative overflow-hidden border-b-2 border-brand-yellow/30">
            <img src={inovacaoImg} alt="Inovação" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-yellow-dark shadow-md transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
              <Lightbulb size={28} weight="duotone" />
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4 flex-grow bg-gradient-to-b from-white to-brand-yellow/5">
            <span className="font-sans text-[10px] font-bold text-brand-yellow-dark uppercase tracking-wider">02 • Inovação</span>
            <h3 className="font-doodle text-3xl text-brand-charcoal">Ciência e Tecnologia</h3>
            <p className="font-sans text-sm text-brand-charcoal-light/80 font-medium leading-relaxed flex-grow">
              Programação, robótica e laboratórios práticos. Preparando estudantes para os desafios do século XXI.
            </p>
            <button onClick={() => navigate('/infraestrutura')} className="self-start mt-2 px-5 py-2.5 rounded-full bg-brand-yellow/20 text-brand-yellow-dark hover:bg-brand-yellow hover:text-brand-charcoal transition-colors duration-300 font-sans text-xs uppercase tracking-wide font-bold flex items-center gap-2">
              Laboratórios <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* PILLAR 3: HUMANISMO */}
        <div className="bento-card group flex flex-col rounded-[3rem] bg-white border-2 border-brand-blue/30 shadow-[6px_6px_0_0_rgba(78,168,222,0.15)] hover:shadow-[12px_12px_0_0_rgba(78,168,222,0.25)] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default md:col-span-2 lg:col-span-1">
          <div className="h-64 relative overflow-hidden border-b-2 border-brand-blue/20">
            <img src={humanismoImg} alt="Humanismo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue-dark shadow-md transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
              <Heart size={28} weight="duotone" />
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4 flex-grow bg-gradient-to-b from-white to-brand-blue/5">
            <span className="font-sans text-[10px] font-bold text-brand-blue-dark uppercase tracking-wider">03 • Humanismo</span>
            <h3 className="font-doodle text-3xl text-brand-charcoal">Formação de Valores</h3>
            <p className="font-sans text-sm text-brand-charcoal-light/80 font-medium leading-relaxed flex-grow">
              Inteligência emocional, solidariedade e empatia. Cidadãos compassivos prontos para liderar.
            </p>
            <button onClick={() => navigate('/blog')} className="self-start mt-2 px-5 py-2.5 rounded-full bg-brand-blue/10 text-brand-blue-dark hover:bg-brand-blue hover:text-white transition-colors duration-300 font-sans text-xs uppercase tracking-wide font-bold flex items-center gap-2">
              Projetos Sociais <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
