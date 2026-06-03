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

gsap.registerPlugin(ScrollTrigger);

// ----------------- HEADER & NAV COMPONENT -----------------
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isHeaderActive = isScrolled || isMenuOpen;

  return (
    <>
      <header 
        role="banner"
        className={`relative w-full z-40 transition-all duration-700 ${
          isHeaderActive 
            ? 'py-2 md:py-4 bg-brand-light/95 backdrop-blur-lg border-b border-brand-light-border shadow-md' 
            : 'py-3 md:py-5 bg-brand-orange-dark border-b border-brand-orange-dark/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0" aria-label="Colégio Saber - Início">
            <GraduationCap className={`w-7 h-7 md:w-8 md:h-8 stroke-[1.5] group-hover:scale-105 transition-all duration-700 ${
              isHeaderActive ? 'text-brand-orange-dark' : 'text-brand-yellow'
            }`} />
            <div className="flex flex-col">
              <span className={`font-serif text-sm md:text-lg tracking-[0.2em] font-semibold transition-colors duration-700 whitespace-nowrap ${
                isHeaderActive 
                  ? 'text-brand-charcoal group-hover:text-brand-orange-dark' 
                  : 'text-brand-light group-hover:text-brand-yellow'
              }`}>
                COLÉGIO SABER
              </span>
              <span className={`text-[8px] md:text-[9px] font-sans tracking-[0.35em] font-medium transition-colors duration-700 whitespace-nowrap ${
                isHeaderActive 
                  ? 'text-brand-orange-dark' 
                  : 'text-brand-yellow-light'
              }`}>
                EXCELÊNCIA & VALORES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 shrink" role="navigation" aria-label="Menu de Navegação Principal">
            {[
              { label: 'Início', path: '/' },
              { label: 'História', path: '/historia' },
              { label: 'Pilares', path: '/pilares' },
              { label: 'Ensino', path: '/segmentos' },
              { label: 'Diferenciais', path: '/diferenciais' },
              { label: 'Matrículas', path: '/matriculas' },
              { label: 'Calendário', path: '/calendario' },
              { label: 'Blog', path: '/blog' }
            ].map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={idx} 
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-sans text-[10px] xl:text-xs uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-colors duration-500 relative py-1 group whitespace-nowrap ${
                    isActive 
                      ? (isHeaderActive ? 'text-brand-orange-dark font-semibold' : 'text-brand-yellow font-semibold')
                      : (isHeaderActive ? 'text-brand-charcoal hover:text-brand-orange-dark' : 'text-brand-light/95 hover:text-brand-yellow')
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] transition-all duration-500 ease-out ${
                    isHeaderActive ? 'bg-brand-orange-dark' : 'bg-brand-yellow'
                  } ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:block shrink-0">
            <Link 
              to="/admissao" 
              className={`relative inline-flex items-center justify-center px-4 xl:px-6 py-2 xl:py-2.5 rounded-full overflow-hidden border transition-all duration-700 text-[10px] xl:text-xs font-sans uppercase tracking-[0.15em] xl:tracking-[0.2em] whitespace-nowrap group ${
                isHeaderActive 
                  ? 'border-brand-orange-dark/40 text-brand-orange-dark hover:text-brand-light' 
                  : 'border-brand-light/40 text-brand-light hover:text-brand-orange-dark'
              }`}
            >
              <span className={`absolute inset-0 w-full h-full scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100 ${
                isHeaderActive ? 'bg-brand-orange-dark' : 'bg-brand-light'
              }`}></span>
              <span className="relative z-10 font-semibold">Agendar Visita</span>
            </Link>
          </div>

          {/* Hamburger Button */}
          <button 
            className={`block lg:hidden transition-colors duration-500 focus:outline-none shrink-0 ${
              isHeaderActive 
                ? 'text-brand-charcoal hover:text-brand-orange-dark' 
                : 'text-brand-light hover:text-brand-yellow'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-container"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div 
        id="mobile-menu-container"
        role="navigation"
        aria-label="Menu de Navegação Mobile"
        className={`fixed inset-0 z-35 bg-brand-light flex flex-col justify-center px-8 transition-all duration-1000 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8 text-left mt-12">
          {[
            { label: 'Início', path: '/' },
            { label: 'História', path: '/historia' },
            { label: 'Pilares', path: '/pilares' },
            { label: 'Ensino', path: '/segmentos' },
            { label: 'Diferenciais', path: '/diferenciais' },
            { label: 'Matrículas', path: '/matriculas' },
            { label: 'Calendário', path: '/calendario' },
            { label: 'Blog Saber em Ação', path: '/blog' }
          ].map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path}
              className="font-serif text-3xl tracking-wide text-brand-charcoal/80 hover:text-brand-orange transition-colors duration-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="mt-16 pt-8 border-t border-brand-light-border flex flex-col gap-4">
          <Link 
            to="/admissao"
            className="w-full py-4 text-center rounded-full bg-brand-orange text-brand-light text-xs uppercase tracking-[0.2em] font-semibold"
          >
            Agendar Visita
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
        <div className="relative min-h-screen bg-brand-light overflow-hidden font-sans text-brand-charcoal selection:bg-brand-orange selection:text-brand-light flex flex-col justify-between">
          
          {/* HEADER & ACCESSIBILITY CONTAINER (Fixo no topo e empilhado sem sobreposição) */}
          <div className="fixed top-0 left-0 w-full z-40 flex flex-col pointer-events-none">
            <div className="pointer-events-auto w-full">
              <AccessibilityBar />
            </div>
            <div className="pointer-events-auto w-full">
              <Header />
            </div>
          </div>

          {/* ÁREA DE CONTEÚDO DAS PÁGINAS COM TRANSIÇÕES FADE */}
          <main id="main-content" className="flex-grow z-10 focus:outline-none" role="main">
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
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
