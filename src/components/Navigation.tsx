'use client';

import { STATUS, type AnalysisStatus } from './internal';

export interface TabsProps {
  items: { id: string; label: string; count?: number }[];
  value: string;
  onChange?: (id: string) => void;
  label?: string;
}

/** Abas para alternar vistas do mesmo documento. */
export function Tabs({ items, value, onChange, label }: TabsProps) {
  return (
    <div className="aar aar-tabs" role="tablist" aria-label={label}>
      {items.map((it) => (
        <button key={it.id} role="tab" type="button" className="aar-tab" aria-selected={it.id === value} onClick={() => onChange?.(it.id)}>
          {it.label}
          {it.count != null ? <span className="aar-tab__count">{it.count}</span> : null}
        </button>
      ))}
    </div>
  );
}

export interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange?: (v: string) => void;
  label?: string;
}

/** Escolha curta e exclusiva dentro de um painel (até quatro opções). */
export function SegmentedControl({ options, value, onChange, label }: SegmentedControlProps) {
  return (
    <div className="aar aar-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange?.(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export interface BulaSection {
  id: string;
  n: number | string;
  title: string;
  status?: AnalysisStatus;
  count?: number;
}

export interface BulaSectionNavProps {
  sections: BulaSection[];
  active?: string;
  onSelect?: (id: string) => void;
  title?: string;
  label?: string;
}

/** Índice das seções da bula com o estado de cada uma. */
export function BulaSectionNav({ sections, active, onSelect, title, label = 'Seções da bula' }: BulaSectionNavProps) {
  return (
    <nav className="aar" aria-label={label}>
      {title ? (
        <p className="aar-label-sm" style={{ margin: '0 0 12px 12px' }}>
          {title}
        </p>
      ) : null}
      <ul className="aar-secnav">
        {sections.map((s) => {
          const st = s.status ? STATUS[s.status] : null;
          return (
            <li key={s.id}>
              <button type="button" aria-current={s.id === active ? 'true' : undefined} onClick={() => onSelect?.(s.id)}>
                <span className="aar-secnav__n">{s.n}</span>
                <span>{s.title}</span>
                {s.status ? (
                  <span className="aar-secnav__state" title={st?.label}>
                    {s.count ? <span style={{ color: 'var(--ink-soft)' }}>{s.count}</span> : null}
                    <span className={`aar-dot aar-dot--${s.status}`} role="img" aria-label={st?.label} />
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
