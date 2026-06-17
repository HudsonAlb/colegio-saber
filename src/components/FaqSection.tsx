import { useState, useRef, useEffect } from 'react';
import { CaretDown, Question, Clock, Tote } from '@phosphor-icons/react';
import gsap from 'gsap';
interface FaqItemData {
  question: string;
  answer: string;
}

interface CategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FaqItemData[];
}

const FAQ_DATA: CategoryData[] = [
  {
    id: 'admissao',
    title: 'Admissão & Matrículas',
    icon: <Question size={20} weight="duotone" className="text-brand-orange" />,
    items: [
      {
        question: 'Qual é o período de matrículas para o ano letivo?',
        answer: 'As inscrições de interesse e visitas guiadas estão abertas de junho a novembro. O processo de inscrição inicial pode ser feito diretamente online no nosso portal (/admissao), e a matrícula é finalizada presencialmente após o Teste Diagnóstico do aluno.'
      },
      {
        question: 'Como funciona o Teste Diagnóstico?',
        answer: 'O teste diagnóstico avalia as competências básicas em Matemática e Língua Portuguesa, alinhadas à série pretendida. Ele não possui caráter puramente eliminatório; seu principal objetivo é mapear o nível de aprendizado do estudante para planejar sua mentoria pedagógica inicial.'
      },
      {
        question: 'Quais documentos são exigidos no processo de matrícula?',
        answer: 'Para a pré-inscrição online, solicitamos apenas dados básicos. Para a efetivação física da matrícula, são necessários: RG/CPF do estudante e dos responsáveis legais, comprovante de residência atualizado, histórico escolar completo ou declaração de transferência, e o último boletim de notas.'
      }
    ]
  },
  {
    id: 'academico',
    title: 'Rotina & Horários',
    icon: <Clock size={20} weight="duotone" className="text-brand-orange" />,
    items: [
      {
        question: 'Quais são os turnos e horários das aulas?',
        answer: 'O turno matutino ocorre das 07:15 às 12:30. O turno vespertino funciona das 13:15 às 18:30. Para famílias que buscam desenvolvimento ampliado, oferecemos a modalidade de Ensino Integral, das 07:15 às 18:00, que engloba almoço, estudo dirigido e esportes.'
      },
      {
        question: 'O colégio oferece atividades extracurriculares?',
        answer: 'Sim, dispomos de um amplo cardápio de atividades extracurriculares no contraturno escolar, como Robótica Aplicada, Teatro, Dança, Judô, Futsal, Xadrez e o Clube de Idiomas. O agendamento é feito no início de cada semestre.'
      },
      {
        question: 'Como é estruturado o ensino de línguas (Bilinguismo)?',
        answer: 'Do Ensino Fundamental I ao Ensino Médio, temos carga horária expandida de Inglês com projetos interdisciplinares. Nosso foco é a proficiência prática, preparando os estudantes para exames de proficiência de Cambridge e intercâmbios culturais.'
      }
    ]
  },
  {
    id: 'servicos',
    title: 'Serviços & Logística',
    icon: <Tote size={20} weight="duotone" className="text-brand-orange" />,
    items: [
      {
        question: 'Como funciona a aquisição de uniformes e materiais didáticos?',
        answer: 'A lista de livros e materiais escolares é disponibilizada no portal do responsável em dezembro. Os uniformes oficiais do Colégio Saber (obrigatórios para todos os segmentos) podem ser comprados em nossa loja física interna no campus ou pela loja virtual autorizada.'
      },
      {
        question: 'O colégio possui transporte escolar próprio ou credenciado?',
        answer: 'Não dispomos de frota própria, mas possuímos parcerias com transportadores escolares credenciados e auditados, que cumprem rigorosos critérios de segurança. A secretaria escolar fornece a listagem dos transportadores que cobrem cada região no ato da matrícula.'
      },
      {
        question: 'Como funciona o serviço de alimentação no campus?',
        answer: 'Contamos com cantina de alimentação saudável e refeitório próprio com cardápio planejado por nutricionista infantil. Alunos do Ensino Integral possuem almoço e lanches inclusos na mensalidade, enquanto alunos do meio-período podem contratar pacotes avulsos ou recarregar créditos no cartão de consumo.'
      }
    ]
  }
];

