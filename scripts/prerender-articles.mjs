/**
 * Pré-renderiza uma página estática por artigo em
 * dist/nafs-vida/browser/blog/<slug>/index.html com meta tags OG/Twitter
 * PRÓPRIAS do artigo (título, resumo, imagem, URL canônica).
 *
 * Por quê: crawlers de WhatsApp/Facebook NÃO executam JavaScript — sem
 * isso, o preview do link compartilhado mostraria sempre as tags gerais
 * do site. Com estas páginas estáticas, cada artigo tem seu próprio
 * cartão (thumbnail) ao ser compartilhado. Roda no `npm run deploy`,
 * depois do `ng build`.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/nafs-vida/browser/', import.meta.url));
const CONTENT_BASE = 'https://raw.githubusercontent.com/Abdallah0101/nafs-vida-content/main';
const SITE_URL = 'https://abdallah0101.github.io/nafs-vida';
const FALLBACK_IMAGE = `${SITE_URL}/assets/logo-cor.png`;

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const setContent = (html, pattern, value) => html.replace(pattern, `$1${esc(value)}$2`);

const index = await (await fetch(`${CONTENT_BASE}/posts.json`)).json();
const template = await readFile(join(DIST, 'index.html'), 'utf-8');

let count = 0;
for (const post of index.posts ?? []) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.cover
    ? `${CONTENT_BASE}/${post.cover}`
    : post.authorPhoto
      ? `${CONTENT_BASE}/${post.authorPhoto}`
      : FALLBACK_IMAGE;

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(post.title)} — Nafs &amp; Vida</title>`);
  html = setContent(html, /(<meta name="description" content=")[^"]*(">)/, post.excerpt);
  html = setContent(html, /(<meta property="og:title" content=")[^"]*(">)/, post.title);
  html = setContent(html, /(<meta property="og:description" content=")[^"]*(">)/, post.excerpt);
  html = setContent(html, /(<meta property="og:type" content=")[^"]*(">)/, 'article');
  html = setContent(html, /(<meta property="og:url" content=")[^"]*(">)/, url);
  html = setContent(html, /(<meta property="og:image" content=")[^"]*(">)/, image);
  html = setContent(html, /(<meta name="twitter:card" content=")[^"]*(">)/, 'summary_large_image');
  html = setContent(html, /(<meta name="twitter:title" content=")[^"]*(">)/, post.title);
  html = setContent(html, /(<meta name="twitter:description" content=")[^"]*(">)/, post.excerpt);
  html = setContent(html, /(<meta name="twitter:image" content=")[^"]*(">)/, image);
  html = setContent(html, /(<link rel="canonical" href=")[^"]*(">)/, url);

  const dir = join(DIST, 'blog', post.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
  count++;
  console.log(`  ✓ blog/${post.slug}`);
}

console.log(`\n${count} página(s) de artigo pré-renderizada(s) com OG tags próprias.`);
