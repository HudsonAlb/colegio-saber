import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ArrowRight, GraduationCap, MapPin, Phone, Mail } from 'lucide-react';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import PillarsSection from './components/PillarsSection';
import HighlightsSection from './components/HighlightsSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PageTransition from './components/PageTransition';
import AdmissaoPage from './pages/AdmissaoPage';
import DiferenciaisPage from './pages/DiferenciaisPage';
import MatriculasPage from './pages/MatriculasPage';
import CalendarioPage from './pages/CalendarioPage';
import SegmentosPage from './pages/SegmentosPage';
import BlogPage from './pages/BlogPage';
import AccessibilityBar from './components/AccessibilityBar';
import WhatsappButton from './components/WhatsappButton';
import heroMockup from './assets/hero_mockup.png';

gsap.registerPlugin(ScrollTrigger);

// ----------------- CROPPED LOGO ICON -----------------
function LogoIcon() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-brand-charcoal/5 shrink-0 flex items-center justify-center bg-white group-hover:scale-110 transition-transform duration-300">
      <img
        src={heroMockup}
        alt="Logo Colégio Saber"
        className="w-full h-full object-cover scale-[21] origin-[12.62%_11.82%] pointer-events-none"
      />
    </div>
  );
}

// ----------------- HEADER & NAV COMPONENT -----------------
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        role="banner"
        className="w-full transition-all duration-500 bg-white/95 backdrop-blur-md rounded-full border border-brand-light-border shadow-[0_12px_24px_rgba(67,56,50,0.05)] py-2.5 px-5 md:px-8 flex items-center justify-between pointer-events-auto"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0" aria-label="Colégio Saber - Início">
          <LogoIcon />
          <div className="flex flex-col">
            <span className="font-serif text-sm md:text-base font-bold tracking-normal text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
              Colégio Saber
            </span>
            <span className="text-[8px] md:text-[9px] font-sans tracking-[0.2em] font-semibold text-brand-charcoal/50">
              CUIDAR & APRENDER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink" role="navigation" aria-label="Menu de Navegação Principal">
          {[
            { label: 'Início', path: '/' },
            { label: 'Nosso Método', path: '/pilares' },
            { label: 'Educação Infantil', path: '/segmentos' },
            { label: 'Infraestrutura', path: '/diferenciais' },
            { label: 'Contato', path: '/admissao' }
          ].map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={idx} 
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`font-sans text-[11px] xl:text-xs font-semibold py-2 px-3.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'bg-brand-orange/15 text-brand-orange-dark font-bold'
                    : 'text-brand-charcoal hover:text-brand-orange hover:bg-brand-orange/5'
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
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full overflow-hidden bg-brand-orange text-white hover:bg-brand-orange-dark transition-all duration-300 text-xs font-semibold tracking-wide whitespace-nowrap shadow-sm"
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
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* MOBILE MENU */}
      <div 
        id="mobile-menu-container"
        role="navigation"
        aria-label="Menu de Navegação Mobile"
        className={`fixed inset-0 z-35 bg-[#fdfbf7] flex flex-col justify-center px-8 transition-all duration-700 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col gap-5 text-center mt-12">
          {[
            { label: 'Início', path: '/' },
            { label: 'Nosso Método', path: '/pilares' },
            { label: 'Educação Infantil', path: '/segmentos' },
            { label: 'Infraestrutura', path: '/diferenciais' },
            { label: 'Contato', path: '/admissao' }
          ].map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path}
              className="font-serif text-2xl tracking-wide text-brand-charcoal hover:text-brand-orange transition-colors duration-300 font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="mt-12 pt-6 border-t border-brand-light-border flex flex-col gap-4">
          <Link 
            to="/admissao"
            className="w-full py-3 text-center rounded-full bg-brand-orange text-white text-sm font-semibold shadow-md"
          >
            Matrículas Abertas
          </Link>
        </div>
      </div>
    </>
  );
}

// ----------------- PAGES COMPONENTS -----------------

