import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [IconComponent, RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {}
