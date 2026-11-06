import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ClipboardText, DownloadSimple, FilePdf, MapPin, PencilSimple, Phone, Printer, Sparkle } from '@phosphor-icons/react';
import FaqSection from '../components/FaqSection';
import MatriculaForm from '../components/MatriculaForm';
import OptarPeloSaberSection from '../components/OptarPeloSaberSection';
import { scrollToElement } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const CONTRATO_URL = '/documentos/contrato-educacional-colegio-saber.pdf';

function rolarAteAncora(e: MouseEvent<HTMLAnchorElement>) {
  const alvo = document.querySelector<HTMLElement>(e.currentTarget.hash);
  if (!alvo) return;
  e.preventDefault();
  scrollToElement(alvo);
}

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
          ease: 'expo.out',
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
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.steps-container',
            start: 'top 75%',
          }
        }
      );

      // Anima o formulário e o cartão do contrato
      gsap.fromTo('.matricula-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.matricula-grid',
            start: 'top 85%',
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
          <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-orange-dark font-bold">
            Matrícula nova ou renovação
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-brand-charcoal drop-shadow-sm mt-2">
            Matrículas abertas para 2027
          </h1>
          <p className="font-sans text-sm md:text-base font-medium text-brand-charcoal-light/80 max-w-2xl mx-auto leading-relaxed">
            Deixe seu contato para a secretaria retornar e adiante o contrato em casa. Assim, o dia da matrícula na escola fica bem mais rápido para a sua família.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#formulario"
              onClick={rolarAteAncora}
              className="font-serif inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-dark hover:-translate-y-1 transition-all duration-700 text-sm md:text-base font-bold shadow-[4px_4px_0_0_#2d2a26] border-[3px] border-brand-charcoal"
            >
              Deixar meu contato
              <ArrowDown size={18} weight="bold" />
            </a>
            <a
              href="#contrato"
              onClick={rolarAteAncora}
              className="font-serif inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-brand-charcoal hover:bg-brand-yellow-light hover:-translate-y-1 transition-all duration-700 text-sm md:text-base font-bold shadow-[4px_4px_0_0_#2d2a26] border-[3px] border-brand-charcoal"
            >
              Baixar o contrato
              <FilePdf size={18} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <OptarPeloSaberSection />

      {/* CAMINHO DE PEDRAS (STEPS) */}
      <section className="relative w-full py-16 px-6 z-10" aria-labelledby="como-funciona-titulo">
        <h2 id="como-funciona-titulo" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal text-center mb-20">
          Como funciona
        </h2>

        <div className="max-w-4xl mx-auto steps-container relative">

          {/* Linha Pontilhada Central (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 border-l-4 border-dashed border-brand-orange/30 -translate-x-1/2 z-0 dashed-line"></div>

          {/* Passo 1 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 relative z-10 group">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative p-8 rounded-[3rem] rounded-br-2xl bg-white border-2 border-brand-orange/30 shadow-[6px_6px_0_0_rgba(255,126,27,0.15)] group-hover:shadow-[10px_10px_0_0_rgba(255,126,27,0.25)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-md transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <ClipboardText size={24} weight="fill" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-brand-charcoal mt-2">Deixe seu contato</h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed mt-2">
                  Preencha o formulário aqui embaixo. Nossa secretaria recebe seus dados e retorna no contato que você informar.
                </p>
              </div>
            </div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-orange items-center justify-center font-serif font-bold text-xl text-brand-orange z-10 shadow-sm group-hover:scale-110 transition-transform">1</div>
            <div className="hidden md:block w-full md:w-1/2"></div>
          </div>

          {/* Passo 2 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 relative z-10 group">
            <div className="hidden md:block w-full md:w-1/2"></div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-yellow-dark items-center justify-center font-serif font-bold text-xl text-brand-yellow-dark z-10 shadow-sm group-hover:scale-110 transition-transform">2</div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="relative p-8 rounded-[3rem] rounded-bl-2xl bg-white border-2 border-brand-yellow/50 shadow-[6px_6px_0_0_rgba(255,203,30,0.15)] group-hover:shadow-[10px_10px_0_0_rgba(255,203,30,0.25)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-yellow-dark rounded-full flex items-center justify-center text-white shadow-md transform rotate-12 group-hover:rotate-0 transition-transform">
                  <Printer size={24} weight="fill" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-brand-charcoal mt-2">Baixe e imprima</h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed mt-2">
                  Baixe o Contrato Educacional em PDF e imprima onde for mais fácil para você.
                </p>
              </div>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 relative z-10 group">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative p-8 rounded-[3rem] rounded-br-2xl bg-white border-2 border-brand-blue/30 shadow-[6px_6px_0_0_rgba(78,168,222,0.15)] group-hover:shadow-[10px_10px_0_0_rgba(78,168,222,0.25)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-md transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <PencilSimple size={24} weight="fill" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-brand-charcoal mt-2">Preencha com calma</h3>
                <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed mt-2">
                  Complete seus dados e os do aluno em casa, sem pressa. Vale para matrícula nova e para renovação.
                </p>
              </div>
            </div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-blue items-center justify-center font-serif font-bold text-xl text-brand-blue z-10 shadow-sm group-hover:scale-110 transition-transform">3</div>
            <div className="hidden md:block w-full md:w-1/2"></div>
          </div>

          {/* Passo 4 */}
          <div className="step-card flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10 group">
            <div className="hidden md:block w-full md:w-1/2"></div>
            {/* Marcador Central */}
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-green items-center justify-center font-serif font-bold text-xl text-brand-green z-10 shadow-sm group-hover:scale-110 transition-transform">4</div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="relative p-8 rounded-[3rem] rounded-bl-2xl bg-brand-green/10 border-2 border-brand-green shadow-[6px_6px_0_0_rgba(102,204,51,0.2)] group-hover:shadow-[10px_10px_0_0_rgba(102,204,51,0.3)] transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center max-w-sm">
                <div className="absolute -top-6 w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white shadow-md transform rotate-12 group-hover:rotate-0 transition-transform">
                  <Sparkle size={24} weight="fill" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-brand-green-dark mt-2">Leve à escola</h3>
                <p className="font-sans text-xs text-brand-green-dark/80 font-medium leading-relaxed mt-2">
                  Traga o documento preenchido à secretaria. Com tudo pronto, sua matrícula leva bem menos tempo!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FORMULÁRIO + CONTRATO */}
      <section className="relative w-full py-16 px-6 md:px-12 z-10">
        <div className="matricula-grid max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Formulário de interesse */}
          <div id="formulario" className="matricula-card scroll-mt-32 lg:col-span-7 bg-white border-[3px] border-brand-orange/30 rounded-[3rem] p-6 sm:p-10 shadow-[8px_8px_0_0_rgba(255,126,27,0.15)] relative overflow-hidden">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal mb-2">Deixe seu contato</h2>
            <p className="font-sans text-sm font-semibold text-brand-charcoal-light/90 leading-relaxed mb-6">
              São só cinco campos. A secretaria recebe seus dados e retorna para conversar sobre a vaga.
            </p>
            <MatriculaForm />
          </div>

          {/* Contrato para download */}
          <div id="contrato" className="matricula-card scroll-mt-32 lg:col-span-5 bg-[#fefce8] border-[3px] border-[#fae69e] rounded-[3rem] p-6 sm:p-10 shadow-[8px_8px_0_0_rgba(216,159,0,0.15)] flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white/50 shadow-sm flex items-center justify-center text-[#a87a00]">
              <FilePdf size={30} weight="duotone" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal mb-2">Adiante o contrato</h2>
              <p className="font-sans text-sm font-semibold text-brand-charcoal-light leading-relaxed">
                Economize tempo na matrícula nova ou na renovação: chegue à escola com o Termo de Compromisso e o Contrato Educacional já preenchidos.
              </p>
            </div>

            <a
              href={CONTRATO_URL}
              download="Contrato Educacional - Colégio Saber.pdf"
              className="font-serif inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-yellow text-brand-charcoal hover:bg-brand-yellow-light hover:-translate-y-1 transition-all duration-700 text-base font-bold shadow-[4px_4px_0_0_#2d2a26] border-[3px] border-brand-charcoal"
            >
              <DownloadSimple size={20} weight="bold" />
              Baixar o contrato
            </a>
            <p className="font-sans text-xs font-semibold text-brand-charcoal-light/80 text-center -mt-2">PDF com 5 páginas, cerca de 400 KB</p>

            <ol className="flex flex-col gap-3 font-sans text-sm font-semibold text-brand-charcoal-light leading-relaxed">
              {[
                'Baixe e imprima o documento.',
                'Preencha seus dados e os do aluno, com letra legível.',
                'Leve o documento preenchido à secretaria da escola.',
              ].map((passo, idx) => (
                <li key={passo} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white border-2 border-[#d89f00] font-serif text-xs font-bold text-brand-charcoal flex items-center justify-center shrink-0">{idx + 1}</span>
                  <span>{passo}</span>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-3 pt-5 border-t-2 border-dashed border-[#fae69e] font-sans text-sm font-semibold text-brand-charcoal-light leading-relaxed">
              <p>
                O contrato é assinado em duas vias, com duas testemunhas e firma reconhecida do responsável. Ficou em dúvida em algum campo, como os valores da anuidade? Deixe em branco, que a secretaria resolve com você.
              </p>
              <p>
                <strong className="text-brand-charcoal">Leve também:</strong> RG e CPF do aluno e do responsável, comprovante de residência e histórico escolar ou declaração de transferência.
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={18} weight="duotone" className="text-[#a87a00] shrink-0 mt-0.5" />
                <span>Av. Ivison Amaro da Silveira Costa, s/n, Atalaia, Escada - PE</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} weight="duotone" className="text-[#a87a00] shrink-0" />
                <a href="tel:+558135561122" className="underline">(81) 3556-1122</a>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Seção FAQ */}
      <div className="bg-white rounded-t-[4rem] pt-12">
        <FaqSection />
      </div>

    </div>
  );
}
