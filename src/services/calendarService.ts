import type { ElementType } from 'react';
import {
  Sun,
  Leaf,
  Confetti,
  BookOpen,
  UsersThree,
  SunHorizon,
  Sparkle,
  GraduationCap
} from '@phosphor-icons/react';

export type EventCategory = 'exames' | 'reunioes' | 'eventos' | 'feriados';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: EventCategory;
  badge?: string;
  color?: string;
  shadow?: string;
  icon?: ElementType;
}

export const MONTH_ABBR = [
  'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
  'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
];

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Formata data no padrão YYYY-MM-DD garantindo 2 dígitos para mês e dia.
 */
function toDateStr(year: number, month: number, day: number): string {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/**
 * Adiciona dias a uma data base sem efeito colateral de fuso horário.
 */
function addDays(baseDate: Date, days: number): Date {
  const result = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Algoritmo Computus (Meeus/Jones/Butcher) para cálculo do Domingo de Páscoa.
 * Válido para qualquer ano no calendário gregoriano.
 */
export function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = Março, 4 = Abril
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Retorna todos os feriados nacionais oficiais para um determinado ano.
 */
export function getNationalHolidays(year: number): CalendarEvent[] {
  const easter = getEasterDate(year);

  // Feriados móveis calculados a partir da Páscoa
  const carnavalMon = addDays(easter, -48);
  const carnavalTue = addDays(easter, -47);
  const cinzas = addDays(easter, -46);
  const paixaoCristo = addDays(easter, -2);
  const corpusChristi = addDays(easter, 60);

  const holidays: CalendarEvent[] = [
    {
      id: `feriado-${year}-ano-novo`,
      title: 'Confraternização Universal',
      description: 'Feriado Nacional. Início do ano e recesso geral.',
      date: toDateStr(year, 1, 1),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-orange',
      shadow: 'shadow-[4px_4px_0_0_#ff7e1b]',
      icon: Sun
    },
    {
      id: `feriado-${year}-carnaval-seg`,
      title: 'Carnaval (Recesso)',
      description: 'Recesso escolar de Carnaval.',
      date: toDateStr(carnavalMon.getFullYear(), carnavalMon.getMonth() + 1, carnavalMon.getDate()),
      time: 'Dia Todo',
      location: 'Campus',
      category: 'feriados',
      color: 'bg-brand-pink',
      shadow: 'shadow-[4px_4px_0_0_#d44c82]',
      icon: Confetti
    },
    {
      id: `feriado-${year}-carnaval-ter`,
      title: 'Carnaval (Feriado)',
      description: 'Feriado Nacional de Carnaval. Recesso escolar.',
      date: toDateStr(carnavalTue.getFullYear(), carnavalTue.getMonth() + 1, carnavalTue.getDate()),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-pink',
      shadow: 'shadow-[4px_4px_0_0_#d44c82]',
      icon: Confetti
    },
    {
      id: `feriado-${year}-cinzas`,
      title: 'Quarta-feira de Cinzas',
      description: 'Recesso no período da manhã. Expediente reduzido.',
      date: toDateStr(cinzas.getFullYear(), cinzas.getMonth() + 1, cinzas.getDate()),
      time: 'Dia Todo',
      location: 'Campus',
      category: 'feriados',
      color: 'bg-brand-yellow',
      shadow: 'shadow-[4px_4px_0_0_#d89f00]',
      icon: SunHorizon
    },
    {
      id: `feriado-${year}-paixao-cristo`,
      title: 'Paixão de Cristo',
      description: 'Sexta-feira Santa. Feriado Nacional Religioso.',
      date: toDateStr(paixaoCristo.getFullYear(), paixaoCristo.getMonth() + 1, paixaoCristo.getDate()),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-green',
      shadow: 'shadow-[4px_4px_0_0_#3f882b]',
      icon: Leaf
    },
    {
      id: `feriado-${year}-pascoa`,
      title: 'Páscoa',
      description: 'Domingo de Páscoa.',
      date: toDateStr(easter.getFullYear(), easter.getMonth() + 1, easter.getDate()),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-green',
      shadow: 'shadow-[4px_4px_0_0_#3f882b]',
      icon: Sparkle
    },
    {
      id: `feriado-${year}-tiradentes`,
      title: 'Tiradentes',
      description: 'Feriado Nacional. Homenagem a Tiradentes.',
      date: toDateStr(year, 4, 21),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-yellow',
      shadow: 'shadow-[4px_4px_0_0_#d89f00]',
      icon: Sun
    },
    {
      id: `feriado-${year}-trabalhador`,
      title: 'Dia do Trabalhador',
      description: 'Feriado Nacional do Dia do Trabalho.',
      date: toDateStr(year, 5, 1),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-blue',
      shadow: 'shadow-[4px_4px_0_0_#0284c7]',
      icon: SunHorizon
    },
    {
      id: `feriado-${year}-corpus-christi`,
      title: 'Corpus Christi',
      description: 'Feriado Religioso. Recesso escolar institucional.',
      date: toDateStr(corpusChristi.getFullYear(), corpusChristi.getMonth() + 1, corpusChristi.getDate()),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-yellow',
      shadow: 'shadow-[4px_4px_0_0_#d89f00]',
      icon: Leaf
    },
    {
      id: `feriado-${year}-independencia`,
      title: 'Independência do Brasil',
      description: 'Feriado Nacional. Celebração da Independência.',
      date: toDateStr(year, 9, 7),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-green',
      shadow: 'shadow-[4px_4px_0_0_#3f882b]',
      icon: Sun
    },
    {
      id: `feriado-${year}-aparecida`,
      title: 'Nossa Sra. Aparecida (Dia das Crianças)',
      description: 'Feriado Nacional da Padroeira do Brasil e Dia das Crianças.',
      date: toDateStr(year, 10, 12),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-pink',
      shadow: 'shadow-[4px_4px_0_0_#d44c82]',
      icon: Sparkle
    },
    {
      id: `feriado-${year}-finados`,
      title: 'Finados',
      description: 'Feriado Nacional de Finados.',
      date: toDateStr(year, 11, 2),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-yellow',
      shadow: 'shadow-[4px_4px_0_0_#d89f00]',
      icon: SunHorizon
    },
    {
      id: `feriado-${year}-proclamacao`,
      title: 'Proclamação da República',
      description: 'Feriado Nacional da Proclamação da República.',
      date: toDateStr(year, 11, 15),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-green',
      shadow: 'shadow-[4px_4px_0_0_#3f882b]',
      icon: Sun
    },
    {
      id: `feriado-${year}-consciencia-negra`,
      title: 'Dia da Consciência Negra',
      description: 'Feriado Nacional (Lei nº 14.759/2023). Dia de Zumbi dos Palmares.',
      date: toDateStr(year, 11, 20),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-orange',
      shadow: 'shadow-[4px_4px_0_0_#ff7e1b]',
      icon: SunHorizon
    },
    {
      id: `feriado-${year}-natal`,
      title: 'Natal',
      description: 'Feriado Nacional de Natal e celebrações de fim de ano.',
      date: toDateStr(year, 12, 25),
      time: 'Dia Todo',
      location: 'Brasil',
      category: 'feriados',
      color: 'bg-brand-pink',
      shadow: 'shadow-[4px_4px_0_0_#d44c82]',
      icon: Confetti
    }
  ];

  return holidays;
}

/**
 * Retorna os eventos escolares pedagógicos da escola ajustados ao ano letivo.
 */
export function getSchoolEvents(year: number): CalendarEvent[] {
  return [
    {
      id: `escola-${year}-reuniao-1`,
      title: 'Reunião de Pais e Mestres (1º Semestre)',
      description: 'Encontro para alinhamento das expectativas e apresentação do plano pedagógico anual.',
      date: toDateStr(year, 2, 25),
      time: '19:00',
      location: 'Auditório Principal',
      category: 'reunioes',
      color: 'bg-brand-blue',
      shadow: 'shadow-[4px_4px_0_0_#0284c7]',
      icon: UsersThree
    },
    {
      id: `escola-${year}-simulado-1`,
      title: 'Simulado Diagnóstico',
      description: 'Avaliação diagnóstica e nivelamento para alunos do Ensino Fundamental II e Médio.',
      date: toDateStr(year, 3, 10),
      time: '08:00',
      location: 'Salas de Aula',
      category: 'exames',
      color: 'bg-brand-orange',
      shadow: 'shadow-[4px_4px_0_0_#ff7e1b]',
      icon: BookOpen
    },
    {
      id: `escola-${year}-festa-familia`,
      title: 'Festa da Família no Colégio',
      description: 'Dia de integração comunitária com oficinas lúdicas, gincanas e apresentações culturais.',
      date: toDateStr(year, 4, 18),
      time: '10:00',
      location: 'Quadra Poliesportiva e Bosque',
      category: 'eventos',
      color: 'bg-brand-pink',
      shadow: 'shadow-[4px_4px_0_0_#d44c82]',
      icon: Confetti
    },
    {
      id: `escola-${year}-provas-1`,
      title: 'Semana de Provas - 1º Trimestre',
      description: 'Avaliações somativas e interdisciplinares de todas as disciplinas.',
      date: toDateStr(year, 5, 15),
      time: '07:30',
      location: 'Salas de Aula',
      category: 'exames',
      color: 'bg-brand-orange',
      shadow: 'shadow-[4px_4px_0_0_#ff7e1b]',
      icon: BookOpen
    },
    {
      id: `escola-${year}-festa-junina`,
      title: 'Grande Festa Junina do Saber',
      description: 'Comidas típicas, quadrilhas temáticas e brincadeiras tradicionais para toda a família!',
      date: toDateStr(year, 6, 20),
      time: '14:00',
      location: 'Pátio Externo e Ginásio',
      category: 'eventos',
      color: 'bg-brand-yellow',
      shadow: 'shadow-[4px_4px_0_0_#d89f00]',
      icon: Confetti
    },
    {
      id: `escola-${year}-recesso-julho`,
      title: 'Início do Recesso Escolar de Julho',
      description: 'Férias de inverno para os alunos recarregarem as energias.',
      date: toDateStr(year, 7, 6),
      time: 'Dia Todo',
      location: 'Campus',
      category: 'feriados',
      color: 'bg-brand-blue',
      shadow: 'shadow-[4px_4px_0_0_#0284c7]',
      icon: SunHorizon
    },
    {
      id: `escola-${year}-retorno-aulas`,
      title: 'Retorno das Aulas (2º Semestre)',
      description: 'Início do segundo semestre letivo com acolhida e novos projetos.',
      date: toDateStr(year, 8, 3),
      time: '07:30',
      location: 'Salas de Aula',
      category: 'eventos',
      color: 'bg-brand-green',
      shadow: 'shadow-[4px_4px_0_0_#3f882b]',
      icon: Sparkle
    },
    {
      id: `escola-${year}-dia-professor`,
      title: 'Dia dos Professores (Comemoração)',
      description: 'Homenagem especial aos nossos educadores e recesso escolar.',
      date: toDateStr(year, 10, 15),
      time: 'Dia Todo',
      location: 'Campus',
      category: 'reunioes',
      color: 'bg-brand-blue',
      shadow: 'shadow-[4px_4px_0_0_#0284c7]',
      icon: UsersThree
    },
    {
      id: `escola-${year}-mostra-ciencias`,
      title: 'Mostra de Ciências, Artes e Tecnologia',
      description: 'Exposição dos projetos práticos, experimentos científicos e robótica criados pelos alunos.',
      date: toDateStr(year, 11, 21),
      time: '09:00',
      location: 'Ginásio e Laboratórios',
      category: 'eventos',
      color: 'bg-brand-yellow',
      shadow: 'shadow-[4px_4px_0_0_#d89f00]',
      icon: Confetti
    },
    {
      id: `escola-${year}-formatura`,
      title: 'Formatura e Encerramento do Ano Letivo',
      description: 'Solenidade de conclusão das turmas do 9º ano e 3º ano do Ensino Médio.',
      date: toDateStr(year, 12, 18),
      time: '19:30',
      location: 'Auditório Principal',
      category: 'eventos',
      color: 'bg-brand-orange',
      shadow: 'shadow-[4px_4px_0_0_#ff7e1b]',
      icon: GraduationCap
    }
  ];
}

// Cache em memória para feriados retornados pela BrasilAPI
const holidaysCache: Record<number, CalendarEvent[]> = {};

/**
 * Tenta buscar feriados atualizados via BrasilAPI com fallback silencioso para o gerador nativo.
 */
export async function fetchBrasilApiHolidays(year: number): Promise<CalendarEvent[]> {
  if (holidaysCache[year]) {
    return holidaysCache[year];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: Array<{ date: string; name: string; type: string }> = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const events: CalendarEvent[] = data.map((item, idx) => {
          return {
            id: `brasilapi-${year}-${idx}`,
            title: item.name,
            description: `Feriado Nacional Oficial (${item.name}).`,
            date: item.date,
            time: 'Dia Todo',
            location: 'Brasil',
            category: 'feriados',
            color: 'bg-brand-pink',
            shadow: 'shadow-[4px_4px_0_0_#d44c82]',
            icon: Confetti
          };
        });

        holidaysCache[year] = events;
        return events;
      }
    }
  } catch {
    // Falha de rede ou timeout: o fallback nativo já resolve perfeitamente
  }

  return getNationalHolidays(year);
}

