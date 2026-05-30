import type { Task } from "@/lib/types";

const sectionTitles: Record<string, string> = {
  blocked: "Blocked",
  in_progress: "In progress",
  up_next: "Up next",
  done: "Done",
};

const sectionStyles: Record<string, string> = {
  blocked: "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30",
  in_progress: "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30",
  up_next: "border-[var(--border)] bg-[var(--surface)]",
  done: "border-[var(--border)] bg-[var(--bg)] opacity-80",
};

export function TaskList({
  blocked,
  inProgress,
  upNext,
  done,
}: {
  blocked: Task[];
  inProgress: Task[];
  upNext: Task[];
  done: Task[];
}) {
  const groups = [
    { key: "blocked", items: blocked },
    { key: "in_progress", items: inProgress },
    { key: "up_next", items: upNext },
    { key: "done", items: done },
  ] as const;

  return (
    <div className="space-y-4">
      {groups.map(({ key, items }) => {
        if (items.length === 0) return null;
        return (
          <section
            key={key}
            className={`rounded-lg border p-4 ${sectionStyles[key]}`}
            aria-labelledby={`tasks-${key}`}
          >
            <h3 id={`tasks-${key}`} className="mb-2 text-sm font-semibold text-[var(--text)]">
              {sectionTitles[key]}
            </h3>
            <ul className="space-y-2">
              {items.map((t) => (
                <li key={t.text} className="text-sm text-[var(--text)]">
                  {t.text}
                  {t.owner && (
                    <span className="ml-2 text-[var(--text-muted)]">({t.owner})</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