// 1. HOME PAGE
function HomePage() {
  const quickAccessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = quickAccessRef.current?.querySelectorAll('.quick-access-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quickAccessRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-home">
      <Hero />
      <HighlightsSection />
      <StatsSection />
      <TestimonialsSection />
      
      {/* Quick Access Block for Parents */}
      <section ref={quickAccessRef} className="py-20 bg-brand-light border-t border-brand-light-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="quick-access-card p-8 rounded-3xl border border-brand-light-border bg-brand-light-card hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between h-64">
            <span className="font-serif text-brand-orange text-lg font-medium">Sobre Nós</span>
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Tradição & Visão</h3>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-4">
                Conheça nossa trajetória dedicada à formação de cidadãos completos e éticos.
              </p>
            </div>
            <Link to="/historia" className="flex items-center gap-2 text-xs uppercase font-semibold text-brand-orange hover:text-brand-orange-dark">
              Ler História <ArrowRight size={12} />
            </Link>
          </div>

          <div className="quick-access-card p-8 rounded-3xl border border-brand-light-border bg-brand-light-card hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between h-64">
            <span className="font-serif text-brand-orange text-lg font-medium">Ensino</span>
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Segmentos Escolares</h3>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-4">
                Conheça nossas fases pedagógicas da Educação Infantil ao Ensino Médio.
              </p>
            </div>
            <Link to="/segmentos" className="flex items-center gap-2 text-xs uppercase font-semibold text-brand-orange hover:text-brand-orange-dark">
              Ver Ensino <ArrowRight size={12} />
            </Link>
          </div>

          <div className="quick-access-card p-8 rounded-3xl border border-brand-light-border bg-brand-light-card hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between h-64">
            <span className="font-serif text-brand-orange text-lg font-medium">Admissões</span>
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Matrículas Abertas</h3>
              <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-4">
                Preencha nossa ficha de matrícula digital e agende o teste diagnóstico e a visita guiada.
              </p>
            </div>
            <Link to="/admissao" className="flex items-center gap-2 text-xs uppercase font-semibold text-brand-orange hover:text-brand-orange-dark">
              Iniciar Inscrição <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// 2. HISTORIA PAGE
function HistoriaPage() {
  const quoteSectionRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLDivElement>(null);
  const quoteAuthorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(quoteTextRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(quoteAuthorRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.0,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-20">
      
      {/* Quote Section */}
      <div 
        ref={quoteSectionRef} 
        className="relative w-full py-20 px-6 bg-brand-light flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute w-[60%] h-[60%] rounded-full bg-brand-yellow/5 blur-[120px] quote-bg-glow origin-center z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-brand-orange/30 flex items-center justify-center mb-8">
            <span className="font-serif text-brand-orange text-lg">“</span>
          </div>
          
          <div 
            ref={quoteTextRef}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-relaxed text-brand-charcoal font-light"
          >
            "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original."
          </div>

          <div 
            ref={quoteAuthorRef}
            className="mt-8 font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-orange-dark font-medium"
          >
            — Albert Einstein
          </div>
        </div>
      </div>

      {/* Presentation Content */}
      <section className="max-w-4xl mx-auto px-6 mt-12 text-center md:text-left flex flex-col gap-8">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal">Uma trajetória com Propósito</h1>
        <p className="font-sans text-sm text-brand-charcoal-light/85 font-light leading-relaxed">
          Desde a nossa fundação, o Colégio Saber tem sido um farol de ensino humanista de qualidade. Acreditamos que a educação deve atuar na formação integral: desenvolvendo o pensamento crítico do aluno, instrumentalizando-o com a tecnologia necessária, e solidificando valores éticos de cidadania.
        </p>
        <p className="font-sans text-sm text-brand-charcoal-light/85 font-light leading-relaxed">
          Nosso corpo docente qualificado atua de forma integrada, prestando mentoria constante e garantindo que cada aluno receba a atenção necessária para alcançar seu pleno potencial intelectual e pessoal.
        </p>
      </section>
    </div>
  );
}

// 3. PILARES PAGE
function PilaresPage() {
  return (
    <div className="pt-24 pb-12">
      <PillarsSection />
    </div>
  );
}





// ----------------- FOOTER COMPONENT -----------------
function Footer() {
  return (
    <footer className="w-full bg-brand-light-card border-t border-brand-light-border py-16 md:py-24 text-brand-charcoal-light/80 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-brand-orange w-8 h-8 stroke-[1.5]" />
            <span className="font-serif text-lg tracking-[0.2em] font-semibold text-brand-charcoal">
              COLÉGIO SABER
            </span>
          </div>
          <p className="font-sans text-xs font-light leading-relaxed">
            Mais do que uma escola, um ecossistema educacional comprometido com a excelência ética e intelectual.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="w-9 h-9 rounded-full border border-brand-light-border flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors duration-500" aria-label="Visitar página do Instagram do Colégio Saber">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-brand-light-border flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors duration-500" aria-label="Visitar página do LinkedIn do Colégio Saber">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-brand-light-border flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors duration-500" aria-label="Visitar página do Facebook do Colégio Saber">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation links */}
        <div className="flex flex-col gap-4">
          <h5 className="font-serif text-sm text-brand-charcoal uppercase tracking-[0.2em] font-medium">
            Institucional
          </h5>
          <div className="flex flex-col gap-2 font-sans text-xs font-light">
            <Link to="/historia" className="hover:text-brand-orange transition-colors duration-300">Nossa História</Link>
            <Link to="/pilares" className="hover:text-brand-orange transition-colors duration-300">Pilares Pedagógicos</Link>
            <Link to="/segmentos" className="hover:text-brand-orange transition-colors duration-300">Segmentos de Ensino</Link>
            <Link to="/diferenciais" className="hover:text-brand-orange transition-colors duration-300">Diferenciais</Link>
            <Link to="/matriculas" className="hover:text-brand-orange transition-colors duration-300">Processo de Admissão</Link>
            <Link to="/admissao" className="hover:text-brand-orange transition-colors duration-300">Matrícula Interativa</Link>
            <Link to="/calendario" className="hover:text-brand-orange transition-colors duration-300">Calendário Escolar</Link>
            <Link to="/blog" className="hover:text-brand-orange transition-colors duration-300">Blog Saber em Ação</Link>
          </div>
        </div>

        {/* Col 3: Contact Info */}
        <div className="flex flex-col gap-4">
          <h5 className="font-serif text-sm text-brand-charcoal uppercase tracking-[0.2em] font-medium">
            Contato
          </h5>
          <div className="flex flex-col gap-3 font-sans text-xs font-light">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-orange shrink-0" />
              <span>Av. das Nações Unidas, 1200 - São Paulo, SP</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-brand-orange shrink-0" />
              <span>(11) 3456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-brand-orange shrink-0" />
              <span>admissoes@colegiosaber.com.br</span>
            </div>
          </div>
        </div>

        {/* Col 4: Newsletter */}
        <div className="flex flex-col gap-4">
          <h5 className="font-serif text-sm text-brand-charcoal uppercase tracking-[0.2em] font-medium">
            Novidades
          </h5>
          <p className="font-sans text-xs font-light leading-relaxed">
            Assine nossa newsletter informativa mensal para se manter informado.
          </p>
          <form 
            className="flex rounded-full overflow-hidden border border-brand-light-border bg-white p-1.5 focus-within:border-brand-orange/60 transition-colors duration-500"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Assinar nossa newsletter mensal"
          >
            <input 
              type="email" 
              placeholder="Seu email" 
              aria-label="Seu endereço de e-mail para receber novidades"
              className="bg-transparent border-none text-xs px-4 py-1.5 text-brand-charcoal placeholder-brand-charcoal/35 outline-none w-full"
            />
            <button 
              type="submit"
              aria-label="Enviar cadastro da newsletter"
              className="bg-brand-orange hover:bg-brand-orange-dark text-brand-light text-xs uppercase px-4 py-1.5 rounded-full font-semibold transition-colors duration-500"
            >
              Enviar
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-brand-light-border flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/40">
        <span>© 2026 Colégio Saber. Todos os direitos reservados.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-orange transition-colors duration-300">Termos de Uso</a>
          <a href="#" className="hover:text-brand-orange transition-colors duration-300">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

// ----------------- APP MAIN COMPONENT -----------------
function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        {/* OUTER WRAPPER WITH PLAYFUL PASTEL BACKGROUND AND DECORATIVE WAVES */}
        <div className="relative min-h-screen bg-[#f7fdfb] overflow-x-hidden font-sans text-brand-charcoal selection:bg-brand-orange selection:text-white p-0 sm:p-4 md:p-6 lg:p-8">
          
          {/* WAVY PASTEL CORNER GRAPHICS */}
          <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#ffa15c]/30 rounded-br-[160px] pointer-events-none -z-10"></div>
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#66cc33]/20 rounded-bl-[160px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#ffe574]/35 rounded-tr-[160px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#66cc33]/15 rounded-tl-[160px] pointer-events-none -z-10"></div>
          
          {/* FLOATING DECORATIONS IN THE BACKGROUND (OUTSIDE CANVAS) */}
          <div className="absolute top-10 left-10 w-24 h-24 text-white opacity-40 pointer-events-none hidden lg:block">
            {/* Cloud SVG */}
            <svg viewBox="0 0 100 100" fill="currentColor"><path d="M20,60 C20,50 30,40 40,40 C45,30 60,30 70,40 C80,40 90,50 90,60 C90,70 80,80 70,80 L20,80 C10,80 10,70 20,60 Z"/></svg>
          </div>
          <div className="absolute top-40 right-12 w-16 h-16 text-[#ffcb1e] opacity-40 pointer-events-none hidden lg:block animate-pulse">
            {/* Star SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/></svg>
          </div>
          <div className="absolute bottom-20 left-8 w-20 h-20 text-[#ffa15c] opacity-30 pointer-events-none hidden lg:block">
            {/* Flower SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M6,12A2,2 0 0,1 8,10A2,2 0 0,1 10,12A2,2 0 0,1 8,14A2,2 0 0,1 6,12M12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20M18,12A2,2 0 0,1 16,14A2,2 0 0,1 14,12A2,2 0 0,1 16,10A2,2 0 0,1 18,12Z"/></svg>
          </div>
          <div className="absolute bottom-40 right-10 w-28 h-28 opacity-25 pointer-events-none hidden lg:block">
            {/* Rainbow SVG */}
            <svg viewBox="0 0 100 50" fill="none" strokeWidth="8" strokeLinecap="round">
              <path d="M10,45 A40,40 0 0,1 90,45" stroke="#ff65a3" />
              <path d="M22,45 A28,28 0 0,1 78,45" stroke="#ffcb1e" />
              <path d="M34,45 A16,16 0 0,1 66,45" stroke="#4ea8de" />
            </svg>
          </div>

          {/* INNER WHITE-CREME CANVAS FOR THE MAIN CONTENT */}
          <div className="mx-auto max-w-7xl bg-[#fffcf7] border-4 border-brand-charcoal/10 rounded-[32px] md:rounded-[48px] shadow-[0_24px_50px_rgba(67,56,50,0.12)] relative z-10 overflow-hidden flex flex-col justify-between min-h-[calc(100vh-4rem)]">
            
            {/* ACCESSIBILITY BAR (Fixed width block inside canvas) */}
            <div className="w-full relative z-50">
              <AccessibilityBar />
            </div>

            {/* STICKY CAPSULE HEADER WRAPPER */}
            <div className="absolute top-12 left-0 w-full z-40 px-4 md:px-6 pointer-events-none">
              <Header />
            </div>

            {/* ÁREA DE CONTEÚDO DAS PÁGINAS COM TRANSIÇÕES FADE */}
            <main id="main-content" className="flex-grow z-10 focus:outline-none pt-32 md:pt-40" role="main">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/historia" element={<HistoriaPage />} />
                  <Route path="/pilares" element={<PilaresPage />} />
                  <Route path="/segmentos" element={<SegmentosPage />} />
                  <Route path="/diferenciais" element={<DiferenciaisPage />} />
                  <Route path="/matriculas" element={<MatriculasPage />} />
                  <Route path="/admissao" element={<AdmissaoPage />} />
                  <Route path="/calendario" element={<CalendarioPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                </Routes>
              </PageTransition>
            </main>

            {/* FOOTER (Rodapé Compartilhado) */}
            <Footer />

            {/* BOTÃO FLUTUANTE DO WHATSAPP */}
            <WhatsappButton />

          </div>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
