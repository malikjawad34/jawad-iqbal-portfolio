<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TOP PRIORITY RULE: LOCALHOST VERIFICATION BEFORE LIVE DEPLOYMENT

> [!IMPORTANT]
> **MANDATORY PRE-DEPLOYMENT PROTOCOL**:
> **NEVER** push code to remote Git or trigger a live production deployment automatically.
> 1. Always implement and test changes locally on `localhost` first.
> 2. Ask the USER to test and review the changes on localhost.
> 3. **WAIT** for the USER's explicit confirmation and approval.
> 4. **ONLY** after the USER explicitly confirms and says to push/deploy, commit and push the code to live.
