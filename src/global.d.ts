import type Lenis from 'lenis';

declare global {
  interface Window {
    // Instância global do Lenis criada em SmoothScroll (null quando o smooth scroll está desativado)
    lenisInstance?: Lenis | null;
  }
}

export {};
