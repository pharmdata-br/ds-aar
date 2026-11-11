// AAR — design system do Ambiente de Análise Regulatória.
// Estilos: importe '@pharmdata/aar-ds/styles.css' uma vez no layout raiz.

export type { AnalysisStatus, AvatarTone, IconName } from './components/internal';
export { STATUS } from './components/internal';

export { Logo, LogoSymbol, type LogoProps, type LogoSymbolProps } from './components/Brand';
export { Icon, iconNames, type IconProps } from './components/Icon';
export { Button, IconButton, type ButtonProps, type IconButtonProps } from './components/Button';
export { Tag, StatusTag, type TagProps, type StatusTagProps } from './components/Labels';
export { SectionHeading, Breadcrumb, type SectionHeadingProps, type BreadcrumbProps } from './components/Typography';
export { Tabs, SegmentedControl, BulaSectionNav, type TabsProps, type SegmentedControlProps, type BulaSectionNavProps, type BulaSection } from './components/Navigation';
export { TextField, SearchField, Checkbox, type TextFieldProps, type SearchFieldProps, type CheckboxProps } from './components/Forms';
export { DocumentHeader, DocumentPane, DocSection, DiffText, type DocumentHeaderProps, type DocumentPaneProps, type DocSectionProps, type DiffTextProps } from './components/Document';
export {
  Highlight,
  GapMarker,
  SelectionToolbar,
  DocumentCompare,
  type HighlightProps,
  type GapMarkerProps,
  type SelectionToolbarProps,
  type DocumentCompareProps,
  type CompareRow,
} from './components/DocumentInteractive';
export { SourceList, BeforeAfter, AnalysisProgress, type Source, type BeforeAfterProps, type AnalysisProgressProps } from './components/Analysis';
export { FindingList, FindingPanel, type Finding, type FindingListProps, type FindingPanelProps } from './components/AnalysisInteractive';
export { Avatar, AgentRoster, UserMessage, SessionSteps, type Agent, type SessionStepsProps } from './components/Agents';
export {
  AgentMessage,
  DecisionPrompt,
  Composer,
  CommentThread,
  type AgentMessageProps,
  type DecisionPromptProps,
  type ComposerProps,
  type CommentThreadProps,
} from './components/AgentsInteractive';
export { StepCards, Notice, EmptyState, Workbench, type StepCardsProps, type NoticeProps, type EmptyStateProps, type WorkbenchProps } from './components/Page';
export { AnalysisProvider, useAnalysis, scrollToFinding, type AnalysisProviderProps, type AnchoredFinding, type BenchMode } from './components/AnalysisContext';