// Sub-componente de item de acordeão para animar a altura dinamicamente
function FaqItem({ item, isOpen, onClick, idx }: { item: FaqItemData, isOpen: boolean, onClick: () => void, idx: number }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      const height = isOpen ? contentRef.current.scrollHeight : 0;
      gsap.to(wrapperRef.current, {
        height: height,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  return (
    <div className={`border-[3px] border-dashed rounded-[2.5rem] flex flex-col mb-4 overflow-hidden transition-all duration-500 ${isOpen ? "bg-brand-yellow/15 border-brand-yellow-dark/40 shadow-[4px_4px_0_0_rgba(216,159,0,0.2)] -translate-y-1" : "bg-brand-light-card border-brand-light-border hover:border-brand-orange/40 hover:bg-brand-orange/5"}`}>
      <button
        type="button"
        id={`faq-btn-${idx}`}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${idx}`}
        onClick={onClick}
        className="w-full p-[var(--spacing-fluid-sm)] md:p-[var(--spacing-fluid-md)] text-left flex justify-between items-center gap-4 hover:text-brand-orange transition-colors duration-500 font-serif text-sm md:text-base font-bold text-brand-charcoal focus:outline-none"
      >
        <span>{item.question}</span>
        <div className={`p-1.5 rounded-full border border-brand-light-border bg-brand-light-card text-brand-charcoal/50 transition-transform duration-700 shrink-0 ${isOpen ? 'rotate-180 text-brand-orange border-brand-orange/30' : ''
          }`}>
          <CaretDown size={18} weight="duotone" />
        </div>
      </button>

      <div
        ref={wrapperRef}
        id={`faq-content-${idx}`}
        aria-labelledby={`faq-btn-${idx}`}
        role="region"
        className="overflow-hidden h-0"
        style={{ willChange: 'height' }}
      >
        <div ref={contentRef} className="pb-[var(--spacing-fluid-md)] px-[var(--spacing-fluid-md)] font-sans text-xs sm:text-sm font-semibold leading-relaxed text-brand-charcoal-light/90 text-left">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [activeCat, setActiveCat] = useState<string>('admissao');
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animação de fade-in ao trocar de categoria
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      );
    }
    setOpenIdx(null); // Reseta acordeão aberto ao mudar de aba
  }, [activeCat]);

  const activeCategory = FAQ_DATA.find(cat => cat.id === activeCat) || FAQ_DATA[0];

  return (
    <section className="w-full py-[var(--spacing-fluid-section)] border-t border-brand-light-border bg-brand-light relative z-10 overflow-hidden">

      {/* Vetores Flutuantes */}
      <div className="absolute top-20 left-10 w-24 h-24 text-brand-orange opacity-20 animate-wiggle pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M40,20 C40,10 60,10 60,20 C60,30 40,40 50,60 L50,60 C55,40 80,30 80,20 C80,-10 20,-10 20,20 C20,30 30,35 40,35 C50,35 40,25 40,20 Z M50,75 C45,75 40,80 40,85 C40,90 45,95 50,95 C55,95 60,90 60,85 C60,80 55,75 50,75 Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-16 h-16 text-brand-green opacity-30 animate-float-slow pointer-events-none hidden lg:block">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10 relative z-10">

        {/* Título */}
        <div className="text-center flex flex-col gap-3 items-center relative">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-bold relative inline-block">
            Central de Ajuda
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/40" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q25,8 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/80 font-semibold max-w-lg mx-auto mt-2">
            Encontre respostas rápidas para as principais questões sobre o processo de admissão, regras escolares e serviços de apoio.
          </p>
        </div>

        {/* Seletor de Categoria */}
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap max-w-xl mx-auto w-full p-1 border border-brand-light-border bg-brand-light-card rounded-2xl">
          {FAQ_DATA.map(cat => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 border-2 ${isActive
                    ? 'bg-brand-orange border-brand-orange-dark text-white shadow-[2px_4px_0_0_#e05300] -translate-y-1'
                    : 'bg-white border-brand-light-border text-brand-charcoal-light hover:border-brand-orange/50 hover:bg-brand-orange/5 hover:-translate-y-0.5'
                  }`}
              >
                {cat.icon}
                <span>{cat.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Acordeão Accordion */}
        <div
          ref={containerRef}
          className="flex flex-col gap-[var(--spacing-fluid-sm)]"
        >
          {activeCategory.items.map((item, idx) => (
            <FaqItem
              key={idx}
              item={item}
              idx={idx}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
