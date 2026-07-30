import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-cta',
  imports: [RevealDirective],
  templateUrl: './cta.html',
  styleUrl: './cta.scss'
})
export class CtaComponent {}
