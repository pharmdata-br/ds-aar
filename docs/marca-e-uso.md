# AAR

Ambiente de Análise Regulatória. O AAR lê bulas profissionais e documentos regulatórios da Anvisa contra a referência e a norma, seção por seção, e mostra o caminho de cada conclusão. Agentes fazem o trabalho repetitivo; o analista decide.

Este sistema nasce dos três primeiros estudos do canvas aleph-ds: **Anatomia do estilo** (o que faz um design respirar), **Padrões de interação** (sala de agentes, sessão em etapas, antes e depois) e **Centro de informação de medicamentos** (anatomia de uma resposta, pergunta estruturada, capacitação). Deles vem a linguagem clara e azul, com tipografia que afirma e itálico que sente. O aleph seguiu outro caminho (escuro, Turmalina); o AAR fica com este.

## Posicionamento

O AAR não carimba bulas. Mostra o que a bula diz, o que a referência diz, onde divergem e o que precisa de olho humano. A análise termina quando o analista tem o suficiente para decidir, não quando o sistema simula certeza.

Personalidade: calma, rigorosa, explícita. Calma não é vazio: é foco.

## Conteúdo e voz

- **O analista é o especialista.** Escreva para quem revisa bula todo dia: farmacêuticos regulatórios, assuntos regulatórios, qualidade. Nomeie a seção e o ato ("Revisar posologia"), não a mecânica da tela.
- **Português do Brasil, frases curtas, segunda pessoa.** Uma ideia por frase. Pares e trios dão ritmo: "Mais rigor. Menos retrabalho. Mais ciência."
- **Fonte antes de afirmação.** Todo achado mostra de onde veio: bula de referência, norma, compêndio. Nunca declare conformidade sem fonte.
- **Como chegou, como fica.** Mostre o texto original ao lado da leitura estruturada. Nada de resumo no lugar do trecho.
- **Divergência é informação.** Diga em texto ("O texto diverge da referência"), não suavize.
- **Avisos honestos.** "Exemplo ilustrativo." "Sugestões marcadas para revisão não são gravadas sem aprovação."
- **A decisão é do analista.** "O AAR apoia a análise; a decisão regulatória continua sendo sua."

| Em vez de | Escreva |
| --- | --- |
| "Não conforme." | "O texto diverge da bula de referência em 8. Posologia: falta o ajuste para TFGe < 30." |
| "Processando…" | "Consulta às fontes · em andamento" |
| "Clique aqui" | "Revisar posologia →" |
| "Erro na seção 5" | "5. Advertências e precauções · revisar: dois parágrafos sem correspondente na referência." |

Botões levam verbo e direção: → avança na análise, ↗ abre algo fora dela.

## Cor

Um azul só, muito ar (tokens `ground`, `surface`, `mist`, `action`, `ink`, `ink-soft`). A calma vem da ausência de cores concorrentes.

- **`ground`** é o fundo da página, tingido de azul, nunca branco puro. **`surface`** (branco) é onde mora o que se lê: a bula, o achado, o painel. Toda `surface` tem borda `line`.
- **`action`** é o único azul de ação: botão primário, rótulo-capítulo, numeração 01/02/03, a palavra em itálico do título, a borda do que pede decisão. Fora disso, não aparece.
- **`mist`** com texto `action-deep` é a etiqueta: vocabulário (EDQM, MedDRA), fonte, passo atual da sessão.
- **`inverse`** é o bloco escuro que fecha uma seção ou marca a mensagem do usuário. Um por seção. Sobre ele, `on-inverse`, `on-inverse-soft` e `on-inverse-accent`.
- **Estados da análise.** `positive` (Conforme), `warning` (Revisar), `negative` (Divergente), cada um com seu `-soft` de fundo. Ausente usa neutros e borda tracejada `line-pending`. Estado sempre com ícone e rótulo; Conforme e Divergente têm luminância parecida, então a forma (✓, !, ≠, ∅) carrega a diferença.
- **Tema escuro.** Mesmos papéis: `ground` vira a tinta, `action` clareia para o azul de ênfase. O `inverse` se inverte e continua sendo o bloco de fecho.

## Tipografia

**Inter Tight** (400–800) para títulos e corpo, **Instrument Serif itálico** só para ênfase, ambas do Google Fonts. Código e identificadores em monoespaçada do sistema.

- **Negrito que afirma, itálico que sente.** Títulos grandes, 700, entrelinha apertada (`display-xl`, `heading-1`, `heading-2`). Uma ou duas palavras trocam para itálico serifado (`emphasis`) no mesmo tamanho, em `action` quando é a promessa da tela. Use `<em>` e o bundle.css cuida da troca.
- **Rótulo antes do título.** `label` (13, 600, +0.18em, caixa alta) nomeia o capítulo: "02 · Posologia". Em `action` quando abre seção, em `ink-soft` quando nomeia contexto.
- **Corpo em `ink-soft`.** `body` (17/1.55) explica; `body-sm` (15) para mensagens e listas. Texto corrido até ~65 caracteres.
- **`code`** para registro, número de norma, códigos de vocabulário e o contador "02 / 04".

## Respiro e layout

