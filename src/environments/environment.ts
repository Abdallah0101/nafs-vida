/**
 * Ambiente de DESENVOLVIMENTO.
 * Em build de produção este arquivo é substituído por `environment.prod.ts`
 * (ver `fileReplacements` no angular.json).
 *
 * NUNCA coloque segredos/chaves aqui — este arquivo vai para o repositório
 * e para o bundle público do navegador. Segredos ficam no backend.
 */
export const environment = {
  production: false,
  /** Base URL da futura API (backend local). */
  apiUrl: 'http://localhost:3000/api',
  /** Repositório público de conteúdo (artigos .md + posts.json). */
  contentBaseUrl: 'https://raw.githubusercontent.com/Abdallah0101/nafs-vida-content/main'
} as const;
