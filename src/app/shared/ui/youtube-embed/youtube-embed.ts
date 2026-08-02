import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/** Extrai o ID de 11 chars de URLs youtu.be / watch?v= / embed / shorts. */
export function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

/**
 * Embed de vídeo do YouTube em modo privacy-enhanced (youtube-nocookie).
 * O ID é validado por regex estrita antes do bypass do sanitizador.
 */
@Component({
  selector: 'app-youtube-embed',
  templateUrl: './youtube-embed.html',
  styleUrl: './youtube-embed.scss'
})
export class YoutubeEmbedComponent {
  readonly url = input.required<string>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly safeSrc = computed(() => {
    const id = extractYoutubeId(this.url());
    if (!id) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${id}?rel=0`
    );
  });
}
