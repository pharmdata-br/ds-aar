'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AnalysisStatus } from './internal';

/** Modos da bancada (docs/interacao.md). */
export type BenchMode = 'leitura' | 'comparacao' | 'conversa';

export interface AnchoredFinding {
  id: string;
  ref: string;
  sectionId: string;
  status: AnalysisStatus;
}

interface AnalysisState {
  findings: AnchoredFinding[];
  activeId: string | null;
  hoverId: string | null;
  mode: BenchMode;
  filter: AnalysisStatus | 'todos';
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  next: () => void;
  previous: () => void;
  setMode: (m: BenchMode) => void;
  setFilter: (f: AnalysisStatus | 'todos') => void;
  /** Props prontas para um Highlight ou GapMarker ligado a este achado. */
  anchorProps: (id: string) => {
    findingId: string;
    refLabel?: string;
    status?: AnalysisStatus;
    active: boolean;
    hover: boolean;
    onSelect: (id?: string) => void;
    onHover: (id: string | null) => void;
  };
}

const Ctx = createContext<AnalysisState | null>(null);

export interface AnalysisProviderProps {
  /** Achados na ordem do documento. */
  findings: AnchoredFinding[];
  initialActiveId?: string | null;
  initialMode?: BenchMode;
  /** Chamado quando o achado ativo muda: sincronize a URL (?f=) e role até o trecho. */
  onActiveChange?: (id: string | null) => void;
  /** Atalhos J/K, [ ], C, / e Esc. Desligue se a página já tiver os seus. */
  keyboard?: boolean;
  children: ReactNode;
}

/**
 * A costura documento ↔ análise: um achado ativo, um em hover, o modo da bancada e o filtro.
 * Envolve a Workbench; Highlight, GapMarker, FindingList e DocumentCompare leem daqui.
 */
export function AnalysisProvider({ findings, initialActiveId = null, initialMode = 'leitura', onActiveChange, keyboard = true, children }: AnalysisProviderProps) {
  const [activeId, setActive] = useState<string | null>(initialActiveId);
  const [hoverId, hover] = useState<string | null>(null);
  const [mode, setMode] = useState<BenchMode>(initialMode);
  const [filter, setFilter] = useState<AnalysisStatus | 'todos'>('todos');

  const select = useCallback(
    (id: string | null) => {
      setActive(id);
      onActiveChange?.(id);
    },
    [onActiveChange],
  );

  const visible = useMemo(() => (filter === 'todos' ? findings : findings.filter((f) => f.status === filter)), [findings, filter]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!visible.length) return;
      const i = visible.findIndex((f) => f.id === activeId);
      const n = i < 0 ? (dir === 1 ? 0 : visible.length - 1) : Math.min(Math.max(i + dir, 0), visible.length - 1);
      select(visible[n].id);
    },
    [visible, activeId, select],
  );

  useEffect(() => {
    if (!keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'j') step(1);
      else if (e.key === 'k') step(-1);
      else if (e.key === 'c') setMode((m) => (m === 'comparacao' ? 'leitura' : 'comparacao'));
      else if (e.key === 'Escape') select(null);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboard, step, select]);

  const value = useMemo<AnalysisState>(() => {
    const byId = new Map(findings.map((f) => [f.id, f]));
    return {
      findings,
      activeId,
      hoverId,
      mode,
      filter,
      select,
      hover,
      next: () => step(1),
      previous: () => step(-1),
      setMode,
      setFilter,
      anchorProps: (id) => {
        const f = byId.get(id);
        return {
          findingId: id,
          refLabel: f?.ref,
          status: f?.status,
          active: activeId === id,
          hover: hoverId === id,
          onSelect: (x?: string) => select(x ?? id),
          onHover: hover,
        };
      },
    };
  }, [findings, activeId, hoverId, mode, filter, select, step]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Lê a costura. Use dentro de um AnalysisProvider. */
export function useAnalysis(): AnalysisState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAnalysis precisa estar dentro de <AnalysisProvider>.');
  return v;
}

/** Rola até o trecho de um achado (procura [data-finding="id"]). */
export function scrollToFinding(id: string, behavior?: ScrollBehavior) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector(`[data-finding="${CSS.escape(id)}"]`);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el?.scrollIntoView({ block: 'center', behavior: behavior ?? (reduce ? 'auto' : 'smooth') });
}
