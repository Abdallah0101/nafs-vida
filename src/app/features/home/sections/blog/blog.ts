import { Component } from '@angular/core';
import { POSTS } from '@core/content/site-content';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-blog',
  imports: [IconComponent, RevealDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent {
  protected readonly posts = POSTS;
}
