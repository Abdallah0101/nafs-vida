# Nafs & Vida — Psicologia Islâmica

Site institucional da **Nafs & Vida**, construído com **Angular 20** (standalone
components, signals, controle de fluxo `@if/@for`) e SCSS.

Produção: <https://abdallah0101.github.io/nafs-vida/>

---

## Scripts

| Comando           | Ação                                                        |
| ----------------- | ----------------------------------------------------------- |
| `npm start`       | Dev server em `http://localhost:4200`                        |
| `npm run build`   | Build de produção em `dist/`                                 |
| `npm run lint`    | Análise estática (ESLint + angular-eslint)                   |
| `npm test`        | Testes unitários (Karma + Jasmine)                           |
| `npm run deploy`  | Build + publicação no GitHub Pages (branch `gh-pages`)       |

## Arquitetura

Organização por camadas **`core` / `features` / `shared`**, pensada para
escalar quando o backend entrar no projeto:

```
src/
├── environments/              # Config por ambiente (dev/prod) — apiUrl da futura API
│   ├── environment.ts         #   desenvolvimento (trocado automaticamente no build)
│   └── environment.prod.ts    #   produção (via fileReplacements no angular.json)
│
└── app/
    ├── core/                  # O que existe UMA vez na aplicação
    │   ├── layout/            #   navbar e footer (shell)
    │   ├── models/            #   contratos TypeScript do conteúdo (content.model.ts)
    │   └── content/           #   FONTE ÚNICA de conteúdo (site-content.ts)
    │
    ├── features/              # Páginas/funcionalidades
    │   └── home/              #   landing page
    │       ├── home.ts        #     composição da página
    │       └── sections/      #     hero, values, services, steps, highlight,
    │                          #     about, testimonials, blog, cta
    │
    ├── shared/                # Reutilizável, sem regra de negócio
    │   ├── ui/                #   icon (SVGs da identidade), logo
    │   └── directives/        #   reveal (animação de entrada ao rolar)
    │
    ├── app.ts                 # Shell: navbar + <router-outlet> + footer
    ├── app.routes.ts          # Rotas ('' → home; preparada p/ novas páginas)
    └── app.config.ts          # Providers globais
```

### Regras de dependência

- `features` → pode usar `core` e `shared`
- `core` → pode usar `shared`
- `shared` → **não** depende de ninguém (só Angular)
- Imports usam **aliases** (sem `../../../`):
  `@core/*`, `@features/*`, `@shared/*`, `@env/*` (ver `tsconfig.json`)

### Conteúdo → futuro backend

Os textos da landing page estão em **`core/content/site-content.ts`**, tipados
por **`core/models/content.model.ts`**. Os componentes não têm conteúdo
hardcoded: eles apenas consomem essas constantes.

### Conteúdo do blog (GitHub as CMS)

Os **artigos** NÃO ficam neste repositório — vivem no repositório público
[`nafs-vida-content`](https://github.com/Abdallah0101/nafs-vida-content)
(Markdown + `posts.json`) e são lidos **em runtime** pelo
`core/services/blog.service.ts` via `environment.contentBaseUrl`:

- `GET posts.json` → índice de artigos (lista, home, filtros)
- `GET posts/<slug>.md` → corpo do artigo (frontmatter removido, renderizado
  com `marked` — carregado em chunk separado só quando um artigo é aberto)
- A publicação é feita por um agente de IA seguindo o contrato
  `AGENT.md` do repo de conteúdo (frontmatter + posts.json no mesmo commit)
- Se o índice remoto falhar, a home usa um fallback local — o site nunca
  fica vazio; a página /blog avisa que está mostrando cache
- Vídeos: campo `youtube` no artigo → embed `youtube-nocookie.com`
  (permitido em `frame-src` na CSP)
- CSP: `connect-src` e `img-src` incluem `raw.githubusercontent.com`

Quando uma API existir, o caminho de migração da landing page é:

1. Criar `core/services/content.service.ts` com `HttpClient` (`provideHttpClient`
   no `app.config.ts`), buscando de `environment.apiUrl`.
2. Trocar as constantes por `Observable`/`signal` alimentados pelo serviço —
   os **contratos não mudam**, então os componentes quase não são tocados.
3. Autenticação (área do paciente/admin): JWT em `HttpOnly cookie` emitido pelo
   backend + `HttpInterceptor` para anexar credenciais. **Nunca** armazenar
   tokens em `localStorage`.

### Environments

`environment.ts` (dev) é substituído por `environment.prod.ts` no build de
produção. **Nunca** coloque segredos nesses arquivos — eles vão para o
repositório e para o bundle público. Segredos vivem apenas no backend.
Arquivos `.env*` estão no `.gitignore` para configuração local futura.

## Segurança

- **CSP** via `<meta http-equiv="Content-Security-Policy">` em `index.html`:
  scripts apenas de `'self'`, sem `object`, `upgrade-insecure-requests`.
  `style-src` precisa de `'unsafe-inline'` (estilos inline do Angular/Google
  Fonts); `connect-src` inclui `ws:` para o HMR do dev server. Ao integrar a
  API, adicionar o domínio dela em `connect-src`. Observação: `frame-ancestors`
  **não funciona** via `<meta>` (é ignorado pelos navegadores) — configurar
  como header HTTP (`frame-ancestors 'none'` / `X-Frame-Options: DENY`) quando
  houver servidor próprio; no GitHub Pages não é possível definir headers.
- **CSP × build Angular**: `optimization.styles.inlineCritical` está **off**
  no `angular.json`. O carregador padrão do Angular (`media="print"
  onload="this.media='all'"`) usa inline event handler, que a CSP bloqueia —
  deixou o site sem CSS em produção uma vez; não reativar sem ajustar a CSP.
- **`referrer`**: `strict-origin-when-cross-origin`.
- **Templates Angular**: interpolação `{{ }}` já escapa HTML por padrão.
  Nunca usar `bypassSecurityTrust*` sem sanitização explícita.
- **Links externos** (quando reais): sempre `rel="noopener noreferrer"` com
  `target="_blank"`.
- **Dependências**: rodar `npm audit` a cada atualização; corrigir primeiro
  o que afeta o bundle de produção.
- **Backend (futuro)**: validação de entrada no servidor, CORS restrito ao
  domínio do site, rate limiting, HTTPS only, cookies `HttpOnly; Secure;
  SameSite=Lax`.

## Convenções

- **Componentes standalone** (sem NgModules), `input()`/`output()` com signals.
- **SCSS** por componente + tokens de design em `src/styles.scss` (`:root`).
- **Acessibilidade**: skip-link, `aria-label` em ícones interativos,
  `prefers-reduced-motion` respeitado, foco visível.
- Prettier: `printWidth 100`, aspas simples (config no `package.json`).
- Antes de commitar: `npm run lint` e `npm run build` limpos.

## Deploy (GitHub Pages)

```bash
npm run deploy
```

Faz build com `--base-href /nafs-vida/` e publica `dist/nafs-vida/browser` na
branch `gh-pages` via `angular-cli-ghpages`.
