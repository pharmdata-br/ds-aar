// Fontes do AAR via next/font. Use no app Next.js (não no pacote em si):
//
//   // app/layout.tsx
//   import { aarFonts } from '@pharmdata/aar-ds/fonts';
//   <html lang="pt-BR" className={aarFonts} data-theme={tema}>
//
// next/font exige que as chamadas fiquem num módulo do próprio app ou num pacote
// listado em transpilePackages (next.config). As variáveis abaixo são as que
// tokens.css procura em --font-sans e --font-serif.
import { Inter_Tight, Instrument_Serif } from 'next/font/google';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const aarFonts = `${interTight.variable} ${instrumentSerif.variable}`;
