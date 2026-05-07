#!/usr/bin/env bash
# Claude Company OS v2 — Setup Script
# Run: bash scripts/setup.sh
# This script fills in placeholder values across skill files.

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        Claude Company OS v2 — Setup Wizard           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo "This script fills in your company details across all skill files."
echo "You can re-run it at any time. It only replaces [PLACEHOLDER] tokens."
echo ""

# ────────────────────────────────────────────────────────────────────
# Step 1: Basic company info
# ────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}Step 1/5: Company basics${NC}"
echo ""

read -p "Company name: " COMPANY_NAME
read -p "What do you build? (one sentence): " PRODUCT_DESCRIPTION
read -p "Who do you serve? (your users): " CUSTOMER_DESCRIPTION
read -p "Current stage (pre-launch / live / scaling): " STAGE

# ────────────────────────────────────────────────────────────────────
# Step 2: Tech stack
# ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}Step 2/5: Tech stack${NC}"
echo ""

read -p "Primary language(s) [TypeScript]: " LANG
LANG=${LANG:-TypeScript}

read -p "Frontend framework [Next.js 16 App Router]: " FRONTEND
FRONTEND=${FRONTEND:-"Next.js 16 App Router"}

read -p "Database [PostgreSQL via Supabase]: " DATABASE
DATABASE=${DATABASE:-"PostgreSQL via Supabase"}

read -p "Auth provider [Supabase Auth]: " AUTH
AUTH=${AUTH:-"Supabase Auth"}

read -p "Hosting / infra [Vercel]: " HOSTING
HOSTING=${HOSTING:-Vercel}

read -p "Payment provider (or 'none') [Stripe]: " PAYMENTS
PAYMENTS=${PAYMENTS:-Stripe}

read -p "Email provider (or 'none') [Resend]: " EMAIL
EMAIL=${EMAIL:-Resend}

# ────────────────────────────────────────────────────────────────────
# Step 3: Team roles
# ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}Step 3/5: Team roles${NC}"
echo ""
echo "Which team roles do you have? (Press Enter to keep, type 'n' to remove)"

read -p "  Frontend team? [Y/n]: " HAS_FRONTEND
read -p "  Backend team? [Y/n]: " HAS_BACKEND
read -p "  Ops/DevOps team? [y/N]: " HAS_OPS
read -p "  Data/ML team? [y/N]: " HAS_DATA

HAS_FRONTEND=${HAS_FRONTEND:-Y}
HAS_BACKEND=${HAS_BACKEND:-Y}
HAS_OPS=${HAS_OPS:-N}
HAS_DATA=${HAS_DATA:-N}

# ────────────────────────────────────────────────────────────────────
# Step 4: Project details
# ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}Step 4/5: Project details${NC}"
echo ""

read -p "Main repo branch [main]: " MAIN_BRANCH
MAIN_BRANCH=${MAIN_BRANCH:-main}

read -p "Test command [npm test]: " TEST_CMD
TEST_CMD=${TEST_CMD:-"npm test"}

read -p "Build command [npm run build]: " BUILD_CMD
BUILD_CMD=${BUILD_CMD:-"npm run build"}

read -p "Dev server command [npm run dev]: " DEV_CMD
DEV_CMD=${DEV_CMD:-"npm run dev"}

# ────────────────────────────────────────────────────────────────────
# Step 5: Apply substitutions
# ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}Step 5/5: Applying your settings...${NC}"
echo ""

SKILLS_DIR=".claude/skills"

# Function to do sed replacement cross-platform (macOS + Linux)
replace() {
  local file="$1"
  local from="$2"
  local to="$3"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|${from}|${to}|g" "$file"
  else
    sed -i "s|${from}|${to}|g" "$file"
  fi
}

