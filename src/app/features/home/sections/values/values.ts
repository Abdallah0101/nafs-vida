import { Component } from '@angular/core';
import { VALUES } from '@core/content/site-content';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-values',
  imports: [IconComponent, RevealDirective],
  templateUrl: './values.html',
  styleUrl: './values.scss'
})
export class ValuesComponent {
  protected readonly values = VALUES;
}
