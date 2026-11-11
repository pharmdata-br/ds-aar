import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cx, pad2, type AvatarTone } from './internal';

export function Avatar({ initials, tone = 'action', size = 'md' }: { initials: string; tone?: AvatarTone; size?: 'md' | 'lg' }) {
  return (
    <span className={cx('aar-avatar', `aar-avatar--${tone}`, size === 'lg' && 'aar-avatar--lg')} aria-hidden>
      {initials}
    </span>
  );
}

export interface Agent {
  initials: string;
  name: string;
  role: string;
  tone?: AvatarTone;
}

/** Quem está trabalhando na análise: até três agentes. */
export function AgentRoster({ title, agents }: { title?: string; agents: Agent[] }) {
  return (
    <div className="aar aar-roster">
      {title ? <p className="aar-label-sm">{title}</p> : null}
      {agents.map((a) => (
        <div key={a.initials} className="aar-roster__item">
          <Avatar initials={a.initials} tone={a.tone} size="lg" />
          <div>
            <p className="aar-roster__name">{a.name}</p>
            <p className="aar-roster__role">{a.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** A fala do analista na conversa. */
export function UserMessage({ children }: { children: ReactNode }) {
  return <div className="aar aar-user">{children}</div>;
}

export interface SessionStepsProps {
  steps: { label: string; detail?: string }[];
  current?: number;
  label?: string;
}

/** As etapas da análise, com a atual em destaque. */
export function SessionSteps({ steps, current = 0, label = 'Etapas da análise' }: SessionStepsProps) {
  return (
    <ol className="aar aar-session" aria-label={label}>
      {steps.map((s, i) => {
        const isCur = i === current;
        const done = i < current;
        return (
          <li key={s.label} aria-current={isCur ? 'step' : undefined} className={done ? 'is-done' : undefined}>
            <span className="aar-session__n">{done ? <Icon name="check" size={16} label="Concluída" /> : pad2(i + 1)}</span>
            <div>
              <p className="aar-session__label">{s.label}</p>
              {s.detail || isCur ? <p className="aar-session__detail">{isCur ? s.detail ?? 'em andamento' : s.detail}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
