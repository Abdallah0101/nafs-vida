import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NAV_LINKS } from '@core/content/site-content';
import { LogoComponent } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogoComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  private readonly router = inject(Router);

  protected readonly links = NAV_LINKS.map((link) => ({ ...link, id: link.href.slice(1) }));

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  /** Seção atualmente visível — destaca o link correspondente (scrollspy). */
  protected readonly activeId = signal<string>('inicio');
  /** Estamos na landing page? (os links de âncora só existem lá) */
  protected readonly isHome = signal(true);

  ngOnInit(): void {
    this.isHome.set(this.isHomeUrl(this.router.url));
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.isHome.set(this.isHomeUrl(event.urlAfterRedirects)));

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
   * Na home: rolagem suave direta até a seção (sem navegação).
   * Fora dela (/blog, artigo): o routerLink navega para home + âncora.
   */
  protected onNavClick(event: MouseEvent, id: string): void {
    this.closeMenu();
    if (this.isHome()) {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
      this.updateActive();
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
    if (!this.isHome()) {
      return;
    }

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

  private isHomeUrl(url: string): boolean {
    return url.split('#')[0].split('?')[0] === '/';
  }

  private syncBodyScroll(): void {
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }
}
