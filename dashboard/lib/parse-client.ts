import type { ClientAgentRef, ClientDetail, ClientStatus, ClientSummary } from "./types";

function field(md: string, label: string): string {
  const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)$`, "im");
  const m = md.match(re);
  return m?.[1]?.trim().replace(/^`|`$/g, "") ?? "";
}

function parseStatus(raw: string): ClientStatus {
  const s = raw.toLowerCase();
  if (s.includes("active")) return "active";
  if (s.includes("setup")) return "setup";
  if (s.includes("paused")) return "paused";
  if (s.includes("offboarded")) return "offboarded";
  return "unknown";
}

function parseTitle(md: string): string {
  const m = md.match(/^#\s+(.+?)\s+—/m);
  if (m) return m[1].trim();
  const h = md.match(/^#\s+(.+)$/m);
  return h?.[1]?.trim() ?? "Unknown client";
}

function parseAbout(md: string): string {
  const section = md.split("## About")[1];
  if (!section) return "";
  const chunk = section.split("---")[0] ?? section;
  return chunk
    .replace(/^This Client\s*/i, "")
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("**Product"))
    .join(" ")
    .trim()
    .slice(0, 400);
}

function parseAgentsTable(md: string): ClientAgentRef[] {
  const section = md.split("## Deployed Agents")[1];
  if (!section) return [];
  const lines = section.split("\n");
  const agents: ClientAgentRef[] = [];
  for (const line of lines) {
    if (!line.startsWith("|") || line.includes("---") || line.includes("Agent |")) continue;
    const cols = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length < 2) continue;
    agents.push({
      name: cols[0],
      sourceFile: cols[1].replace(/`/g, ""),
      customised: /yes/i.test(cols[2] ?? ""),
      notes: cols[3] !== "—" ? cols[3] : undefined,
    });
  }
  return agents;
}

function parseSkillsTable(md: string): { file: string; purpose: string }[] {
  const section = md.split("## Client-Specific Skills")[1];
  if (!section) return [];
  const skills: { file: string; purpose: string }[] = [];
  for (const line of section.split("\n")) {
    if (!line.startsWith("|") || line.includes("---") || line.includes("Skill file")) continue;
    const cols = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length >= 2) skills.push({ file: cols[0].replace(/`/g, ""), purpose: cols[1] });
  }
  return skills;
}

export function parseClientReadme(slug: string, md: string): ClientDetail {
  const productMatch = md.match(/\*\*Product URL:\*\*\s*(https?:\/\/\S+)/i);
  const base: ClientSummary = {
    slug,
    name: parseTitle(md),
    industry: field(md, "Industry"),
    market: field(md, "Primary market"),
    status: parseStatus(field(md, "Status")),
    onboardedAt: field(md, "Onboarded"),
    productUrl: productMatch?.[1],
    agentCount: 0,
    openBlockers: 0,
    health: "green",
  };

  const agents = parseAgentsTable(md);
  return {
    ...base,
    agentCount: agents.length,
    about: parseAbout(md),
    agents,
    skills: parseSkillsTable(md),
  };
}

export function computeHealth(
  client: ClientSummary & { lastChangelogDate?: string; lastNextUp?: string },
): ClientSummary["health"] {
  if (client.openBlockers > 0) return "red";
  if (!client.lastNextUp?.trim()) return "yellow";
  if (client.lastChangelogDate) {
    const days = daysSince(client.lastChangelogDate);
    if (days > 14) return "yellow";
  }
  if (client.status === "setup") return "yellow";
  return "green";
}

function daysSince(isoDate: string): number {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return 0;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}
