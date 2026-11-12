'use client';

import type { ReactNode } from 'react';
import { Button } from './Button';
import { StatusTag } from './Labels';
import { SourceList, type Source } from './Analysis';
import type { AnalysisStatus } from './internal';

export interface Finding {
  id: string;
  /** O número do achado, o mesmo do Highlight. */
  ref: string;
  title: string;
  section: string;
  status: AnalysisStatus;
  /** Estado nas palavras do contrato; substitui o rótulo padrão do status. */
  statusLabel?: string;
}

export interface FindingListProps {
  items: Finding[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  label?: string;
}

/** Lista dos achados na ordem do documento. */
export function FindingList({ items, activeId, onSelect, onHover, label = 'Achados' }: FindingListProps) {
  return (
    <ul className="aar aar-flist" aria-label={label}>
      {items.map((f) => (
        <li key={f.id}>
          <button
            type="button"
            className="aar-fitem"
            aria-current={f.id === activeId ? 'true' : undefined}
            onClick={() => onSelect?.(f.id)}
            onMouseEnter={() => onHover?.(f.id)}
            onMouseLeave={() => onHover?.(null)}
          >
            <span className="aar-fitem__ref">{f.ref}</span>
            <span>
              <p className="aar-fitem__title">{f.title}</p>
              <p className="aar-fitem__meta">{f.section}</p>
            </span>
            <StatusTag status={f.status} label={f.statusLabel} size="sm" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export interface FindingPanelProps {
  refLabel?: string;
  section?: string;
  status: AnalysisStatus;
  conclusion: string;
  excerpt?: ReactNode;
  why?: string;
  consider?: string;
  sources?: Source[];
  /** "Como chegamos aqui", em passos. */
  path?: ReactNode[];
  lesson?: { label?: string; title: string; cta?: string; onClick?: () => void };
  actions?: ReactNode;
  onGoToExcerpt?: () => void;
}

/** A anatomia de um achado: orientar agora, capacitar para a próxima. */
export function FindingPanel({ refLabel, section, status, conclusion, excerpt, why, consider, sources, path, lesson, actions, onGoToExcerpt }: FindingPanelProps) {
  const side = path || lesson;
  return (
    <section className="aar aar-panel aar-panel--xl">
      <div className={side ? 'aar-finding' : 'aar-finding aar-finding--single'}>
        <div className="aar-finding__main">
          <div className="aar-finding__top">
            <p className="aar-label-sm" style={{ color: 'var(--action)' }}>
              {refLabel ? `Achado ${refLabel} · ` : ''}
              {section}
            </p>
            <StatusTag status={status} />
          </div>
          <div className="aar-finding__block">
            <p className="aar-label-sm">Conclusão</p>
            <p className="aar-finding__conclusion">{conclusion}</p>
          </div>
          {excerpt ? (
            <div className="aar-finding__block">
              <p className="aar-label-sm">Trecho na bula</p>
              <blockquote className="aar-quote">
                {excerpt}
                <cite>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onGoToExcerpt?.();
                    }}
                  >
                    Ir para o trecho →
                  </a>
                </cite>
              </blockquote>
            </div>
          ) : null}
          {why ? (
            <div className="aar-finding__block">
              <p className="aar-label-sm">Por quê</p>
              <p className="aar-finding__text">{why}</p>
            </div>
          ) : null}
          {consider ? (
            <div className="aar-finding__block">
              <p className="aar-label-sm">Considere também</p>
              <p className="aar-finding__text">{consider}</p>
            </div>
          ) : null}
          {sources ? (
            <div className="aar-finding__block">
              <p className="aar-label-sm">Fontes</p>
              <SourceList sources={sources} />
            </div>
          ) : null}
          {actions ? (
            <div className="aar-finding__block">
              <div className="aar-actions">{actions}</div>
            </div>
          ) : null}
        </div>
        {side ? (
          <div className="aar-finding__side">
            {path ? (
              <>
                <p className="aar-label-sm" style={{ color: 'var(--action)' }}>
                  Como chegamos aqui
                </p>
                <ol className="aar-steps-inline">
                  {path.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ol>
              </>
            ) : null}
            {lesson ? (
              <div className="aar-panel aar-panel--decision" style={{ marginTop: 'auto', padding: 'var(--space-20)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="aar-label-sm">{lesson.label ?? 'Microaula'}</p>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>{lesson.title}</p>
                <div>
                  <Button size="sm" arrow="forward" onClick={lesson.onClick}>
                    {lesson.cta ?? 'Estudar agora'}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