# Apply to core/company.md
COMPANY_FILE="${SKILLS_DIR}/core/company.md"
if [[ -f "$COMPANY_FILE" ]]; then
  replace "$COMPANY_FILE" "\[YOUR COMPANY NAME\]" "$COMPANY_NAME"
  replace "$COMPANY_FILE" "\[ONE SENTENCE — what your product/service does\]" "$PRODUCT_DESCRIPTION"
  replace "$COMPANY_FILE" "\[Your primary customers or users\]" "$CUSTOMER_DESCRIPTION"
  replace "$COMPANY_FILE" "\[e.g. pre-launch / live in production / scaling\]" "$STAGE"
  replace "$COMPANY_FILE" "\[e.g. TypeScript, Python\]" "$LANG"
  replace "$COMPANY_FILE" "\[e.g. Next.js 16 App Router, React 19, Tailwind CSS v4\]" "$FRONTEND"
  replace "$COMPANY_FILE" "\[e.g. PostgreSQL via Supabase, MongoDB\]" "$DATABASE"
  replace "$COMPANY_FILE" "\[e.g. Supabase Auth, Clerk, NextAuth\]" "$AUTH"
  replace "$COMPANY_FILE" "\[e.g. Vercel, AWS, Railway\]" "$HOSTING"
  replace "$COMPANY_FILE" "\[e.g. Stripe, Razorpay\]" "$PAYMENTS"
  replace "$COMPANY_FILE" "\[e.g. Resend, SendGrid\]" "$EMAIL"
  echo "  ✓ skills/core/company.md"
fi

# Apply test/build commands to project/workflows.md
WORKFLOWS_FILE="${SKILLS_DIR}/project/workflows.md"
if [[ -f "$WORKFLOWS_FILE" ]]; then
  replace "$WORKFLOWS_FILE" "npm test" "$TEST_CMD"
  replace "$WORKFLOWS_FILE" "npm run build" "$BUILD_CMD"
  replace "$WORKFLOWS_FILE" "npm run dev" "$DEV_CMD"
  echo "  ✓ skills/project/workflows.md"
fi

# Apply to planning files
DATE=$(date +%Y-%m-%d)
CHANGELOG_FILE="planning/CHANGELOG.md"
if [[ -f "$CHANGELOG_FILE" ]]; then
  replace "$CHANGELOG_FILE" "YYYY-MM-DD" "$DATE"
  echo "  ✓ planning/CHANGELOG.md"
fi

# Remove team files for roles not selected
if [[ "${HAS_OPS,,}" == "n" ]]; then
  rm -f "${SKILLS_DIR}/team/ops.md"
  echo "  ✓ Removed team/ops.md (not needed)"
fi

if [[ "${HAS_DATA,,}" == "n" ]]; then
  rm -f "${SKILLS_DIR}/team/data.md"
  echo "  ✓ Removed team/data.md (not needed)"
fi

if [[ "${HAS_FRONTEND,,}" == "n" ]]; then
  rm -f "${SKILLS_DIR}/team/frontend.md"
  echo "  ✓ Removed team/frontend.md (not needed)"
fi

if [[ "${HAS_BACKEND,,}" == "n" ]]; then
  rm -f "${SKILLS_DIR}/team/backend.md"
  echo "  ✓ Removed team/backend.md (not needed)"
fi

# ────────────────────────────────────────────────────────────────────
# Done
# ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   Setup complete!                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo "What's next:"
echo ""
echo "1. Fill in the remaining [PLACEHOLDER] values in:"
echo "   - .claude/skills/core/company.md       (non-negotiables, folder structure)"
echo "   - .claude/skills/project/architecture.md (your data model, decisions)"
echo "   - .claude/skills/project/workflows.md  (your exact CLI commands)"
echo "   - planning/EXECUTION-PLAN.md            (your roadmap phases)"
echo ""
echo "2. Commit the configured OS:"
echo "   git add .claude/ planning/ memory/"
echo "   git commit -m \"feat: configure Claude Company OS v2\""
echo ""
echo "3. Start your first session:"
echo "   Tell Claude: \"Read planning/CHANGELOG.md and planning/ACTIVE.md, then help me with [task]\""
echo ""
echo "4. See docs/how-to-add-skills.md for adding custom skills"
echo ""
