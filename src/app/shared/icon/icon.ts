import { Component, input } from '@angular/core';

/**
 * Ícone linear da identidade Nafs & Vida.
 * Renderiza SVGs com stroke currentColor — o tamanho é definido pelo host.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class IconComponent {
  readonly name = input.required<string>();
}
