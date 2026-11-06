import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import vilmaImg from '../assets/vilma-santos.webp';

const MARCOS = [
  {
    ano: '1992',
    titulo: 'Uma escola diferente',
    texto: 'Depois do I Seminário Municipal de Educação de Escada, Vilma Maria dos Santos, três colegas pedagogos e dois psicólogos criam o Colégio Saber.',
    cor: 'bg-brand-orange-dark',
  },
  {
    ano: '1993',
    titulo: 'Portas abertas',
    texto: 'O Saber começa a funcionar com 92 alunos: 70 na Educação Infantil e 22 no Ensino Fundamental, em turmas até a 2ª série.',
    cor: 'bg-brand-blue-dark',
  },
  {
    ano: '2001',
    titulo: 'A escola cresce',
    texto: 'Turma a turma, o Saber chega ao fim do Ensino Fundamental e soma 352 alunos, 188 deles no Fundamental II.',
    cor: 'bg-brand-green-dark',
  },
  {
    ano: '2002',
    titulo: 'Um recomeço',
    texto: 'Com o início da FAESC e do ACC (Aplicação Colégio e Curso), 215 alunos seguem para a nova escola, e o Saber recomeça com 152 alunos, do Maternal à 4ª série.',
    cor: 'bg-brand-pink-dark',
  },
  {
    ano: '2007',
    titulo: 'O Fundamental II de volta',
    texto: 'A 5ª série retorna ao Colégio Saber e o Ensino Fundamental II volta a fazer parte da nossa casa.',
    cor: 'bg-brand-orange-dark',
  },
  {
    ano: '2022',
    titulo: '30 anos letivos',
    texto: 'O Saber chega ao seu 30º ano letivo, graças aos esforços de uma equipe guerreira e valorosa.',
    cor: 'bg-brand-blue-dark',
  },
];

