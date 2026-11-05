# Shopboard-PcParts implementation plan

> For agentic workers: use the project-local executing-plans or subagent-driven-development skill; read AGENTS.md and Design.md first.

**Goal:** Build a new retro React TypeScript PC-parts demo storefront with a fetched JSON catalog and persistent cart.

**Architecture:** Feature modules for catalog, cart and product details; app composition and shared API/UI boundaries. A static HTTP JSON endpoint provides all product data. No backend is required.

**Stack:** Vite, React, strict TypeScript, plain CSS, Vitest, React Testing Library, ESLint, Prettier, Husky and lint-staged.

**Design:** The approved specification is [Design.md](../../../Design.md).

## Deliverables

- [ ] Initialize the separate sibling repository without changing Shopboard. Configure scripts, locked dependencies and pre-commit checks.
- [ ] Create portable project-local Superpowers skills, preserving source information and license. Write project instructions, design, architecture, README and an honest debugging template.
- [ ] Add 16 demo products, two for each approved hardware category, in public/data/products.json. Validate data fetched via the shared HTTP boundary.
- [ ] Implement catalog loading, error/retry, empty and broken-image states; compose search/category/sorting while retaining default order.
- [ ] Build the reference-inspired retro layout and original pixel SVG artwork. Apply Jersey 10 only to the approved text roles.
- [ ] Implement accessible product-detail and cart dialogs, reducer/context cart state, safe persistence and integer-cent totals.
- [ ] Add one Pages workflow that checks and builds before publishing only dist. Keep actual GitHub creation and pushing out of this local implementation task.

## Acceptance and evidence

- Run tests that fail before implementing their corresponding behavior, then record the passing checks.
- Test fetch success/failure, invalid JSON, invalid records, retry, empty results and base-path resolution.
- Test search/filter/sort composition and source-order preservation.
- Test duplicate additions, decrement-to-removal, remove/clear, counts/totals and safe persistence restoration/failure.
- Run clean install, lint, formatting checks, typecheck, test suite, dependency audit and production build.
- Inspect the production preview at 360 px and desktop, keyboard focus, illustrations, Console and network requests. If browser tooling is unavailable, explicitly leave visual verification pending.

## Execution rulings

- The hosted JSON file is a static data endpoint, not a backend API.
- Product names/descriptions with embedded numbers keep the normal body font.
- Original category illustrations use SVG pixel artwork rather than external manufacturer photography.
- No accounts, payment flow, compatibility claims, 3D scene or router is required for version one.
