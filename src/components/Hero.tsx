import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import heroImg from '../assets/hero.png';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Smooth reveal animation
    if (titleRef.current) {
      tl.fromTo(titleRef.current.querySelectorAll('.playful-char, .playful-dashes'),
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.04, ease: 'back.out(1.5)' }
      );
    }

    tl.fromTo('.hero-text-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo('.hero-image-container',
      { opacity: 0, scale: 0.9, rotate: -2 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)' },
      '-=0.8'
    );

    // Floating animations for overlapping decorative items
    gsap.to('.float-sun-overlap', { y: -6, duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('.float-cloud-blue', { x: 8, duration: 4, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('.float-cloud-white', { x: -6, duration: 5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('.float-rainbow-overlap', { y: 4, rotate: 2, duration: 4.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }, []);

  return (
    <div ref={elementsRef} className="relative w-full min-h-[70vh] lg:min-h-[75vh] overflow-hidden bg-brand-light select-none py-8 lg:py-12 flex items-center justify-center">

      {/* BACKGROUND CORNER FLOWERS & MARGIN DECORATIONS */}

      {/* Left Leaf/Stem Drawing */}
      <div className="absolute top-1/3 left-6 w-10 h-20 text-[#8acbbb] opacity-60 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 40 80" fill="currentColor">
          <path d="M20,10 C25,25 35,30 35,45 C35,60 20,70 20,70" stroke="#433832" strokeWidth="2" fill="none" />
          <circle cx="20" cy="10" r="4" />
          <path d="M20,30 C30,30 35,20 35,20 C35,20 25,35 20,35" />
          <path d="M20,50 C10,50 5,40 5,40 C5,40 15,55 20,55" />
        </svg>
      </div>

      {/* Left Dotted Trail */}
      <div className="absolute top-[20%] left-12 w-36 h-24 opacity-30 pointer-events-none hidden md:block">
        <svg viewBox="0 0 150 100" fill="none" stroke="#433832" strokeWidth="2.5" strokeDasharray="6 6">
          <path d="M10,80 Q45,20 80,60 T140,20" strokeLinecap="round" />
        </svg>
      </div>

      {/* Left Cloud in Hero */}
      <div className="absolute bottom-[20%] left-6 w-32 h-20 text-[#fcd2af]/50 pointer-events-none hidden md:block">
        <svg viewBox="0 0 120 80" fill="currentColor">
          <path d="M25,60 C25,50 35,40 48,40 C53,30 68,30 78,40 C88,40 98,50 98,60 C98,70 88,72 78,72 L25,72 C15,72 15,60 25,60 Z" />
        </svg>
      </div>

      {/* Right Flower in Hero Margin */}
      <div className="absolute right-4 top-1/3 w-12 h-12 text-[#f28f8f] opacity-80 pointer-events-none hidden xl:block">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        </svg>
      </div>

      {/* Right Cute Bear Outline */}
      <div className="absolute right-6 top-[22%] w-12 h-12 text-[#433832]/35 pointer-events-none hidden xl:block">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="20" cy="22" r="12" />
          <circle cx="11" cy="12" r="4" />
          <circle cx="29" cy="12" r="4" />
          <circle cx="16" cy="20" r="1.5" fill="currentColor" />
          <circle cx="24" cy="20" r="1.5" fill="currentColor" />
          <path d="M18 26C18 28 22 28 22 26" strokeLinecap="round" />
        </svg>
      </div>

      {/* Right Star */}
      <div className="absolute right-12 bottom-[25%] w-10 h-10 text-[#fae69e] opacity-70 pointer-events-none hidden md:block">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
      </div>

      {/* MAIN HERO GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 pt-10">

        {/* Left Column: Title, Tagline, Paragraph & CTA (6 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">
          {/* Logo-style Title with individual letter coloring exactly matching mockup */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold leading-[1.05] tracking-tight text-brand-charcoal mb-6 flex flex-wrap items-center select-none"
          >
            {/* Colégio */}
            <span className="inline-flex flex-nowrap mr-4 sm:mr-6">
              {["C", "o", "l", "é", "g", "i", "o"].map((char, i) => {
                const colors = ["text-[#e87c7c]", "text-[#f0925a]", "text-[#7fb3d8]", "text-[#8acbbb]", "text-[#e87c7c]", "text-[#7fb3d8]", "text-[#fdbf5c]"];
                return (
                  <span key={i} className={`playful-char inline-block ${colors[i % colors.length]}`}>
                    {char}
                  </span>
                );
              })}
              {/* Playful Colored Dashes next to Colégio */}
              <span className="playful-dashes inline-flex ml-2 self-start pt-3">
                <svg className="w-8 h-8" viewBox="0 0 30 30" fill="none">
                  <line x1="6" y1="22" x2="12" y2="6" stroke="#f28f8f" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="14" y1="24" x2="20" y2="8" stroke="#e78b53" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="22" y1="26" x2="28" y2="10" stroke="#8acbbb" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </span>
            </span>
            {/* Saber */}
            <span className="inline-flex flex-nowrap">
              {["S", "a", "b", "e", "r"].map((char, i) => {
                const colors = ["text-[#e78b53]", "text-[#fdbf5c]", "text-[#8acbbb]", "text-[#7fb3d8]", "text-[#a5d6a7]"];
                return (
                  <span key={i} className={`playful-char inline-block ${colors[i % colors.length]}`}>
                    {char}
                  </span>
                );
              })}
            </span>
          </h1>

          <div className="hero-text-content flex flex-col items-start">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#352520] mb-4 leading-tight">
              Cuidando, Brincando e Aprendendo Juntos
            </h2>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#6e6058] font-semibold leading-relaxed mb-8 max-w-xl">
              Um espaço seguro e amoroso para o desenvolvimento integral do seu filho. Venha nos conhecer!
            </p>

            <Link
              to="/admissao"
              className="font-serif inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-light hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-bold shadow-[4px_4px_0_0_#2d2a26] hover:shadow-[6px_6px_0_0_#2d2a26] border-[3px] border-brand-charcoal tracking-wide"
            >
              Agende sua Visita
            </Link>
          </div>
        </div>

        {/* Right Column: Organic Crop Image with Overlapping Elements (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative pr-6">

          <div className="relative">
            {/* Circle Image Container matching mockup */}
            <div className="hero-image-container relative z-10 w-60 h-60 min-[375px]:w-72 min-[375px]:h-72 sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-8 border-white shadow-[0_16px_35px_rgba(67,56,50,0.1)] bg-white">
              <img
                src={heroImg}
                alt="Estudante na sala de aula do Colégio Saber"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Sun overlapping top-left of circle */}
            <div className="float-sun-overlap absolute -top-10 -left-10 w-24 h-24 z-20 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="#ffcb1e" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="22" />
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x1 = 50 + Math.cos(angle) * 28;
                  const y1 = 50 + Math.sin(angle) * 28;
                  const x2 = 50 + Math.cos(angle) * 38;
                  const y2 = 50 + Math.sin(angle) * 38;
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffcb1e" strokeWidth="5" strokeLinecap="round" />
                  );
                })}
              </svg>
            </div>

            {/* Floating Blue Cloud overlapping bottom-left of circle */}
            <div className="float-cloud-blue absolute -bottom-4 -left-14 w-32 h-20 z-20 pointer-events-none text-[#4ea8de]/40">
              <svg viewBox="0 0 100 60" fill="currentColor">
                <path d="M20,50 C20,40 30,30 43,30 C48,20 62,20 70,30 C80,30 90,40 90,50 C90,58 80,60 70,60 L20,60 C10,60 10,50 20,50 Z" />
              </svg>
            </div>

            {/* Floating White Cloud overlapping top-right of circle */}
            <div className="float-cloud-white absolute -top-6 -right-6 w-28 h-18 z-20 pointer-events-none text-white drop-shadow-sm">
              <svg viewBox="0 0 100 60" fill="currentColor">
                <path d="M20,50 C20,40 30,30 43,30 C48,20 62,20 70,30 C80,30 90,40 90,50 C90,58 80,60 70,60 L20,60 C10,60 10,50 20,50 Z" />
              </svg>
            </div>

            {/* Floating Rainbow overlapping bottom-right of circle */}
            <div className="float-rainbow-overlap absolute -bottom-10 -right-8 w-36 h-24 z-20 pointer-events-none">
              <svg viewBox="0 0 100 50" fill="none" strokeWidth="7" strokeLinecap="round">
                <path d="M10,45 A40,40 0 0,1 90,45" stroke="#ff65a3" />
                <path d="M22,45 A28,28 0 0,1 78,45" stroke="#ffcb1e" />
                <path d="M34,45 A16,16 0 0,1 66,45" stroke="#4ea8de" />
              </svg>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
