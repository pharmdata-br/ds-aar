import { Tag } from './Labels';
import { STATUS } from './internal';

export interface Source {
  /** Referência, Norma, Compêndio, Literatura. */
  tier: string;
  label: string;
  code?: string;
}

/** Fontes de um achado, com nível e identificador. */
export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ul className="aar-sources">
      {sources.map((s, i) => (
        <li key={i}>
          <Tag size="sm">{s.tier}</Tag>
          <span>{s.label}</span>
          {s.code ? <span className="aar-code aar-muted">{s.code}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export interface BeforeAfterProps {
  raw: string;
  rawNote?: string;
  rawLabel?: string;
  doneLabel?: string;
  fields: { label: string; value: string; code?: string }[];
}

/** O dado como chegou ao lado do dado como fica. */
export function BeforeAfter({ raw, rawNote, rawLabel = 'Como chegou', doneLabel = 'Como fica', fields }: BeforeAfterProps) {
  return (
    <div className="aar aar-ba">
      <div className="aar-ba__raw">
        <p className="aar-label-sm">{rawLabel}</p>
        <p className="aar-ba__rawtext">{raw}</p>
        {rawNote ? (
          <p className="aar-muted" style={{ margin: 'auto 0 0', fontSize: 13 }}>
            {rawNote}
          </p>
        ) : null}
      </div>
      <div className="aar-ba__done">
        <p className="aar-label-sm" style={{ padding: '14px 0 0', color: 'var(--action)' }}>
          {doneLabel}
        </p>
        {fields.map((f) => (
          <div key={f.label} className="aar-ba__field">
            <p className="aar-ba__k">{f.label}</p>
            <p className="aar-ba__v">
              {f.value}
              {f.code ? <span className="aar-code">{f.code}</span> : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface AnalysisProgressProps {
  total: number;
  counts: { conforme?: number; revisar?: number; divergente?: number };
  label?: string;
}

const KEYS = ['conforme', 'revisar', 'divergente'] as const;

/** Quanto da bula já foi analisado e como se distribuem os estados. Mede seções. */
export function AnalysisProgress({ total, counts, label = 'Seções analisadas' }: AnalysisProgressProps) {
  const done = KEYS.reduce((n, k) => n + (counts[k] ?? 0), 0);
  return (
    <div className="aar aar-progress">
      <div className="aar-progress__top">
        <span>{label}</span>
        <span>
          <b>{done}</b> de {total}
        </span>
      </div>
      <div className="aar-progress__track" role="img" aria-label={`${done} de ${total} seções analisadas`}>
        {KEYS.map((k) => (counts[k] ? <span key={k} className={`aar-progress__seg--${k}`} style={{ width: `${(100 * (counts[k] ?? 0)) / total}%` }} /> : null))}
      </div>
      <ul className="aar-legend">
        {KEYS.map((k) => (
          <li key={k}>
            <span className={`aar-dot aar-dot--${k}`} />
            {STATUS[k].label} <b style={{ color: 'var(--ink)' }}>{counts[k] ?? 0}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
