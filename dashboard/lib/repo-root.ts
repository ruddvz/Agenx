import path from "path";
import fs from "fs";

export function getRepoRoot(): string {
  const env = process.env.AGENX_REPO_ROOT;
  if (env) return path.resolve(env);
  return path.resolve(process.cwd(), "..");
}

export function assertRepoRoot(): string {
  const root = getRepoRoot();
  const clientsDir = path.join(root, "clients");
  if (!fs.existsSync(clientsDir)) {
    throw new Error(
      `Agenx repo not found at ${root}. Set AGENX_REPO_ROOT to the repository root.`,
    );
  }
  return root;
}
