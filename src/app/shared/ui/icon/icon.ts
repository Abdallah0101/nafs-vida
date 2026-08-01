import { Component, input } from '@angular/core';

/** Nomes de ícone disponíveis na identidade Nafs & Vida. */
export type IconName =
  | 'book'
  | 'heart'
  | 'star'
  | 'lantern'
  | 'person'
  | 'couple'
  | 'family'
  | 'crescent'
  | 'headphones'
  | 'play'
  | 'calendar'
  | 'chevron'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'instagram'
  | 'youtube'
  | 'whatsapp'
  | 'shield'
  | 'globe'
  | 'check';

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
  readonly name = input.required<IconName>();
}
