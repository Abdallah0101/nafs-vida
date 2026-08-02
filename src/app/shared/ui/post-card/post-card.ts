import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPostMeta } from '@core/models/blog-post.model';
import { BlogService } from '@core/services/blog.service';
import { IconComponent } from '@shared/ui/icon/icon';

/** Card de artigo do blog (usado na home e na página /blog). */
@Component({
  selector: 'app-post-card',
  imports: [DatePipe, RouterLink, IconComponent],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCardComponent {
  readonly post = input.required<BlogPostMeta>();

  private readonly blog = inject(BlogService);

  protected coverUrl(): string | null {
    const cover = this.post().cover;
    return cover ? this.blog.fileUrl(cover) : null;
  }
}
