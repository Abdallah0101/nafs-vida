/**
 * Ambiente de PRODUÇÃO (usado automaticamente em `ng build`).
 *
 * NUNCA coloque segredos/chaves aqui — este arquivo vai para o repositório
 * e para o bundle público do navegador. Segredos ficam no backend.
 */
export const environment = {
  production: true,
  /** TODO: substituir pela URL real da API quando o backend estiver no ar. */
  apiUrl: 'https://api.nafsvida.com.br/api',
  /** Repositório público de conteúdo (artigos .md + posts.json). */
  contentBaseUrl: 'https://raw.githubusercontent.com/Abdallah0101/nafs-vida-content/main'
} as const;
