import Link from "next/link";
import type { Alert } from "@/lib/types";

const severityStyles = {
  critical: "border-l-red-500 bg-red-50/50 dark:bg-red-950/20",
  warning: "border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
  info: "border-l-[var(--primary)] bg-[var(--primary-muted)]",
};

export function AlertList({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) {
    return (
      <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--text-muted)]">
        No alerts. All clients look healthy.
      </p>
    );
  }

  return (
    <ul className="space-y-3" aria-live="polite">
      {alerts.map((a) => (
        <li
          key={a.id}
          className={`rounded-lg border border-[var(--border)] border-l-4 p-4 ${severityStyles[a.severity]}`}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {a.severity} · {a.clientName}
              </p>
              <h3 className="font-semibold text-[var(--text)]">{a.title}</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{a.detail}</p>
            </div>
            <Link
              href={a.href}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] px-4 text-sm font-medium text-white hover:opacity-90"
            >
              View client
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
