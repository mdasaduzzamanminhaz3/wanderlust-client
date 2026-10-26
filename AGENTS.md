# wanderlust

Next.js 16.4.3 app (App Router) created by `create-next-app`, then extended with Tailwind v4 + shadcn and the React Compiler.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Dev: `npm run dev` — Build: `npm run build` — Prod: `npm run start` (all via Turbopack).
- Lint: `npm run lint` (ESLint 9 flat config; the script is just `eslint`, no path args needed).
- Typecheck: `npx tsc --noEmit` — **no typecheck script exists**; run lint + tsc to verify changes (both pass on a clean tree).
- **No tests exist** and no test runner is installed. Don't invent one or reference one.

## Framework quirks

- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`). Don't add manual `useMemo`/`useCallback`/`React.memo` — memoization is automatic.
- Tailwind **v4** with no config file: theme tokens are CSS variables in `src/app/globals.css` (`@theme inline`). CSS is compiled through the `@tailwindcss/turbopack` loader wired in `next.config.ts` — don't remove the `turbopack` rules block. `globals.css` also imports `shadcn/tailwind.css`, which defines the design tokens the components depend on.
- Path alias: `@/*` → `./src/*`. App lives under `src/app`.

## shadcn / UI

- Add components with `npx shadcn add <name>` (config in `components.json`; style `base-nova`, RSC on, lucide icons). Output goes to `src/components/ui`.
- Generated components are built on `@base-ui/react` (Base UI) primitives, **not** Radix — don't expect Radix imports/props to work in these files.
- `cn` from `@/lib/utils` re-exports the `cn` npm package, not the usual clsx+tailwind-merge combo.
