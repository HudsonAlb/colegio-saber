# Status do Projeto & Planejamento de Expansão — Colégio Saber

Este documento apresenta o estado atualizado do desenvolvimento do site do **Colégio Saber** e define a estratégia para as novas frentes de expansão, focando agora na otimização e enriquecimento da Página de Início.

---

## 🚀 O Que Foi Feito Até Agora

Construímos um site institucional de alta fidelidade que combina a tradição educacional com a inovação digital, garantindo navegação fluida, interações imersivas e acessibilidade universal.

### 1. Arquitetura, SEO & Performance
- **Stack Moderna**: Configuração do Vite + React + TypeScript + Tailwind CSS para compilações ultra-rápidas e tipagem segura.
- **SEO Otimizado**: Meta-tags, indexação, e estruturas semânticas configuradas em português para favorecer o ranqueamento nos motores de busca.
- **Scroll e Transições**: Navegação integrada com Lenis (rolagem física suave) e transições de página fluidas coordenadas com GSAP.

### 2. Acessibilidade WCAG & Controles Visuais
- **Barra de Acessibilidade Superior ([AccessibilityBar.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/AccessibilityBar.tsx))**:
  - Atalho de teclado rápido (`Alt + 1`) para saltar a navegação e focar diretamente no conteúdo principal (`<main id="main-content">`).
  - Redimensionamento proporcional de fonte raiz (`A+`, `A-`, `A` de 100% até 150%) com persistência local no `localStorage`.
  - Modo de Alto Contraste dinâmico que altera as variáveis globais de CSS para fundo preto (`#000000`), textos brancos (`#ffffff`) e realces/focos em amarelo neon (`#ffff00`).
- **Estados de Foco Universais ([index.css](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/index.css))**: Destaque visível em amarelo neon para qualquer elemento interativo focado por teclado.
- **Estrutura de Cabeçalhos**: Alinhamento de todos os títulos principais das páginas para o uso correto de um único `<h1>` por página.

### 3. Ajustes de Layout Responsivo & Correções de Bugs ([App.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/App.tsx))
- **Fim da Sobreposição Header/Barra**: Agrupamos a barra de acessibilidade e o cabeçalho em um wrapper fixo com empilhamento de coluna flexível. O cabeçalho foi alterado para fluxo relativo, evitando que eles ocupem o mesmo espaço.
- **Fundo Laranja Sólido Inicial**: Aplicamos um fundo laranja sólido (`bg-brand-orange-dark`) no cabeçalho no estado inicial (topo da página), proporcionando contraste absoluto e 100% de leitura para os links brancos e amarelos.
- **Alternância Dinâmica de Cores**: Configuramos os links, botões e logotipo para transicionar de branco/amarelo (sobre a barra laranja inicial) para cinza-escuro/laranja-escuro (sobre a barra branca no scroll ou menu aberto).
- **Conserto de Breakpoints & Wrapping**:
  - Mudamos o limite da navegação desktop do header para `lg` (1024px), prevenindo que os links se choquem no tablet.
  - Adicionamos `shrink-0` e `whitespace-nowrap` no logo e no botão CTA "Agendar Visita" para travar o layout e impedir que o texto do CTA quebre em duas linhas.
  - Implementamos margens de segurança e tamanhos de fonte fluidos.

### 4. Novo Background do Hero & Contraste ([Hero.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/Hero.tsx))
- **Asset Fotorrealista**: Geramos e integramos uma imagem fotorrealista de alta definição de uma criança estudando, vestindo um uniforme escolar branco com detalhes em amarelo e laranja.
- **Contraste Aprimorado**: Otimizamos os gradientes brancos de overlay (`via-brand-light/45` e radial `to-brand-light/45`) para projetar uma máscara clara sob as letras. Ajustamos o termo "SABER" para `brand-orange-dark` e o subtítulo do Hero para `font-normal` e `text-brand-charcoal/90` para excelente contraste de leitura.

### 5. Formulário de Matrícula Interativo ([AdmissaoPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/AdmissaoPage.tsx))
- **Fluxo em 4 Passos**: Identificação dos pais/estudante, agendamento de avaliações, upload de documentação preliminar e confirmação de dados.
- **Acessibilidade WCAG**: Mensagens de erro com `role="alert"`, seletores de datas acessíveis via teclado, área drag-and-drop navegável por teclado, `role="progressbar"` no upload e geração de PDF via `jspdf`.
- **Toast Reposicionado**: Mudamos o Toast de sucesso do formulário para `fixed bottom-8 left-8` (canto inferior esquerdo), impedindo que ele sobreponha o WhatsApp.

### 6. Simplificação do WhatsApp ([WhatsappButton.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/WhatsappButton.tsx))
- **Design Minimalista**: Removemos o balão automático de texto e o efeito pulsar (ping) de ondulação no contorno do botão para um visual limpo e refinado.
- **Vetor Premium**: Atualizamos o ícone do WhatsApp para o modelo pixel-perfect oficial do Simple Icons.

