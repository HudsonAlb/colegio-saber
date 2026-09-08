import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarBlank, ArrowRight, Sun, Sparkle } from '@phosphor-icons/react';
import { getUpcomingEvents, type UpcomingHolidayCard } from '../services/calendarService';

gsap.registerPlugin(ScrollTrigger);

export default function CalendarioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  // Próximos eventos calculados automaticamente a partir da data atual
  const [upcomingEvents] = useState<UpcomingHolidayCard[]>(() => getUpcomingEvents(3));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cal-card',
        { opacity: 0, y: 30, rotation: -2 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [upcomingEvents]);

  return (
    <section ref={containerRef} className="py-24 bg-[#fff8f3] border-t-4 border-dashed border-brand-orange/20 relative z-10 overflow-hidden">

      {/* Decorative doodles */}
      <div className="absolute top-10 left-10 text-brand-orange opacity-40 animate-wiggle pointer-events-none hidden lg:block">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 items-center">

        {/* Left: Text & CTA */}
        <div className="flex flex-col gap-6 w-full md:w-5/12 text-left">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-brand-orange">
              Organização e Transparência
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal font-medium">
            Calendário <span className="text-brand-orange">Escolar {currentYear}</span>
          </h2>
          <p className="font-sans text-sm text-brand-charcoal-light/80 font-medium leading-relaxed">
            Consulte as datas dos feriados nacionais, recessos e principais eventos pedagógicos do ano para planejar sua rotina familiar com tranquilidade.
          </p>

          <Link
            to="/calendario"
            onClick={() => window.scrollTo(0, 0)}
            className="self-start mt-4 bg-brand-charcoal hover:bg-brand-orange text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors duration-500 shadow-[4px_4px_0_0_#ff7e1b]"
          >
            <CalendarBlank size={16} weight="duotone" />
            Ver Calendário Completo
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Right: Upcoming Events Cards */}
        <div className="w-full md:w-7/12 flex flex-col gap-4">
          {upcomingEvents.map((item) => {
            const Icon = item.icon || Sun;
            return (
              <div
                key={item.id}
                className="cal-card flex items-center gap-6 p-4 md:p-5 rounded-2xl bg-white border-2 border-brand-charcoal shadow-[4px_4px_0_0_#2d2a26] hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
              >
                {/* Date Badge */}
                <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0 border-2 border-brand-charcoal ${item.color} text-white ${item.shadow} -rotate-3`}>
                  <span className="font-serif text-xl font-bold leading-none">{item.date}</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest font-semibold mt-1">{item.month}</span>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-lg font-bold text-brand-charcoal">{item.title}</h3>
                      {item.isToday && (
                        <span className="bg-brand-orange text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          <Sparkle size={10} weight="fill" /> Hoje
                        </span>
                      )}
                      {item.daysRemaining !== undefined && item.daysRemaining > 0 && item.daysRemaining <= 7 && (
                        <span className="bg-brand-yellow/30 text-brand-charcoal text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                          Em {item.daysRemaining} {item.daysRemaining === 1 ? 'dia' : 'dias'}
                        </span>
                      )}
                    </div>
                    <Icon size={24} className="text-brand-charcoal/20 shrink-0" weight="duotone" />
                  </div>
                  <p className="font-sans text-[11px] font-semibold text-brand-charcoal-light/70">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
