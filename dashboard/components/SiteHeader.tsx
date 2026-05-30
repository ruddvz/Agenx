import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/clients", label: "Clients" },
  { href: "/agents", label: "Agents" },
  { href: "/alerts", label: "Alerts" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-[var(--text)]">
            Agenx
          </span>
          <span className="rounded-md bg-[var(--primary-muted)] px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
            Dashboard
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
