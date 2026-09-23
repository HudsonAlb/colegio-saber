import gsap from 'gsap';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Seguro para o pré-render (Node): sem window, considera movimento normal
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
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
