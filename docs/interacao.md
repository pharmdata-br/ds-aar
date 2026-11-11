# Interação documento ↔ análise

O documento e a análise são duas vistas do mesmo objeto. Tudo o que a análise afirma aponta para um trecho; todo trecho marcado leva ao que foi afirmado sobre ele. A costura é feita por um único identificador de achado, compartilhado por Highlight, GapMarker, FindingList, FindingPanel, DocumentCompare e as `refs` das mensagens.

## A costura em cinco regras

1. **Um achado, um número.** O número aparece no trecho (pílula `action` no Highlight), na lista, no painel e na conversa. É o mesmo em todo lugar e não muda durante a sessão.
2. **Selecionar de qualquer lado seleciona dos dois.** Clicar no Highlight abre o achado; clicar no achado rola o documento até o trecho, ativa o Highlight e marca a seção na BulaSectionNav. Um achado ativo por vez.
3. **Passar o mouse acende o par.** Hover num item da lista põe o trecho em `mist`; hover no trecho põe o item em `ground`. Sem rolagem no hover: só na seleção.
4. **Ausência também tem lugar.** O que falta em relação à referência vira GapMarker no ponto onde deveria estar, com número e estado `ausente`.
5. **O texto nunca é reescrito.** O documento só recebe marcas. Propostas de texto aparecem no achado e no DocumentCompare, com DiffText, e só viram parecer depois de aprovadas.

## Estados de um trecho marcado

| Estado | Aparência | Quando |
| --- | --- | --- |
| Repouso | sublinhado 2px na cor do estado + número | achado aberto, não selecionado |
| Hover / foco | fundo `mist` | mouse ou Tab sobre o trecho ou sobre o item da lista |
| Ativo | fundo `-soft` do estado + contorno `action` | achado aberto no painel |
| Resolvido | sublinhado pontilhado `line-pending` | aprovado ou descartado; o texto volta a ser só leitura |

## Do documento para a análise

- **Seleção livre.** Selecionar qualquer trecho abre a SelectionToolbar: Perguntar ao AAR, Marcar achado, Comentar, Ver na referência.
- **Perguntar** leva o trecho como pílula de contexto para o Composer, junto com a seção.
- **Marcar achado** cria um achado `revisar` com o trecho já ancorado; o analista escreve a conclusão.
- **Comentar** abre um CommentThread preso ao trecho, visível para a equipe.
- **Ver na referência** liga o modo comparação já rolado para a linha correspondente.

## Da análise para o documento

- "Ir para o trecho →" no FindingPanel e as `refs` das mensagens dos agentes rolam e ativam o trecho.
- O DecisionPrompt tem sempre "Ver trechos": destaca no documento tudo o que a decisão afeta.
- Filtrar achados (SegmentedControl) esmaece os trechos fora do filtro sem removê-los.

## Modos da bancada

- **Leitura:** DocumentPane no centro, achados à direita.
- **Comparação:** DocumentCompare no centro, alinhado por trecho; a linha ativa segue o achado selecionado. Rolagem única para os dois lados.
- **Conversa:** a aba Conversa na direita; as respostas dos agentes trazem `refs` para o documento.

## Teclado

| Tecla | Ação |
| --- | --- |
| J / K | próximo / achado anterior (rola e ativa) |
| ] / [ | próxima / seção anterior |
| Enter | abre o achado do trecho em foco |
| A / D / E | aprovar / descartar / editar o achado ativo (com confirmação) |
| C | alterna o modo comparação |
| / | foca a busca no documento |
| Esc | fecha a barra de seleção e limpa a seleção |

## Decisão

Todo achado passa por três estados de proposta: **aguardando revisão** → **aprovado e registrado** ou **descartado**. A decisão registra quem, quando e por quê (TextField multiline). Só achados aprovados entram no parecer exportado.

## Movimento

Transições de 150–250ms, só como consequência de uma ação (rolagem até o trecho, troca de estado). O ponto `analise` respira enquanto uma seção está sendo lida. Em `prefers-reduced-motion`, a rolagem é instantânea e nada pulsa.
