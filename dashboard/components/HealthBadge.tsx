import type { ClientSummary } from "@/lib/types";

const styles = {
  green: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  yellow: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
  red: "bg-red-500/15 text-red-700 dark:text-red-300",
};

const labels = { green: "Healthy", yellow: "Attention", red: "At risk" };

export function HealthBadge({ health }: { health: ClientSummary["health"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[health]}`}
      aria-label={`Health: ${labels[health]}`}
    >
      {labels[health]}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-full bg-[var(--primary-muted)] px-2.5 py-0.5 text-xs font-medium capitalize text-[var(--primary)]">
      {status}
    </span>
  );
}
