// Configuração central de SEO por rota.
// SITE_URL precisa ser o domínio de produção (sem barra no final) — usado em canonical, og:url e og:image.
export const SITE_URL = 'https://colegiosaber.com.br';
export const SITE_NAME = 'Colégio Saber';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface RouteMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Colégio Saber | Escola em Escada-PE — Educação Infantil e Fundamental',
    description:
      'Colégio Saber em Escada-PE: um espaço seguro e afetuoso para o desenvolvimento integral do seu filho, da Educação Infantil ao Ensino Fundamental. Agende sua visita.',
  },
  '/pilares': {
    title: 'Proposta Pedagógica: Os Três Pilares do Saber | Colégio Saber',
    description:
      'Conheça a metodologia do Colégio Saber: tradição, inovação e humanismo unidos para o desenvolvimento ético, emocional e intelectual dos estudantes em Escada-PE.',
  },
  '/segmentos': {
    title: 'Educação Infantil e Ensino Fundamental em Escada-PE | Colégio Saber',
    description:
      'Veja como o Colégio Saber acompanha seu filho em cada etapa: Educação Infantil, Ensino Fundamental I e II e Ensino Médio, em Escada, Pernambuco.',
  },
  '/infraestrutura': {
    title: 'Infraestrutura: Biblioteca, Laboratório e Áreas Verdes | Colégio Saber',
    description:
      'Faça um tour pelos ambientes do Colégio Saber em Escada-PE: biblioteca, laboratório de ciências, quadra esportiva e bosque para aprender brincando.',
  },
  '/calendario': {
    title: 'Calendário e Eventos Escolares | Colégio Saber',
    description:
      'Acompanhe o mural escolar do Colégio Saber: eventos, reuniões e datas importantes, com opção de adicionar direto à sua agenda.',
  },
  '/historia': {
    title: 'Nossa História desde 1995 | Colégio Saber — Escada-PE',
    description:
      'Fundado em 1995, o Colégio Saber é referência em ensino humanista de qualidade em Escada-PE, da Educação Infantil ao Ensino Fundamental.',
  },
  '/matriculas': {
    title: 'Matrículas e Processo de Admissão | Colégio Saber — Escada-PE',
    description:
      'Saiba como matricular seu filho no Colégio Saber: etapas do processo de admissão, documentos necessários e respostas às dúvidas mais frequentes.',
  },
  '/admissao': {
    title: 'Formulário de Ingresso e Contato | Colégio Saber',
    description:
      'Dê o primeiro passo para a matrícula no Colégio Saber em Escada-PE. Preencha o formulário de ingresso ou fale com nossa equipe de admissões.',
  },
  '/matricula-rapida': {
    title: 'Matrículas Abertas — Inscrição Rápida | Colégio Saber',
    description:
      'Garanta a vaga do seu filho no Colégio Saber. Preencha a inscrição rápida e nossa equipe de admissões entra em contato pelo WhatsApp.',
  },
};

export const NOT_FOUND_META: RouteMeta = {
  title: 'Página não encontrada | Colégio Saber',
  description: 'A página que você procura não existe ou foi movida.',
  noindex: true,
};
