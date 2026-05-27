import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.0, // Snappier scroll duration for parent usability
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // 2. Sincronizar ScrollTrigger com Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // 3. Conectar GSAP Ticker ao Lenis RAF
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    // 4. Correção para animação pulando no mobile (Mobile Jump Fix)
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    
    if (isMobile) {
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });
      
      ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
      });
    }

    // Guardar lenis no escopo global/ref para acesso em mudanças de rota
    (window as any).lenisInstance = lenis;

    // Refresh ScrollTrigger positions after initialization
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
      (window as any).lenisInstance = null;
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  // Monitora mudança de rota para reiniciar o scroll e recalcular ScrollTrigger
  useEffect(() => {
    const lenis = (window as any).lenisInstance;
    
    if (lenis) {
      // Força o Lenis a resetar a posição de rolagem para o topo imediatamente
      lenis.scrollTo(0, { immediate: true });
    }

    // Dá um tempo curto para o DOM renderizar a nova rota antes de recalcular gatilhos
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <div className="smooth-scroll-wrapper">{children}</div>;
}
