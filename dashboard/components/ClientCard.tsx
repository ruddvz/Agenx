import Link from "next/link";
import type { ClientSummary } from "@/lib/types";
import { HealthBadge, StatusBadge } from "./HealthBadge";

export function ClientCard({ client }: { client: ClientSummary }) {
  return (
    <Link
      href={`/clients/${client.slug}`}
      className="group flex min-h-[120px] flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
          {client.name}
        </h2>
        <HealthBadge health={client.health} />
      </div>
      <p className="mb-3 line-clamp-2 text-sm text-[var(--text-muted)]">
        {client.industry}
        {client.market ? ` · ${client.market}` : ""}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <StatusBadge status={client.status} />
        <span>{client.agentCount} agents</span>
        {client.openBlockers > 0 && (
          <span className="text-red-600 dark:text-red-400">
            {client.openBlockers} blocked
          </span>
        )}
      </div>
      {client.lastNextUp && (
        <p className="mt-2 truncate text-xs text-[var(--text-muted)]">
          Next: {client.lastNextUp}
        </p>
      )}
    </Link>
  );
}
