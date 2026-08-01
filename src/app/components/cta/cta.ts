import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-cta',
  imports: [IconComponent, RevealDirective],
  templateUrl: './cta.html',
  styleUrl: './cta.scss'
})
export class CtaComponent {}
