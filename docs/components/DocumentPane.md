# DocumentPane

A bula em leitura: superfície branca, seções numeradas, trechos ligados aos achados.

- Recebe `header` (DocumentHeader) e `toolbar` (busca, anterior/próximo achado, comparar) e rola o corpo.
- Texto em 16/1.7 até 68 caracteres: é leitura de trabalho, não de vitrine.
- Dentro, use DocSection, Highlight e GapMarker. O documento nunca é reescrito: só marcado.
