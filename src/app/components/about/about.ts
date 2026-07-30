import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [IconComponent, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  protected readonly points: string[] = [
    'Atendimento ético, sigiloso e livre de julgamentos',
    'Psicologia baseada em evidências, em diálogo com a tradição islâmica',
    'Atendimento online para todo o Brasil'
  ];
}
