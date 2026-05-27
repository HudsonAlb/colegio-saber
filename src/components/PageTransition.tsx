import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isFirstRender = useRef(true);

  // Executa toda vez que a rota (location) muda
  useEffect(() => {
    // Evita rodar a animação de saída no carregamento inicial
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayChildren(children);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Timeline de transição de página (Fade-out -> Rota Muda -> Scroll Top -> Fade-in)
    const tl = gsap.timeline();

    // 1. Fade-out e deslocamento sutil de saída
    tl.to(container, {
      opacity: 0,
      y: -20,
      duration: 0.6, // Cinematográfico lento >= 0.6s
      ease: 'power3.inOut',
      onComplete: () => {
        // Atualiza os filhos renderizados para a nova página
        setDisplayChildren(children);
        
        // Garante que o scroll vá para o topo instantaneamente
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      }
    });

    // 2. Fade-in e subida suave de entrada
    tl.fromTo(container,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8, // Cinematográfico lento >= 0.6s
        ease: 'power3.out',
      }
    );

  }, [location.pathname]); // Monitora apenas o caminho da rota para evitar triggers redundantes

  return (
    <div ref={containerRef} className="w-full">
      {displayChildren}
    </div>
  );
}
