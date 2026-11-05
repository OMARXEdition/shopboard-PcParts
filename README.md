# Shopboard-PcParts

A retro PC-parts demo storefront built with React, TypeScript and Vite. Search,
filter and sort the catalog, inspect product details, and keep a cart across
refreshes. The hero uses an original pixel-art computer; products use licensed
real hardware photographs.

USD prices, names and specifications are sample data. Photographs represent
hardware categories, not exact fictional models. There are no accounts, payments,
real orders, backend service, or compatibility checker.

## Run and check

```sh
npm ci
npm run dev
```

Open the printed URL, including `/Shopboard-PcParts/`. On Windows use npm.cmd or
npx.cmd if PowerShell blocks the .ps1 launchers.

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run preview
```

`npm run format` applies Prettier. npm generates the lockfile. Husky runs
lint-staged and typecheck before a commit; lint-staged settings are in package.json.

## Component tree, props and state

Each named component has its own file. Prop-bearing components declare a named
TypeScript props interface. Hooks contain reusable behavior without rendering.

```text
main (StrictMode)
└─ App
   └─ CartProvider
      └─ Store
         ├─ Header
         ├─ Hero → ReactiveBackground
         ├─ Catalog → ProductCard → WindowBar, ProductImage
         ├─ Footer → PhotoCredits
         ├─ ProductDetails → Modal, ProductImage (when selected)
         ├─ CartDrawer → Modal, ProductImage (when open)
         └─ Toast
```

| Component          | Props                                        | State and behavior                                                                                 |
| ------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| App                | None                                         | Loaded products, fetch error, retry attempt; aborts stale requests.                                |
| CartProvider       | products, children                           | Cart reducer state; restores and persists validated lines.                                         |
| Store              | products                                     | Selected product and cart visibility; uses shared toast state.                                     |
| Header             | openCart                                     | Reads cart count from context; no local state.                                                     |
| Hero               | None                                         | Composes pixel artwork and pointer decoration; no local state.                                     |
| Footer             | None                                         | Project text and photo attribution; no local state.                                                |
| Catalog            | products, onView, onAdd                      | Search, selected category and sort order; derives visible products.                                |
| ProductCard        | product, position, onView, onAdd             | Stateless card; callbacks request details or add.                                                  |
| ProductDetails     | product, onClose, onAdd                      | Stateless selected-product content inside Modal.                                                   |
| CartDrawer         | products, onClose                            | Reads cart context; dispatches quantity, remove and clear actions.                                 |
| Modal              | title, closeLabel, onClose, children, drawer | Dialog ref and effect manage modal opening, scroll lock and focus restoration.                     |
| ProductImage       | path, alt, className                         | Failed image path selects an accessible fallback.                                                  |
| WindowBar          | children                                     | Stateless decorative window title bar.                                                             |
| Toast              | message                                      | Stateless live-region feedback.                                                                    |
| PhotoCredits       | None                                         | Stateless source and license links.                                                                |
| ReactiveBackground | None                                         | Element ref; usePointerBackground manages listeners and queued frames without React pointer state. |

`useCart` exposes the shared context. `useToast` owns message state and dismissal
timing. `usePointerBackground` coalesces pointer events into animation frames,
respects reduced motion and coarse pointers, and cleans up listeners. List items
use stable product or particle IDs rather than array indexes.

## Modules and data flow

- `src/app/`: application loading, composition, header, hero, store and footer.
- `src/modules/catalog/`: product contracts, immutable search/filter/sort, catalog and cards.
- `src/modules/cart/`: provider, context, hook, pure reducer and cart UI.
- `src/modules/product-detail/`: selected-product dialog content.
- `src/shared/`: one component per file, reusable hooks, API validation, money formatting and photo credits.
- `public/data/products.json`: sole catalog source; fetched over HTTP rather than imported or hardcoded in JSX.
- `public/photos/`: eight licensed category photographs and their source metadata.
- `public/art/`: pixel hero and logo.
- `tests/`: domain, asset and React interaction checks.

The API boundary validates unknown JSON before constructing Product values. Failures
show retry instead of a substitute catalog. Search and sorting operate on copies;
Default restores JSON order. The cart stores only IDs and positive whole quantities,
derives product information from the loaded catalog, and totals integer cents.
Blocked or corrupt storage leaves an in-memory cart usable. Each part has a demo
quantity limit of 999; controls and feedback explain the limit.

## Guides and verification

- [Design.md](Design.md): visual rules and font exceptions.
- [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md): project conventions and React lessons.
- [Architecture](docs/architecture.md): boundaries and data flow.
- [Asset sources](docs/asset-sources.md): retained artwork and photograph attribution.
- [Debugging log](debugging-log.md) and [debug lab](debug-lab-log.md): observed issues and evidence.

Only Vercel React best practices and composition patterns are installed under
`.claude/skills/`. Vendored skill content is tooling documentation, not browser code.

Inspect the production preview at mobile and desktop sizes, including image and
JSON requests, dialog keyboard behavior and Console errors. React DevTools can
confirm the component tree and the props/state listed above. These browser and
DevTools checks must be reported as pending until actually performed; a passing
jsdom test does not establish visual rendering or native focus behavior.

## GitHub Pages

The default build base is `/` for root-hosted sites such as Netlify. The GitHub Pages
workflow overrides it with `/Shopboard-PcParts/` for the repository subpath.
JSON, photographs and built assets resolve relative to the active base. The single deployment workflow installs locked
dependencies, runs checks, builds, and uploads only dist. Product details use
dialogs, so static hosting does not need client-side route rewriting. Publishing
or pushing changes requires an explicit instruction.