### 7. Segmentos de Ensino Interativos ([SegmentosPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/SegmentosPage.tsx))
- **Layout Split Screen**: Apresentação envolvente das etapas pedagógicas da escola (Infantil ao Ensino Médio) com fotos geradas por IA.
- **GSAP**: Transições com efeitos de revelação vertical de imagem.
- **Acessibilidade**: Controle de abas verticais via setas direcionais do teclado (`ArrowUp`/`ArrowDown`) e suporte à tecla `Escape` para fechar modais.

### 8. Tour Virtual 360° ([TourVirtual.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/TourVirtual.tsx))
- **Visualizador Panorâmico**: Arraste por mouse ou touch com inércia física, hotspots de informação e efeito de auto-pan. Teclas direcionais e `Escape` integrados.

### 9. FAQ & Calendário Escolar ([FaqSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/FaqSection.tsx) & [CalendarioPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/CalendarioPage.tsx))
- **FAQ**: Acordeão dinâmico na rota `/matriculas`.
- **Calendário**: Grade mensal, timeline de compromissos, filtros rápidos de eventos, download de iCalendar (`.ics`) e simulador animado de conexão Google Calendar.

### 10. Apresentação de Destaques Pedagógicos ([HighlightsSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/HighlightsSection.tsx))
- **Grid Interativo de Destaques**: Seção de destaques (Tecnologia & Robótica, Bilinguismo Prático, Acompanhamento Único) posicionada logo após o Hero na página principal.
- **Animações GSAP**: Efeito hover enriquecido (zoom de imagem, rotação de ícones, alteração de opacidade de máscara de cor e revelação de lista de benefícios com slide/fade) e acessibilidade de foco via teclado completa.

### 11. Mural de Conquistas & Aprovações ([StatsSection.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/components/StatsSection.tsx))
- **Contadores Progressivos**: Seção contendo dados chave (85+ Anos de Tradição, 100% Aprovação Nacional, 12k+ Líderes Formados) com animações de contagem progressiva e suavização via GSAP ScrollTrigger, ativadas ao rolar a página.

### 12. Blog Pedagógico "Saber em Ação" ([BlogPage.tsx](file:///c:/Users/Hudson/BlackDog/colegio-saber/src/pages/BlogPage.tsx))
- **Filtros e Busca**: Abas dinâmicas para alternar entre Artigos Pedagógicos e Projetos dos Alunos, com barra de busca por texto e tags.
- **Modal de Leitura Acessível**: Modal interativo com suporte a teclado (`Escape`) que apresenta o artigo na íntegra ou a ficha técnica e objetivos de aprendizagem do projeto.
- **Galeria de Projetos**: Amostragem visual premium das fotos dos projetos de alunos com imagens de alta fidelidade integradas.
- **Roteamento Global**: Link integrado ao Header principal, Menu Mobile e Footer institucional.

---

## 🗺️ Planejamento de Futuros Passos (Foco na Página de Início)

### 🌟 Fase Atual: Enriquecimento & Animações da Página de Início (Curto Prazo)

1. **Seção de Depoimentos Premium (Carrossel Interativo)**:
   - Implementar um carrossel horizontal contínuo com depoimentos reais de pais e responsáveis, com efeitos de fade-in e controle de rolagem por toque e setas.

2. **GSAP ScrollTrigger Reveal**:
   - Injetar animações de revelação suave (fade-in, slide e zoom controlado) à medida que o usuário rola pelas seções da página inicial, reforçando o caráter dinâmico e premium.

---

### 🎨 Fase 2: Polimento Visual, Blog & Dashboards (Médio a Longo Prazo)

1. **Dashboard Acadêmico Estilizado (Portal do Responsável)**: Painel simulado com controle de notas, boletim em formato de gráficos SVG interativos, faltas e cardápios.
2. **Internacionalização (Multi-idiomas)**: Tradução do site para Inglês e Espanhol.
3. **Integração com CRM**: Envio automático de leads captados no formulário de Admissão.

---

### 🧠 Fase 3: Experiência Imersiva, IA & Interatividade (Longo Prazo)

1. **Assistente de IA Pedagógica (Chatbot Conversacional)**:
   - Chatbot inteligente integrado para responder dúvidas frequentes sobre admissão, grade curricular e infraestrutura em tempo real.
2. **Tour Virtual 360° em Realidade Virtual (WebVR)**:
   - Suporte a giroscópio para navegação em dispositivos móveis e integração de áudio-guia descritivo por ambiente.
3. **Provador Virtual de Uniformes**:
   - Simulador 3D interativo ou via canvas permitindo a visualização tridimensional dos uniformes escolares da instituição.

---

### 🔒 Fase 4: Otimização, PWA & Assinatura Digital (Futuro Estratégico)

1. **Contrato de Matrícula com Assinatura Eletrônica**:
   - Integração com provedores de assinatura digital (como DocuSign ou Clicksign) para a conclusão 100% digital do fluxo de admissão.
2. **Suporte a PWA (Progressive Web App)**:
   - Configuração de Manifesto e Service Workers para permitir a instalação do site como aplicativo nativo e envio de notificações push.
3. **Otimização Extrema de Mídia (AVIF/WebP & CDN)**:
   - Pipeline de compressão automatizada de imagens e entrega rápida via rede de distribuição de conteúdo (CDN).
