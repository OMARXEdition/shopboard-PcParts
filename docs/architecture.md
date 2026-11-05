# Architecture

## Module boundaries

- `src/app/`: page composition and provider wiring.
- `src/modules/catalog/`: product types, immutable search/filter/sort logic, catalog and product-card components.
- `src/modules/cart/`: cart reducer, persistence, selectors and cart UI.
- `src/modules/product-detail/`: the selected-product dialog and specifications.
- `src/shared/`: API validation boundary, money formatting, one-component UI files and reusable hooks.
- `public/data/products.json`: the sole catalog source, fetched over HTTP.
- `public/photos/`: real, licensed category photographs and source metadata; `public/art/` contains the original pixel hero and logo.

Keep components near the feature behavior they render. Pure functions and reducers
have no DOM access. Shared UI may use DOM APIs for focus and dialog behavior;
application logic should not.

## Data flow

The application requests the JSON through the shared fetch boundary. Runtime
validation establishes the typed product catalog. Loading, success, empty and
error are distinct UI states; retry starts a new request. Abort or ignore stale
requests so Strict Mode and unmounts do not produce outdated state updates.

Search and category filtering operate on derived copies. Sorting changes the
view, never the source catalog. Default order is the original JSON order.

A product detail dialog receives the selected product and cart-add action. Cart
state is shared through context/reducer boundaries. Persist only IDs and positive
whole quantities. Reconcile saved IDs after a successful catalog load, not during
loading or a failed fetch. Derive names, images and prices from the current
catalog. Use integer cents for calculations and format USD at the display edge.

## Persistence and failure handling

Invalid storage must not crash the UI. Browser storage can fail on both reads and
writes; retain a usable in-memory cart. Do not save an empty initial loading cart
over valid persisted state. A missing product photo gets a fallback rather
than an endless reload loop.

## Static hosting

Vite's base path is `/Shopboard-PcParts/`. Resolve JSON and images against that
base. Product details are dialogs, so no server route rewriting is required.
GitHub Actions publishes built dist content only. Project-local agent skills are
not loaded by the browser or included in the application module graph.

## Verification

Test external data validation, fetch failures/retry, derived catalog behavior,
reducer/persistence behavior, and accessible component interactions. Tests use
Vitest and React Testing Library in jsdom. Production preview checks cover visual
layout, images, focus behavior, Console errors and network paths. Automated test
success alone does not establish a visual check.
