import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Nafs & Vida — Psicologia Islâmica'
  },
  { path: '**', redirectTo: '' }
];
