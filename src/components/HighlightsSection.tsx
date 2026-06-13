
function FamilyHeartIcon() {
  return (
    <svg className="w-32 h-32 mx-auto mb-4" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart */}
      <path d="M60 42C60 42 54 26 40 26C28 26 22 36 22 48C22 66 60 92 60 92C60 92 98 66 98 48C98 36 92 26 80 26C66 26 60 42 60 42Z" fill="#f28f8f" />
      {/* Father */}
      <circle cx="42" cy="72" r="10" fill="#433832" />
      <path d="M28 94C28 84 34 82 42 82C50 82 56 84 56 94" stroke="#433832" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Mother */}
      <circle cx="78" cy="72" r="10" fill="#433832" />
      <path d="M64 94C64 84 70 82 78 82C86 82 92 84 92 94" stroke="#433832" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Child */}
      <circle cx="60" cy="78" r="7" fill="#433832" />
      <path d="M50 94C50 87 54 86 60 86C66 86 70 87 70 94" stroke="#433832" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PaintPaletteIcon() {
  return (
    <svg className="w-32 h-32 mx-auto mb-4" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paint Palette */}
      <path d="M85 30C55 30 30 50 30 75C30 92 45 102 65 102C70 102 74 99 76 95C78 91 82 88 88 88C98 88 105 78 105 65C105 45 98 30 85 30Z" fill="#fae69e" stroke="#433832" strokeWidth="4" strokeLinejoin="round" />
      {/* Color blobs */}
      <circle cx="50" cy="55" r="7" fill="#f28f8f" />
      <circle cx="70" cy="50" r="7" fill="#e78b53" />
      <circle cx="55" cy="80" r="7" fill="#b9dcf4" />
      <circle cx="85" cy="72" r="7" fill="#d2ece0" />
      {/* Brush */}
      <path d="M100 20L72 56L64 48L92 12L100 20Z" fill="#c96f3a" stroke="#433832" strokeWidth="3" />
      <path d="M64 48L58 54L66 62L72 56L64 48Z" fill="#fae69e" />
    </svg>
  );
}

function SchoolHouseIcon() {
  return (
    <svg className="w-32 h-32 mx-auto mb-4" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* School house wall */}
      <rect x="25" y="55" width="45" height="35" rx="4" fill="#fcd2af" stroke="#433832" strokeWidth="4" />
      {/* Roof */}
      <path d="M20 55L47.5 30L75 55H20Z" fill="#f28f8f" stroke="#433832" strokeWidth="4" strokeLinejoin="round" />
      {/* Windows */}
      <rect x="32" y="62" width="10" height="10" rx="2" fill="#b9dcf4" stroke="#433832" strokeWidth="3" />
      <rect x="52" y="62" width="10" height="10" rx="2" fill="#b9dcf4" stroke="#433832" strokeWidth="3" />
      {/* Door */}
      <path d="M42 90V78H53V90H42Z" fill="#d2ece0" stroke="#433832" strokeWidth="3" />
      {/* Little flag/tower */}
      <rect x="44" y="18" width="7" height="12" fill="#e78b53" stroke="#433832" strokeWidth="3" />
      <path d="M51 18L62 23L51 28V18Z" fill="#fae69e" stroke="#433832" strokeWidth="3" />
      {/* Slide */}
      <path d="M72 75H82L98 90" stroke="#433832" strokeWidth="4" strokeLinecap="round" />
      <line x1="88" y1="75" x2="88" y2="90" stroke="#433832" strokeWidth="3" />
    </svg>
  );
}

export default function HighlightsSection() {
  const cards = [
    {
      id: 'afetiva',
      title: 'Educação Afetiva',
      description: 'Acolhimento e carinho',
      bgColor: 'bg-[#fcd2af]',
      icon: FamilyHeartIcon
    },
    {
      id: 'criativo',
      title: 'Aprendizado Criativo',
      description: 'Exploração e descoberta',
      bgColor: 'bg-[#b9dcf4]',
      icon: PaintPaletteIcon
    },
    {
      id: 'seguro',
      title: 'Ambiente Seguro',
      description: 'Espaço projetado para o brincar',
      bgColor: 'bg-[#fae69e]',
      icon: SchoolHouseIcon
    }
  ];

  return (
    <section className="py-20 bg-brand-light relative z-10" aria-label="Nossos Diferenciais">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Title details */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-orange-dark font-bold block mb-3">
            Diferenciais Saber
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
            Nossa Proposta de Desenvolvimento
          </h2>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className={`${card.bgColor} rounded-[2.5rem] p-8 md:p-10 shadow-[0_12px_24px_rgba(67,56,50,0.04)] border-4 border-brand-charcoal/5 flex flex-col justify-between items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(67,56,50,0.08)]`}
              >
                <div className="w-full flex-grow flex flex-col items-center justify-center">
                  <IconComponent />
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-bold mb-2">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-brand-charcoal-light font-semibold">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
