import TourVirtual from '../components/TourVirtual';

export default function DiferenciaisPage() {
  return (
    <div className="pt-32 pb-0">
      <section className="w-full bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col gap-12">
          
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <h1 className="font-serif text-4xl text-brand-charcoal">Nossos Diferenciais em Números</h1>
            <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-medium leading-relaxed">
              O Colégio Saber combina solidez e resultados acadêmicos expressivos. Veja o impacto da nossa proposta educacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-8 mb-16">
            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-brand-light-border bg-brand-light-card">
              <span className="font-serif text-5xl md:text-6xl text-brand-orange font-bold">
                85+
              </span>
              <div className="w-6 h-[1px] bg-brand-orange/30"></div>
              <h2 className="font-serif text-lg text-brand-charcoal uppercase tracking-widest">
                Anos de Tradição
              </h2>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-medium leading-relaxed max-w-xs">
                Construindo pontes entre a sabedoria do passado e as novas fronteiras científicas.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-brand-light-border bg-brand-light-card">
              <span className="font-serif text-5xl md:text-6xl text-brand-orange font-bold">
                100%
              </span>
              <div className="w-6 h-[1px] bg-brand-orange/30"></div>
              <h2 className="font-serif text-lg text-brand-charcoal uppercase tracking-widest">
                Aprovação Nacional
              </h2>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-medium leading-relaxed max-w-xs">
                Estudantes preparados para ingressar nos centros de ensino superior mais competitivos do país.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-brand-light-border bg-brand-light-card">
              <span className="font-serif text-5xl md:text-6xl text-brand-orange font-bold">
                12k+
              </span>
              <div className="w-6 h-[1px] bg-brand-orange/30"></div>
              <h2 className="font-serif text-lg text-brand-charcoal uppercase tracking-widest">
                Líderes Formados
              </h2>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-medium leading-relaxed max-w-xs">
                Cidadãos que atuam e impactam a sociedade com forte integridade ética e humanismo.
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
