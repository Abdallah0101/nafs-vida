import { Component } from '@angular/core';
import { STEPS } from '@core/content/site-content';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-steps',
  imports: [IconComponent, RevealDirective],
  templateUrl: './steps.html',
  styleUrl: './steps.scss'
})
export class StepsComponent {
  protected readonly steps = STEPS;
}
