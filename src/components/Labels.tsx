import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cx, STATUS, type AnalysisStatus, type IconName } from './internal';

export interface TagProps {
  tone?: 'mist' | 'outline' | 'solid' | 'inverse' | 'pending';
  size?: 'md' | 'sm';
  icon?: IconName;
  children: ReactNode;
}

/** Etiqueta em pílula para vocabulários, fontes e contexto. */
export function Tag({ tone = 'mist', size = 'md', icon, children }: TagProps) {
  return (
    <span className={cx('aar-tag', `aar-tag--${tone}`, size === 'sm' && 'aar-tag--sm')}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </span>
  );
}

export interface StatusTagProps {
  status: AnalysisStatus;
  label?: string;
  size?: 'md' | 'sm';
}

/** Estado de uma seção ou achado, sempre com ícone e rótulo. */
export function StatusTag({ status, label, size = 'md' }: StatusTagProps) {
  const s = STATUS[status];
  return (
    <span className={cx('aar-tag', `aar-status--${status}`, size === 'sm' && 'aar-tag--sm')}>
      {s.icon ? <Icon name={s.icon} size={14} /> : <span className="aar-dot aar-dot--analise" aria-hidden />}
      {label ?? s.label}
    </span>
  );
}
