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
    │       └── sections/      #     hero, values, services, highlight, about, blog, cta
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

Todo texto do site (links, serviços, posts, contato…) está em
**`core/content/site-content.ts`**, tipado por **`core/models/content.model.ts`**.
Os componentes não têm conteúdo hardcoded: eles apenas consomem essas constantes.

Quando a API existir, o caminho de migração é:

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
