import type { ChangelogEntry, Task } from "./types";

export function parseActiveMd(md: string): {
  phase?: string;
  lastUpdated?: string;
  blocked: Task[];
  inProgress: Task[];
  upNext: Task[];
  done: Task[];
} {
  const phase = md.match(/\*\*Current phase:\*\*\s*(.+)$/im)?.[1]?.trim();
  const lastUpdated = md.match(/\*\*Last updated:\*\*\s*(.+)$/im)?.[1]?.trim();

  return {
    phase,
    lastUpdated,
    blocked: parseTaskSection(md, "Blocked"),
    inProgress: parseTaskSection(md, "In Progress"),
    upNext: parseUpNext(md),
    done: parseDoneSection(md),
  };
}

function parseTaskSection(md: string, heading: string): Task[] {
  const re = new RegExp(`##\\s+(?:[^\\n]*?)?${heading}[\\s\\S]*?(?=##|$)`, "i");
  const section = md.match(re)?.[0] ?? "";
  const tasks: Task[] = [];

  for (const line of section.split("\n")) {
    if (line.includes("|") && !line.includes("---") && !line.includes("Task |")) {
      const cols = line
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cols[0] === "—" || cols.length < 2) continue;
      tasks.push({
        text: cols[0],
        status: heading.toLowerCase().includes("block") ? "blocked" : "in_progress",
        owner: cols.length > 2 ? cols[cols.length - 1] : undefined,
        notes: cols.length > 3 ? cols[2] : undefined,
      });
    }
  }
  return tasks;
}

function parseUpNext(md: string): Task[] {
  const section = md.match(/##\s+(?:[^\n]*?)?Up Next[\s\S]*?(?=##|$)/i)?.[0] ?? "";
  const tasks: Task[] = [];
  for (const line of section.split("\n")) {
    const m = line.match(/^\d+\.\s+\[[ x]\]\s+(.+)$/i);
    if (m) tasks.push({ text: m[1].trim(), status: "up_next" });
  }
  return tasks;
}

function parseDoneSection(md: string): Task[] {
  const section = md.match(/##\s+(?:[^\n]*?)?Done[\s\S]*?(?=##|$)/i)?.[0] ?? "";
  const tasks: Task[] = [];
  for (const line of section.split("\n")) {
    const m = line.match(/^-\s+\[x\]\s+(.+)$/i) || line.match(/^-\s+(.+)$/);
    if (m) tasks.push({ text: m[1].trim(), status: "done" });
  }
  return tasks;
}

export function parseChangelogMd(md: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const parts = md.split(/^##\s+/m).slice(1);

  for (const part of parts) {
    const headerLine = part.split("\n")[0]?.trim() ?? "";
    if (headerLine.toLowerCase().includes("template")) continue;

    const headerMatch = headerLine.match(
      /^(\d{4}-\d{2}-\d{2})(?:\s+[\d:]*)?\s+—\s+([^—]+)\s+—\s+([^:]+):\s*(.+)$/,
    );
    const body = part.slice(part.indexOf("\n") + 1);
    const nextUp = body.match(/^-\s+Next up:\s*(.+)$/im)?.[1]?.trim();
    const statusRaw = body.match(/^-\s+Status:\s*(.+)$/im)?.[1]?.trim().toLowerCase();
    let status: ChangelogEntry["status"];
    if (statusRaw?.includes("block")) status = "blocked";
    else if (statusRaw?.includes("wip")) status = "wip";
    else if (statusRaw?.includes("done")) status = "done";

    entries.push({
      date: headerMatch?.[1] ?? headerLine.slice(0, 10),
      branch: headerMatch?.[2]?.trim(),
      sliceId: headerMatch?.[3]?.trim(),
      title: headerMatch?.[4]?.trim() ?? headerLine,
      status,
      nextUp,
      notes: body.match(/^-\s+Notes:\s*(.+)$/im)?.[1]?.trim(),
      rawHeader: headerLine,
    });
  }

  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function isVoiceSkillStub(content: string): boolean {
  if (content.length < 500) return true;
  return (
    content.includes("[CLIENT_NAME]") ||
    content.includes("client-voice-skill-template") ||
    content.includes("Fill this in")
  );
}

export function isStackSkillStub(content: string): boolean {
  return content.includes("[e.g.") || content.includes("[LIST_ENV_VARS_HERE]");
}
