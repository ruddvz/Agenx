export type ClientStatus = "active" | "setup" | "paused" | "offboarded" | "unknown";

export interface ClientSummary {
  slug: string;
  name: string;
  industry: string;
  market: string;
  status: ClientStatus;
  onboardedAt: string;
  productUrl?: string;
  agentCount: number;
  lastChangelogDate?: string;
  lastNextUp?: string;
  openBlockers: number;
  health: "green" | "yellow" | "red";
}

export interface ClientAgentRef {
  name: string;
  sourceFile: string;
  customised: boolean;
  notes?: string;
}

export interface ClientDetail extends ClientSummary {
  about: string;
  agents: ClientAgentRef[];
  skills: { file: string; purpose: string }[];
}

export type TaskStatus = "blocked" | "in_progress" | "up_next" | "done";

export interface Task {
  text: string;
  status: TaskStatus;
  owner?: string;
  notes?: string;
}

export interface ChangelogEntry {
  date: string;
  branch?: string;
  sliceId?: string;
  title: string;
  status?: "done" | "wip" | "blocked";
  nextUp?: string;
  notes?: string;
  rawHeader: string;
}

export interface AgentRecord {
  name: string;
  description: string;
  division: string;
  emoji: string;
  color: string;
  vibe: string;
  filePath: string;
}

export type AlertSeverity = "critical" | "warning" | "info";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  clientSlug: string;
  clientName: string;
  title: string;
  detail: string;
  href: string;
}
