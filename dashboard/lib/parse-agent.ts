import type { AgentRecord } from "./types";

const AGENT_DIVISIONS = [
  "academic",
  "design",
  "engineering",
  "finance",
  "game-development",
  "marketing",
  "paid-media",
  "product",
  "project-management",
  "sales",
  "spatial-computing",
  "specialized",
  "support",
  "testing",
] as const;

export function parseAgentFile(division: string, relativePath: string, content: string): AgentRecord | null {
  if (!content.startsWith("---")) return null;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;
  const fm = content.slice(3, end);

  const get = (key: string): string => {
    const single = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    if (single) return single[1].replace(/^["']|["']$/g, "").trim();
    if (fm.includes(`${key}: |`)) {
      const block = fm.split(`${key}: |`)[1];
      return block?.split("\n")[0]?.trim() ?? "";
    }
    return "";
  };

  const name = get("name");
  if (!name) return null;

  const body = content.slice(end + 4);
  const emojiMatch = body.match(/^#\s*(\p{Emoji_Presentation}|\p{Extended_Pictographic})?/u);
  const emoji = get("emoji") || emojiMatch?.[1] || "🤖";

  return {
    name,
    description: get("description").slice(0, 200),
    division,
    emoji,
    color: get("color") || "slate",
    vibe: get("vibe"),
    filePath: relativePath,
  };
}

export { AGENT_DIVISIONS };
