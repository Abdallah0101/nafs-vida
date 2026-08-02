import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment';
import { BlogIndex, BlogPostMeta } from '@core/models/blog-post.model';

/**
 * Últimos artigos em memória caso o repositório de conteúdo esteja
 * indisponível (ou o posts.json quebre) — o site nunca fica vazio.
 */
const FALLBACK_POSTS: BlogPostMeta[] = [
  {
    slug: 'ansiedade-mente-acelerada-coracao-pede-calma',
    title: 'Ansiedade: quando a mente acelera e o coração pede calma',
    excerpt:
      'Entenda como a psicologia e a prática do dhikr podem caminhar juntas no cuidado com a ansiedade.',
    category: 'Saúde Emocional',
    tags: ['ansiedade', 'dhikr'],
    author: 'Equipe Nafs & Vida',
    authorRole: 'Psicologia Islâmica',
    date: '2026-07-12',
    readingTime: 2,
    url: 'posts/ansiedade-mente-acelerada-coracao-pede-calma.md'
  },
  {
    slug: 'dhikr-e-presenca-atencao-plena-no-isla',
    title: 'Dhikr e presença: a atenção plena que sempre esteve no Islã',
    excerpt:
      'Muito antes da atenção plena virar tema da psicologia, o Islã já ensinava a arte de estar presente.',
    category: 'Espiritualidade',
    tags: ['dhikr', 'atenção plena'],
    author: 'Equipe Nafs & Vida',
    authorRole: 'Psicologia Islâmica',
    date: '2026-06-28',
    readingTime: 2,
    url: 'posts/dhikr-e-presenca-atencao-plena-no-isla.md'
  },
  {
    slug: 'mawaddah-e-rahmah-amor-e-misericordia',
    title: 'Mawaddah e Rahmah: amor e misericórdia na vida a dois',
    excerpt:
      'O que o Alcorão ensina sobre o vínculo entre casais — e como isso se encontra com a terapia de casal.',
    category: 'Relacionamentos',
    tags: ['casamento', 'mawaddah', 'rahmah'],
    author: 'Equipe Nafs & Vida',
    authorRole: 'Psicologia Islâmica',
    date: '2026-06-09',
    readingTime: 2,
    url: 'posts/mawaddah-e-rahmah-amor-e-misericordia.md'
  }
];

/** Frontmatter YAML no início do .md (o índice já traz os metadados). */
const FRONTMATTER_RE = /^---\s*\n[\s\S]*?\n---\s*\n/;

/**
 * Lê os artigos do repositório público de conteúdo em runtime
 * (sem backend próprio — ver README > Conteúdo).
 */
@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.contentBaseUrl;

  /** Artigos publicados, mais novos primeiro (inclui fallback em erro). */
  readonly posts = signal<BlogPostMeta[]>([]);
  readonly loading = signal(true);
  /** true quando o índice remoto falhou e o fallback está em uso. */
  readonly usingFallback = signal(false);

  constructor() {
    this.loadIndex();
  }

  /** URL absoluta de um arquivo do repositório de conteúdo. */
  fileUrl(relativePath: string): string {
    return `${this.base}/${relativePath}`;
  }

  /** Busca o .md do artigo e devolve o HTML do corpo (frontmatter removido). */
  async getArticleHtml(meta: BlogPostMeta): Promise<string> {
    const markdown = await firstValueFrom(
      this.http.get(this.fileUrl(meta.url), { responseType: 'text' })
    );
    // marked em chunk separado — só baixa quando alguém abre um artigo
    const { marked } = await import('marked');
    const body = markdown.replace(FRONTMATTER_RE, '');
    const html = (await marked.parse(body)) as string;
    // Imagens com caminho relativo (covers/...) apontam para o repo de conteúdo
    return html.replace(/src="(?!https?:|data:|\/)([^"]+)"/g, `src="${this.base}/$1"`);
  }

  private loadIndex(): void {
    this.http.get<BlogIndex>(this.fileUrl('posts.json')).subscribe({
      next: (index) => {
        this.posts.set(index.posts ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.posts.set(FALLBACK_POSTS);
        this.usingFallback.set(true);
        this.loading.set(false);
      }
    });
  }
}
