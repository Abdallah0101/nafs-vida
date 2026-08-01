import { Component } from '@angular/core';
import { RESOURCES } from '@core/content/site-content';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-highlight',
  imports: [IconComponent, RevealDirective],
  templateUrl: './highlight.html',
  styleUrl: './highlight.scss'
})
export class HighlightComponent {
  protected readonly resources = RESOURCES;
}
