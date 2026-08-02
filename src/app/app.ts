import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core/layout/navbar/navbar';
import { FooterComponent } from '@core/layout/footer/footer';
import { BackToTopComponent } from '@core/layout/back-to-top/back-to-top';

/** Shell da aplicação: navbar + outlet de rotas + footer. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BackToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
