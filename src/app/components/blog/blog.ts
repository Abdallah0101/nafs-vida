import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

interface Post {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  datetime: string;
  icon: string;
}

@Component({
  selector: 'app-blog',
  imports: [IconComponent, RevealDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent {
  protected readonly posts: Post[] = [
    {
      category: 'Saúde Emocional',
      title: 'Ansiedade: quando a mente acelera e o coração pede calma',
      excerpt:
        'Entenda como a psicologia e a prática do dhikr podem caminhar juntas no cuidado com a ansiedade.',
      date: '12 Jul 2026',
      datetime: '2026-07-12',
      icon: 'heart'
    },
    {
      category: 'Espiritualidade',
      title: 'Dhikr e presença: a atenção plena que sempre esteve no Islã',
      excerpt:
        'Muito antes da atenção plena virar tema da psicologia, o Islã já ensinava a arte de estar presente.',
      date: '28 Jun 2026',
      datetime: '2026-06-28',
      icon: 'lantern'
    },
    {
      category: 'Relacionamentos',
      title: 'Mawaddah e Rahmah: amor e misericórdia na vida a dois',
      excerpt:
        'O que o Alcorão ensina sobre o vínculo entre casais — e como isso se encontra com a terapia de casal.',
      date: '9 Jun 2026',
      datetime: '2026-06-09',
      icon: 'couple'
    }
  ];
}
