import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { ValuesComponent } from './components/values/values';
import { ServicesComponent } from './components/services/services';
import { HighlightComponent } from './components/highlight/highlight';
import { AboutComponent } from './components/about/about';
import { BlogComponent } from './components/blog/blog';
import { CtaComponent } from './components/cta/cta';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    ValuesComponent,
    ServicesComponent,
    HighlightComponent,
    AboutComponent,
    BlogComponent,
    CtaComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
