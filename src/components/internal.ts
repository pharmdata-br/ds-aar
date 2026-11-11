export type AnalysisStatus = 'conforme' | 'revisar' | 'divergente' | 'ausente' | 'analise';
export type AvatarTone = 'action' | 'inverse' | 'mist';

export const STATUS: Record<AnalysisStatus, { icon: IconName | null; label: string }> = {
  conforme: { icon: 'check', label: 'Conforme' },
  revisar: { icon: 'alert', label: 'Revisar' },
  divergente: { icon: 'diverge', label: 'Divergente' },
  ausente: { icon: 'absent', label: 'Ausente' },
  analise: { icon: null, label: 'Em análise' },
};

export type IconName =
  | 'check' | 'alert' | 'diverge' | 'absent' | 'info' | 'plus' | 'minus' | 'search' | 'link'
  | 'comment' | 'ask' | 'flag' | 'close' | 'chevron-down' | 'chevron-right' | 'arrow-up'
  | 'arrow-down' | 'document' | 'compare' | 'filter' | 'send' | 'book';

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
