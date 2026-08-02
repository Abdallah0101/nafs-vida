import { Component, HostListener, OnInit, signal } from '@angular/core';
import { NAV_LINKS } from '@core/content/site-content';
import { LogoComponent } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  protected readonly links = NAV_LINKS.map((link) => ({ ...link, id: link.href.slice(1) }));

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  /** Seção atualmente visível — destaca o link correspondente (scrollspy). */
  protected readonly activeId = signal<string>('inicio');

  ngOnInit(): void {
    // As seções da home renderizam após a navbar (router-outlet);
    // a primeira medição acontece no primeiro scroll ou no retry abaixo.
    setTimeout(() => this.updateActive(), 300);
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 32);
    this.updateActive();
  }

  @HostListener('window:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.syncBodyScroll();
  }

  protected closeMenu(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.syncBodyScroll();
    }
  }

  /**
   * Scrollspy clássico: a seção ativa é a que tem o MAIOR topo já acima
   * da linha de leitura (45% da viewport). Compara posições (não a ordem
   * do array), pois a ordem do menu difere da ordem das seções na página.
   * No fim da página, a última seção do documento fica ativa (o probe
   * pode não alcançá-la quando o scroll trava no limite).
   */
  private updateActive(): void {
    const probe = window.scrollY + window.innerHeight * 0.45;
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;

    let current = this.links[0]?.id ?? 'inicio';
    let currentTop = -Infinity;

    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (!el) {
        continue;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      const wins = atBottom ? top > currentTop : top <= probe && top > currentTop;
      if (wins) {
        current = link.id;
        currentTop = top;
      }
    }

    this.activeId.set(current);
  }

  private syncBodyScroll(): void {
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }
}
