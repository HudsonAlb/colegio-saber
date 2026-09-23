/* eslint-disable react-refresh/only-export-components -- entrada do pré-render, nunca carregada pelo HMR */
// Entrada usada somente no build (scripts/prerender.mjs) para gerar o HTML estático de cada rota.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';

export { ROUTE_META, NOT_FOUND_META, SITE_URL } from './seo';

export async function render(url: string): Promise<string> {
  // prerender espera todas as rotas lazy (Suspense) resolverem antes de devolver o HTML
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
    // Sem isso o React "terceiriza" boundaries grandes (>12,8 KB): envia o fallback de
    // carregamento + conteúdo oculto trocado via script. Aqui queremos o HTML final direto.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  return new Response(prelude).text();
}
