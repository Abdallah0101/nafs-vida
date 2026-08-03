import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { map } from 'rxjs';
import { environment } from '@env/environment';
import { BlogPostMeta } from '@core/models/blog-post.model';
import { BlogService } from '@core/services/blog.service';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';
import { PostCardComponent } from '@shared/ui/post-card/post-card';
import { YoutubeEmbedComponent } from '@shared/ui/youtube-embed/youtube-embed';
import { ShareButtonsComponent } from '@shared/ui/share-buttons/share-buttons';

interface TocItem {
  index: number;
  text: string;
}

/** Página de um artigo: /blog/<slug> (v5 — hero editorial escuro + capa sobreposta). */
@Component({
  selector: 'app-article-page',
  imports: [
    DatePipe,
    RouterLink,
    RevealDirective,
    IconComponent,
    PostCardComponent,
    YoutubeEmbedComponent,
    ShareButtonsComponent
  ],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss'
})
export class ArticlePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blog = inject(BlogService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' }
  );

  protected readonly loading = this.blog.loading;
  protected readonly meta = computed(
    () => this.blog.posts().find((p) => p.slug === this.slug()) ?? null
  );
  protected readonly notFound = computed(() => !this.loading() && !this.meta());

  protected readonly html = signal('');
  protected readonly htmlError = signal(false);
  /** Sumário automático (H2s do artigo) — exibido quando há 3+ seções. */
  protected readonly toc = signal<TocItem[]>([]);

  /** Progresso de leitura (0–100) para a barra no topo. */
  protected readonly progress = signal(0);

  private loadedSlug = '';

  constructor() {
    effect(() => {
      const post = this.meta();
      if (post && this.loadedSlug !== post.slug) {
        this.loadedSlug = post.slug;
        this.titleService.setTitle(`${post.title} — Nafs & Vida`);
        this.updateSocialMeta(post);
        void this.loadHtml(post);
      }
    });
  }

  protected readonly related = computed(() => {
    const post = this.meta();
    if (!post) {
      return [];
    }
    return this.blog
      .posts()
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3);
  });

  protected coverUrl(): string | null {
    const cover = this.meta()?.cover;
    return cover ? this.blog.fileUrl(cover) : null;
  }

  /** Foto do autor (avatar redondo); null → avatar com iniciais. */
  protected authorPhotoUrl(): string | null {
    const photo = this.meta()?.authorPhoto;
    return photo ? this.blog.fileUrl(photo) : null;
  }

  /** Iniciais do autor para o avatar (ex.: "Equipe Nafs & Vida" → "EN"). */
  protected initials(name: string): string {
    return name
      .split(/\s+/)
      .filter((word) => /[A-Za-zÀ-ÿ]/.test(word.charAt(0)))
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  /**
   * Rolagem suave para uma seção do sumário — pelo ÍNDICE do H2, sem ids:
   * o sanitizador do Angular remove atributos id de HTML injetado
   * (proteção contra DOM clobbering).
   */
  protected scrollToSection(event: MouseEvent, index: number): void {
    event.preventDefault();
    const headings = document.querySelectorAll('.prose h2');
    headings[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  protected onScrollProgress(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
  }

  /** Extrai os textos dos H2s e monta o sumário (por índice — ver scrollToSection). */
  private async loadHtml(post: BlogPostMeta): Promise<void> {
    try {
      const rawHtml = await this.blog.getArticleHtml(post);
      const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
      const headings = Array.from(doc.querySelectorAll('h2'));
      this.toc.set(
        headings.map((h2, index) => ({ index, text: h2.textContent?.trim() ?? '' }))
      );
      this.html.set(rawHtml);
      this.htmlError.set(false);
    } catch {
      this.htmlError.set(true);
    }
  }

  /**
   * Meta tags sociais por artigo. OBS: crawlers de WhatsApp/Facebook não
   * executam JS — em hospedagem estática o preview do link usa as tags
   * estáticas do index.html. Dinâmico completo só com SSR/prerender.
   */
  private updateSocialMeta(post: BlogPostMeta): void {
    const url = `${environment.siteUrl}/blog/${post.slug}`;
    const image = post.cover
      ? this.blog.fileUrl(post.cover)
      : `${environment.siteUrl}/assets/logo-cor.png`;

    this.metaService.updateTag({ property: 'og:title', content: post.title });
    this.metaService.updateTag({ property: 'og:description', content: post.excerpt });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ name: 'twitter:title', content: post.title });
    this.metaService.updateTag({ name: 'twitter:description', content: post.excerpt });
  }
}
