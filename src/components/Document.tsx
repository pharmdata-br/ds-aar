import type { ReactNode } from 'react';
import { StatusTag, Tag } from './Labels';
import type { AnalysisStatus } from './internal';

export interface DocumentHeaderProps {
  /** "Bula profissional", "Bula paciente", "Parecer". */
  kind?: string;
  title: string;
  meta?: { label: string; value: string; code?: boolean }[];
  tags?: string[];
  status?: AnalysisStatus;
  actions?: ReactNode;
}

/** Cabeçalho do documento em análise. */
export function DocumentHeader({ kind = 'Bula profissional', title, meta = [], tags = [], status, actions }: DocumentHeaderProps) {
  return (
    <header className="aar aar-dochead">
      <p className="aar-label-sm">{kind}</p>
      <h2 className="aar-dochead__title">{title}</h2>
      {meta.length ? (
        <dl className="aar-dochead__meta">
          {meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.code ? <span className="aar-code">{m.value}</span> : m.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {tags.length || status ? (
        <div className="aar-dochead__tags">
          {status ? <StatusTag status={status} size="sm" /> : null}
          {tags.map((t) => (
            <Tag key={t} size="sm">
              {t}
            </Tag>
          ))}
        </div>
      ) : null}
      {actions ? <div className="aar-actions">{actions}</div> : null}
    </header>
  );
}

export interface DocumentPaneProps {
  header?: ReactNode;
  toolbar?: ReactNode;
  height?: number | string;
  label?: string;
  children: ReactNode;
}

/** A bula em leitura. O documento nunca é reescrito: só marcado. */
export function DocumentPane({ header, toolbar, height, label = 'Documento', children }: DocumentPaneProps) {
  return (
    <article className="aar aar-docpane" aria-label={label}>
      {header}
      {toolbar ? <div style={{ padding: '12px var(--space-28)', borderBottom: '1px solid var(--line-soft)' }}>{toolbar}</div> : null}
      <div className="aar-docpane__body" style={height ? { maxHeight: height } : undefined}>
        {children}
      </div>
    </article>
  );
}

export interface DocSectionProps {
  /** Âncora estável ("posologia"); a navegação rola até ela. */
  id?: string;
  n?: number | string;
  title: string;
  status?: AnalysisStatus;
  statusLabel?: string;
  children: ReactNode;
}

/** Uma seção da bula, com número e estado. */
export function DocSection({ id, n, title, status, statusLabel, children }: DocSectionProps) {
  return (
    <section className="aar-docsec" id={id} aria-labelledby={id ? `${id}-t` : undefined}>
      <div className="aar-docsec__head">
        <h3 className="aar-docsec__title" id={id ? `${id}-t` : undefined}>
          {n != null ? <span className="aar-docsec__n">{n}.</span> : null}
          {title}
        </h3>
        {status ? <StatusTag status={status} size="sm" label={statusLabel} /> : null}
      </div>
      {children}
    </section>
  );
}

export interface DiffTextProps {
  parts: { t: string; op?: 'eq' | 'ins' | 'del' }[];
}

/** Texto com inserções (sublinhado) e remoções (riscado). */
export function DiffText({ parts }: DiffTextProps) {
  return (
    <span>
      {parts.map((x, i) =>
        x.op === 'ins' ? (
          <ins key={i} className="aar-ins">
            {x.t}
          </ins>
        ) : x.op === 'del' ? (
          <del key={i} className="aar-del">
            {x.t}
          </del>
        ) : (
          <span key={i}>{x.t}</span>
        ),
      )}
    </span>
  );
}
