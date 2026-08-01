import { Component } from '@angular/core';
import { SERVICES } from '@core/content/site-content';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-services',
  imports: [IconComponent, RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent {
  protected readonly services = SERVICES;
}
