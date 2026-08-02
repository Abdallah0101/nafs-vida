import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home';
import { BlogPageComponent } from '@features/blog/blog-page/blog-page';
import { ArticlePageComponent } from '@features/blog/article-page/article-page';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Nafs & Vida — Psicologia Islâmica'
  },
  {
    path: 'blog',
    component: BlogPageComponent,
    title: 'Blog — Nafs & Vida'
  },
  {
    path: 'blog/:slug',
    component: ArticlePageComponent
  },
  { path: '**', redirectTo: '' }
];
