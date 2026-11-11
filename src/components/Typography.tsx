import type { ReactNode } from 'react';

export function TitleWithEmphasis({ title, emphasis }: { title: string; emphasis?: string }): ReactNode {
  if (!emphasis) return title;
  return (
    <>
      {title ? `${title} ` : ''}
      <em>{emphasis}</em>
    </>
  );
}

export interface SectionHeadingProps {
  label?: string;
  title: string;
  /** Parte do título em itálico serifado, em action. */
  emphasis?: string;
  lead?: string;
  level?: 1 | 2 | 3;
}

/** Rótulo-capítulo, título com itálico e uma frase ao lado. */
export function SectionHeading({ label, title, emphasis, lead, level = 2 }: SectionHeadingProps) {
  const Tag = level === 1 ? 'h1' : level === 3 ? 'h3' : 'h2';
  return (
    <div className="aar aar-heading">
      <div className="aar-heading__main">
        {label ? <p className="aar-label aar-label--action">{label}</p> : null}
        <Tag className={`aar-heading__title aar-heading__title--${level}`}>
          <TitleWithEmphasis title={title} emphasis={emphasis} />
        </Tag>
      </div>
      {lead ? <p className="aar-heading__lead">{lead}</p> : null}
    </div>
  );
}

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

/** Caminho do documento no acervo; o último item é a página atual. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="aar" aria-label="Caminho">
      <ol className="aar-crumbs">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return [
            <li key={`l${i}`}>{last ? <span aria-current="page">{it.label}</span> : <a href={it.href ?? '#'}>{it.label}</a>}</li>,
            last ? null : (
              <li key={`s${i}`} aria-hidden>
                /
              </li>
            ),
          ];
        })}
      </ol>
    </nav>
  );
}
