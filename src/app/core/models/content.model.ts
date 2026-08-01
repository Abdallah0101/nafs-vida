import { IconName } from '@shared/ui/icon/icon';

/**
 * Contratos de conteúdo do site.
 *
 * Hoje o conteúdo é estático (ver `core/content/site-content.ts`), mas os
 * componentes já dependem apenas destas interfaces — quando o backend entrar,
 * basta trocar a fonte dos dados (ex.: `ContentService` via HTTP) sem tocar
 * nos componentes.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ValueItem {
  icon: IconName;
  title: string;
  text: string;
}

export interface ServiceItem {
  icon: IconName;
  title: string;
  text: string;
}

export interface ResourceItem {
  icon: IconName;
  title: string;
  text: string;
  action: string;
}

export interface Post {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  datetime: string;
  icon: IconName;
}

export interface SocialLink {
  icon: IconName;
  label: string;
  href: string;
}

export interface ContactInfo {
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  location: string;
}
