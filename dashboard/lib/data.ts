import fs from "fs";
import path from "path";
import { assertRepoRoot } from "./repo-root";
import { parseClientReadme, computeHealth } from "./parse-client";
import {
  parseActiveMd,
  parseChangelogMd,
  isVoiceSkillStub,
  isStackSkillStub,
} from "./parse-planning";
import { parseAgentFile, AGENT_DIVISIONS } from "./parse-agent";
import type {
  Alert,
  AgentRecord,
  ChangelogEntry,
  ClientDetail,
  ClientSummary,
  Task,
} from "./types";

function readUtf8(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

export function listClientSlugs(): string[] {
  const root = assertRepoRoot();
  return fs
    .readdirSync(path.join(root, "clients"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "_template" && !d.name.startsWith("."))
    .map((d) => d.name)
    .sort();
}

export function getClientDetail(slug: string): ClientDetail | null {
  const root = assertRepoRoot();
  const readme = readUtf8(path.join(root, "clients", slug, "README.md"));
  if (!readme) return null;

  const client = parseClientReadme(slug, readme);
  const activePath = path.join(root, "clients", slug, "planning", "ACTIVE.md");
  const changelogPath = path.join(root, "clients", slug, "planning", "CHANGELOG.md");
  const active = readUtf8(activePath);
  const changelog = readUtf8(changelogPath);

  if (active) {
    const tasks = parseActiveMd(active);
    client.openBlockers = tasks.blocked.length;
  }

  if (changelog) {
    const entries = parseChangelogMd(changelog);
    if (entries[0]) {
      client.lastChangelogDate = entries[0].date;
      client.lastNextUp = entries[0].nextUp;
    }
  }

  client.health = computeHealth(client);
  return client;
}

export function getAllClients(): ClientSummary[] {
  return listClientSlugs()
    .map((slug) => getClientDetail(slug))
    .filter((c): c is ClientDetail => c !== null);
}

export function getClientPlanning(slug: string): {
  active: ReturnType<typeof parseActiveMd>;
  changelog: ChangelogEntry[];
} | null {
  const root = assertRepoRoot();
  const active = readUtf8(path.join(root, "clients", slug, "planning", "ACTIVE.md"));
  const changelog = readUtf8(path.join(root, "clients", slug, "planning", "CHANGELOG.md"));
  if (!active && !changelog) return null;
  return {
    active: active ? parseActiveMd(active) : parseActiveMd(""),
    changelog: changelog ? parseChangelogMd(changelog) : [],
  };
}

export function getClientManifestAgents(slug: string): string[] {
  const root = assertRepoRoot();
  const manifest = readUtf8(path.join(root, "clients", slug, "agents.manifest"));
  if (!manifest) return [];
  return manifest
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

export function getAllAgents(): AgentRecord[] {
  const root = assertRepoRoot();
  const agents: AgentRecord[] = [];

  for (const division of AGENT_DIVISIONS) {
    const dir = path.join(root, division);
    if (!fs.existsSync(dir)) continue;
    const walk = (sub: string) => {
      for (const ent of fs.readdirSync(sub, { withFileTypes: true })) {
        const full = path.join(sub, ent.name);
        if (ent.isDirectory()) walk(full);
        else if (ent.name.endsWith(".md")) {
          const rel = path.relative(root, full).replace(/\\/g, "/");
          const content = readUtf8(full);
          if (!content) continue;
          const parsed = parseAgentFile(division, rel, content);
          if (parsed) agents.push(parsed);
        }
      }
    };
    walk(dir);
  }

  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAlerts(): Alert[] {
  const alerts: Alert[] = [];
  const root = assertRepoRoot();

  for (const slug of listClientSlugs()) {
    const client = getClientDetail(slug);
    if (!client) continue;

    const planning = getClientPlanning(slug);
    const voice = readUtf8(path.join(root, "clients", slug, "skills", "voice.md"));
    const stack = readUtf8(path.join(root, "clients", slug, "skills", "stack.md"));

    if (voice && isVoiceSkillStub(voice)) {
      alerts.push({
        id: `${slug}-voice`,
        severity: "critical",
        clientSlug: slug,
        clientName: client.name,
        title: "Voice skill incomplete",
        detail: "voice.md is still a template or stub.",
        href: `/clients/${slug}`,
      });
    }

    if (stack && isStackSkillStub(stack)) {
      alerts.push({
        id: `${slug}-stack`,
        severity: "warning",
        clientSlug: slug,
        clientName: client.name,
        title: "Stack skill has placeholders",
        detail: "stack.md still contains [e.g. ...] markers.",
        href: `/clients/${slug}`,
      });
    }

    for (const t of planning?.active.blocked ?? []) {
      alerts.push({
        id: `${slug}-blocked-${t.text.slice(0, 20)}`,
        severity: "critical",
        clientSlug: slug,
        clientName: client.name,
        title: "Blocked task",
        detail: t.text,
        href: `/clients/${slug}`,
      });
    }

    const last = planning?.changelog[0];
    if (last && !last.nextUp?.trim()) {
      alerts.push({
        id: `${slug}-no-next`,
        severity: "warning",
        clientSlug: slug,
        clientName: client.name,
        title: "Missing Next up in CHANGELOG",
        detail: last.rawHeader,
        href: `/clients/${slug}`,
      });
    }

    if (client.lastChangelogDate) {
      const days = Math.floor(
        (Date.now() - new Date(client.lastChangelogDate).getTime()) / 86400000,
      );
      if (days > 14) {
        alerts.push({
          id: `${slug}-stale`,
          severity: "warning",
          clientSlug: slug,
          clientName: client.name,
          title: "Stale session log",
          detail: `No CHANGELOG activity in ${days} days.`,
          href: `/clients/${slug}`,
        });
      }
    } else {
      alerts.push({
        id: `${slug}-no-changelog`,
        severity: "info",
        clientSlug: slug,
        clientName: client.name,
        title: "No CHANGELOG entries",
        detail: "Add a session handoff entry after the next work session.",
        href: `/clients/${slug}`,
      });
    }
  }

  const order = { critical: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => order[a.severity] - order[b.severity]);
}

export function flattenTasks(active: ReturnType<typeof parseActiveMd>): Task[] {
  return [
    ...active.blocked.map((t) => ({ ...t, status: "blocked" as const })),
    ...active.inProgress.map((t) => ({ ...t, status: "in_progress" as const })),
    ...active.upNext,
    ...active.done,
  ];
}
