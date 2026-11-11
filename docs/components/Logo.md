# Logo

A marca do AAR: o símbolo Trecho marcado com o nome em Inter Tight 800, desenhada em código para usar a fonte e o tema da página.

- `variant="lockup"` (padrão): símbolo à esquerda, nome à direita. `stacked` empilha; `symbol` mostra só o símbolo.
- `size`: `sm` (símbolo 28, nome 20) na barra da bancada; `md` (40 / 28) em cabeçalhos de documento e parecer; `lg` (72 / 64) em telas vazias e capas.
- `descriptor` acrescenta "Ambiente de Análise Regulatória" sob o nome. Use na primeira aparição de uma página ou documento; na bancada, não.
- `tone="mono"` para uma cor só (impressão, carimbo): o quadrado em `currentColor` e as linhas vazadas.
- O símbolo é sempre o quadrado azul `#2456E6` com as linhas em `#9DBBF5` e o trecho em branco, nos dois temas. Ele não muda com o tema; o nome muda (`ink`).
- Abaixo de 20 px o símbolo troca sozinho para o desenho de 16 px: sem o ponto, linhas mais grossas.
- Respiro mínimo em volta igual a um oitavo do símbolo (8 px num símbolo de 64). Nunca sobre foto ou gradiente, nunca recolorido, nunca com sombra.
- Fora do React (favicon, e-mail, PDF), use os SVG do grupo de assets Logos.
