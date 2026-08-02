import {
  ContactInfo,
  NavLink,
  ResourceItem,
  ServiceItem,
  SocialLink,
  StepItem,
  TestimonialItem,
  ValueItem
} from '@core/models/content.model';

/**
 * Fonte única de conteúdo do site (Single Source of Truth).
 *
 * Textos da landing page moram aqui — nunca espalhados pelos componentes.
 * EXCEÇÃO: os artigos do blog vivem no repositório público `nafs-vida-content`
 * e são lidos em runtime pelo `BlogService` (ver README > Conteúdo).
 * Quando o backend existir, este arquivo será substituído por chamadas HTTP,
 * mantendo os mesmos contratos de `core/models/content.model.ts`.
 */

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contato', href: '#contato' }
];

export const VALUES: readonly ValueItem[] = [
  {
    icon: 'book',
    title: 'Baseado no Islã',
    text: 'Abordagem alinhada ao Alcorão e à Sunnah.'
  },
  {
    icon: 'heart',
    title: 'Acolhimento',
    text: 'Um espaço seguro, ético e livre de julgamentos.'
  },
  {
    icon: 'crescent',
    title: 'Cura Integral',
    text: 'Trabalhamos mente, coração e espírito.'
  },
  {
    icon: 'lantern',
    title: 'Propósito',
    text: 'Reconecte-se com seu propósito e sua fé.'
  }
];

export const SERVICES: readonly ServiceItem[] = [
  {
    icon: 'person',
    title: 'Terapia Individual',
    text: 'Apoio emocional e psicológico para lidar com ansiedade, depressão e desafios da vida.'
  },
  {
    icon: 'couple',
    title: 'Terapia de Casal',
    text: 'Fortalecimento da relação com base em comunicação e empatia.'
  },
  {
    icon: 'family',
    title: 'Terapia Familiar',
    text: 'Melhoria da dinâmica familiar com compreensão e respeito mútuo.'
  },
  {
    icon: 'crescent',
    title: 'Aconselhamento Islâmico',
    text: 'Orientação baseada nos princípios do Islã para decisões e conflitos.'
  }
];

export const RESOURCES: readonly ResourceItem[] = [
  {
    icon: 'book',
    title: 'Artigos',
    text: 'Conteúdos sobre saúde mental e espiritualidade.',
    action: 'Ler artigos'
  },
  {
    icon: 'headphones',
    title: 'Podcasts',
    text: 'Escute conversas que nutrem a alma.',
    action: 'Ouvir agora'
  },
  {
    icon: 'play',
    title: 'Vídeos',
    text: 'Assista reflexões e dicas para o dia a dia.',
    action: 'Assistir agora'
  }
];

export const ABOUT_POINTS: readonly string[] = [
  'Atendimento ético, sigiloso e livre de julgamentos',
  'Psicologia baseada em evidências, em diálogo com a tradição islâmica',
  'Atendimento online para todo o Brasil'
];

export const STEPS: readonly StepItem[] = [
  {
    icon: 'calendar',
    title: 'Agende sua conversa',
    text: 'Escolha o melhor horário pelo site ou WhatsApp — rápido e sem complicação.'
  },
  {
    icon: 'heart',
    title: 'Sessão de acolhimento',
    text: 'Uma primeira conversa para entender sua história, suas dores e seus objetivos.'
  },
  {
    icon: 'crescent',
    title: 'Jornada personalizada',
    text: 'Um plano terapêutico feito para você, unindo psicologia e fé no seu ritmo.'
  }
];

/**
 * PLACEHOLDER — substituir por depoimentos reais (com consentimento dos
 * pacientes) quando existirem. Iniciais e cidades são fictícias.
 */
export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    quote:
      'Pela primeira vez encontrei um espaço onde a minha fé não ficou de fora da terapia. Isso mudou tudo para mim.',
    name: 'A. M.',
    initials: 'AM',
    meta: 'São Paulo - SP'
  },
  {
    quote:
      'Cheguei com a ansiedade no limite e encontrei escuta de verdade. Hoje me sinto em paz comigo e com a minha fé.',
    name: 'R. S.',
    initials: 'RS',
    meta: 'Rio de Janeiro - RJ'
  },
  {
    quote:
      'Profissionalismo raro. Me senti acolhida do início ao fim, sem julgamentos. Recomendo de coração.',
    name: 'F. K.',
    initials: 'FK',
    meta: 'Curitiba - PR'
  }
];

export const CONTACT: ContactInfo = {
  phoneDisplay: '(11) 99999-9999',
  phoneHref: 'tel:+5511999999999',
  email: 'contato@nafsvida.com.br',
  location: 'São Paulo - SP'
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { icon: 'instagram', label: 'Instagram da Nafs & Vida', href: '#' },
  { icon: 'youtube', label: 'YouTube da Nafs & Vida', href: '#' },
  { icon: 'whatsapp', label: 'WhatsApp da Nafs & Vida', href: '#' }
];

/** Links da coluna "Serviços" do rodapé (âncoras da landing). */
export const FOOTER_SERVICE_LINKS: readonly NavLink[] = [
  { label: 'Terapia Individual', href: '#servicos' },
  { label: 'Terapia de Casal', href: '#servicos' },
  { label: 'Terapia Familiar', href: '#servicos' },
  { label: 'Aconselhamento Islâmico', href: '#servicos' }
];
