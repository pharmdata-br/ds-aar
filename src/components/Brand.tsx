import { cx } from './internal';

export interface LogoSymbolProps {
  size?: number;
  /** `mono`: quadrado em currentColor com as linhas vazadas, para uma cor só. */
  tone?: 'color' | 'mono';
  label?: string;
  decorative?: boolean;
}

/** O símbolo Trecho marcado. Abaixo de 20 px usa o desenho de 16 px (sem o ponto, linhas mais grossas). */
export function LogoSymbol({ size = 32, tone = 'color', label = 'AAR', decorative }: LogoSymbolProps) {
  const small = size <= 20;
  const mono = tone === 'mono';
  const box = mono ? 'currentColor' : '#2456E6';
  const line = mono ? 'var(--ground)' : '#9DBBF5';
  const mark = mono ? 'var(--ground)' : '#FFFFFF';
  return (
    <svg
      className="aar-symbol"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
    >
      <rect width="64" height="64" rx="16" fill={box} />
      {small ? (
        <>
          <rect x="13" y="14" width="38" height="8" rx="4" fill={line} />
          <rect x="13" y="28" width="38" height="10" rx="5" fill={mark} />
          <rect x="13" y="44" width="22" height="8" rx="4" fill={line} />
        </>
      ) : (
        <>
          <rect x="13" y="16" width="38" height="6" rx="3" fill={line} />
          <rect x="13" y="28" width="38" height="8" rx="4" fill={mark} />
          <rect x="13" y="42" width="22" height="6" rx="3" fill={line} />
          <circle cx="46" cy="45" r="4.5" fill={mark} />
        </>
      )}
    </svg>
  );
}

const SIZES = {
  sm: { sym: 28, name: 20, gap: 10, desc: 12 },
  md: { sym: 40, name: 28, gap: 12, desc: 13 },
  lg: { sym: 72, name: 64, gap: 20, desc: 15 },
} as const;

export interface LogoProps {
  variant?: 'lockup' | 'stacked' | 'symbol';
  /** `sm` bancada · `md` cabeçalhos e parecer · `lg` telas vazias e capas. */
  size?: keyof typeof SIZES;
  /** "Ambiente de Análise Regulatória" sob o nome, na primeira aparição. */
  descriptor?: boolean;
  tone?: 'color' | 'mono';
}

/** A marca do AAR: símbolo + "AAR" em Inter Tight 800. */
export function Logo({ variant = 'lockup', size = 'md', descriptor, tone }: LogoProps) {
  const z = SIZES[size];
  if (variant === 'symbol') {
    return (
      <span className="aar aar-logo">
        <LogoSymbol size={z.sym} tone={tone} />
      </span>
    );
  }
  return (
    <span
      className={cx('aar', 'aar-logo', variant === 'stacked' && 'aar-logo--stacked')}
      role="img"
      aria-label={descriptor ? 'AAR, Ambiente de Análise Regulatória' : 'AAR'}
      style={{ gap: z.gap }}
    >
      <LogoSymbol size={z.sym} tone={tone} decorative />
      <span className="aar-logo__text" aria-hidden>
        <span className="aar-logo__name" style={{ fontSize: z.name }}>AAR</span>
        {descriptor ? (
          <span className="aar-logo__desc" style={{ fontSize: z.desc }}>Ambiente de Análise Regulatória</span>
        ) : null}
      </span>
    </span>
  );
}
