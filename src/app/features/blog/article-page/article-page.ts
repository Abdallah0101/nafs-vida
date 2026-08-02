import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';
import { BlogPostMeta } from '@core/models/blog-post.model';
import { BlogService } from '@core/services/blog.service';
import { IconComponent } from '@shared/ui/icon/icon';
import { PostCardComponent } from '@shared/ui/post-card/post-card';
import { YoutubeEmbedComponent } from '@shared/ui/youtube-embed/youtube-embed';

/** Página de um artigo: /blog/<slug>. */
@Component({
  selector: 'app-article-page',
  imports: [DatePipe, RouterLink, IconComponent, PostCardComponent, YoutubeEmbedComponent],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss'
})
export class ArticlePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blog = inject(BlogService);
  private readonly titleService = inject(Title);

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

  private loadedSlug = '';

  constructor() {
    effect(() => {
      const post = this.meta();
      if (post && this.loadedSlug !== post.slug) {
        this.loadedSlug = post.slug;
        this.titleService.setTitle(`${post.title} — Nafs & Vida`);
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

  /** Iniciais do autor para o avatar (ex.: "Equipe Nafs & Vida" → "EN"). */
  protected initials(name: string): string {
    return name
      .split(/\s+/)
      .filter((word) => /[A-Za-zÀ-ÿ]/.test(word.charAt(0)))
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  private async loadHtml(post: BlogPostMeta): Promise<void> {
    try {
      this.html.set(await this.blog.getArticleHtml(post));
      this.htmlError.set(false);
    } catch {
      this.htmlError.set(true);
    }
  }
}