export default function HistoriaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteSectionRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLDivElement>(null);
  const quoteAuthorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(quoteTextRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(quoteAuthorRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.0,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo('.vilma-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vilma-section',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.marco-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.marcos-grid',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-20">

      {/* Quote Section */}
      <div
        ref={quoteSectionRef}
        className="relative w-full py-20 px-6 bg-brand-light flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute w-[60%] h-[60%] rounded-full bg-brand-yellow/5 blur-[120px] quote-bg-glow origin-center z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-brand-orange/30 flex items-center justify-center mb-8">
            <span className="font-serif text-brand-orange text-lg">“</span>
          </div>

          <div
            ref={quoteTextRef}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-relaxed text-brand-charcoal font-medium"
          >
            "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original."
          </div>

          <div
            ref={quoteAuthorRef}
            className="mt-8 font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-orange-dark font-medium"
          >
            — Albert Einstein
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 mt-12 text-center md:text-left flex flex-col gap-8">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal">Uma trajetória com Propósito</h1>
        <p className="font-sans text-sm text-brand-charcoal-light/85 font-medium leading-relaxed">
          Criado em 1992 e com aulas desde 1993, o <strong>Colégio Saber</strong> nasceu com a missão de ser um farol de ensino humanista de qualidade em Escada, PE. Acreditamos que a educação de excelência deve atuar na formação integral do indivíduo: desenvolvendo o pensamento crítico do estudante, estimulando a criatividade e a exploração desde a Educação Infantil ao Ensino Fundamental, e solidificando valores éticos essenciais de cidadania.
        </p>
        <p className="font-sans text-sm text-brand-charcoal-light/85 font-medium leading-relaxed">
          Nosso corpo docente qualificado atua de forma integrada, prestando mentoria constante e garantindo que cada aluno receba a atenção necessária para alcançar seu pleno potencial intelectual e pessoal.
        </p>
      </section>

      {/* Biografia da cofundadora */}
      <section className="vilma-section max-w-6xl mx-auto px-6 mt-[var(--spacing-fluid-lg)]" aria-labelledby="vilma-titulo">
        <div className="bg-[#fff5ee] border-4 border-[#fcd2af] rounded-[3rem] p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          <div className="vilma-reveal lg:col-span-4 flex flex-col items-center text-center gap-5">
            <div className="w-56 h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-8 border-white bg-white shadow-[0_16px_35px_rgba(67,56,50,0.1)]">
              <img
                src={vilmaImg}
                alt="Retrato de Vilma Maria dos Santos, sorrindo, de óculos e blusa listrada"
                width={792}
                height={709}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#d94a00] font-black block mb-2">
                Quem começou essa história
              </span>
              <h2 id="vilma-titulo" className="font-serif text-3xl font-bold text-brand-charcoal">Vilma Maria dos Santos</h2>
              <p className="font-sans text-sm font-semibold text-brand-charcoal-light mt-1">Educadora e cofundadora do Colégio Saber</p>
            </div>
            <ul className="flex flex-wrap justify-center gap-2 font-sans text-xs font-bold text-brand-charcoal">
              <li className="px-3 py-1.5 rounded-full bg-white border border-[#fcd2af]">Na educação desde 1970</li>
              <li className="px-3 py-1.5 rounded-full bg-white border border-[#fcd2af]">3 vezes Secretária de Educação</li>
              <li className="px-3 py-1.5 rounded-full bg-white border border-[#fcd2af]">Membro Honorário da Academia Escadense de Letras</li>
            </ul>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-7 font-sans text-sm md:text-base font-semibold text-brand-charcoal-light leading-relaxed">
            <div className="vilma-reveal">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-2">Raízes em Escada</h3>
              <p>
                Nascida em Escada, em 1953, Vilma passou a infância na Vila Frexeiras e, aos onze anos, mudou-se para a cidade, onde estudou no então Grupo Escolar Barão de Suassuna. Fez o curso normal, cursou Secretariado na Universidade Federal de Pernambuco e Pedagogia na Faculdade de Filosofia do Recife (FAFIRE), e se pós-graduou em Psicopedagogia Clínica e Institucional na Faculdade da Escada (FAESC).
              </p>
            </div>

            <div className="vilma-reveal">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-2">Uma vida dedicada à educação</h3>
              <p>
                Começou em 1970, como monitora do MOBRAL. Entrou na rede estadual em 1974 e na municipal em 1977, e foi muito além da sala de aula: dirigiu a Escola Agrícola Luiz Dias Lins e a Escola Municipal Ministro Eraldo Gueiros Leite, foi Diretora de Ensino, Chefe de Gabinete e, por três vezes, Secretária de Educação do município. Na rede municipal, aposentou-se como professora da Escola Barão de Suassuna, a mesma onde estudou quando criança.
              </p>
            </div>

            <div className="vilma-reveal">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-2">O sonho do Saber</h3>
              <p>
                Foi no I Seminário Municipal de Educação de Escada, debatendo os problemas da educação, que surgiu a vontade de criar uma escola diferente das demais da cidade. Com três colegas pedagogos e dois psicólogos, Vilma fundou o Colégio Saber, onde assumiu a direção administrativa. Em 2000, também participou do grupo fundador da mantenedora da FAESC e do ACC. Na faculdade, de 2010 a 2022, cuidou da emissão e do registro no MEC de 1.254 diplomas. Em 2013, recebeu o título de Membro Honorário da Academia Escadense de Letras, pela Ordem do Mérito da Educação Barão da Escada.
              </p>
            </div>

            <div className="vilma-reveal">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-2">Arte e fé</h3>
              <p>
                Desde 1998, Vilma retrata em suas telas os casarios, engenhos e paisagens de Escada, em um resgate histórico e arquitetônico da cidade onde nasceu. Também confecciona bonecas de pano, cada uma diferente da outra. Na vida de fé, é catequista e proclamadora da Palavra em paróquias de Escada e no Santuário de Nossa Senhora de Nazaré, no Cabo de Santo Agostinho.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Linha do tempo do colégio */}
      <section className="max-w-6xl mx-auto px-6 mt-[var(--spacing-fluid-lg)]" aria-labelledby="marcos-titulo">
        <h2 id="marcos-titulo" className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal text-center mb-[var(--spacing-fluid-md)]">
          Nossa caminhada
        </h2>
        <ol className="marcos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARCOS.map((marco) => (
            <li key={marco.ano} className="marco-item flex flex-col items-start gap-3 p-7 rounded-[2.5rem] bg-white border-[3px] border-dashed border-brand-light-border">
              <span className={`px-4 py-1 rounded-full font-serif text-lg font-bold text-white ${marco.cor}`}>{marco.ano}</span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal">{marco.titulo}</h3>
              <p className="font-sans text-sm font-semibold text-brand-charcoal-light leading-relaxed">{marco.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
