# Highlight

O trecho da bula ligado a um achado: a costura entre documento e análise.

- Repouso: sublinhado de 2px na cor do estado, número do achado em pílula `action`.
- `hover` (vindo da lista de achados) e foco de teclado: fundo `mist`.
- `active` (achado aberto): fundo `-soft` do estado e contorno `action`. Um ativo por vez.
- `resolved` (decidido): sublinhado pontilhado neutro, para o texto voltar a ser lido.
- Clicar, Enter ou Espaço selecionam o achado (`onSelect`); `onHover` sincroniza com a lista.
