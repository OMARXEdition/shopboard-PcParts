# AGENTS.md

## Project and boundaries

Shopboard-PcParts is an English React + TypeScript + Vite demo storefront.
It fetches a hosted JSON catalog, uses USD demo prices and real hardware photographs,
and runs without a backend. No accounts, real checkout, or compatibility claims.
Keep this repository separate from the original Shopboard project.

## Workflow

- Read `Design.md` before UI or styling changes and `docs/architecture.md` before changing module boundaries.
- Summarize a new task and clarify material missing requirements. Explicit approval of a discussed plan authorizes its implementation.
- Read `CLAUDE.md` for React workflow and observed mistakes. The only project-local skill packages belong under `.claude/skills/`: Vercel React best practices and composition patterns. Apply them when changing React rendering or component composition.
- Explain each change: what changed, where, why, and how it was checked.
- Ask before adding unapproved dependencies or new product behavior.
- Let npm generate the lockfile. Never manually edit node_modules or commit secrets or .env files.
- Use descriptive commits. Publishing, creating a GitHub repository, and pushing need an explicit user instruction.

## Architecture and UI

- Keep feature components, logic, state, tests, and types grouped in `src/modules/`; app wiring belongs in `src/app/` and reusable infrastructure in `src/shared/`.
- React components own UI rendering. Pure logic, data validation, and reducers must not query or mutate the DOM.
- Fetch product data through the shared API boundary; never hardcode the catalog in JSX or silently replace a failed request with another catalog.
- Validate external JSON at runtime. Resolve API and image URLs relative to Vite's base so GitHub Pages subpaths work.
- Keep product IDs stable. Store only IDs and positive integer quantities; derive names and prices from the loaded catalog. Calculate money in cents.
- Keep effects and event handling safe under React Strict Mode. One action must produce one cart update.
- Use semantic HTML, labels for controls, focus management, and keyboard-operable dialogs. Mobile-first min-width media queries, no !important.
- Jersey 10 is for headings, menu labels, and standalone numeric UI. Product names, descriptions, specs, form fields, and numbers embedded in those strings use the normal body font.
- Images must visibly load and match the hardware category. Record asset origins in `docs/asset-sources.md`.

## Verification

Use package.json scripts: `npm ci`, `npm run dev`, `npm run lint`, `npm run format`,
`npm run format:check`, `npm run typecheck`, `npm test`, `npm run build`, and
`npm run preview`. On Windows use npm.cmd/npx.cmd if PowerShell blocks .ps1 files.

Before completion run lint, formatting checks, typecheck, tests, and production
build. Inspect audit findings. Verify the production preview at 360 px and desktop,
with keyboard navigation, correct images, JSON requests, and a clean Console.
Report visual checks as pending if browser tooling is unavailable.

The pre-commit hook runs lint-staged and typecheck; lint-staged configuration lives
in package.json. CI installs locked dependencies and deploys only dist.

## Rules from Shopboard's mistakes

- A local TypeScript import was suggested for a deployed page and failed with a MIME error. Check the environment before giving Console commands; production serves built assets.
- An old Pages workflow uploaded unbuilt source. Keep one workflow that installs, checks, builds, and publishes dist.
- A lint script existed without its executable installed. Verify clean installation and run checks rather than inferring success from configuration.
- The debugging log described refactoring instead of bugs. Record observed symptoms, evidence, causes, fixes, and AI involvement; distinguish reconstructed history from direct observation.
- Architecture instructions still referenced JavaScript after a migration. Update paths and conventions when the architecture changes; React replaces the old single-DOM-file rule.
- Shared toast behavior had to be extracted after duplication. Put reusable behavior in shared modules and import it from features.

## Decorative motion

- Keep the shared pointer-reactive hero background decorative (`aria-hidden` and `pointer-events: none`). Coalesce pointer input through requestAnimationFrame rather than updating React state per movement.
- Disable movement for reduced motion and coarse pointers, reset on pointer exit/blur, and remove listeners/cancel queued frames on cleanup. Preserve keyboard operation and static fallback visuals.
- Use local licensed real hardware photographs for products and original pixel artwork for the hero. Preserve retro pixel decoration separately; record source, author, license and any resizing, with visible photo credits.
