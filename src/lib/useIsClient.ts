import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// false no pré-render e durante a hidratação, true logo em seguida no navegador.
// Use para APIs que só existem no browser durante o render (ex.: createPortal em document.body)
// sem causar diferença entre o HTML do servidor e o do cliente.
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
