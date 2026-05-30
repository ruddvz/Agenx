import { AgentGrid } from "@/components/AgentGrid";
import { getAllAgents } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AgentsPage() {
  const agents = getAllAgents();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Agent library</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          {agents.length} specialists from the Agenx roster. Search by name, division, or
          capability.
        </p>
      </header>
      <AgentGrid agents={agents} />
    </div>
  );
}
