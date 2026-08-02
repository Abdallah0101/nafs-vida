import { Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { CONTACT, FOOTER_SERVICE_LINKS, NAV_LINKS, SOCIAL_LINKS } from '@core/content/site-content';
import { IconComponent } from '@shared/ui/icon/icon';
import { LogoComponent } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent, LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent implements OnInit {
  private readonly router = inject(Router);

  protected readonly year = new Date().getFullYear();

  protected readonly navLinks = NAV_LINKS.map((link) => ({ ...link, id: link.href.slice(1) }));
  protected readonly serviceLinks = FOOTER_SERVICE_LINKS.map((link) => ({
    ...link,
    id: link.href.slice(1)
  }));
  protected readonly contact = CONTACT;
  protected readonly socials = SOCIAL_LINKS;

  private readonly isHome = signal(true);

  ngOnInit(): void {
    this.isHome.set(this.router.url.split('#')[0].split('?')[0] === '/');
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) =>
        this.isHome.set(event.urlAfterRedirects.split('#')[0].split('?')[0] === '/')
      );
  }

  /** Na home: rolagem suave direta. Fora dela: o routerLink navega. */
  protected onNavClick(event: MouseEvent, id: string): void {
    if (this.isHome()) {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  }
}
