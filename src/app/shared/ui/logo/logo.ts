import { Component, input } from '@angular/core';

/**
 * Marca Nafs & Vida: estrela geométrica islâmica (8 pontas) + wordmark.
 * tone="light" para fundos bordô, tone="dark" para fundos claros.
 */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})
export class LogoComponent {
  readonly tone = input<'light' | 'dark'>('dark');
}
