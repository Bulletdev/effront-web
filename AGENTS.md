<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Related project: ProStaff ecosystem

`effront-web` is the institutional site for the company behind ProStaff, ArenaBR, scrims.lol and peneira.gg — it is the "holding" repo in that ecosystem, per `/home/bullet/PROJETOS/ProStaffWorkspace/.claude/CLAUDE.md`, which is the canonical index of every repo in the ecosystem (stack, purpose, where each one's own `CLAUDE.md` lives). Read that file first for any task that touches more than just this repo, or that needs context on a sibling product.

The ProStaff backend itself lives in a sibling repo, not in this one:

- **Path**: `/home/bullet/PROJETOS/prostaff-api` (full context in `.claude/CLAUDE.md` there — the root `AGENTS.md` is the same doc, just Codex-branded; `.claude/CLAUDE.md` is the one meant for Claude sessions)
- **Stack**: Ruby on Rails 7.2 API-only, Postgres, Redis, Sidekiq, Action Cable
- **Base URL**: `http://localhost:3333/api/v1` locally
- **Auth**: JWT — `POST /auth/login` returns `access_token`/`refresh_token`; send `Authorization: Bearer {access_token}`
- **Response shape**: `{ "message": "...", "data": { ... } }`

`prostaff-api/.claude/agents/` also has domain-specific subagents (rails-api-engineer, lol-domain-expert, qa-specialist, security-specialist, etc.) — most are backend-only and not relevant here, but `nextjs-frontend-specialist` and `arenabr-frontend-specialist` cover patterns shared with this repo's stack.

There is currently no integration between `effront-web` and this API (no fetch calls to it in `src/`). If a task here needs to call it, read `/home/bullet/PROJETOS/prostaff-api/.claude/CLAUDE.md` for endpoints/auth details first rather than guessing.

## Standing rules (ecosystem-wide, from prostaff-api's Claude rules)

These apply here too, not just in `prostaff-api`:

1. **No emojis** — never in code, comments, logs, commit messages, or any output.
2. **No auto-commits** — never `git add`/`commit`/`push` without explicit permission; show `git diff` and wait for approval. Never `git add .` or `git add -A` — add files by name.
3. **No auto-documentation** — never create README/CHANGELOG/other `.md` files unless explicitly requested. Code comments and doc comments are fine.
4. **Ask before**: commits, creating new files (especially `.md`), destructive commands, and any generated/config file changes.
