import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BlogService } from '@core/services/blog.service';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';
import { PostCardComponent } from '@shared/ui/post-card/post-card';

/** Página do blog: artigos com filtro por categoria e paginação (9 por página). */
@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, RevealDirective, IconComponent, PostCardComponent],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss'
})
export class BlogPageComponent {
  private readonly blog = inject(BlogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly loading = this.blog.loading;
  protected readonly usingFallback = this.blog.usingFallback;
  protected readonly selectedCategory = signal('Todas');

  /** Página atual via query string (?pagina=N) — compartilhável. */
  private readonly pageParam = toSignal(
    this.route.queryParamMap.pipe(map((params) => Math.max(1, Number(params.get('pagina')) || 1))),
    { initialValue: 1 }
  );

  protected readonly pageSize = 9;

  protected readonly categories = computed(() => {
    const unique = new Set(this.blog.posts().map((post) => post.category));
    return ['Todas', ...unique];
  });

  protected readonly filtered = computed(() => {
    const category = this.selectedCategory();
    const posts = this.blog.posts();
    return category === 'Todas' ? posts : posts.filter((p) => p.category === category);
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize))
  );

  protected readonly currentPage = computed(() => Math.min(this.pageParam(), this.totalPages()));

  protected readonly pageItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.goToPage(1, false);
  }

  protected goToPage(page: number, scroll = true): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.router.navigate([], {
      queryParams: page === 1 ? { pagina: null } : { pagina: page },
      queryParamsHandling: 'merge'
    });
    if (scroll) {
      document
        .querySelector('.blog-page__grid')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
