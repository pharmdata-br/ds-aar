# ds-aar

Design system do **AAR, Ambiente de Análise Regulatória**: tokens, componentes React e marca para o app de análise de bulas profissionais da Anvisa.

A fonte de verdade visual continua sendo o design system **AAR** no claude.ai. Este repositório é a versão que o app consome: os mesmos tokens, as mesmas classes `aar-` e os mesmos componentes, agora em TypeScript para Next.js.

## O que tem aqui

```
src/
  tokens/tokens.json     fonte dos tokens (cores em claro e escuro, tipografia, espaço, raio, sombra)
  tokens/tokens.css      gerado: variáveis CSS e classes .text-*   (npm run tokens)
  tokens/tokens.ts       gerado: os mesmos valores em TypeScript
  styles/components.css  estilos dos componentes, só por tokens
  styles.css             importa os dois acima; é o que o app importa
  components/            38 componentes em .tsx
  fonts.ts               Inter Tight e Instrument Serif via next/font
  index.ts               exporta tudo
assets/logos/            símbolo Trecho marcado em SVG (64, 16 px e uma cor)
docs/                    brand book, interação documento ↔ análise, stack e um guia por componente
examples/Bancada.tsx     a bancada completa, com a costura ligada
scripts/                 geração de tokens e checagem de renderização
```

## Usar num app Next.js

Enquanto o pacote não estiver num registro, instale direto do GitHub ou como workspace:

```bash
npm install github:pharmdata-br/ds-aar
```

```js
// next.config.mjs
export default { transpilePackages: ['@pharmdata/aar-ds'] };
```

```tsx
// app/layout.tsx
import '@pharmdata/aar-ds/styles.css';
import { aarFonts } from '@pharmdata/aar-ds/fonts';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tema = (await cookies()).get('aar.theme')?.value === 'dark' ? 'dark' : 'light';
  return (
    <html lang="pt-BR" className={aarFonts} data-theme={tema}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
import { Logo, Button, FindingPanel } from '@pharmdata/aar-ds';
```

O tema claro é o padrão; o escuro entra com `data-theme="dark"` no `<html>`, escrito no servidor a partir do cookie `aar.theme` para não piscar. Detalhes de rotas, Server e Client Components, modelo no PostgreSQL e AWS em [docs/stack.md](docs/stack.md).

## A costura documento ↔ análise

`AnalysisProvider` guarda o achado ativo, o achado em hover, o modo da bancada e o filtro. `anchorProps(id)` entrega as props prontas para `Highlight` e `GapMarker`; `FindingList` e `DocumentCompare` leem o mesmo estado. Atalhos J/K, C e Esc vêm ligados. As regras estão em [docs/interacao.md](docs/interacao.md); o exemplo completo, em [examples/Bancada.tsx](examples/Bancada.tsx).

## Componentes

| Grupo | Componentes |
| --- | --- |
| Marca | Logo, LogoSymbol |
| Ações | Button, IconButton, Icon |
| Rótulos | Tag, StatusTag |
| Tipografia | SectionHeading, Breadcrumb |
| Navegação | Tabs, SegmentedControl, BulaSectionNav |
| Formulários | TextField, SearchField, Checkbox |
| Documento | DocumentHeader, DocumentPane, DocSection, Highlight, GapMarker, SelectionToolbar, DiffText, DocumentCompare |
| Análise | FindingList, FindingPanel, SourceList, BeforeAfter, AnalysisProgress, AnalysisProvider |
| Agentes | AgentRoster, AgentMessage, UserMessage, DecisionPrompt, Composer, SessionSteps |
| Página | StepCards, CommentThread, Notice, EmptyState, Workbench |

Os componentes com interação levam `'use client'`; os demais renderizam no servidor. No pacote, o símbolo se chama `LogoSymbol` (no design system do claude.ai, `Symbol`) para não esconder o `Symbol` do JavaScript.

## Mudar um token

Edite `src/tokens/tokens.json` e rode `npm run tokens`. Nunca edite `tokens.css` ou `tokens.ts` à mão. Mantenha a mudança também no design system AAR do claude.ai, que é onde a equipe vê e comenta.

## Checagens

```bash
npm install
npm run check   # gera tokens, checa tipos e renderiza cada componente no servidor
```
