#!/usr/bin/env bash
#
# agency-install.sh — Install agents and client skills for one Agenx client.
#
# Usage:
#   ./scripts/agency-install.sh --client <slug> [--tool claude-code|copilot] [--help]
#
# Copies:
#   - Client voice + stack skills into the tool's agent directory
#   - Each agent listed in clients/<slug>/agents.manifest (or README Deployed Agents table)
#
# Examples:
#   ./scripts/agency-install.sh --client bookphysio-in --tool claude-code
#   ./scripts/agency-install.sh --client bookphysio-in --tool copilot

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

CLIENT=""
TOOL="claude-code"

usage() {
  sed -n '3,14p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --client) CLIENT="${2:-}"; shift 2 ;;
    --tool)   TOOL="${2:-}"; shift 2 ;;
    --help|-h) usage ;;
    *) echo "Unknown option: $1" >&2; usage ;;
  esac
done

if [[ -z "$CLIENT" ]]; then
  echo "ERROR: --client is required (e.g. bookphysio-in)" >&2
  exit 1
fi

CLIENT_DIR="$REPO_ROOT/clients/$CLIENT"
if [[ ! -d "$CLIENT_DIR" ]]; then
  echo "ERROR: client workspace not found: $CLIENT_DIR" >&2
  exit 1
fi

resolve_agent_paths() {
  local manifest="$CLIENT_DIR/agents.manifest"
  if [[ -f "$manifest" ]]; then
    grep -v '^\s*#' "$manifest" | grep -v '^\s*$' || true
    return
  fi
  # Fallback: parse paths from README Deployed Agents table
  if [[ -f "$CLIENT_DIR/README.md" ]]; then
    grep -oE '`[a-z0-9_-]+/[a-z0-9_.-]+\.md`' "$CLIENT_DIR/README.md" \
      | tr -d '`' \
      | grep -E '^(engineering|design|marketing|product|support|testing|sales|paid-media|specialized|project-management|academic|finance|game-development|spatial-computing)/' \
      || true
  fi
}

install_skills_claude() {
  local dest="${HOME}/.claude/agents"
  mkdir -p "$dest"
  if [[ -f "$CLIENT_DIR/skills/voice.md" ]]; then
    cp "$CLIENT_DIR/skills/voice.md" "$dest/${CLIENT}-voice.md"
    echo "[OK] Voice skill -> $dest/${CLIENT}-voice.md"
  fi
  if [[ -f "$CLIENT_DIR/skills/stack.md" ]]; then
    cp "$CLIENT_DIR/skills/stack.md" "$dest/${CLIENT}-stack.md"
    echo "[OK] Stack skill -> $dest/${CLIENT}-stack.md"
  fi
}

install_skills_copilot() {
  local dest_github="${HOME}/.github/agents"
  local dest_copilot="${HOME}/.copilot/agents"
  mkdir -p "$dest_github" "$dest_copilot"
  if [[ -f "$CLIENT_DIR/skills/voice.md" ]]; then
    cp "$CLIENT_DIR/skills/voice.md" "$dest_github/${CLIENT}-voice.md"
    cp "$CLIENT_DIR/skills/voice.md" "$dest_copilot/${CLIENT}-voice.md"
    cp "$CLIENT_DIR/skills/stack.md" "$dest_github/${CLIENT}-stack.md" 2>/dev/null || true
    cp "$CLIENT_DIR/skills/stack.md" "$dest_copilot/${CLIENT}-stack.md" 2>/dev/null || true
    echo "[OK] Client skills -> ~/.github/agents and ~/.copilot/agents"
  fi
}

install_agents_to() {
  local dest="$1"
  local also_dest="${2:-}"
  mkdir -p "$dest"
  [[ -n "$also_dest" ]] && mkdir -p "$also_dest"

  local count=0
  local rel
  while IFS= read -r rel; do
    [[ -z "$rel" ]] && continue
    local src="$REPO_ROOT/$rel"
    if [[ ! -f "$src" ]]; then
      echo "[WARN] Agent file missing: $rel" >&2
      continue
    fi
    local base
    base="$(basename "$src")"
    cp "$src" "$dest/$base"
    [[ -n "$also_dest" ]] && cp "$src" "$also_dest/$base"
    count=$((count + 1))
  done < <(resolve_agent_paths)

  echo "[OK] $count client agents -> $dest"
}

case "$TOOL" in
  claude-code)
    install_skills_claude
    install_agents_to "${HOME}/.claude/agents"
    ;;
  copilot)
    install_skills_copilot
    install_agents_to "${HOME}/.github/agents" "${HOME}/.copilot/agents"
    ;;
  *)
    echo "ERROR: unsupported tool '$TOOL'. Use claude-code or copilot." >&2
    exit 1
    ;;
esac

echo ""
echo "Client '$CLIENT' installed for $TOOL."
echo "Load skills: ${CLIENT}-voice.md and ${CLIENT}-stack.md when working on this client."
