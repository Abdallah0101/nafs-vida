import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

interface ServiceItem {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-services',
  imports: [IconComponent, RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent {
  protected readonly services: ServiceItem[] = [
    {
      icon: 'person',
      title: 'Terapia Individual',
      text: 'Apoio emocional e psicológico para lidar com ansiedade, depressão e desafios da vida.'
    },
    {
      icon: 'couple',
      title: 'Terapia de Casal',
      text: 'Fortalecimento da relação com base em comunicação e empatia.'
    },
    {
      icon: 'family',
      title: 'Terapia Familiar',
      text: 'Melhoria da dinâmica familiar com compreensão e respeito mútuo.'
    },
    {
      icon: 'crescent',
      title: 'Aconselhamento Islâmico',
      text: 'Orientação baseada nos princípios do Islã para decisões e conflitos.'
    }
  ];
}
