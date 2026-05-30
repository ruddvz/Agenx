import Link from "next/link";
import { notFound } from "next/navigation";
import { HealthBadge, StatusBadge } from "@/components/HealthBadge";
import { TaskList } from "@/components/TaskList";
import {
  getClientDetail,
  getClientManifestAgents,
  getClientPlanning,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getClientDetail(slug);
  if (!client) notFound();

  const planning = getClientPlanning(slug);
  const manifest = getClientManifestAgents(slug);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/clients" className="text-sm text-[var(--primary)] hover:underline">
          ← All clients
        </Link>
        <div className="mt-4 flex flex-wrap items-start gap-3">
          <h1 className="text-3xl font-bold text-[var(--text)]">{client.name}</h1>
          <HealthBadge health={client.health} />
          <StatusBadge status={client.status} />
        </div>
        <p className="mt-2 text-[var(--text-muted)]">{client.about}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--text-muted)]">Industry</dt>
            <dd className="font-medium">{client.industry || "—"}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-muted)]">Market</dt>
            <dd className="font-medium">{client.market || "—"}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-muted)]">Onboarded</dt>
            <dd className="font-medium">{client.onboardedAt || "—"}</dd>
          </div>
          {client.productUrl && (
            <div>
              <dt className="text-[var(--text-muted)]">Product</dt>
              <dd>
                <a
                  href={client.productUrl}
                  className="font-medium text-[var(--primary)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {client.productUrl}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="mb-4 text-xl font-semibold">
            Tasks
          </h2>
          {planning ? (
            <>
              {planning.active.phase && (
                <p className="mb-3 text-sm text-[var(--text-muted)]">
                  Phase: {planning.active.phase}
                  {planning.active.lastUpdated && ` · Updated ${planning.active.lastUpdated}`}
                </p>
              )}
              <TaskList
                blocked={planning.active.blocked}
                inProgress={planning.active.inProgress}
                upNext={planning.active.upNext}
                done={planning.active.done}
              />
            </>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No ACTIVE.md found.</p>
          )}
        </section>

        <section aria-labelledby="changelog-heading">
          <h2 id="changelog-heading" className="mb-4 text-xl font-semibold">
            Recent sessions
          </h2>
          {planning && planning.changelog.length > 0 ? (
            <ul className="space-y-4">
              {planning.changelog.slice(0, 5).map((e) => (
                <li
                  key={e.rawHeader}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <p className="text-xs text-[var(--text-muted)]">{e.date}</p>
                  <h3 className="font-medium text-[var(--text)]">{e.title || e.rawHeader}</h3>
                  {e.status && (
                    <p className="mt-1 text-sm capitalize text-[var(--text-muted)]">
                      Status: {e.status}
                    </p>
                  )}
                  {e.nextUp ? (
                    <p className="mt-2 text-sm">
                      <span className="font-medium">Next up:</span> {e.nextUp}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                      Missing Next up
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No CHANGELOG entries yet.</p>
          )}
        </section>
      </div>

      <section aria-labelledby="agents-heading">
        <h2 id="agents-heading" className="mb-4 text-xl font-semibold">
          Activated agents
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--bg)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Agent
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Source
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Customised
                </th>
              </tr>
            </thead>
            <tbody>
              {client.agents.map((a) => (
                <tr key={a.sourceFile} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">{a.name}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-[var(--primary)]">{a.sourceFile}</code>
                  </td>
                  <td className="px-4 py-3">{a.customised ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {manifest.length > 0 && (
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Install:{" "}
            <code>
              ./scripts/agency-install.sh --client {slug} --tool claude-code
            </code>
          </p>
        )}
      </section>

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="mb-4 text-xl font-semibold">
          Client skills
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {client.skills.map((s) => (
            <li
              key={s.file}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <code className="text-sm text-[var(--primary)]">{s.file}</code>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{s.purpose}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
