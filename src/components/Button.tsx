import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cx, type IconName } from './internal';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'link';
  size?: 'md' | 'sm';
  /** `forward` (→) avança na análise; `external` (↗) abre algo fora dela. */
  arrow?: 'forward' | 'external';
  icon?: IconName;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const arrowFor = (a?: ButtonProps['arrow']) => (a === 'external' ? ' ↗' : a === 'forward' ? ' →' : '');

/** Botão em pílula com verbo e direção. */
export function Button({ variant = 'primary', size = 'md', arrow, icon, href, type = 'button', disabled, onClick, className, children }: ButtonProps) {
  const cls = cx('aar-btn', `aar-btn--${variant}`, size === 'sm' && 'aar-btn--sm', className);
  const content = (
    <>
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>
        {children}
        {arrowFor(arrow)}
      </span>
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

export interface IconButtonProps {
  icon: IconName;
  /** Obrigatório: vira aria-label e dica. */
  label: string;
  pressed?: boolean;
  size?: 'md' | 'sm';
  onClick?: () => void;
}

/** Botão redondo só com ícone, para barras de ferramentas do documento. */
export function IconButton({ icon, label, pressed, size = 'md', onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cx('aar-iconbtn', size === 'sm' && 'aar-iconbtn--sm')}
      aria-label={label}
      title={label}
      aria-pressed={pressed == null ? undefined : pressed}
      onClick={onClick}
    >
      <Icon name={icon} size={size === 'sm' ? 18 : 20} />
    </button>
  );
}
