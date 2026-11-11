'use client';

import { useState, type ReactNode } from 'react';
import { Avatar } from './Agents';
import { Button } from './Button';
import { Icon } from './Icon';
import { Tag } from './Labels';
import type { AvatarTone, IconName } from './internal';

export interface AgentMessageProps {
  initials: string;
  tone?: AvatarTone;
  name?: string;
  source?: string;
  /** Pílulas que levam ao trecho do documento. */
  refs?: { id: string; label: string }[];
  onRef?: (id: string) => void;
  children: ReactNode;
}

/** Intervenção de um agente, com fonte e links para os trechos. */
export function AgentMessage({ initials, tone, name, source, refs, onRef, children }: AgentMessageProps) {
  return (
    <div className="aar aar-msg">
      <Avatar initials={initials} tone={tone} />
      <div className="aar-bubble">
        {name ? <span className="aar-bubble__name">{name}</span> : null}
        <p>{children}</p>
        {source ? <span className="aar-bubble__source">Fonte: {source}</span> : null}
        {refs ? (
          <div className="aar-actions">
            {refs.map((r) => (
              <button key={r.id} type="button" className="aar-tag aar-tag--mist aar-tag--sm" style={{ border: 0, cursor: 'pointer' }} onClick={() => onRef?.(r.id)}>
                <Icon name="link" size={12} />
                {r.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export interface DecisionPromptProps {
  initials?: string;
  tone?: AvatarTone;
  name?: string;
  question: string;
  detail?: string;
  confirmLabel?: string;
  secondaryLabel?: string;
  discardLabel?: string;
  onConfirm?: () => void;
  onSecondary?: () => void;
  onDiscard?: () => void;
}

/** Quando a análise precisa do analista. Nada sugerido é gravado sem esta confirmação. */
export function DecisionPrompt({ initials = 'RR', tone = 'mist', name, question, detail, confirmLabel = 'Confirmar', secondaryLabel = 'Ver trechos', discardLabel = 'Descartar', onConfirm, onSecondary, onDiscard }: DecisionPromptProps) {
  return (
    <div className="aar aar-msg">
      <Avatar initials={initials} tone={tone} />
      <div className="aar-bubble aar-bubble--decision" role="group" aria-label="Decisão pendente">
        {name ? <span className="aar-bubble__name">{name}</span> : null}
        <p>{question}</p>
        {detail ? <span className="aar-bubble__source">{detail}</span> : null}
        <div className="aar-actions">
          <Button size="sm" arrow="forward" onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button size="sm" variant="secondary" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
          {onDiscard ? (
            <Button size="sm" variant="ghost" onClick={onDiscard}>
              {discardLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export interface ComposerProps {
  placeholder?: string;
  label?: string;
  hint?: string;
  submitLabel?: string;
  defaultValue?: string;
  /** Trechos selecionados e seção atual, como pílulas. */
  context?: { label: string; icon?: IconName }[];
  onSubmit?: (text: string) => void;
}

/** Onde o analista pergunta ou pede uma análise, com o contexto à vista. */
export function Composer({
  placeholder = 'Pergunte sobre esta bula ou peça uma análise',
  label = 'Pergunte sobre o documento',
  hint = 'Selecione um trecho para perguntar sobre ele.',
  submitLabel = 'Analisar',
  defaultValue = '',
  context,
  onSubmit,
}: ComposerProps) {
  const [v, setV] = useState(defaultValue);
  return (
    <form
      className="aar aar-composer"
      onSubmit={(e) => {
        e.preventDefault();
        if (v.trim()) {
          onSubmit?.(v);
          setV('');
        }
      }}
    >
      {context?.length ? (
        <div className="aar-composer__ctx" aria-label="Contexto da pergunta">
          {context.map((c) => (
            <Tag key={c.label} size="sm" icon={c.icon ?? 'link'}>
              {c.label}
            </Tag>
          ))}
        </div>
      ) : null}
      <textarea aria-label={label} placeholder={placeholder} value={v} onChange={(e) => setV(e.target.value)} rows={2} />
      <div className="aar-composer__bar">
        <span className="aar-muted" style={{ fontSize: 13 }}>
          {hint}
        </span>
        <Button size="sm" type="submit" arrow="forward">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export interface CommentThreadProps {
  anchor?: string;
  comments: { initials: string; author: string; time: string; text: string; tone?: AvatarTone }[];
  onReply?: (text: string) => void;
}

/** Comentários da equipe presos a um trecho do documento. */
export function CommentThread({ anchor, comments, onReply }: CommentThreadProps) {
  return (
    <div className="aar aar-panel aar-thread">
      {anchor ? <p className="aar-thread__anchor">“{anchor}”</p> : null}
      {comments.map((c, i) => (
        <div key={i} className="aar-comment">
          <Avatar initials={c.initials} tone={c.tone ?? 'inverse'} />
          <div>
            <p className="aar-comment__head">
              <b>{c.author}</b>
              <span>{c.time}</span>
            </p>
            <p className="aar-comment__text">{c.text}</p>
          </div>
        </div>
      ))}
      {onReply ? <Composer placeholder="Responder" submitLabel="Responder" hint="" onSubmit={onReply} /> : null}
    </div>
  );
}
