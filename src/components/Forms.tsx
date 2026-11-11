'use client';

import { useId, type ReactNode } from 'react';
import { Icon } from './Icon';
import { cx } from './internal';

export interface TextFieldProps {
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  /** Troca a dica por uma frase que diz o que fazer. */
  error?: string;
  multiline?: boolean;
  name?: string;
  onChange?: (v: string) => void;
}

/** Campo com rótulo sempre visível e dica abaixo. */
export function TextField({ label, value, defaultValue, placeholder, hint, error, multiline, name, onChange }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-h`;
  const common = {
    id,
    name,
    className: 'aar-input',
    value,
    defaultValue,
    placeholder,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': hint || error ? hintId : undefined,
  };
  return (
    <div className="aar aar-field">
      <label className="aar-field__label" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea {...common} onChange={(e) => onChange?.(e.target.value)} />
      ) : (
        <input type="text" {...common} onChange={(e) => onChange?.(e.target.value)} />
      )}
      {error || hint ? (
        <p id={hintId} className={cx('aar-field__hint', error && 'aar-field__hint--error')} style={{ margin: 0 }}>
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}

export interface SearchFieldProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  /** Trechos encontrados; anunciado para leitores de tela. */
  count?: number;
  onChange?: (v: string) => void;
}

/** Busca dentro do documento, com a contagem de trechos. */
export function SearchField({ value, defaultValue, placeholder = 'Buscar no documento', label = 'Buscar no documento', count, onChange }: SearchFieldProps) {
  return (
    <div className="aar aar-search" role="search">
      <Icon name="search" size={18} />
      <input
        className="aar-input"
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {count != null ? (
        <span className="aar-search__count" aria-live="polite">
          {count} {count === 1 ? 'trecho' : 'trechos'}
        </span>
      ) : null}
    </div>
  );
}

export interface CheckboxProps {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
}

/** Caixa de seleção com rótulo clicável inteiro. */
export function Checkbox({ label, checked, defaultChecked, onChange }: CheckboxProps) {
  return (
    <label className="aar aar-check">
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={(e) => onChange?.(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}
