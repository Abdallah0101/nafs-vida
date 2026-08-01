import { Component } from '@angular/core';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-cta',
  imports: [IconComponent, RevealDirective],
  templateUrl: './cta.html',
  styleUrl: './cta.scss'
})
export class CtaComponent {}
