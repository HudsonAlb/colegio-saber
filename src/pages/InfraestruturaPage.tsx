import TourVirtual from '../components/TourVirtual';
import { Star, Trophy, UsersThree } from '@phosphor-icons/react';

export default function InfraestruturaPage() {
  return (
    <div className="pt-32 pb-0 bg-transparent">
      <section className="w-full relative overflow-x-clip">
        
        {/* Blobs Coloridos no Fundo */}
        <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-brand-yellow/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-green/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col gap-16 relative z-10">
          
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
            <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">
              Um Mundo de Possibilidades
            </span>
            <h1 className="font-doodle text-4xl sm:text-5xl md:text-6xl text-brand-charcoal drop-shadow-sm mt-2">
              Nossa Infraestrutura
            </h1>
            <p className="font-sans text-sm md:text-base text-brand-charcoal-light/80 font-medium leading-relaxed">
              Descubra os ambientes mágicos e tecnológicos onde nossos estudantes crescem, aprendem e se preparam para transformar o mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-4 mb-20">
            {/* Bolha 1 */}
            <div className="flex flex-col items-center gap-6 p-10 rounded-t-[5rem] rounded-b-[3rem] bg-white border-[3px] border-brand-orange/30 shadow-[8px_8px_0_0_rgba(255,126,27,0.15)] hover:shadow-[12px_12px_0_0_rgba(255,126,27,0.25)] transition-all duration-500 hover:-translate-y-2 relative group">
              <div className="absolute -top-6 w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <Star size={32} weight="fill" />
              </div>
              <span className="font-doodle text-6xl text-brand-orange mt-4">
                85+
              </span>
              <div className="w-12 h-1.5 bg-brand-orange/20 rounded-full"></div>
              <h2 className="font-sans text-sm font-bold text-brand-charcoal uppercase tracking-widest">
                Anos de Tradição
              </h2>
              <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed max-w-[200px]">
                Uma ponte sólida entre a sabedoria clássica e as novas fronteiras digitais.
              </p>
            </div>

            {/* Bolha 2 */}
            <div className="flex flex-col items-center gap-6 p-10 rounded-[4rem] bg-white border-[3px] border-brand-green/30 shadow-[8px_8px_0_0_rgba(102,204,51,0.15)] hover:shadow-[12px_12px_0_0_rgba(102,204,51,0.25)] transition-all duration-500 hover:-translate-y-2 relative group md:-translate-y-8">
              <div className="absolute -top-6 w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <Trophy size={32} weight="fill" />
              </div>
              <span className="font-doodle text-6xl text-brand-green mt-4">
                100%
              </span>
              <div className="w-12 h-1.5 bg-brand-green/20 rounded-full"></div>
              <h2 className="font-sans text-sm font-bold text-brand-charcoal uppercase tracking-widest">
                Aprovação
              </h2>
              <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed max-w-[200px]">
                Estudantes preparados para ingressar nas melhores universidades do país.
              </p>
            </div>

            {/* Bolha 3 */}
            <div className="flex flex-col items-center gap-6 p-10 rounded-b-[5rem] rounded-t-[3rem] bg-white border-[3px] border-brand-blue/30 shadow-[8px_8px_0_0_rgba(78,168,222,0.15)] hover:shadow-[12px_12px_0_0_rgba(78,168,222,0.25)] transition-all duration-500 hover:-translate-y-2 relative group">
              <div className="absolute -top-6 w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <UsersThree size={32} weight="fill" />
              </div>
              <span className="font-doodle text-6xl text-brand-blue mt-4">
                12k+
              </span>
              <div className="w-12 h-1.5 bg-brand-blue/20 rounded-full"></div>
              <h2 className="font-sans text-sm font-bold text-brand-charcoal uppercase tracking-widest">
                Líderes Formados
              </h2>
              <p className="font-sans text-xs text-brand-charcoal-light/80 font-medium leading-relaxed max-w-[200px]">
                Cidadãos que impactam o mundo com grande integridade e humanismo.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Tour Virtual 360° */}
      <TourVirtual />
    </div>
  );
}
