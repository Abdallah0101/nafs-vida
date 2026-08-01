import { Component } from '@angular/core';
import { CONTACT, FOOTER_SERVICE_LINKS, NAV_LINKS, SOCIAL_LINKS } from '@core/content/site-content';
import { IconComponent } from '@shared/ui/icon/icon';
import { LogoComponent } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [IconComponent, LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();

  protected readonly navLinks = NAV_LINKS;
  protected readonly serviceLinks = FOOTER_SERVICE_LINKS;
  protected readonly contact = CONTACT;
  protected readonly socials = SOCIAL_LINKS;
}
