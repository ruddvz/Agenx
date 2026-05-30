#!/usr/bin/env bash
#
# generate-agents-index.sh — Build docs/AGENTS-INDEX.md from agent frontmatter.
#
# Usage: ./scripts/generate-agents-index.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT="$REPO_ROOT/docs/AGENTS-INDEX.md"

AGENT_DIRS=(
  academic design engineering finance game-development marketing paid-media
  product project-management sales spatial-computing specialized support testing
)

{
  echo "# Agent Index"
  echo ""
  echo "> Auto-generated. Run \`./scripts/generate-agents-index.sh\` to refresh."
  echo ""
  echo "| Agent | Division | Description | Path |"
  echo "|-------|----------|-------------|------|"
} > "$OUT"

for dir in "${AGENT_DIRS[@]}"; do
  [[ -d "$REPO_ROOT/$dir" ]] || continue
  while IFS= read -r -d '' f; do
    [[ "$(head -1 "$f")" == "---" ]] || continue
    agent_name=$(awk '/^name:/{sub(/^name:[[:space:]]*/,""); gsub(/^"|"$/,""); print; exit}' "$f")
    agent_desc=$(awk '/^description:/{sub(/^description:[[:space:]]*/,""); print; exit}' "$f")
    if [[ -z "$agent_desc" ]]; then
      agent_desc=$(awk '/^description: \|$/{getline; print; exit}' "$f")
    fi
    agent_desc=${agent_desc:0:120}
    rel="${f#"$REPO_ROOT/"}"
    echo "| ${agent_name:-?} | $dir | ${agent_desc} | \`$rel\` |" >> "$OUT"
  done < <(find "$REPO_ROOT/$dir" -name "*.md" -type f -print0 | sort -z)
done

echo "Wrote $OUT"
