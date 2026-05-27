import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import tradicaoImg from '../assets/tradicao.png';
import inovacaoImg from '../assets/inovacao.png';
import humanismoImg from '../assets/humanismo.png';

gsap.registerPlugin(ScrollTrigger);

export default function PillarsSection() {
  const pillar1Ref = useRef<HTMLDivElement>(null);
  const pillar2Ref = useRef<HTMLDivElement>(null);
  const pillar3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pillars = [pillar1Ref.current, pillar2Ref.current, pillar3Ref.current];

    const ctx = gsap.context(() => {
      pillars.forEach((pillar) => {
        if (!pillar) return;

        // Revelações simples de rolagem vertical (sem pin, intuitivo para pais)
        const textElements = pillar.querySelectorAll('.stagger-item');
        const imgElement = pillar.querySelector('.pillar-image-container');

        // Fade in suave do texto
        gsap.fromTo(textElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2, // Cinematic delay >= 0.6s
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillar,
              start: 'top 80%', // Dispara quando a seção entra 20% na tela
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Fade in suave da imagem
        if (imgElement) {
          gsap.fromTo(imgElement,
            { opacity: 0, scale: 0.95, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.5, // Imagem entra bem devagar e majestosa
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pillar,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full py-24 md:py-32 bg-brand-light flex flex-col gap-24 md:gap-36">
      
      {/* SEÇÃO TÍTULO DE INTRODUÇÃO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-[1px] bg-brand-orange"></div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-orange-dark font-semibold">
              Proposta Pedagógica
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-brand-charcoal leading-tight">
            Os Três Pilares do <span className="text-brand-orange">Colégio Saber</span>
          </h2>
        </div>
        <p className="font-sans text-xs md:text-sm text-brand-charcoal-light/75 font-light max-w-sm md:text-left leading-relaxed">
          Nossa metodologia une a solidez do ensino clássico à inovação das novas tecnologias, com foco no desenvolvimento ético e emocional dos estudantes.
        </p>
      </div>

      {/* PILLAR 1: TRADIÇÃO (Texto Esquerda, Imagem Direita) */}
      <div 
        ref={pillar1Ref}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <span className="stagger-item font-serif text-6xl md:text-8xl text-brand-orange/10 font-bold leading-none select-none">
            01
          </span>
          <div className="stagger-item flex items-center gap-3">
            <div className="w-8 h-[1px] bg-brand-orange"></div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange-dark font-medium">
              Excelência Acadêmica
            </span>
          </div>
          <h3 className="stagger-item font-serif text-3xl md:text-4xl font-medium text-brand-charcoal leading-tight">
            A Tradição do Conhecimento
          </h3>
          <p className="stagger-item font-sans text-sm text-brand-charcoal-light/80 font-light leading-relaxed max-w-xl">
            Fundado sobre pilares de rigor intelectual, incentivamos o hábito da leitura, a redação analítica e o raciocínio matemático lógico. Acreditamos que uma base teórica estruturada é fundamental para a formação de mentes pensantes e livres.
          </p>
          <div className="stagger-item mt-2">
            <button className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-orange-dark font-semibold hover:text-brand-charcoal transition-colors duration-300">
              Conheça Nossa História <ChevronRight size={14} className="text-brand-orange" />
            </button>
          </div>
        </div>

        <div className="pillar-image-container order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-brand-light-border bg-brand-light-card">
            <img 
              src={tradicaoImg} 
              alt="Criança lendo livro na biblioteca do Colégio Saber" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            {/* Soft decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* PILLAR 2: INOVAÇÃO (Imagem Esquerda, Texto Direita) */}
      <div 
        ref={pillar2Ref}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="pillar-image-container flex justify-center lg:justify-start">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-brand-light-border bg-brand-light-card">
            <img 
              src={inovacaoImg} 
              alt="Estudante montando projeto de robótica no laboratório" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-yellow/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="stagger-item font-serif text-6xl md:text-8xl text-brand-yellow/15 font-bold leading-none select-none">
            02
          </span>
          <div className="stagger-item flex items-center gap-3">
            <div className="w-8 h-[1px] bg-brand-orange"></div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange-dark font-medium">
              Ciência e Tecnologia
            </span>
          </div>
          <h3 className="stagger-item font-serif text-3xl md:text-4xl font-medium text-brand-charcoal leading-tight">
            A Inovação Científica e Tecnológica
          </h3>
          <p className="stagger-item font-sans text-sm text-brand-charcoal-light/80 font-light leading-relaxed max-w-xl">
            Preparamos os estudantes para as demandas do século XXI. Integramos programação, robótica e iniciação científica ao currículo regular. Nossos alunos aprendem na prática, experimentando e desenvolvendo soluções reais em laboratórios modernos.
          </p>
          <div className="stagger-item mt-2">
            <button className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-orange-dark font-semibold hover:text-brand-charcoal transition-colors duration-300">
              Explore Nossos Laboratórios <ChevronRight size={14} className="text-brand-orange" />
            </button>
          </div>
        </div>
      </div>

      {/* PILLAR 3: HUMANISMO (Texto Esquerda, Imagem Direita) */}
      <div 
        ref={pillar3Ref}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <span className="stagger-item font-serif text-6xl md:text-8xl text-brand-orange/10 font-bold leading-none select-none">
            03
          </span>
          <div className="stagger-item flex items-center gap-3">
            <div className="w-8 h-[1px] bg-brand-orange"></div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange-dark font-medium">
              Formação de Valores
            </span>
          </div>
          <h3 className="stagger-item font-serif text-3xl md:text-4xl font-medium text-brand-charcoal leading-tight">
            O Desenvolvimento Humano e Ético
          </h3>
          <p className="stagger-item font-sans text-sm text-brand-charcoal-light/80 font-light leading-relaxed max-w-xl">
            Educar vai além da teoria. Cultivamos a inteligência emocional, a solidariedade, a escuta ativa e o senso de comunidade. Formamos cidadãos compassivos, conscientes do seu papel social e preparados para liderar com humanidade.
          </p>
          <div className="stagger-item mt-2">
            <button className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-orange-dark font-semibold hover:text-brand-charcoal transition-colors duration-300">
              Conheça Nossos Projetos Sociais <ChevronRight size={14} className="text-brand-orange" />
            </button>
          </div>
        </div>

        <div className="pillar-image-container order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-brand-light-border bg-brand-light-card">
            <img 
              src={humanismoImg} 
              alt="Crianças colaborando em atividades escolares" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

    </section>
  );
}
