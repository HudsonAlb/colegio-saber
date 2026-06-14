# Status do Projeto & Planejamento de Expansão — Colégio Saber

Este documento apresenta o estado atualizado do desenvolvimento do site do **Colégio Saber** e define a estratégia para as novas frentes de expansão.

---

## 🚀 O Que Foi Feito Até Agora

Construímos um site institucional de alta fidelidade que combina a tradição educacional com a inovação digital, agora atualizado com um **novo Design System Lúdico** que aproxima a estética da escola do público infantil e familiar com elegância e sofisticação.

### 1. Arquitetura, SEO & Performance
- **Stack Moderna**: Configuração do Vite + React + TypeScript + Tailwind CSS para compilações ultra-rápidas e tipagem segura.
- **SEO Otimizado**: Meta-tags, indexação, e estruturas semânticas configuradas em português para favorecer o ranqueamento nos motores de busca.
- **Scroll e Transições**: Navegação integrada com Lenis (rolagem física suave) e transições de página fluidas coordenadas com GSAP.

### 2. Novo Design System Lúdico & Refatoração de Layout
- **Tipografia e Cores Quentes ([index.css](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/index.css))**:
  - Transição de fontes clássicas/neutras para **Fredoka** (títulos dinâmicos e lúdicos) e **Quicksand** (corpo de texto confortável e amigável).
  - Paleta de cores pastéis aconchegantes: laranja-pêssego (`#ff7e1b`), amarelo (`#ffcb1e`), azul (`#4ea8de`), verde (`#66cc33`), rosa-coral (`#ff65a3`), fundo creme (`#fffcf7`) e marrom quente escuro (`#2d2a26`) para os textos, evitando tons frios e pretos puros.
- **Layout de Canvas Flutuante ([App.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/App.tsx))**:
  - Envelopamento do site em um contêiner "canvas" arredondado com borda espessa e sombra suave.
  - Fundo externo com ondas pastéis decorativas nos cantos e SVGs lúdicos (nuvens, sol, arco-íris, flores e estrelas) em posição absoluta.
  - Cabeçalho transformado em cápsula branca flutuante com sombra suave.
  - **Logotipo Recortado do Mockup**: O logotipo no navbar foi extraído diretamente da imagem conceitual através de cortes CSS precisos (`scale-[21] origin-[12.62%_11.82%]`), mostrando o ícone colorido da letra "G" com coroa e rostinho sorridente.
- **Hero Reimaginado ([Hero.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/Hero.tsx))**:
  - Título colorizado letra-por-letra com a paleta pastel e traços diagonais coloridos ao lado de "Colégio".
  - Imagem principal das crianças recortada em círculo com borda branca e sobreposta por vetores de sol, arco-íris e nuvens que se integram à moldura.

### 3. Modal Banner Promocional no Início do Site
- **Banner de Matrículas**: Pop-up interativo que carrega após 1,5 segundos da entrada inicial do usuário no site.
- **Persistência e UX**: Configurado com persistência em `sessionStorage` para evitar exibições repetitivas incômodas na mesma sessão.
- **Acessibilidade**: Suporte a fechamento rápido por tecla `Escape`, controle de foco, botões semânticos e identificação de diálogo para leitores de tela.

### 4. Acessibilidade WCAG & Controles Visuais
- **Barra de Acessibilidade Superior ([AccessibilityBar.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/AccessibilityBar.tsx))**:
  - Atalho de teclado rápido (`Alt + 1`) para saltar a navegação e focar diretamente no conteúdo principal (`<main id="main-content">`).
  - Redimensionamento proporcional de fonte raiz (`A+`, `A-`, `A` de 100% até 150%) com persistência local no `localStorage`.
  - Modo de Alto Contraste dinâmico que altera as variáveis globais de CSS para fundo preto (`#000000`), textos brancos (`#ffffff`) e realces/focos em amarelo neon (`#ffff00`).
- **Estados de Foco Universais ([index.css](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/index.css))**: Destaque visível em amarelo neon para qualquer elemento interativo focado por teclado.
- **Estrutura de Cabeçalhos**: Alinhamento de todos os títulos principais das páginas para o uso correto de um único `<h1>` por página.

### 5. Destaques Pedagógicos Lúdicos ([HighlightsSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/HighlightsSection.tsx))
- **Três Cartões Conceituais**: Substituição dos cartões antigos pelos cartões oficiais do mockup lúdico:
  1. **Educação Afetiva** (fundo pêssego `#fcd2af`): Ilustração SVG de família sob coração e subtítulo "Acolhimento e carinho".
  2. **Aprendizado Criativo** (fundo azul-pastel `#b9dcf4`): Ilustração SVG de paleta com pincel e subtítulo "Exploração e descoberta".
  3. **Ambiente Seguro** (fundo amarelo-pastel `#fae69e`): Ilustração SVG da escola com escorregador e subtítulo "Espaço projetado para o brincar".
