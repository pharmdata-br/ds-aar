// Renderiza cada componente no servidor e falha se algum quebrar.
// Uso: npx tsx scripts/render-check.tsx
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactElement } from 'react';
import * as A from '../src';
import { Bancada } from '../examples/Bancada';

const noop = () => {};
const cases: Record<string, ReactElement> = {
  Logo: <A.Logo size="lg" descriptor />,
  LogoSymbol16: <A.LogoSymbol size={16} />,
  LogoMono: <A.Logo tone="mono" />,
  Icon: <>{A.iconNames.map((n) => <A.Icon key={n} name={n} />)}</>,
  Button: <A.Button arrow="forward">Iniciar análise</A.Button>,
  ButtonLink: <A.Button href="/x" variant="link">Ver</A.Button>,
  IconButton: <A.IconButton icon="compare" label="Comparar" pressed />,
  Tag: <A.Tag tone="pending">A explorar</A.Tag>,
  StatusTag: <>{(['conforme', 'revisar', 'divergente', 'ausente', 'analise'] as const).map((s) => <A.StatusTag key={s} status={s} />)}</>,
  SectionHeading: <A.SectionHeading label="03" title="O texto como chegou." emphasis="O dado como fica." lead="x" />,
  Breadcrumb: <A.Breadcrumb items={[{ label: 'a' }, { label: 'b' }]} />,
  Tabs: <A.Tabs value="a" items={[{ id: 'a', label: 'A', count: 2 }]} onChange={noop} />,
  Segmented: <A.SegmentedControl value="a" options={[{ value: 'a', label: 'A' }]} />,
  BulaSectionNav: <A.BulaSectionNav active="x" sections={[{ id: 'x', n: 1, title: 'Indicações', status: 'conforme', count: 1 }]} />,
  TextField: <A.TextField label="Registro" hint="13 dígitos" />,
  TextFieldErr: <A.TextField label="Ref" error="Escolha" multiline />,
  SearchField: <A.SearchField count={4} />,
  Checkbox: <A.Checkbox label="x" defaultChecked />,
  DocumentHeader: <A.DocumentHeader title="T" meta={[{ label: 'Registro', value: '1', code: true }]} tags={['g']} status="revisar" />,
  DocumentPane: <A.DocumentPane><A.DocSection n={4} title="C" status="divergente"><p><A.Highlight findingId="f" refLabel="1" status="divergente" active>t</A.Highlight></p><A.GapMarker refLabel="2" /></A.DocSection></A.DocumentPane>,
  SelectionToolbar: <A.SelectionToolbar />,
  DiffText: <A.DiffText parts={[{ t: 'a' }, { t: 'b', op: 'ins' }, { t: 'c', op: 'del' }]} />,
  DocumentCompare: <A.DocumentCompare left={{ label: 'L' }} right={{ label: 'R' }} rows={[{ id: 'r', change: 'added', left: null, right: 'x', section: 's', status: 'ausente' }]} />,
  FindingList: <A.FindingList items={[{ id: 'f', ref: '1', title: 't', section: 's', status: 'revisar' }]} activeId="f" />,
  FindingPanel: <A.FindingPanel status="divergente" conclusion="c" excerpt="e" why="w" consider="k" sources={[{ tier: 'Norma', label: 'RDC 47/2009' }]} path={['a']} lesson={{ title: 'l' }} actions={<A.Button size="sm">Aprovar</A.Button>} />,
  SourceList: <A.SourceList sources={[{ tier: 'Referência', label: 'Bula', code: 'v' }]} />,
  BeforeAfter: <A.BeforeAfter raw="r" fields={[{ label: 'k', value: 'v', code: 'c' }]} />,
  AnalysisProgress: <A.AnalysisProgress total={10} counts={{ conforme: 4, revisar: 2, divergente: 2 }} />,
  AgentRoster: <A.AgentRoster agents={[{ initials: 'LB', name: 'Leitor', role: 'lê' }]} />,
  AgentMessage: <A.AgentMessage initials="CR" refs={[{ id: 'f', label: 'Trecho 1' }]} source="Bula">m</A.AgentMessage>,
  UserMessage: <A.UserMessage>u</A.UserMessage>,
  DecisionPrompt: <A.DecisionPrompt question="q?" onDiscard={noop} />,
  Composer: <A.Composer context={[{ label: 'Seção 8' }]} />,
  SessionSteps: <A.SessionSteps current={1} steps={[{ label: 'a', detail: 'x' }, { label: 'b' }, { label: 'c' }]} />,
  StepCards: <A.StepCards steps={[{ title: 'a' }, { title: 'b', text: 't' }]} />,
  CommentThread: <A.CommentThread anchor="a" comments={[{ initials: 'AM', author: 'Ana', time: 'agora', text: 't' }]} onReply={noop} />,
  Notice: <A.Notice tone="warning">n</A.Notice>,
  EmptyState: <A.EmptyState title="A bula certa," emphasis="e o caminho." actions={<A.Button>Enviar</A.Button>} />,
  Workbench: <A.Workbench center="c" right="r" />,
  Bancada: <Bancada />,
};

let failed = 0;
for (const [name, el] of Object.entries(cases)) {
  try {
    const html = renderToStaticMarkup(el);
    if (!html.length) throw new Error('vazio');
  } catch (e) {
    failed++;
    console.error(`✗ ${name}: ${(e as Error).message}`);
  }
}
console.log(`${Object.keys(cases).length - failed} de ${Object.keys(cases).length} renderizaram.`);
process.exit(failed ? 1 : 0);
