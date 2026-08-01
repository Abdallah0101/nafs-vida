import { Component } from '@angular/core';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IconComponent } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [IconComponent, RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {}
