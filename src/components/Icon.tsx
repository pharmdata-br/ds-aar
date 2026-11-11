import type { IconName } from './internal';

const PATHS: Record<IconName, string[]> = {
  check: ['M20 6 9 17l-5-5'],
  alert: ['M12 8v5', 'M12 16.5h.01', 'M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'],
  diverge: ['M5 9h14', 'M5 15h14', 'M15 4 9 20'],
  absent: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M5.6 18.4 18.4 5.6'],
  info: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 16v-4', 'M12 8h.01'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  search: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4-4'],
  link: ['M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1', 'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'],
  comment: ['M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z'],
  ask: ['M4 5h16v11H9l-5 4z', 'M9 10h6'],
  flag: ['M5 21V4', 'M5 4h11l-2 4 2 4H5'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-right': ['M9 6l6 6-6 6'],
  'arrow-up': ['M12 19V5', 'M6 11l6-6 6 6'],
  'arrow-down': ['M12 5v14', 'M6 13l6 6 6-6'],
  document: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'],
  compare: ['M4 4h7v16H4z', 'M13 4h7v16h-7z'],
  filter: ['M4 5h16', 'M7 12h10', 'M10 19h4'],
  send: ['M5 12h14', 'M13 6l6 6-6 6'],
  book: ['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z', 'M4 19V5'],
};

export const iconNames = Object.keys(PATHS) as IconName[];

export interface IconProps {
  name: IconName;
  size?: number;
  /** Dê um rótulo quando o ícone for o único portador de sentido. */
  label?: string;
}

/** Ícone de traço 2px em currentColor, grade de 24. */
export function Icon({ name, size = 20, label }: IconProps) {
  return (
    <svg
      className="aar-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
