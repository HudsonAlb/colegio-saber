import { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, User, Tag, ArrowRight, BookOpen, Image, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface BlogPost {
  id: string;
  type: 'article' | 'project';
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author?: string;
  role?: string;
  date: string;
  readTime?: string;
  imageUrl: string;
  gallery?: string[];
  learningObjectives?: string[];
}

const mockPosts: BlogPost[] = [
  {
    id: 'eco-saber-hidroponia',
    type: 'project',
    title: 'Eco-Saber: Horta Hidropônica Inteligente',
    excerpt: 'Alunos do Ensino Médio integram Biologia, Química e Programação IoT para criar um sistema de cultivo automatizado e sustentável.',
    content: 'O projeto Eco-Saber nasceu do desejo de unir sustentabilidade e tecnologia aplicada. Os alunos da 2ª série do Ensino Médio receberam o desafio de desenvolver uma horta hidropônica inteligente que pudesse otimizar o uso da água e monitorar os nutrientes em tempo real.\n\nDurante o semestre, o laboratório de ciências se transformou em uma oficina de eletrônica e botânica. Sob a mentoria dos professores de Biologia e de Tecnologia da Informação, os alunos projetaram a estrutura física do sistema hidropônico e programaram sensores IoT utilizando placas compatíveis com Arduino.\n\nEsses sensores medem constantemente a condutividade elétrica da água (para dosagem de nutrientes), o pH e a temperatura do ambiente. Os dados são enviados para um painel web criado pelos próprios alunos, que alerta quando é necessário reabastecer a solução nutritiva ou fazer alguma intervenção manual.\n\nA colheita de hortaliças frescas (alface, rúcula e hortelã) é distribuída periodicamente na cantina da escola e entre as famílias dos próprios estudantes, fechando um ciclo completo de aprendizado prático, colaborativo e sustentável.',
    category: 'Projetos dos Alunos',
    tags: ['Ensino Médio', 'Sustentabilidade', 'Robótica', 'Biologia'],
    date: '18 Mai 2026',
    imageUrl: '/eco_saber_hydroponics.png',
    gallery: [
      '/eco_saber_hydroponics.png',
      '/robotics_class.png'
    ],
    learningObjectives: [
      'Compreender os ciclos biológicos das plantas e as reações químicas em meio aquoso.',
      'Desenvolver habilidades de programação e eletrônica básica aplicada à Internet das Coisas (IoT).',
      'Promover a colaboração interdepartamental e a resolução de problemas ecológicos contemporâneos.'
    ]
  },
  {
    id: 'futuro-educacao-metodologias',
    type: 'article',
    title: 'O Futuro da Educação: Metodologias Ativas na Prática',
    excerpt: 'Como a transição do ensino passivo para o protagonismo estudantil redefine o engajamento e a retenção do conhecimento em sala de aula.',
    content: 'O modelo tradicional de ensino, em que o professor é o único detentor do conhecimento e o aluno apenas um receptor passivo, já não atende às demandas da sociedade moderna. O Colégio Saber adota e desenvolve cotidianamente as chamadas Metodologias Ativas de Aprendizagem.\n\nMas o que significa isso na prática? Significa colocar o estudante no centro do processo de aprendizagem. Em vez de simplesmente ouvir uma palestra sobre fotossíntese ou física mecânica, os estudantes são confrontados com problemas reais e desafiadores que exigem pesquisa, formulação de hipóteses e trabalho de campo.\n\nAprendizagem Baseada em Projetos (PBL), sala de aula invertida e gamificação são algumas das abordagens que estruturam nosso currículo. Estudos pedagógicos contemporâneos comprovam que, ao aplicar a teoria na resolução de desafios concretos, o cérebro constrói conexões neurais mais profundas, resultando em um conhecimento duradouro e flexível.\n\nAlém de memorizar fórmulas e conceitos, os alunos desenvolvem as chamadas soft skills: pensamento crítico, comunicação assertiva, resiliência e cooperação — ferramentas essenciais para a liderança e para os desafios do século XXI.',
    category: 'Artigos Pedagógicos',
    tags: ['Metodologia', 'Inovação', 'Gestão Escolar'],
    author: 'Drª. Mariana Silva',
    role: 'Diretora Pedagógica',
    date: '10 Mai 2026',
    readTime: '5 min de leitura',
    imageUrl: '/robotics_class.png'
  },
  {
    id: 'robotica-educacional-amanha',
    type: 'project',
    title: 'Exploradores da Robótica: Projetando Soluções',
    excerpt: 'Estudantes do Ensino Fundamental desenvolvem protótipos robóticos voltados para a automação residencial e acessibilidade urbana.',
    content: 'No Colégio Saber, a robótica não é tratada apenas como uma atividade complementar, mas como uma linguagem interdisciplinar. Na última mostra tecnológica do Ensino Fundamental II, nossos alunos apresentaram projetos surpreendentes voltados para a robótica social e automação inteligente.\n\nUtilizando kits de blocos de montar, servomotores e linguagens de programação em blocos, os grupos receberam o desafio de conceber tecnologias que facilitassem o cotidiano de pessoas com mobilidade reduzida ou que otimizassem recursos nas residências.\n\nEntre as inovações construídas, destacou-se uma maquete de casa sustentável com sensor de presença para controle automático de iluminação e um protótipo de bengala ultra-sônica para pessoas com deficiência visual, capaz de emitir avisos sonoros ao detectar obstáculos a até um metro de distância.\n\nA experiência permitiu aos alunos conectar conceitos teóricos de física óptica e acústica com matemática computacional, evidenciando o poder transformador da metodologia STEM.',
    category: 'Projetos dos Alunos',
    tags: ['Ensino Fundamental', 'Robótica', 'Tecnologia', 'Inclusão'],
    date: '02 Mai 2026',
    imageUrl: '/robotics_class.png',
    gallery: [
      '/robotics_class.png',
      '/eco_saber_hydroponics.png'
    ],
    learningObjectives: [
      'Aplicar raciocínio lógico e conceitos geométricos na programação de motores.',
      'Desenvolver empatia e consciência social ao criar tecnologias voltadas para acessibilidade.',
      'Aprender a depurar erros lógicos e persistir na resolução de problemas práticos.'
    ]
  },
  {
    id: 'bilinguismo-desenvolvimento-cognitivo',
    type: 'article',
    title: 'Bilinguismo e Desenvolvimento Cognitivo na Infância',
    excerpt: 'Entenda os benefícios neurológicos e sociais que a aquisição de um segundo idioma proporciona desde a Educação Infantil.',
    content: 'Aprender uma segunda língua na infância vai muito além de falar inglês fluente. O cérebro de uma criança pequena é extremamente plástico e maleável, agindo como uma esponja pronta para absorver estruturas linguísticas complexas.\n\nDiversas pesquisas na área de neurociência e linguística demonstram que crianças bilíngues desenvolvem uma maior capacidade de foco e flexibilidade cognitiva. Por precisarem alternar constantemente entre dois sistemas de regras linguísticas, essas crianças exercitam intensamente as chamadas funções executivas do cérebro, localizadas no córtex pré-frontal.\n\nIsso se traduz em maior facilidade para resolver problemas complexos, melhor filtragem de distrações ambientais e adaptabilidade frente a mudanças de cenário. No Colégio Saber, o bilinguismo é vivenciado de forma natural e lúdica através de brincadeiras, contação de histórias e aulas temáticas de artes e ciências ministradas no idioma estrangeiro.\n\nO resultado são crianças não apenas fluentes linguisticamente, mas com uma mentalidade global expandida e grande facilidade de comunicação intercultural.',
    category: 'Artigos Pedagógicos',
    tags: ['Bilinguismo', 'Educação Infantil', 'Neurociência'],
    author: 'Profª. Sophia Alvarez',
    role: 'Coordenadora de Línguas Estrangeiras',
    date: '24 Abr 2026',
    readTime: '4 min de leitura',
    imageUrl: '/early_childhood_insects.png'
  },
  {
    id: 'mini-mundo-insetos',
    type: 'project',
    title: 'Mini-Mundo dos Insetos na Educação Infantil',
    excerpt: 'Pequenos pesquisadores saem da sala de aula para explorar a biodiversidade no jardim escolar, integrando ciência e arte.',
    content: 'A curiosidade natural das crianças pequenas é o melhor motor para o aprendizado científico. Inspirados por uma borboleta que visitou nossa janela, a turma do Infantil III iniciou o projeto "Mini-Mundo dos Insetos".\n\nEquipadas com lupas, pranchetas e muita imaginação, as crianças investigaram os canteiros do jardim da escola. Elas mapearam onde vivem as formigas, observaram o movimento dos caracóis e aprenderam sobre o papel crucial que as abelhas desempenham no ecossistema.\n\nDe volta à sala, a experiência externa desdobrou-se em atividades sensoriais e artísticas. Os pequenos cientistas moldaram insetos com argila, criaram colagens com folhas secas coletadas no chão e catalogaram as espécies encontradas por meio de desenhos coletivos.\n\nEsse tipo de investigação promove a alfabetização científica inicial, a motricidade fina e, acima de tudo, o respeito e o encantamento pela natureza e pela vida em todas as suas formas.',
    category: 'Projetos dos Alunos',
    tags: ['Educação Infantil', 'Ciências', 'Artes', 'Natureza'],
    date: '15 Abr 2026',
    imageUrl: '/early_childhood_insects.png',
    gallery: [
      '/early_childhood_insects.png',
      '/robotics_class.png'
    ],
    learningObjectives: [
      'Estimular a observação detalhada, a curiosidade científica e o respeito à biodiversidade.',
      'Desenvolver habilidades motoras finas e percepção de formas através da modelagem e desenho.',
      'Fomentar a linguagem oral ao descrever as características físicas e comportamentais dos insetos.'
    ]
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Animação de entrada dos itens do blog
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [selectedCategory, searchQuery]);

  // Gerenciamento de foco do modal para acessibilidade (Focus Trap e Teclado Esc)
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activePost]);

  const closeModal = () => {
    setActivePost(null);
  };

  // Filtragem dos posts
  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      (selectedCategory === 'artigos' && post.type === 'article') ||
      (selectedCategory === 'projetos' && post.type === 'project');

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={containerRef} className="pt-32 pb-24 min-h-screen bg-brand-light">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange-dark text-xs uppercase tracking-widest font-semibold mb-6">
          <Sparkles size={12} className="animate-pulse" />
          <span>Saber em Ação</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal mb-6 leading-tight max-w-4xl">
          Compartilhando <span className="text-brand-orange-dark font-medium italic">Conhecimento</span> & Conquistas
        </h1>
        <p className="font-sans text-sm md:text-base text-brand-charcoal-light/80 max-w-2xl font-light leading-relaxed">
          Explore nossos artigos pedagógicos de vanguarda escritos pelo nosso corpo docente e encante-se com a riqueza e criatividade dos projetos práticos desenvolvidos por nossos alunos.
        </p>
      </section>

      {/* FILTROS E BUSCA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto" role="tablist" aria-label="Categorias do Blog">
          {[
            { id: 'todos', label: 'Todos os Conteúdos' },
            { id: 'artigos', label: 'Artigos Pedagógicos' },
            { id: 'projetos', label: 'Projetos dos Alunos' }
          ].map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 ${
                selectedCategory === cat.id
                  ? 'bg-brand-orange text-brand-light shadow-md shadow-brand-orange/20 scale-105'
                  : 'bg-brand-light-card border border-brand-light-border text-brand-charcoal-light hover:border-brand-orange hover:text-brand-orange-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Busca */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Pesquisar artigos ou projetos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-full border border-brand-light-border bg-white text-xs text-brand-charcoal placeholder-brand-charcoal/40 focus:outline-none focus:border-brand-orange/60 transition-colors duration-500"
          />
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-charcoal"
              aria-label="Limpar pesquisa"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </section>

      {/* GRID DE CARDS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card flex flex-col h-full rounded-3xl border border-brand-light-border bg-brand-light-card overflow-hidden hover:shadow-xl transition-all duration-500 group"
              >
                {/* Imagem / Badge */}
                <div className="relative h-56 overflow-hidden bg-brand-light-border">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-brand-light shadow-sm ${
                      post.type === 'article' ? 'bg-brand-charcoal' : 'bg-brand-orange'
                    }`}>
                      {post.type === 'article' ? (
                        <BookOpen size={10} />
                      ) : (
                        <Image size={10} />
                      )}
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium text-brand-charcoal-light/60 bg-brand-light px-2.5 py-1 rounded-md border border-brand-light-border">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="font-serif text-xl text-brand-charcoal mb-3 group-hover:text-brand-orange-dark transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="font-sans text-xs text-brand-charcoal-light/75 font-light leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="pt-4 border-t border-brand-light-border flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-brand-charcoal-light/50 font-medium uppercase tracking-wider">
                        {post.date}
                      </span>
                      {post.author && (
                        <span className="text-[10px] text-brand-charcoal font-semibold mt-0.5">
                          Por: {post.author}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setActivePost(post)}
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-brand-orange-dark hover:text-brand-charcoal group/btn transition-colors duration-300"
                    >
                      {post.type === 'article' ? 'Ler Artigo' : 'Ver Projeto'}
                      <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-light-card border border-brand-light-border rounded-3xl">
            <Search className="w-12 h-12 text-brand-charcoal/20 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-brand-charcoal mb-2">Nenhum resultado encontrado</h3>
            <p className="font-sans text-xs text-brand-charcoal-light/70 max-w-sm mx-auto">
              Não encontramos nenhum artigo ou projeto correspondente a "{searchQuery}". Experimente usar termos diferentes ou limpar os filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-orange text-brand-light hover:bg-brand-orange-dark transition-colors duration-500"
            >
              Ver Todos os Conteúdos
            </button>
          </div>
        )}
      </section>

      {/* DETAIL MODAL (LIGHTBOX / READER) */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-md"
            onClick={closeModal}
          ></div>

          {/* Modal Container */}
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative bg-brand-light w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl border border-brand-light-border overflow-y-auto outline-none animate-fade-in"
          >
            {/* Header/Banner do Modal */}
            <div className="relative h-64 md:h-96 w-full bg-brand-light-border">
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent"></div>

              {/* Botão Fechar */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                aria-label="Fechar detalhes"
              >
                <X size={18} />
              </button>

              {/* Informações do Banner */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-brand-light ${
                    activePost.type === 'article' ? 'bg-brand-charcoal' : 'bg-brand-orange'
                  }`}>
                    {activePost.type === 'article' ? <BookOpen size={10} /> : <Image size={10} />}
                    {activePost.category}
                  </span>
                  {activePost.readTime && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium bg-white/20 backdrop-blur-sm">
                      {activePost.readTime}
                    </span>
                  )}
                </div>
                <h1 id="modal-title" className="font-serif text-xl md:text-3xl lg:text-4xl text-white leading-tight font-medium">
                  {activePost.title}
                </h1>
              </div>
            </div>

            {/* Conteúdo Principal do Modal */}
            <div className="p-6 md:p-10">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Corpo do Texto */}
                <div className="lg:w-2/3 flex flex-col gap-6">
                  {activePost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="font-sans text-sm text-brand-charcoal-light/95 leading-relaxed font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Sidebar Detalhada */}
                <div className="lg:w-1/3 flex flex-col gap-6 pt-6 lg:pt-0 lg:border-l border-brand-light-border lg:pl-10">
                  {/* Autor / Detalhes de Artigo */}
                  {activePost.type === 'article' && (
                    <div className="bg-brand-light-card border border-brand-light-border rounded-2xl p-6">
                      <h4 className="font-serif text-xs text-brand-charcoal-light/50 uppercase tracking-widest font-semibold mb-4 flex items-center gap-1.5">
                        <User size={12} className="text-brand-orange" />
                        Autor do Artigo
                      </h4>
                      <p className="font-serif text-base text-brand-charcoal font-medium">
                        {activePost.author}
                      </p>
                      <p className="font-sans text-xs text-brand-charcoal-light/70 font-light mt-1">
                        {activePost.role}
                      </p>
                    </div>
                  )}

                  {/* Objetivos Pedagógicos / Detalhes de Projeto */}
                  {activePost.type === 'project' && activePost.learningObjectives && (
                    <div className="bg-brand-light-card border border-brand-light-border rounded-2xl p-6">
                      <h4 className="font-serif text-xs text-brand-charcoal-light/50 uppercase tracking-widest font-semibold mb-4 flex items-center gap-1.5">
                        <Tag size={12} className="text-brand-orange" />
                        Objetivos de Aprendizado
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {activePost.learningObjectives.map((obj, i) => (
                          <li key={i} className="font-sans text-xs text-brand-charcoal-light/85 font-light leading-relaxed flex gap-2">
                            <span className="text-brand-orange font-bold">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Metadados Comuns */}
                  <div className="flex flex-col gap-3 font-sans text-xs font-light text-brand-charcoal-light/80">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-brand-orange shrink-0" />
                      <span>Publicado em: <strong>{activePost.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-brand-orange shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {activePost.tags.map((tag) => (
                          <span key={tag} className="bg-brand-light-border px-1.5 py-0.5 rounded text-[10px] text-brand-charcoal">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galeria de Imagens de Projetos */}
              {activePost.type === 'project' && activePost.gallery && activePost.gallery.length > 0 && (
                <div className="mt-12 pt-8 border-t border-brand-light-border">
                  <h3 className="font-serif text-lg text-brand-charcoal mb-6">Galeria de Fotos do Projeto</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePost.gallery.map((img, idx) => (
                      <div key={idx} className="h-48 rounded-2xl overflow-hidden bg-brand-light-border border border-brand-light-border">
                        <img
                          src={img}
                          alt={`${activePost.title} - Foto ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
