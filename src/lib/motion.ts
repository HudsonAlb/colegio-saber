import gsap from 'gsap';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Seguro para o pré-render (Node): sem window, considera movimento normal
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Rola até o elemento pelo Lenis, para não conflitar com o smooth scroll. Sem Lenis, usa o scroll nativo.
// O desconto do cabeçalho fixo vem do scroll-margin-top do elemento (ex.: classe scroll-mt-32), respeitado pelos dois.
export function scrollToElement(element: HTMLElement) {
  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(element, { duration: 1.2 });
  } else {
    element.scrollIntoView();
  }
}

// Com "reduzir movimento" ativo no sistema, todas as animações GSAP terminam quase
// instantaneamente — o conteúdo continua aparecendo, só que sem deslocamento perceptível.
// Loops infinitos devem checar prefersReducedMotion() e simplesmente não iniciar.
export function setupReducedMotion() {
  if (typeof window === 'undefined') return;
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  const apply = () => gsap.globalTimeline.timeScale(mq.matches ? 20 : 1);
  apply();
  mq.addEventListener('change', apply);
}
