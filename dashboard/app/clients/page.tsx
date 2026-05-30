import { ClientCard } from "@/components/ClientCard";
import { getAllClients } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function ClientsPage() {
  const clients = getAllClients();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Clients</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          All workspaces under <code className="text-sm">clients/</code> (excluding{" "}
          <code className="text-sm">_template</code>).
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => (
          <li key={c.slug}>
            <ClientCard client={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
