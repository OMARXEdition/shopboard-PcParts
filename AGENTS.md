# Project instructions

ShopBoard is an English React, TypeScript and Vite fashion demo using the [course API](https://shopboard-api.vercel.app/). It has six pages, a shared cart and a client-side validated demo checkout. It has no backend, real order or payment flow. This repository continues the Day 4 React work.

Read `DESIGN.md` before styling changes, `docs/architecture.md` before moving module boundaries, and `CLAUDE.md` for lessons from earlier mistakes. Use the two committed Vercel React skills in `.claude/skills/` when changing rendering or composition. Keep feature components, state, API code and types together in `src/modules/<feature>/`; tests go in `tests/`. Keep `src/shared/` feature neutral. Keep `src/main.tsx` limited to bootstrapping React and global CSS.

Ask before adding dependencies or behavior beyond the homework. Let npm update the lockfile. Do not commit secrets, generated plans or unused assets. Commit messages must describe the change; pushing and publishing require an explicit instruction.

Validate all external JSON. Resolve the course API base from `VITE_SHOPBOARD_API_BASE` with a safe default. Store cart IDs and positive whole quantities only; derive prices from API data and calculate in cents. Keep cart state in its Context provider, local page state local, and effects limited to actual external synchronization. Keep actions safe under Strict Mode. Use semantic HTML, labels, visible focus and stable data keys. Use Jersey 10 only for large headings and standalone numbers.

Before completion run lint, format:check, typecheck, tests, build and audit. Confirm the production preview at 360 px and desktop, normal and failure API modes, keyboard navigation and Console output. Report checks as pending if browser access is unavailable.
