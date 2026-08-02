import { Component, input, signal } from '@angular/core';
import { IconComponent } from '@shared/ui/icon/icon';

interface ShareChannel {
  name: 'whatsapp' | 'facebook' | 'x' | 'telegram';
  label: string;
  buildUrl: (url: string, text: string) => string;
}

const CHANNELS: ShareChannel[] = [
  {
    name: 'whatsapp',
    label: 'Compartilhar no WhatsApp',
    buildUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`
  },
  {
    name: 'facebook',
    label: 'Compartilhar no Facebook',
    buildUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    name: 'x',
    label: 'Compartilhar no X (Twitter)',
    buildUrl: (url, text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  {
    name: 'telegram',
    label: 'Compartilhar no Telegram',
    buildUrl: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  }
];

/**
 * Botões de compartilhamento do artigo (WhatsApp, Facebook, X, Telegram
 * e copiar link). Instagram não tem share via web — para stories/bio,
 * o caminho é o botão "copiar link".
 */
@Component({
  selector: 'app-share-buttons',
  imports: [IconComponent],
  templateUrl: './share-buttons.html',
  styleUrl: './share-buttons.scss'
})
export class ShareButtonsComponent {
  /** Título usado no texto do compartilhamento. */
  readonly title = input.required<string>();
  /** URL a compartilhar (padrão: endereço atual, sem query string). */
  readonly url = input<string>(this.defaultUrl());

  protected readonly channels = CHANNELS;
  protected readonly copied = signal(false);

  protected shareUrl(channel: ShareChannel): string {
    return channel.buildUrl(this.url(), this.title());
  }

  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.url());
    } catch {
      // Fallback para navegadores antigos/contexto sem clipboard API
      const input = document.createElement('input');
      input.value = this.url();
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2200);
  }

  private defaultUrl(): string {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.location.origin + window.location.pathname;
  }
}
