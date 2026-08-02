/**
 * Metadados de um artigo do blog, conforme o `posts.json` do repositório
 * público de conteúdo (contrato definido em AGENT.md de `nafs-vida-content`).
 */

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  /** Data ISO AAAA-MM-DD. */
  date: string;
  /** Minutos estimados de leitura. */
  readingTime: number;
  /** Caminho do .md relativo ao contentBaseUrl (ex.: "posts/xyz.md"). */
  url: string;
  cover?: string;
  youtube?: string;
}

export interface BlogIndex {
  generatedAt: string;
  posts: BlogPostMeta[];
}
