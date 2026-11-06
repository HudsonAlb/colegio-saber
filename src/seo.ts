// Configuração central de SEO por rota.
// Domínio público definido em VITE_SITE_URL (.env ou variável de ambiente da Vercel) — única fonte da URL do site
export const SITE_URL: string = import.meta.env.VITE_SITE_URL;
if (!SITE_URL) throw new Error('VITE_SITE_URL não definida (veja o arquivo .env)');
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
      'Veja como o Colégio Saber acompanha seu filho em cada etapa: Educação Infantil e Ensino Fundamental I e II, em Escada, Pernambuco.',
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
  '/album': {
    title: 'Álbum de Fotos: Nossos Momentos | Colégio Saber',
    description:
      'Veja as fotos dos eventos, projetos e atividades da comunidade escolar do Colégio Saber em Escada-PE, organizadas por álbum.',
  },
  '/historia': {
    title: 'Nossa História desde 1992 | Colégio Saber — Escada-PE',
    description:
      'Criado em 1992 por Vilma Maria dos Santos e colegas educadores, o Colégio Saber é referência em ensino humanista em Escada-PE. Conheça nossa história.',
  },
  '/matriculas': {
    title: 'Matrículas 2027 | Colégio Saber — Escada-PE',
    description:
      'Matrículas abertas para 2027 no Colégio Saber, em Escada-PE. Deixe seu contato, baixe o contrato em PDF e leve preenchido à escola para ganhar tempo.',
  },
};

export const NOT_FOUND_META: RouteMeta = {
  title: 'Página não encontrada | Colégio Saber',
  description: 'A página que você procura não existe ou foi movida.',
  noindex: true,
};
