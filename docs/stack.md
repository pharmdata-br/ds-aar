# Stack e implementação

Alvo: **Next.js (App Router) com React 19 e TypeScript**, banco **PostgreSQL nativo**, publicação provável na **AWS**. Esta seção diz como o sistema vira código; não substitui a decisão de arquitetura.

## Tokens e fontes

- O `tokens.css` gerado por este sistema vai para `app/styles/tokens.css`, importado em `app/layout.tsx` junto com `components/bundle.css` (ou sua versão em CSS Modules).
- O tema claro é o padrão (`:root`); o escuro entra com `data-theme="dark"` no `<html>`. Grave a preferência num cookie (`aar.theme`) e escreva o atributo no servidor, no layout raiz, para não piscar.
- Fontes por `next/font/google`: Inter Tight (400–800) como `--font-sans` e Instrument Serif itálico como `--font-serif`. Componentes sempre por `var(--…)`, nunca por valor literal.

## Componentes

- Os componentes deste sistema são a referência de comportamento e aparência. No app, viram arquivos `.tsx` em `components/aar/`, com as mesmas props de `components/index.d.ts` e as mesmas classes `aar-`.
- **Server Components:** DocumentHeader, DocSection (texto da bula), SourceList, StepCards, Notice, EmptyState, SectionHeading.
- **Client Components (`'use client'`):** Highlight, GapMarker, SelectionToolbar, DocumentCompare, BulaSectionNav, FindingList, FindingPanel (ações), Tabs, SegmentedControl, SearchField, Composer, DecisionPrompt, CommentThread, Workbench.
- O estado da costura (achado ativo, achado em hover, modo da bancada, filtro) vive num único contexto de cliente na bancada, e o achado ativo também na URL (`?f=12`), para que um link abra a análise já no trecho.

## Rotas

- `app/(bancada)/layout.tsx` monta a Workbench com `left`, `center` e `right` como slots.
- `app/(bancada)/analises/[id]/page.tsx` — leitura; `.../comparar/page.tsx` — comparação; `.../parecer/page.tsx` — parecer exportável.
- Server Actions para aprovar, descartar e editar achados e para comentários; streaming (Route Handler com SSE) para o progresso dos agentes e o ponto `analise`.

## PostgreSQL: o modelo que sustenta a costura

A âncora de um achado precisa sobreviver a uma nova versão da bula. Guarde dois seletores por trecho: posição (início e fim em caracteres no texto normalizado da versão) e citação (o trecho exato, mais alguns caracteres antes e depois). Se a posição não bater, a citação reencontra o trecho.

| Tabela | Papel |
| --- | --- |
| `documento` | produto, tipo (bula profissional, paciente), detentor, registro |
| `documento_versao` | versão, data de publicação, arquivo original, texto normalizado, hash |
| `secao` | versão, número, título, faixa de caracteres, estado da análise |
| `referencia` | qual versão de qual bula ou norma serve de comparação para uma análise |
| `analise` | versão analisada, referência, etapa atual, quem iniciou |
| `achado` | análise, número, seção, estado, conclusão, por quê, considere também, estado da proposta |
| `ancora` | achado, versão, `inicio`, `fim`, `citacao`, `prefixo`, `sufixo`, tipo (trecho ou lacuna) |
| `fonte` / `achado_fonte` | nível (referência, norma, compêndio, literatura), rótulo, identificador |
| `decisao` | achado, aprovado ou descartado, justificativa, quem, quando |
| `comentario` | âncora, autor, texto, resposta a |
| `mensagem` | análise, agente ou analista, texto, achados citados |

Notas: `jsonb` para o resultado bruto de cada agente; busca no documento com `tsvector` em português; o número do achado é único por análise. Decisões e comentários são só inseridos, nunca reescritos, para o histórico ficar auditável.

## AWS (provável)

- Next.js em contêiner (ECS com Fargate) ou no Amplify Hosting; a escolha depende de quanto do trabalho dos agentes roda no mesmo serviço.
- PostgreSQL gerenciado no Amazon RDS ou no Aurora PostgreSQL.
- PDFs e textos originais no S3, servidos por URL assinada; o banco guarda a chave e o hash.
- Trabalho longo dos agentes (leitura e comparação) fora da requisição, numa fila, publicando o progresso que a bancada mostra.
