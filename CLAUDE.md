# React project rules

Read `AGENTS.md` and `DESIGN.md` before UI changes, and `docs/architecture.md` before moving feature boundaries. Keep one React component per file where it has a distinct responsibility. Place feature code under `src/modules/<feature>/`, app composition under `src/app/`, and shared UI under `src/components/`. Do not add plans, prompts, chat logs, unused files or unapproved product behavior.

Validate API JSON before it becomes a Product. Keep the cart provider as the only owner of shared cart state; save only IDs and quantities, and derive count, price and visible products. Keep search and form state local. Use stable product IDs for keys. Lazy-load route modules and put Suspense and retryable error handling inside the shared layout. Avoid fetch effects when Suspense already owns loading.

## Rules learned from earlier mistakes

- A catalog parser once asserted `data as Product[]` and trusted external input. Narrow unknown data field by field and reject malformed responses.
- A product list once used index keys, which moved card state to another item after sorting. Use API IDs for rendered products.
- A cart update once mutated an item and reused the same array, leaving the UI stale. Use reducer actions that return new state.
- A previous deployment used unbuilt source and a local TypeScript import failed in the browser. Publish only `dist` and inspect network requests from the built preview.
- An earlier README described a dialog after the app had moved to routes. Update the route table and component tree whenever navigation changes.
- A file called `Backpack.jpg` displayed a forest. Inspect downloaded pixels and licenses before adding photos to the manifest; a filename alone does not prove the image matches the product.

Run lint, format:check, typecheck, tests and build before reporting success. Confirm delayed, failed and empty API modes in the browser, plus mobile layout and keyboard access. Do not claim a Console or React DevTools check without observing it.
