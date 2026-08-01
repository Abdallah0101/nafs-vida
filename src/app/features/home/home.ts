import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero';
import { ValuesComponent } from './sections/values/values';
import { ServicesComponent } from './sections/services/services';
import { HighlightComponent } from './sections/highlight/highlight';
import { AboutComponent } from './sections/about/about';
import { BlogComponent } from './sections/blog/blog';
import { CtaComponent } from './sections/cta/cta';

/** Landing page: composição das seções da home. */
@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ValuesComponent,
    ServicesComponent,
    HighlightComponent,
    AboutComponent,
    BlogComponent,
    CtaComponent
  ],
  templateUrl: './home.html'
})
export class HomeComponent {}
