import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { TitleWithEmphasis } from './Typography';
import { cx, pad2 } from './internal';

export interface StepCardsProps {
  steps: { title: string; text?: string }[];
  /** O último cartão fecha em inverse (padrão). */
  closeInverse?: boolean;
}

/** Processo numerado em cartões. */
export function StepCards({ steps, closeInverse = true }: StepCardsProps) {
  return (
    <div className="aar aar-stepcards">
      {steps.map((s, i) => (
        <div key={s.title} className={cx('aar-stepcard', closeInverse && i === steps.length - 1 && 'aar-stepcard--inverse')}>
          <p className="aar-stepcard__n">{pad2(i + 1)}</p>
          <h3 className="aar-stepcard__t">{s.title}</h3>
          {s.text ? <p className="aar-stepcard__x">{s.text}</p> : null}
        </div>
      ))}
    </div>
  );
}

export interface NoticeProps {
  tone?: 'info' | 'warning' | 'plain';
  children: ReactNode;
}

/** Aviso honesto: exemplo, revisão humana, o que não foi gravado. */
export function Notice({ tone = 'info', children }: NoticeProps) {
  return (
    <div className={cx('aar', 'aar-notice', `aar-notice--${tone}`)} role={tone === 'warning' ? 'status' : undefined}>
      {tone === 'plain' ? null : <Icon name={tone === 'warning' ? 'alert' : 'info'} size={18} />}
      <p>{children}</p>
    </div>
  );
}

export interface EmptyStateProps {
  label?: string;
  title: string;
  emphasis?: string;
  text?: string;
  actions?: ReactNode;
}

/** A tela vazia com respiro. */
export function EmptyState({ label, title, emphasis, text, actions }: EmptyStateProps) {
  return (
    <div className="aar aar-empty">
      {label ? <p className="aar-label">{label}</p> : null}
      <h2 className="aar-empty__title">
        <TitleWithEmphasis title={title} emphasis={emphasis} />
      </h2>
      {text ? <p className="aar-empty__text">{text}</p> : null}
      {actions ? <div className="aar-actions">{actions}</div> : null}
    </div>
  );
}

export interface WorkbenchProps {
  top?: ReactNode;
  left?: ReactNode;
  center: ReactNode;
  right: ReactNode;
  height?: number | string;
}

/** A bancada: seções à esquerda, documento no centro, análise à direita. */
export function Workbench({ top, left, center, right, height }: WorkbenchProps) {
  return (
    <div className={cx('aar', 'aar-bench', !left && 'aar-bench--no-left')} style={height ? { height } : undefined}>
      {top ? <div className="aar-bench__top">{top}</div> : null}
      {left ? (
        <aside className="aar-bench__left" aria-label="Navegação do documento">
          {left}
        </aside>
      ) : null}
      <main className="aar-bench__center">{center}</main>
      <aside className="aar-bench__right" aria-label="Análise">
        {right}
      </aside>
    </div>
  );
}
