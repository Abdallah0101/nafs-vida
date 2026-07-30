import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-values',
  imports: [IconComponent, RevealDirective],
  templateUrl: './values.html',
  styleUrl: './values.scss'
})
export class ValuesComponent {
  protected readonly values: ValueItem[] = [
    {
      icon: 'book',
      title: 'Baseado no Islã',
      text: 'Abordagem alinhada ao Alcorão e à Sunnah.'
    },
    {
      icon: 'heart',
      title: 'Acolhimento',
      text: 'Um espaço seguro, ético e livre de julgamentos.'
    },
    {
      icon: 'star',
      title: 'Cura Integral',
      text: 'Trabalhamos mente, coração e espírito.'
    },
    {
      icon: 'lantern',
      title: 'Propósito',
      text: 'Reconecte-se com seu propósito e sua fé.'
    }
  ];
}