- Página de 1440 com margem lateral `space-120` e `space-96` no topo. Entre seções, `space-112`: é o respiro.
- Cada seção tem uma ideia: rótulo, título, uma frase à direita alinhada pela base, e o conteúdo.
- Ritmo da página: promessa, como, prova, decisão, convite. Termine repetindo o convite.
- Bancada de análise em três colunas: **as seções da bula** à esquerda, **o documento** sobre `ground` no centro, **a análise** (achados, conversa, decisão) à direita. Documento e análise estão sempre ligados (ver Interação documento ↔ análise).
- No máximo quatro escolhas por ponto de decisão; no máximo três etiquetas visíveis por achado, o resto atrás de "ver fontes".
- Geometria macia: controles e etiquetas em pílula (`radius-pill`), cartões `radius-lg`, painel principal `radius-xl`, mensagem com o canto `radius-bubble` apontando para quem fala.
- Sombra só no painel que é a prova da página (`shadow-panel`), um por tela.

## Padrões de interação

- **Sala de agentes.** Até três agentes por tarefa, cada um com papel (Leitor de bula, Comparador de referência, Revisor regulatório), iniciais num disco e uma linha do que faz. Eles falam na conversa com a fonte embaixo.
- **Sessão em etapas.** 01 Entrada recebida, 02 Consulta às fontes, 03 Divergências, 04 Proposta para aprovar. O passo atual fica em `mist` com "em andamento".
- **Antes e depois.** O trecho como chegou (borda tracejada, monoespaçada) ao lado do registro estruturado (borda `action`).
- **Pede decisão.** O que precisa do analista ganha borda `action` de 1.5px e dois botões: confirmar e ver.
- **Anatomia de um achado.** Conclusão, por quê, considere também, fontes por nível. Ao lado, "como chegamos aqui" em passos numerados.
- **Pergunta estruturada.** Antes de analisar, o AAR completa o contexto: produto, versão da bula, referência, o que se quer saber.
- **Capacitação.** Cada análise pode deixar uma microaula ("Quando a bula de referência basta e quando ir à norma").

## Marca

O símbolo é o **Trecho marcado**: três linhas de texto num quadrado azul, a do meio acesa como o trecho que a análise marcou, e um ponto como o número do achado. É o gesto central do produto.

- **Símbolo:** quadrado 64 com canto 16 em `#2456E6` (o `action` claro), linhas em `#9DBBF5`, trecho e ponto em branco. Igual nos dois temas.
- **Assinatura:** símbolo + "AAR" em Inter Tight 800, entrelinha .85, espaçamento −0.045em, em `ink`. Componente Logo; tamanhos `sm` (bancada), `md` (cabeçalhos, parecer), `lg` (telas vazias).
- **Descritor:** "Ambiente de Análise Regulatória" em Inter Tight 500, `ink-soft`, na primeira aparição. Em texto corrido: "AAR, Ambiente de Análise Regulatória" na primeira menção, depois só AAR.
- **16 px:** desenho próprio, sem o ponto e com linhas mais grossas (`aar-simbolo-16.svg`; o componente troca sozinho abaixo de 20 px).
- **Uma cor:** `aar-simbolo-mono.svg`, linhas vazadas.
- **Respiro:** um oitavo do símbolo em volta. Nunca sobre foto ou gradiente, nunca recolorido, nunca com sombra, nunca no meio de uma frase.
- Os SVG estão no grupo de assets Logos.

## Iconografia

Traço linear de 2px em `currentColor`, grade de 24, pontas arredondadas, só onde o ícone diz algo: check (conforme), ! (revisar), ≠ (divergente), ∅ (ausente), + (expandir), i (aviso). Setas são texto: → e ↗. Avatares de agente são iniciais num disco, nunca ilustração.

## Componentes

38 componentes React (namespace `AAR`, compatíveis com React 18 e 19), em dez grupos:

- **Marca:** Logo (e Symbol, o símbolo isolado).
- **Ações:** Button, IconButton, Icon.
- **Rótulos:** Tag, StatusTag.
- **Tipografia:** SectionHeading.
- **Navegação:** Tabs, SegmentedControl, Breadcrumb, BulaSectionNav.
- **Formulários:** TextField, SearchField, Checkbox.
- **Documento:** DocumentHeader, DocumentPane, DocSection, Highlight, GapMarker, SelectionToolbar, DiffText, DocumentCompare.
- **Análise:** FindingList, FindingPanel, SourceList, BeforeAfter, AnalysisProgress.
- **Agentes:** AgentRoster, AgentMessage, UserMessage, DecisionPrompt, Composer, SessionSteps.
- **Página e bancada:** StepCards, CommentThread, Notice, EmptyState, Workbench.

Props em `components/index.d.ts`; regras no README de cada um. As classes usam o prefixo `aar-` e só tokens (`var(--action)`), nunca valores literais. Como documento e análise se ligam está na seção **Interação documento ↔ análise**; como isso vira código, em **Stack e implementação**.

## Faça

- Concentre o azul na ação, no capítulo e no que pede decisão.
- Mostre a fonte junto do achado e o trecho original junto da leitura estruturada.
- Nomeie conformidade, divergência e ausência em texto, com ícone.
- Use espaço, escala e itálico antes de cor ou contêiner.
- Garanta foco visível, teclado e contraste AA nos dois temas.

## Não faça

- Parecer painel de BI, sistema de alertas ou carimbo automático.
- Segundo acento, gradiente, emoji, cartão com borda lateral colorida.
- Estado só por cor.
- Logo, personagens e textos de marca do Oratry: o método é a inspiração, não os ativos.
- Apresentar sugestão como análise concluída.
