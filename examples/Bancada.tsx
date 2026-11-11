'use client';
// Exemplo de referência: a bancada com a costura documento ↔ análise ligada.
// Copie para app/(bancada)/analises/[id]/Bancada.tsx e troque os dados pelos do banco.

import {
  AnalysisProvider,
  Breadcrumb,
  BulaSectionNav,
  Button,
  Composer,
  DocSection,
  DocumentHeader,
  DocumentPane,
  FindingList,
  GapMarker,
  Highlight,
  IconButton,
  Logo,
  SearchField,
  StatusTag,
  Tabs,
  Workbench,
  scrollToFinding,
  useAnalysis,
  type Finding,
} from '../src';
import { useState } from 'react';

const FINDINGS: (Finding & { sectionId: string })[] = [
  { id: 'f1', ref: '1', title: 'Limite de TFGe diferente da referência', section: '4. Contraindicações', status: 'divergente', sectionId: 'contra' },
  { id: 'f2', ref: '2', title: 'Dose máxima sem divisão em tomadas', section: '8. Posologia e modo de usar', status: 'revisar', sectionId: 'posologia' },
  { id: 'f3', ref: '3', title: 'Falta o ajuste por função renal', section: '8. Posologia e modo de usar', status: 'ausente', sectionId: 'posologia' },
];

const SECTIONS = [
  { id: 'indic', n: 1, title: 'Indicações', status: 'conforme' as const },
  { id: 'contra', n: 4, title: 'Contraindicações', status: 'divergente' as const, count: 1 },
  { id: 'advert', n: 5, title: 'Advertências e precauções', status: 'analise' as const },
  { id: 'posologia', n: 8, title: 'Posologia e modo de usar', status: 'divergente' as const, count: 2 },
];

function Inner() {
  const a = useAnalysis();
  const [tab, setTab] = useState('achados');
  const active = FINDINGS.find((f) => f.id === a.activeId) ?? FINDINGS[0];
  const goTo = (id: string) => {
    a.select(id);
    scrollToFinding(id);
  };

  return (
    <Workbench
      height={680}
      top={
        <>
          <Logo size="sm" />
          <Breadcrumb items={[{ label: 'Análises', href: '/analises' }, { label: 'Metformina 850 mg · v03' }]} />
          <Button size="sm" variant="secondary" icon="compare" onClick={() => a.setMode(a.mode === 'comparacao' ? 'leitura' : 'comparacao')}>
            Comparar
          </Button>
        </>
      }
      left={<BulaSectionNav title="Seções" sections={SECTIONS} active={active.sectionId} onSelect={(id) => document.getElementById(id)?.scrollIntoView({ block: 'start' })} />}
      center={
        <DocumentPane
          height={540}
          header={<DocumentHeader title="Cloridrato de metformina 850 mg" meta={[{ label: 'Versão', value: '03' }]} status="divergente" />}
          toolbar={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <SearchField placeholder="Buscar na bula" />
              </div>
              <IconButton icon="arrow-up" label="Achado anterior (K)" size="sm" onClick={a.previous} />
              <IconButton icon="arrow-down" label="Próximo achado (J)" size="sm" onClick={a.next} />
            </div>
          }
        >
          <DocSection id="contra" n={4} title="Contraindicações" status="divergente">
            <p>
              Hipersensibilidade à metformina; <Highlight {...a.anchorProps('f1')}>insuficiência renal grave (TFGe abaixo de 45 mL/min/1,73 m²)</Highlight>; cetoacidose diabética.
            </p>
          </DocSection>
          <DocSection id="posologia" n={8} title="Posologia e modo de usar" status="divergente">
            <p>
              Iniciar com um comprimido duas vezes ao dia, junto às refeições. <Highlight {...a.anchorProps('f2')}>A dose máxima é de 2.550 mg ao dia.</Highlight>
            </p>
            <GapMarker {...a.anchorProps('f3')}>Falta o ajuste de dose por função renal presente na referência</GapMarker>
          </DocSection>
        </DocumentPane>
      }
      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 0 20px' }}>
          <div style={{ padding: '0 20px' }}>
            <Tabs label="Painel de análise" value={tab} onChange={setTab} items={[{ id: 'achados', label: 'Achados', count: FINDINGS.length }, { id: 'conversa', label: 'Conversa' }]} />
          </div>
          <div style={{ padding: '0 12px' }}>
            <FindingList items={FINDINGS} activeId={a.activeId} onSelect={goTo} onHover={a.hover} />
          </div>
          <div style={{ margin: '0 20px', padding: 20, borderRadius: 'var(--radius-lg)', background: 'var(--ground)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="aar-label-sm" style={{ color: 'var(--action)' }}>Achado {active.ref}</span>
              <StatusTag status={active.status} size="sm" />
            </div>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{active.title}</p>
          </div>
          <div style={{ padding: '0 20px' }}>
            <Composer context={[{ label: `Achado ${active.ref}`, icon: 'flag' }]} />
          </div>
        </div>
      }
    />
  );
}

export function Bancada() {
  return (
    <AnalysisProvider findings={FINDINGS} initialActiveId="f1">
      <Inner />
    </AnalysisProvider>
  );
}
