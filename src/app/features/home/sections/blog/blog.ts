import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '@core/services/blog.service';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';
import { PostCardComponent } from '@shared/ui/post-card/post-card';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, RevealDirective, IconComponent, PostCardComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent {
  private readonly blog = inject(BlogService);

  /** Prévia: 3 artigos mais recentes. */
  protected readonly latestPosts = computed(() => this.blog.posts().slice(0, 3));
}