/**
 * Retorna todos os eventos (feriados + calendário escolar) de um determinado ano,
 * ordenados cronologicamente.
 */
export function getAllEventsForYear(year: number): CalendarEvent[] {
  const holidays = getNationalHolidays(year);
  const school = getSchoolEvents(year);

  const combined = [...holidays, ...school];

  // Ordena por data
  return combined.sort((a, b) => a.date.localeCompare(b.date));
}

export interface UpcomingHolidayCard {
  id: string;
  date: string; // '17'
  month: string; // 'FEV'
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  shadow: string;
  fullDate: string; // '2026-02-17'
  isToday?: boolean;
  daysRemaining?: number;
}

/**
 * Retorna os próximos N eventos a partir de hoje (atualização contínua).
 * Se o ano estiver acabando (ex: Dezembro), inclui automaticamente os eventos do próximo ano.
 */
export function getUpcomingEvents(limit = 3, fromDate?: Date): UpcomingHolidayCard[] {
  const baseDate = fromDate || new Date();
  const currentYear = baseDate.getFullYear();
  const todayStr = toDateStr(baseDate.getFullYear(), baseDate.getMonth() + 1, baseDate.getDate());

  // Coleta eventos deste ano e do próximo ano para transição contínua
  const thisYearEvents = getAllEventsForYear(currentYear);
  const nextYearEvents = getAllEventsForYear(currentYear + 1);

  const allFutureEvents = [...thisYearEvents, ...nextYearEvents]
    .filter(evt => evt.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Paleta cíclica de cores vibrantes do design system
  const styleVariants = [
    { color: 'bg-brand-pink', shadow: 'shadow-[4px_4px_0_0_#d44c82]' },
    { color: 'bg-brand-green', shadow: 'shadow-[4px_4px_0_0_#3f882b]' },
    { color: 'bg-brand-yellow', shadow: 'shadow-[4px_4px_0_0_#d89f00]' },
    { color: 'bg-brand-orange', shadow: 'shadow-[4px_4px_0_0_#ff7e1b]' },
    { color: 'bg-brand-blue', shadow: 'shadow-[4px_4px_0_0_#0284c7]' }
  ];

  const selected = allFutureEvents.slice(0, limit);

  return selected.map((evt, index) => {
    const parts = evt.date.split('-');
    const day = parts[2];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const month = MONTH_ABBR[monthIdx] || 'MES';

    const evtDateObj = new Date(parseInt(parts[0]), monthIdx, parseInt(day));
    const todayObj = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    const diffTime = evtDateObj.getTime() - todayObj.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const style = styleVariants[index % styleVariants.length];

    return {
      id: evt.id,
      date: day,
      month: month,
      title: evt.title,
      description: evt.description,
      icon: evt.icon || Sun,
      color: evt.color || style.color,
      shadow: evt.shadow || style.shadow,
      fullDate: evt.date,
      isToday: diffDays === 0,
      daysRemaining: diffDays
    };
  });
}
