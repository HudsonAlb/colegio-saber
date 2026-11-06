import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Flask, HandHeart, HandsPraying, Leaf, Megaphone, PaintBrush, Users } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

// Texto do documento "Aos pais e alunos" do Projeto Educativo do Colégio Saber
const PRINCIPIOS = [
  {
    titulo: 'Aprender junto',
    texto: 'A apropriação do conhecimento não se dá de forma individual, e sim coletiva.',
    icone: Users,
    cor: 'bg-[#fff5ee] border-[#fcd2af] text-[#d94a00]',
    tamanho: 'lg:col-span-4',
  },
  {
    titulo: 'Descobrir de verdade',
    texto: 'O educando é estimulado para as suas próprias descobertas científicas.',
    icone: Flask,
    cor: 'bg-[#f0f8fc] border-[#b9dcf4] text-[#0284c7]',
    tamanho: 'lg:col-span-4',
  },
  {
    titulo: 'Ser cidadão',
    texto: 'Há efetiva participação na problemática social e política do país, enquanto sujeitos e cidadãos.',
    icone: Megaphone,
    cor: 'bg-[#fefce8] border-[#fae69e] text-[#a87a00]',
    tamanho: 'lg:col-span-4',
  },
  {
    titulo: 'Criar sem medo',
    texto: 'Há estímulo ao desenvolvimento das expressões criadoras, nas diversas formas de construção e reconstrução do pensamento.',
    icone: PaintBrush,
    cor: 'bg-[#f4f0ff] border-[#e0d4ff] text-[#6b21a8]',
    tamanho: 'lg:col-span-3',
  },
  {
    titulo: 'Viver a fé',
    texto: 'São vivenciados os princípios da vida cristã.',
    icone: HandsPraying,
    cor: 'bg-[#fff5ee] border-[#fcd2af] text-[#d94a00]',
    tamanho: 'lg:col-span-3',
  },
  {
    titulo: 'Conviver bem',
    texto: 'A convivência, na escola e fora dela, se dá de forma democrática, justa e fraterna.',
    icone: HandHeart,
    cor: 'bg-brand-pink-light border-brand-pink/30 text-brand-pink-dark',
    tamanho: 'lg:col-span-3',
  },
  {
    titulo: 'Cuidar do planeta',
    texto: 'São respeitados os princípios de preservação e conservação do meio ambiente.',
    icone: Leaf,
    cor: 'bg-brand-green-light border-brand-green/30 text-brand-green-dark',
    tamanho: 'sm:col-span-2 lg:col-span-3',
  },
];

interface OptarPeloSaberSectionProps {
  // Mostra o convite para a página de matrículas (desnecessário quando a seção já está nela)
  comConvite?: boolean;
}

export default function OptarPeloSaberSection({ comConvite = false }: OptarPeloSaberSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.principio-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.principios-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[var(--spacing-fluid-section)] bg-brand-light relative z-10" aria-labelledby="optar-titulo">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center mb-[var(--spacing-fluid-lg)] max-w-3xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#d94a00] font-black block mb-3">
            Aos pais e alunos
          </span>
          <h2 id="optar-titulo" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
            Por que optar pelo Saber?
          </h2>
          <p className="font-sans text-sm md:text-base font-semibold text-brand-charcoal-light/90 leading-relaxed mt-4">
            Ao escolher nossa escola, vocês escolhem também o Projeto Educativo que nos norteia. Optar pelo Saber é aceitar que:
          </p>
        </div>

        <ul className="principios-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {PRINCIPIOS.map(({ titulo, texto, icone: Icone, cor, tamanho }) => (
            <li key={titulo} className={`principio-card flex flex-col gap-4 p-7 rounded-[2.5rem] border-4 ${cor} ${tamanho}`}>
              <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white/50 shadow-sm flex items-center justify-center">
                <Icone size={30} weight="duotone" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">{titulo}</h3>
                <p className="font-sans text-sm font-semibold text-brand-charcoal-light leading-relaxed">{texto}</p>
              </div>
            </li>
          ))}
        </ul>

        {comConvite && (
          <div className="flex justify-center mt-[var(--spacing-fluid-lg)]">
            <Link
              to="/matriculas"
              className="font-serif inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-dark hover:-translate-y-1 transition-all duration-700 text-sm md:text-base font-bold shadow-[4px_4px_0_0_#2d2a26] border-[3px] border-brand-charcoal"
            >
              Matrículas 2027
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
