"use client";

import { useMemo, useState } from "react";
import type { AgentRecord } from "@/lib/types";

export function AgentGrid({ agents }: { agents: AgentRecord[] }) {
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("all");

  const divisions = useMemo(() => {
    const set = new Set(agents.map((a) => a.division));
    return ["all", ...Array.from(set).sort()];
  }, [agents]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return agents.filter((a) => {
      if (division !== "all" && a.division !== division) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.division.toLowerCase().includes(q) ||
        a.vibe.toLowerCase().includes(q)
      );
    });
  }, [agents, query, division]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="agent-search">
          Search agents
        </label>
        <input
          id="agent-search"
          type="search"
          placeholder="Search by name, division, or capability…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[44px] flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        />
        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          aria-label="Filter by division"
          className="min-h-[44px] rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)]"
        >
          {divisions.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All divisions" : d}
            </option>
          ))}
        </select>
      </div>
      <p className="text-sm text-[var(--text-muted)]">
        {filtered.length} of {agents.length} agents
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <li
            key={a.filePath}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                {a.emoji}
              </span>
              <h3 className="font-semibold text-[var(--text)]">{a.name}</h3>
            </div>
            <p className="mb-2 line-clamp-3 text-sm text-[var(--text-muted)]">{a.description}</p>
            <p className="text-xs text-[var(--text-muted)]">
              <span className="font-medium capitalize">{a.division}</span>
              {a.vibe ? ` · ${a.vibe}` : ""}
            </p>
            <code className="mt-2 block truncate text-xs text-[var(--primary)]">{a.filePath}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
