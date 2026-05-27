# Regras do Projeto

- **Regra Principal**: Toda animação usa **Lenis** no scroll e **GSAP** no movimento.
- **Animações Cinematográficas**: Devem ser lentas por intenção. Qualquer animação que entrar ou sair em menos de 0.6 segundos deve ter sua duração aumentada.
- **Transições e Eases**: Todo ease de movimento deve usar `power3` (ex: `power3.out`, `power3.inOut`) ou `expo` (ex: `expo.out`, `expo.inOut`). Outros eases como linear ou bounce devem ser evitados para manter a estética cinematográfica.
- **Compatibilidade Mobile**: O scroll suave com Lenis e as animações GSAP não devem conflitar. Evitar pulos e travamentos em dispositivos móveis sincronizando o Lenis com o ScrollTrigger e utilizando técnicas para evitar saltos causados pela barra de endereço dinâmica do navegador.
