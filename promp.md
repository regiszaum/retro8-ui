Quero que você crie um projeto completo de uma biblioteca de UI chamada "retro8-ui".

Objetivo:
Construir uma library de componentes visuais retro 8-bit, feita com HTML + CSS e usando Tailwind CSS como base de authoring, mas que seja agnóstica de framework, para poder ser usada em qualquer projeto: HTML puro, Vue, Nuxt, React, Next, Astro, Laravel etc.

Requisitos principais:
- NÃO criar componentes acoplados a Vue, React ou qualquer framework.
- A API pública da library deve ser baseada em classes CSS semânticas, por exemplo:
  - r8-btn
  - r8-btn--primary
  - r8-input
  - r8-panel
  - r8-window
  - r8-badge
- O projeto deve ser escrito com Tailwind, mas o consumidor final não deve depender de escrever utility classes enormes no HTML.
- A library deve gerar um CSS compilado final em /dist, pronto para ser importado em qualquer projeto.
- Pode existir um plugin opcional para Tailwind, mas ele deve ser complementar. O principal produto da library é o CSS compilado + padrões de HTML.

Quero uma arquitetura limpa, escalável e profissional.

Stack desejada:
- Node.js
- Tailwind CSS
- PostCSS
- Autoprefixer
- Ferramenta de build simples e estável
- Pode usar Vite apenas como playground/documentação local, mas não para acoplar a library a framework
- CSS organizado em camadas
- Sem dependência de UI framework

Direção visual:
A estética deve ser fortemente inspirada em interfaces retro 8-bit / pixel art:
- bordas grossas
- sombras duras
- pouco ou nenhum border-radius
- sem blur/glassmorphism
- contraste forte
- paleta limitada
- estados de hover/active com deslocamento visual de 1px a 3px
- sensação de “game UI”
- tipografia com fallback legível; se usar fonte pixelada, manter fallback seguro
- visual consistente e reutilizável

Quero que o sistema de design tenha tokens bem definidos, como:
- cores
- spacing
- espessura de borda
- tamanhos de sombra
- tipografia
- estados interativos

Entregáveis do projeto:
1. Estrutura completa de pastas
2. package.json com scripts úteis
3. Configuração do Tailwind
4. Configuração de build para gerar /dist/retro8.css e /dist/retro8.min.css
5. Arquivos CSS organizados por componente
6. Um README.md bem escrito explicando:
   - objetivo da library
   - como instalar
   - como buildar
   - como usar em qualquer framework
   - exemplos de HTML
   - convenção de nomenclatura
7. Uma pasta de exemplos em HTML puro
8. Um playground local para visualizar os componentes
9. Uma base de documentação inicial simples e clara

Componentes da primeira versão:
- Button
- Input
- Panel / Card
- Window
- Badge
- Dialog
- Divider
- Tabs visuais
- Progress bar
- Navbar simples retro

Regras de implementação:
- Use Tailwind para compor os estilos, preferencialmente com @layer components, @layer utilities e @apply quando fizer sentido
- Evite expor utility classes longas como API principal
- Priorize classes semânticas
- Organize variantes de forma previsível
- Pensar em v1 simples, sólida e fácil de expandir
- Garantir acessibilidade básica:
  - foco visível
  - contraste razoável
  - disabled state
  - estrutura semântica quando aplicável
- Não inventar JavaScript desnecessário para a v1
- Dialog e tabs podem ter apenas estrutura visual inicialmente, com documentação explicando o HTML esperado
- O CSS final precisa funcionar sem depender de runtime JS

Nomenclatura:
- Prefixo padrão: r8-
- Exemplos:
  - r8-btn
  - r8-btn--danger
  - r8-window__titlebar
  - r8-window__body
  - r8-badge--success

Quero que você:
1. Proponha a melhor estrutura do projeto
2. Gere todos os arquivos iniciais
3. Implemente os componentes-base
4. Crie exemplos reais de uso em HTML
5. Escreva um README decente
6. Garanta que o projeto rode localmente e que o build funcione
7. Explique rapidamente as decisões arquiteturais no final

Critérios de qualidade:
- código limpo
- nomes consistentes
- fácil manutenção
- fácil publicação futura no npm
- framework-agnostic de verdade
- visual retro forte, mas utilizável
- base boa para evoluir no futuro

Importante:
Se houver alguma decisão ambígua, escolha a opção mais simples, robusta e escalável.
Não quero um projeto experimental confuso.
Quero uma fundação sólida e bonita.

Comece criando a estrutura do projeto e implementando a primeira versão funcional.