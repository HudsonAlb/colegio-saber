// Pré-renderiza cada rota em HTML estático (dist/<rota>/index.html) após o build.
// Roda depois de `vite build` (cliente) e `vite build --ssr src/entry-server.tsx` (servidor).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const { render, ROUTE_META, NOT_FOUND_META, SITE_URL } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Substitui um trecho existente do template (string ou regex); falha alto se não existir,
// para o build quebrar caso o index.html mude e a tag deixe de ser encontrada
function replaceTag(html, pattern, replacement) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!found) throw new Error(`Trecho não encontrado no index.html: ${pattern}`);
  // Para string, usa função: o HTML injetado pode conter "$" (que o replace interpretaria)
  return typeof pattern === 'string' ? html.replace(pattern, () => replacement) : html.replace(pattern, replacement);
}

function applyMeta(html, meta, url) {
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = replaceTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceTag(html, /(<meta name="robots" content=")[^"]*(")/, `$1${meta.noindex ? 'noindex, follow' : 'index, follow'}$2`);
  html = replaceTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  if (meta.noindex) {
    // Página de erro não tem URL canônica
    html = replaceTag(html, /\s*<link rel="canonical" href="[^"]*" \/>/, '');
    html = replaceTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${SITE_URL}/$2`);
  } else {
    html = replaceTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
    html = replaceTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  }
  return html;
}

async function renderPage(routePath, meta) {
  const appHtml = await render(routePath);
  const url = `${SITE_URL}${routePath}`;
  const html = applyMeta(template, meta, url);
  return replaceTag(html, '<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

for (const [routePath, meta] of Object.entries(ROUTE_META)) {
  const html = await renderPage(routePath, meta);
  // /pilares → dist/pilares.html (servido em /pilares via cleanUrls no vercel.json)
  const outFile = path.join(distDir, routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`);
  fs.writeFileSync(outFile, html);
  console.log(`  pré-renderizado ${routePath.padEnd(20)} → ${path.relative(root, outFile)}`);
}

// sitemap.xml gerado a partir das mesmas rotas (nunca fica dessincronizado); lastmod = data do build
const lastmod = new Date().toISOString().slice(0, 10);
const sitemapUrls = Object.entries(ROUTE_META)
  .filter(([, meta]) => !meta.noindex)
  .map(([routePath]) => `  <url>\n    <loc>${SITE_URL}${routePath}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n');
fs.writeFileSync(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
);
console.log('  gerado sitemap.xml');

// 404.html: servido pela hospedagem (com status 404) para qualquer URL desconhecida
fs.writeFileSync(path.join(distDir, '404.html'), await renderPage('/404', NOT_FOUND_META));
console.log('  pré-renderizado 404                  → dist/404.html');
