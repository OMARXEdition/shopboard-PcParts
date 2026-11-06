# Architecture

## Module boundaries

- `src/app/`: page composition and provider wiring.
- `src/components/`: UI without a feature module, grouped under `home/`, `layout/`, `notification/` and `ui/`. Home pointer behavior and notification timing live beside their components.
- `src/modules/catalog/`: product types, API validation and loading, immutable search/filter/sort logic, product imagery, credits and catalog components.
- `src/modules/cart/`: cart reducer, persistence, selectors and cart UI.
- `src/modules/product-detail/`: selected-product state, dialog, feature types and specification rendering. Details consume the selected catalog product; they do not issue a duplicate request.
- `src/shared/`: feature-neutral JSON request client and non-visual utilities used across features, such as money formatting.
- `public/data/products.json`: the sole catalog source, fetched over HTTP.
- `public/photos/`: real, licensed category photographs and source metadata; `public/art/` contains the original pixel hero and logo.

Keep feature components near the behavior they render. Pure functions and reducers
have no DOM access. Reusable UI in `src/components/ui/` may use DOM APIs for focus
and dialog behavior; application logic should not.

## Data flow

The catalog feature requests JSON through the shared, feature-neutral API client.
Catalog API code validates unknown JSON before creating typed Product records.
Catalog loading, success, empty and error are distinct UI states; retry starts a
new request. Abort stale requests so Strict Mode and unmounts do not produce
outdated state updates. The application composes catalog and cart features.

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

Vite's default base path is `/`. The GitHub Pages workflow builds with
`/Shopboard-PcParts/` for its repository subpath. Resolve JSON and images against
the active build base. Product details are dialogs, so no server route rewriting
is required. GitHub Actions publishes built dist content only. Project-local agent skills are
not loaded by the browser or included in the application module graph.

## Verification

Test external data validation, fetch failures/retry, derived catalog behavior,
reducer/persistence behavior, and accessible component interactions. Tests use
Vitest and React Testing Library in jsdom. Production preview checks cover visual
layout, images, focus behavior, Console errors and network paths. Automated test
success alone does not establish a visual check.
