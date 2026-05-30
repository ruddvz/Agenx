import Link from "next/link";
import { ClientCard } from "@/components/ClientCard";
import { AlertList } from "@/components/AlertList";
import { getAllClients, getAlerts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const clients = getAllClients();
  const allAlerts = getAlerts();
  const alerts = allAlerts.slice(0, 5);
  const hasAlerts = allAlerts.length > 0;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Portfolio</h1>
        <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
          Live view of client workspaces from the <code className="text-sm">clients/</code> directory.
          Data is read from the repo on each request.
        </p>
      </header>

      {hasAlerts && (
        <section aria-labelledby="attention-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="attention-heading" className="text-xl font-semibold text-[var(--text)]">
              Needs attention
            </h2>
            <Link href="/alerts" className="text-sm font-medium text-[var(--primary)] hover:underline">
              View all alerts
            </Link>
          </div>
          <AlertList alerts={alerts} />
        </section>
      )}

      <section aria-labelledby="clients-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="clients-heading" className="text-xl font-semibold text-[var(--text)]">
            Clients ({clients.length})
          </h2>
          <Link href="/clients" className="text-sm font-medium text-[var(--primary)] hover:underline">
            View all
          </Link>
        </div>
        {clients.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border)] p-12 text-center text-[var(--text-muted)]">
            No clients found. Copy <code>clients/_template</code> to onboard your first client.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {clients.map((c) => (
              <li key={c.slug}>
                <ClientCard client={c} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
