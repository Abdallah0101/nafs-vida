import { Component, HostListener, signal } from '@angular/core';
import { IconComponent } from '@shared/ui/icon/icon';

/** Botão flutuante "voltar ao topo" (aparece após rolar a página). */
@Component({
  selector: 'app-back-to-top',
  imports: [IconComponent],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss'
})
export class BackToTopComponent {
  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.visible.set(window.scrollY > 640);
  }

  protected toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
