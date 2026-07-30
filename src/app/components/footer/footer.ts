import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';
import { LogoComponent } from '../../shared/logo/logo';

interface FooterLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  imports: [IconComponent, LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();

  protected readonly navLinks: FooterLink[] = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Recursos', href: '#recursos' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contato', href: '#contato' }
  ];

  protected readonly serviceLinks: FooterLink[] = [
    { label: 'Terapia Individual', href: '#servicos' },
    { label: 'Terapia de Casal', href: '#servicos' },
    { label: 'Terapia Familiar', href: '#servicos' },
    { label: 'Aconselhamento Islâmico', href: '#servicos' }
  ];
}
