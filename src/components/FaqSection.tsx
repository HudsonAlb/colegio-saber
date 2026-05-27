import { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle, Clock, Truck } from 'lucide-react';
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
    icon: <HelpCircle size={14} />,
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
    icon: <Clock size={14} />,
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
    icon: <Truck size={14} />,
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
function AccordionItem({ item, isOpen, onClick }: { item: FaqItemData; isOpen: boolean; onClick: () => void }) {
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
    <div className="border-b border-brand-light-border last:border-none flex flex-col">
      <button
        type="button"
        onClick={onClick}
        className="w-full py-5 text-left flex justify-between items-center gap-4 hover:text-brand-orange transition-colors duration-500 font-serif text-sm md:text-base font-medium text-brand-charcoal focus:outline-none"
      >
        <span>{item.question}</span>
        <div className={`p-1.5 rounded-full border border-brand-light-border bg-brand-light-card text-brand-charcoal/50 transition-transform duration-700 shrink-0 ${
          isOpen ? 'rotate-180 text-brand-orange border-brand-orange/30' : ''
        }`}>
          <ChevronDown size={14} />
        </div>
      </button>

      <div 
        ref={wrapperRef}
        className="overflow-hidden h-0"
        style={{ willChange: 'height' }}
      >
        <div ref={contentRef} className="pb-6 font-sans text-xs sm:text-sm font-light leading-relaxed text-brand-charcoal-light/80 text-left">
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
    <section className="w-full py-20 border-t border-brand-light-border bg-white relative z-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Título */}
        <div className="text-center flex flex-col gap-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-medium">
            Central de Ajuda
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal-light/75 font-light max-w-lg mx-auto">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-700 ${
                  isActive 
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/15' 
                    : 'text-brand-charcoal-light hover:bg-white hover:text-brand-orange'
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
          className="border border-brand-light-border rounded-3xl bg-brand-light-card px-6 md:px-8 py-2 shadow-sm"
        >
          {activeCategory.items.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
