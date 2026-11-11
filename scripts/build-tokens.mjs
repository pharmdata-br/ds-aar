#!/usr/bin/env node
// Gera src/tokens/tokens.css e src/tokens/tokens.ts a partir de src/tokens/tokens.json.
// Uso: node scripts/build-tokens.mjs  (ou npm run tokens)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src/tokens/tokens.json');
const t = JSON.parse(readFileSync(src, 'utf8'));

const themes = t.color.themes.map((x) => x.id);
const first = themes[0];
const val = (tok, theme) => (typeof tok.value === 'string' ? tok.value : tok.value[theme] ?? tok.value[first]);
const ref = (v) => (/^\{.+\}$/.test(v) ? `var(--${v.slice(1, -1)})` : v);

// Fontes: o next/font expõe --font-inter-tight e --font-instrument-serif; sem ele, cai no nome da família.
const familyVar = {
  sans: '--font-inter-tight',
  serif: '--font-instrument-serif',
};

const out = [];
out.push(`/* AAR — generated from tokens.json. Não edite: rode npm run tokens. */`);
for (const theme of themes) {
  const sel = theme === first ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`;
  out.push(`${sel} {`);
  out.push(`  color-scheme: ${theme === 'dark' ? 'dark' : 'light'};`);
  for (const tok of t.color.tokens) out.push(`  --${tok.name}: ${ref(val(tok, theme))};`);
  for (const tok of t.shadow?.tokens ?? []) out.push(`  --${tok.name}: ${val(tok, theme)};`);
  out.push('}');
}
out.push(':root {');
for (const tok of t.spacing.tokens) out.push(`  --${tok.name}: ${tok.value};`);
for (const tok of t.radius.tokens) out.push(`  --${tok.name}: ${tok.value};`);
for (const [k, stack] of Object.entries(t.type.families)) {
  out.push(`  --font-${k}: ${familyVar[k] ? `var(${familyVar[k]}, ${stack.split(',')[0].trim()}), ${stack.split(',').slice(1).join(',').trim()}` : stack};`);
}
out.push('}');
for (const g of t.type.groups) {
  for (const s of g.styles) {
    const fam = s.family ?? g.family;
    const lines = [`font-family: var(--font-${fam})`, `font-size: ${s.fontSize}`, `font-weight: ${s.fontWeight}`];
    if (s.lineHeight != null) lines.push(`line-height: ${s.lineHeight}`);
    if (s.letterSpacing) lines.push(`letter-spacing: ${s.letterSpacing}`);
    if (s.fontStyle) lines.push(`font-style: ${s.fontStyle}`);
    if (/^label/.test(s.name)) lines.push('text-transform: uppercase');
    out.push(`.text-${s.name} { ${lines.join('; ')}; }`);
  }
}
writeFileSync(join(root, 'src/tokens/tokens.css'), out.join('\n') + '\n');

// Valores também em TypeScript, para gráficos, e-mails e PDFs fora do CSS.
const colors = {};
for (const theme of themes) {
  colors[theme] = {};
  for (const tok of t.color.tokens) colors[theme][tok.name] = val(tok, theme);
}
const ts = [
  '// AAR — generated from tokens.json. Não edite: rode npm run tokens.',
  `export const themes = ${JSON.stringify(themes)} as const;`,
  `export type Theme = (typeof themes)[number];`,
  `export const colors = ${JSON.stringify(colors, null, 2)} as const;`,
  `export const spacing = ${JSON.stringify(Object.fromEntries(t.spacing.tokens.map((x) => [x.name, x.value])), null, 2)} as const;`,
  `export const radius = ${JSON.stringify(Object.fromEntries(t.radius.tokens.map((x) => [x.name, x.value])), null, 2)} as const;`,
  '',
].join('\n');
writeFileSync(join(root, 'src/tokens/tokens.ts'), ts);
console.log(`tokens.css e tokens.ts gerados (${t.color.tokens.length} cores × ${themes.length} temas).`);
