import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
      <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">
        Erro 404
      </span>
      <h1 className="font-serif font-bold text-4xl sm:text-5xl text-brand-charcoal">
        Página não encontrada
      </h1>
      <p className="font-sans text-sm md:text-base text-brand-charcoal-light font-semibold max-w-md leading-relaxed">
        A página que você procura não existe ou foi movida. Que tal voltar para o início?
      </p>
      <Link
        to="/"
        className="font-serif inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-light hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-bold shadow-[4px_4px_0_0_#2d2a26] hover:shadow-[6px_6px_0_0_#2d2a26] border-[3px] border-brand-charcoal"
      >
        Voltar para o início
      </Link>
    </section>
  );
}
