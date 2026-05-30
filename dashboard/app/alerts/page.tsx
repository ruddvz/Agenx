import { AlertList } from "@/components/AlertList";
import { getAlerts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AlertsPage() {
  const alerts = getAlerts();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Alerts</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Blocked tasks, incomplete skills, missing handoffs, and stale session logs.
        </p>
      </header>
      <AlertList alerts={alerts} />
    </div>
  );
}
