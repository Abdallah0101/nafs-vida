import { Component } from '@angular/core';
import { ABOUT_POINTS } from '@core/content/site-content';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-about',
  imports: [IconComponent, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  protected readonly points = ABOUT_POINTS;
}
