import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '@core/services/blog.service';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';
import { PostCardComponent } from '@shared/ui/post-card/post-card';

/** Página do blog: todos os artigos com filtro por categoria. */
@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, RevealDirective, IconComponent, PostCardComponent],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss'
})
export class BlogPageComponent {
  private readonly blog = inject(BlogService);

  protected readonly loading = this.blog.loading;
  protected readonly usingFallback = this.blog.usingFallback;
  protected readonly selectedCategory = signal('Todas');

  protected readonly categories = computed(() => {
    const unique = new Set(this.blog.posts().map((post) => post.category));
    return ['Todas', ...unique];
  });

  protected readonly filtered = computed(() => {
    const category = this.selectedCategory();
    const posts = this.blog.posts();
    return category === 'Todas' ? posts : posts.filter((p) => p.category === category);
  });
}
