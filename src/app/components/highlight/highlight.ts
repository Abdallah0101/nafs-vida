import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

interface ResourceItem {
  icon: string;
  title: string;
  text: string;
  action: string;
}

@Component({
  selector: 'app-highlight',
  imports: [IconComponent, RevealDirective],
  templateUrl: './highlight.html',
  styleUrl: './highlight.scss'
})
export class HighlightComponent {
  protected readonly resources: ResourceItem[] = [
    {
      icon: 'book',
      title: 'Artigos',
      text: 'Conteúdos sobre saúde mental e espiritualidade.',
      action: 'Ler artigos'
    },
    {
      icon: 'headphones',
      title: 'Podcasts',
      text: 'Escute conversas que nutrem a alma.',
      action: 'Ouvir agora'
    },
    {
      icon: 'play',
      title: 'Vídeos',
      text: 'Assista reflexões e dicas para o dia a dia.',
      action: 'Assistir agora'
    }
  ];
}
