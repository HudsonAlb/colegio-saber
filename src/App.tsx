import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { List, X, Student, MapPin, Phone, Envelope } from '@phosphor-icons/react';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import WhatsappButton from './components/WhatsappButton';
import logoSaber from './assets/LOGO-SABER.svg';

// Lazy loaded page components to improve initial page load speed and decouple app layout
const HomePage = lazy(() => import('./pages/HomePage'));
const HistoriaPage = lazy(() => import('./pages/HistoriaPage'));
const PilaresPage = lazy(() => import('./pages/PilaresPage'));
const AdmissaoPage = lazy(() => import('./pages/AdmissaoPage'));
const InfraestruturaPage = lazy(() => import('./pages/InfraestruturaPage'));
const MatriculasPage = lazy(() => import('./pages/MatriculasPage'));
const CalendarioPage = lazy(() => import('./pages/CalendarioPage'));
const SegmentosPage = lazy(() => import('./pages/SegmentosPage'));


gsap.registerPlugin(ScrollTrigger);



// ----------------- HEADER & NAV COMPONENT -----------------
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Controla o scroll do body e o Lenis para evitar travamento no mobile
  useEffect(() => {
    const lenis = (window as any).lenisInstance;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className="w-full relative z-40 transition-all duration-500 bg-white/95 backdrop-blur-md rounded-full border border-brand-light-border shadow-[0_12px_24px_rgba(67,56,50,0.05)] py-2.5 px-5 md:px-8 flex items-center justify-between pointer-events-auto"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center group shrink-0 cursor-pointer"
          aria-label="Colégio Saber - Início"
        >
          <img src={logoSaber} alt="Colégio Saber Logo" className="h-10 md:h-12 w-auto group-hover:scale-[1.02] transition-transform duration-300" />
        </Link>

        {/* Desktop Navigation */}
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 shrink" role="navigation" aria-label="Menu de Navegação Principal">
          {[
            { label: 'Início', path: '/' },
            { label: 'Nosso Método', path: '/pilares' },
            { label: 'Educação Infantil', path: '/segmentos' },
            { label: 'Infraestrutura', path: '/infraestrutura' },
            { label: 'Calendário', path: '/calendario' },
            { label: 'Contato', path: '/admissao' }
          ].map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`font-serif text-[13px] xl:text-[15px] py-1.5 px-4 rounded-full transition-all duration-300 whitespace-nowrap ${isActive
                    ? 'bg-brand-orange/15 text-brand-orange-dark font-bold shadow-sm'
                    : 'text-brand-charcoal font-semibold hover:text-brand-orange hover:bg-brand-orange/5'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden lg:block shrink-0">
          <Link
            to="/admissao"
            className="font-serif relative inline-flex items-center justify-center px-6 py-2.5 rounded-full overflow-hidden bg-brand-yellow text-brand-charcoal hover:bg-brand-yellow-light hover:-translate-y-1 transition-all duration-300 text-xs xl:text-sm font-bold tracking-wide whitespace-nowrap shadow-[4px_4px_0_0_#2d2a26] hover:shadow-[6px_6px_0_0_#2d2a26] border-2 border-brand-charcoal"
          >
            Matrículas Abertas
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="block lg:hidden text-brand-charcoal hover:text-brand-orange transition-colors duration-300 focus:outline-none shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu-container"
        >
          {isMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </header>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu-container"
        role="navigation"
        aria-label="Menu de Navegação Mobile"
        className={`fixed inset-0 z-30 bg-[#fdfbf7] flex flex-col justify-start px-8 pt-32 pb-8 overflow-y-auto transition-all duration-700 ease-in-out ${isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col gap-5 text-center mt-12">
          {[
            { label: 'Início', path: '/' },
            { label: 'Nosso Método', path: '/pilares' },
            { label: 'Educação Infantil', path: '/segmentos' },
            { label: 'Infraestrutura', path: '/infraestrutura' },
            { label: 'Calendário', path: '/calendario' },
            { label: 'Contato', path: '/admissao' }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-2xl tracking-wide text-brand-charcoal hover:text-brand-orange transition-colors duration-300 font-bold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 pt-6 border-t border-brand-light-border flex flex-col gap-4">
          <Link
            to="/admissao"
            onClick={() => setIsMenuOpen(false)}
            className="font-serif w-full py-3 text-center rounded-full bg-brand-yellow text-brand-charcoal text-base font-bold shadow-[4px_4px_0_0_#2d2a26] border-2 border-brand-charcoal hover:-translate-y-1 transition-transform hover:shadow-[6px_6px_0_0_#2d2a26]"
          >
            Matrículas Abertas
          </Link>
        </div>
      </div>
    </>
  );
}





// ----------------- FOOTER COMPONENT -----------------
function Footer() {
  return (
    <footer className="w-full bg-[#fdfbf7] border-t-4 border-brand-light-border py-16 md:py-24 text-brand-charcoal/80 relative z-10 overflow-hidden">
      {/* Decorative Wave at the Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fdfbf7" stroke="#e8e1d7" strokeWidth="2"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

        {/* Col 1: Brand */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Student className="text-[#ff7e1b] w-8 h-8 stroke-[1.5]" weight="duotone" />
            <span className="font-serif text-lg tracking-[0.2em] font-bold text-brand-charcoal">
              COLÉGIO SABER
            </span>
          </div>
          <p className="font-sans text-xs font-semibold text-brand-charcoal/75 leading-relaxed">
            Mais do que uma escola, um ecossistema educacional comprometido com a excelência ética e intelectual.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-[1rem] border-2 border-brand-charcoal bg-[#fff8f3] text-[#ff7e1b] flex items-center justify-center hover:bg-[#ff7e1b] hover:text-white shadow-[2px_2px_0_0_#2d2a26] hover:-translate-y-1 transition-all duration-300" aria-label="Visitar página do Instagram do Colégio Saber">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-[1rem] border-2 border-brand-charcoal bg-[#f0f8fc] text-[#0284c7] flex items-center justify-center hover:bg-[#0284c7] hover:text-white shadow-[2px_2px_0_0_#2d2a26] hover:-translate-y-1 transition-all duration-300" aria-label="Visitar página do LinkedIn do Colégio Saber">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-[1rem] border-2 border-brand-charcoal bg-[#fefce8] text-[#d89f00] flex items-center justify-center hover:bg-[#d89f00] hover:text-white shadow-[2px_2px_0_0_#2d2a26] hover:-translate-y-1 transition-all duration-300" aria-label="Visitar página do Facebook do Colégio Saber">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation links */}
        <div className="flex flex-col gap-4">
          <h5 className="font-serif text-sm text-brand-charcoal uppercase tracking-[0.2em] font-bold">
            Institucional
          </h5>
          <div className="flex flex-col gap-2 font-sans text-xs font-semibold text-brand-charcoal/75">
            {/* <Link to="/historia" className="hover:text-[#ff7e1b] transition-colors duration-300">Nossa História</Link> */}
            <Link to="/pilares" className="hover:text-[#ff7e1b] transition-colors duration-300">Pilares Pedagógicos</Link>
            <Link to="/segmentos" className="hover:text-[#ff7e1b] transition-colors duration-300">Segmentos de Ensino</Link>
            <Link to="/infraestrutura" className="hover:text-[#ff7e1b] transition-colors duration-300">Infraestrutura</Link>
            <Link to="/matriculas" className="hover:text-[#ff7e1b] transition-colors duration-300">Processo de Admissão</Link>
            <Link to="/admissao" className="hover:text-[#ff7e1b] transition-colors duration-300">Matrícula Interativa</Link>
            {/* <Link to="/calendario" className="hover:text-[#ff7e1b] transition-colors duration-300">Calendário Escolar</Link> */}
            {/* <Link to="/blog" className="hover:text-[#ff7e1b] transition-colors duration-300">Blog Saber em Ação</Link> */}
          </div>
        </div>

        {/* Col 3: Contact Info */}
        <div className="flex flex-col gap-4">
          <h5 className="font-serif text-sm text-brand-charcoal uppercase tracking-[0.2em] font-bold">
            Contato
          </h5>
          <div className="flex flex-col gap-3 font-sans text-xs font-semibold text-brand-charcoal/75">
            <div className="flex items-center gap-2 text-left">
              <MapPin size={14} className="text-[#ff7e1b] shrink-0" weight="duotone" />
              <span>Rua Projetada, s/n, Escada - PE, 55.500-000</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#ff7e1b] shrink-0" weight="duotone" />
              <span>(81) 3556-1122</span>
            </div>
            <div className="flex items-center gap-2">
              <Envelope size={14} className="text-[#ff7e1b] shrink-0" weight="duotone" />
              <span>admissoes@colegiosaber.com.br</span>
            </div>
          </div>
        </div>

        {/* Col 4: Newsletter */}
        <div className="flex flex-col gap-4">
          <h5 className="font-serif text-sm text-brand-charcoal uppercase tracking-[0.2em] font-bold">
            Novidades
          </h5>
          <p className="font-sans text-xs font-semibold text-brand-charcoal/75 leading-relaxed">
            Assine nossa newsletter informativa mensal para se manter informado.
          </p>
          <form
            className="flex rounded-full overflow-hidden border-[3px] border-brand-charcoal bg-white p-1.5 focus-within:border-[#ff7e1b] transition-colors duration-500 shadow-[4px_4px_0_0_#2d2a26]"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Assinar nossa newsletter mensal"
          >
            <input
              type="email"
              placeholder="Seu email"
              aria-label="Seu endereço de e-mail para receber novidades"
              className="bg-transparent border-none text-sm px-4 py-1.5 text-brand-charcoal placeholder-brand-charcoal/40 outline-none w-full font-serif font-semibold"
            />
            <button
              type="submit"
              aria-label="Enviar cadastro da newsletter"
              className="bg-[#ff7e1b] hover:bg-[#e78b53] text-brand-light text-xs uppercase px-5 py-2 rounded-full font-bold transition-colors duration-500 cursor-pointer"
            >
              Enviar
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-brand-light-border flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/60">
        <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left normal-case tracking-normal">
          <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/60">© 2026 Colégio Saber. Todos os direitos reservados.</span>
          <span className="text-[9px] text-brand-charcoal/50">AMARA VANDIRA SANTOS DE OLIVEIRA COLEGIO — CNPJ: 00.719.483/0001-89 — Escada / PE</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#ff7e1b] transition-colors duration-300">Termos de Uso</a>
          <a href="#" className="hover:text-[#ff7e1b] transition-colors duration-300">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

// ----------------- PROMO BANNER MODAL -----------------
function PromoBannerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show banner after 1.5s if not closed in this session
    const isClosed = sessionStorage.getItem('saber_banner_closed');
    if (!isClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('saber_banner_closed', 'true');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2a26]/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="banner-modal-title"
    >
      <div className="bg-[#fffcf7] border-4 border-brand-charcoal/10 rounded-[2.5rem] max-w-md w-full p-8 md:p-10 shadow-[0_24px_50px_rgba(67,56,50,0.2)] relative animate-fade-in flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#2d2a26]/60 hover:text-brand-orange transition-colors duration-300 w-8 h-8 rounded-full bg-brand-charcoal/5 flex items-center justify-center font-bold text-lg cursor-pointer"
          aria-label="Fechar banner promocional"
        >
          &times;
        </button>

        {/* Playful Icon */}
        <div className="w-16 h-16 bg-[#ffe574] text-[#ff7e1b] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </div>

        {/* Title */}
        <h3 id="banner-modal-title" className="font-serif text-3xl font-bold text-[#2d2a26] mb-4">
          Matrículas Abertas!
        </h3>

        {/* Text */}
        <p className="font-sans text-sm md:text-base text-[#524f4b] font-semibold mb-8 leading-relaxed">
          Venha conhecer o nosso espaço inovador, afetuoso e seguro projetado para o brincar e o aprendizado completo.
        </p>

        {/* CTA */}
        <Link
          to="/admissao"
          onClick={handleClose}
          className="w-full py-3.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-dark transition-all duration-300 text-sm font-bold shadow-md tracking-wide text-center"
        >
          Iniciar Inscrição
        </Link>
      </div>
    </div>
  );
}

// ----------------- APP MAIN COMPONENT -----------------
function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        {/* OUTER WRAPPER WITH PLAYFUL PASTEL BACKGROUND AND DECORATIVE WAVES */}
        <div className="relative w-full max-w-full min-h-screen bg-[#f7fdfb] overflow-x-hidden font-sans text-brand-charcoal selection:bg-brand-orange selection:text-white p-0 sm:p-4 md:p-6 lg:p-8">

          {/* WAVY PASTEL CORNER GRAPHICS */}
          <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#ffa15c]/30 rounded-br-[160px] pointer-events-none -z-10"></div>
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#66cc33]/20 rounded-bl-[160px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#ffe574]/35 rounded-tr-[160px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#66cc33]/15 rounded-tl-[160px] pointer-events-none -z-10"></div>

          {/* FLOATING DECORATIONS IN THE BACKGROUND (OUTSIDE CANVAS) */}
          <div className="absolute top-10 left-10 w-24 h-24 text-white opacity-40 pointer-events-none hidden lg:block">
            {/* Cloud SVG */}
            <svg viewBox="0 0 100 100" fill="currentColor"><path d="M20,60 C20,50 30,40 40,40 C45,30 60,30 70,40 C80,40 90,50 90,60 C90,70 80,80 70,80 L20,80 C10,80 10,70 20,60 Z" /></svg>
          </div>
          <div className="absolute top-40 right-12 w-16 h-16 text-[#ffcb1e] opacity-40 pointer-events-none hidden lg:block animate-pulse">
            {/* Star SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>
          </div>
          <div className="absolute bottom-20 left-8 w-20 h-20 text-[#ffa15c] opacity-30 pointer-events-none hidden lg:block">
            {/* Flower SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M6,12A2,2 0 0,1 8,10A2,2 0 0,1 10,12A2,2 0 0,1 8,14A2,2 0 0,1 6,12M12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20M18,12A2,2 0 0,1 16,14A2,2 0 0,1 14,12A2,2 0 0,1 16,10A2,2 0 0,1 18,12Z" /></svg>
          </div>
          <div className="absolute bottom-40 right-10 w-28 h-28 opacity-25 pointer-events-none hidden lg:block">
            {/* Rainbow SVG */}
            <svg viewBox="0 0 100 50" fill="none" strokeWidth="8" strokeLinecap="round">
              <path d="M10,45 A40,40 0 0,1 90,45" stroke="#ff65a3" />
              <path d="M22,45 A28,28 0 0,1 78,45" stroke="#ffcb1e" />
              <path d="M34,45 A16,16 0 0,1 66,45" stroke="#4ea8de" />
            </svg>
          </div>

          {/* INNER WHITE CANVAS FOR THE MAIN CONTENT */}
          <div className="mx-auto max-w-7xl bg-brand-light border-4 border-brand-charcoal/10 rounded-[32px] md:rounded-[48px] shadow-[0_24px_50px_rgba(67,56,50,0.12)] relative z-10 overflow-hidden flex flex-col justify-between min-h-[calc(100vh-4rem)]">

            {/* STICKY CAPSULE HEADER WRAPPER */}
            <div className="fixed top-6 sm:top-8 md:top-10 left-0 right-0 mx-auto w-full max-w-7xl z-40 px-4 md:px-6 pointer-events-none">
              <Header />
            </div>

            {/* ÁREA DE CONTEÚDO DAS PÁGINAS COM TRANSIÇÕES FADE */}
            <main id="main-content" className="flex-grow z-10 focus:outline-none pt-24 md:pt-30" role="main">
              <PageTransition>
                <Suspense fallback={
                  <div className="min-h-[50vh] w-full flex flex-col items-center justify-center gap-4 text-brand-charcoal">
                    <div className="w-10 h-10 border-4 border-[#ff7e1b] border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40">Carregando Página...</span>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/historia" element={<HistoriaPage />} />
                    <Route path="/pilares" element={<PilaresPage />} />
                    <Route path="/infraestrutura" element={<InfraestruturaPage />} />
                    <Route path="/segmentos" element={<SegmentosPage />} />
                    <Route path="/calendario" element={<CalendarioPage />} />
                    <Route path="/matriculas" element={<MatriculasPage />} />
                    <Route path="/admissao" element={<AdmissaoPage />} />
                  </Routes>
                </Suspense>
              </PageTransition>
            </main>

            {/* FOOTER (Rodapé Compartilhado) */}
            <Footer />

            {/* BOTÃO FLUTUANTE DO WHATSAPP */}
            <WhatsappButton />

            {/* BANNER PROMOCIONAL MODAL */}
            <PromoBannerModal />

          </div>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
