'use client';

import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { StatusTag } from './Labels';
import { cx, STATUS, type AnalysisStatus, type IconName } from './internal';

export interface HighlightProps {
  findingId: string;
  /** O número do achado, o mesmo da lista e do painel. */
  refLabel?: string;
  status?: AnalysisStatus;
  active?: boolean;
  hover?: boolean;
  resolved?: boolean;
  ariaLabel?: string;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  children: ReactNode;
}

/** O trecho da bula ligado a um achado. */
export function Highlight({ findingId, refLabel, status = 'revisar', active, hover, resolved, ariaLabel, onSelect, onHover, children }: HighlightProps) {
  const s = STATUS[status];
  return (
    <mark
      className={cx('aar-hl', `aar-hl--${status}`, active && 'aar-hl--active', hover && 'aar-hl--hover', resolved && 'aar-hl--resolved')}
      tabIndex={0}
      role="button"
      aria-pressed={!!active}
      aria-label={ariaLabel ?? `Achado ${refLabel ?? ''} · ${s.label}`}
      data-finding={findingId}
      onClick={() => onSelect?.(findingId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(findingId);
        }
      }}
      onMouseEnter={() => onHover?.(findingId)}
      onMouseLeave={() => onHover?.(null)}
    >
      {children}
      {refLabel ? (
        <span className="aar-hl__ref" aria-hidden>
          {refLabel}
        </span>
      ) : null}
    </mark>
  );
}

export interface GapMarkerProps {
  findingId?: string;
  refLabel?: string;
  onSelect?: (id?: string) => void;
  children?: ReactNode;
}

/** Onde falta texto em relação à referência ou à norma. */
export function GapMarker({ findingId, refLabel, onSelect, children = 'Texto ausente em relação à referência' }: GapMarkerProps) {
  const body = (
    <>
      <Icon name="absent" size={16} />
      <span>{children}</span>
      {refLabel ? <span className="aar-hl__ref">{refLabel}</span> : null}
    </>
  );
  if (!onSelect) return <div className="aar aar-gap">{body}</div>;
  return (
    <button type="button" className="aar aar-gap" style={{ width: '100%', font: 'inherit', textAlign: 'left', background: 'transparent', cursor: 'pointer' }} onClick={() => onSelect(findingId)} data-finding={findingId}>
      {body}
    </button>
  );
}

const DEFAULT_ACTIONS: { id: string; icon: IconName; label: string }[] = [
  { id: 'ask', icon: 'ask', label: 'Perguntar ao AAR' },
  { id: 'finding', icon: 'flag', label: 'Marcar achado' },
  { id: 'comment', icon: 'comment', label: 'Comentar' },
  { id: 'compare', icon: 'compare', label: 'Ver na referência' },
];

export interface SelectionToolbarProps {
  actions?: { id: string; icon: IconName; label: string }[];
  onAction?: (id: string) => void;
}

/** Barra sobre o texto selecionado. */
export function SelectionToolbar({ actions = DEFAULT_ACTIONS, onAction }: SelectionToolbarProps) {
  return (
    <div className="aar aar-selbar" role="toolbar" aria-label="Ações sobre o trecho selecionado">
      {actions.map((a, i) => [
        i === 2 ? <span key={`s${i}`} className="aar-selbar__sep" aria-hidden /> : null,
        <button key={a.id} type="button" onClick={() => onAction?.(a.id)}>
          <Icon name={a.icon} size={16} />
          {a.label}
        </button>,
      ])}
    </div>
  );
}

export interface CompareRow {
  id: string;
  section?: string;
  status?: AnalysisStatus;
  change?: 'same' | 'changed' | 'added' | 'removed';
  left?: ReactNode | null;
  right?: ReactNode | null;
}

export interface DocumentCompareProps {
  left: { label: string; version?: string };
  right: { label: string; version?: string };
  rows: CompareRow[];
  activeId?: string;
  onSelect?: (id: string) => void;
  label?: string;
}

/** Bula em análise e referência lado a lado, alinhadas por trecho. */
export function DocumentCompare({ left, right, rows, activeId, onSelect, label = 'Comparação de textos' }: DocumentCompareProps) {
  const head = (s: { label: string; version?: string }) => (
    <div role="columnheader">
      <p className="aar-label-sm" style={{ color: 'var(--action-deep)' }}>
        {s.label}
      </p>
      {s.version ? (
        <span className="aar-code" style={{ color: 'var(--action-deep)' }}>
          {s.version}
        </span>
      ) : null}
    </div>
  );
  return (
    <div className="aar aar-compare" role="table" aria-label={label}>
      <div className="aar-compare__head" role="row">
        {head(left)}
        {head(right)}
      </div>
      {rows.map((r) => {
        const ch = r.change ?? 'same';
        const empty = <span>{ch === 'added' ? 'Sem correspondente' : 'Removido nesta versão'}</span>;
        return (
          <div
            key={r.id}
            role="row"
            className={cx('aar-compare__row', `aar-compare__row--${ch}`, r.id === activeId && 'aar-compare__row--active')}
            onClick={() => onSelect?.(r.id)}
          >
            <div role="cell">
              {r.section ? (
                <div className="aar-compare__cell-head">
                  <span className="aar-label-sm">{r.section}</span>
                  {r.status ? <StatusTag status={r.status} size="sm" /> : null}
                </div>
              ) : null}
              {r.left == null ? empty : r.left}
            </div>
            <div role="cell">
              {r.section ? (
                <div className="aar-compare__cell-head">
                  <span className="aar-label-sm">{r.section}</span>
                </div>
              ) : null}
              {r.right == null ? empty : r.right}
            </div>
          </div>
        );
      })}
    </div>
  );
}