- **Interatividade**: Transições suaves e responsividade completa.

### 6. Tour Virtual 360° ([TourVirtual.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/TourVirtual.tsx))
- **Visualizador Panorâmico**: Arraste por mouse ou touch com inércia física, hotspots de informação e efeito de auto-pan. Teclas direcionais e `Escape` integrados.

### 7. FAQ & Calendário Escolar ([FaqSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/FaqSection.tsx) & [CalendarioPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/CalendarioPage.tsx))
- **FAQ**: Acordeão dinâmico na rota `/matriculas`.
- **Calendário**: Grade mensal, timeline de compromissos, filtros rápidos de eventos, download de iCalendar (`.ics`) e simulador animado de conexão Google Calendar.

### 8. Blog Saber em Ação ([BlogPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/BlogPage.tsx))
- **Meta**: Tornar os elementos do blog lúdicos.
- **Mudanças**: Fundo creme `#fffcf7`, botões de filtro e pesquisa `rounded-full`, cartões de artigos com cantos arredondados `rounded-[2rem]`, modal de leitura atualizado com a tipografia Fredoka/Quicksand e cantos arredondados.

### 9. Formulário de Matrícula Digital ([AdmissaoPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/AdmissaoPage.tsx))
- **Meta**: Harmonizar a experiência de admissão interativa ao novo tema lúdico e seguro.
- **Mudanças**: Arredondamento de campos (`input`, `select`) com `rounded-2xl`, stepper colorido dinamicamente com cores de realce pastéis (laranja, azul e amarelo), botões de datas e horários em formato `rounded-full` com cores lúdicas quentes, área de Drag-and-Drop de arquivos remodelada com cantos super arredondados (`rounded-[2rem]`), preservando 100% da acessibilidade WCAG.

### 10. Seções Secundárias da Home & Rodapé
- **Meta**: Harmonizar todos os elementos secundários ao novo tema visual.
- **Mudanças**: Cartões e contadores em [StatsSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/StatsSection.tsx) e depoimentos em [TestimonialsSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/TestimonialsSection.tsx) atualizados com bordas super arredondadas (`rounded-[2rem]`) e fontes em pesos apropriados (Fredoka Bold / Quicksand Semibold). O layout do `Footer` em [App.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/App.tsx) foi adaptado para usar o marrom quente (`text-brand-charcoal/80`) no texto, cabeçalhos em negrito e botões redondos lúdicos no campo da newsletter.

### 11. Modularização de Código & Cabeçalho Fixo (Clean-up)
- **Meta**: Eliminar redundâncias estruturais e garantir comportamento fixado/sticky real para a navegação.
- **Mudanças**: Extração de `HomePage`, `HistoriaPage` e `PilaresPage` de dentro de [App.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/App.tsx) para arquivos dedicados em `src/pages/`. Todas as dependências e componentes não utilizados foram removidos do arquivo principal. O contêiner da cápsula do cabeçalho foi alterado para posicionamento `fixed`, mantendo-se no topo da tela durante a rolagem.

---

## 🛠️ Refatorações e Ajustes em Andamento (Harmonização de Design)

*(Todos os componentes e páginas principais foram refatorados, modularizados e harmonizados com sucesso)*

---

## 🗺️ Planejamento de Futuros Passos

### 🌟 Fase Atual: Portal Acadêmico, Tradução & Integrações (Curto a Médio Prazo)
1. **Dashboard Acadêmico Estilizado (Portal do Responsável)**:
   - Área logada simulada com boletim em gráficos SVG interativos, frequência e cardápio escolar.
2. **Internacionalização (Multi-idiomas)**:
   - Tradução completa da interface para Inglês e Espanhol.
3. **Integração com CRM**:
   - Simulação de disparo de leads captados no formulário de Admissão.

### 🧠 Fase 2: Experiência Imersiva, IA & Interatividade (Médio a Longo Prazo)
1. **Assistente de IA Pedagógica (Chatbot Conversacional)**.
2. **Tour Virtual 360° em Realidade Virtual (WebVR)**.
3. **Provador Virtual de Uniformes (Canvas 3D)**.

### 🔒 Fase 3: Otimização, PWA & Assinatura Digital (Futuro Estratégico)
1. **Contrato de Matrícula com Assinatura Eletrônica**.
2. **Suporte a PWA (Progressive Web App)**.
3. **Otimização Extrema de Mídia (AVIF/WebP & CDN)**.
