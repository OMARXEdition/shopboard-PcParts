# ShopBoard

A six-page fashion storefront for the [ShopBoard course API](https://shopboard-api.vercel.app/). It displays all 12 API products with locally bundled, credited photographs, loads each product page by ID, keeps one cart across routes and refreshes, and provides a validated demo checkout. No payment is taken or order created.

## Run

```sh
npm ci
npm run dev
```

Vite prints the local URL. Routes use a hash (`#/products/1`) so a refreshed product page works on static hosting. On Windows, use `npm.cmd` if PowerShell blocks npm's `.ps1` launcher.

The default API base is `https://shopboard-api.vercel.app`. To check API states, set `VITE_SHOPBOARD_API_BASE` before starting Vite:

| State   | API base                                      |
| ------- | --------------------------------------------- |
| Normal  | `https://shopboard-api.vercel.app`            |
| Delayed | `https://shopboard-api.vercel.app/delay/3000` |
| Failed  | `https://shopboard-api.vercel.app/fail/500`   |
| Empty   | `https://shopboard-api.vercel.app/empty`      |

In PowerShell, for example: `$env:VITE_SHOPBOARD_API_BASE='https://shopboard-api.vercel.app/fail/500'; npm.cmd run dev`. Restart Vite after changing the variable. The app calls `/api/products` and `/api/products/:id` under that base. Clear the variable to return to normal mode.

The photos are separate from the course API: `public/data/product-photos.json` is fetched as a local JSON endpoint and maps stable product IDs to files in `public/photos/`. The JSON contains paths and credits, not image bytes. The API remains authoritative for product data. Images are representative of the product category, and their authors and licenses appear below them. See [asset sources](docs/asset-sources.md).

## Routes

| Route            | Page     | Data                                                   |
| ---------------- | -------- | ------------------------------------------------------ |
| `#/`             | Home     | No API request                                         |
| `#/products`     | Catalog  | API product list; local search, category and sort      |
| `#/products/:id` | Product  | API request for that ID                                |
| `#/cart`         | Cart     | Shared cart; product list for current names and prices |
| `#/checkout`     | Checkout | Shared cart and validated demo form                    |
| `#/about`        | About    | No API request                                         |
| Any other route  | 404      | No API request                                         |

Page modules are imported only when their route opens. Suspense displays loading inside the shared layout. A retryable Error Boundary handles data failures. The catalog distinguishes an empty API result from a search with no matches.

## Component tree and state

```text
App (src/app/App.tsx; no props)
`-- HashRouter
    `-- CartProvider (src/modules/cart/CartProvider.tsx; children)
        |-- Header (src/components/layout/Header.tsx; no props)
        |-- main
        |   `-- RetryBoundary (src/components/ui/RetryBoundary.tsx; children, onRetry)
        |       `-- Suspense (fallback)
        |           `-- Routes (one page at a time)
        |               |-- HomePage (src/app/pages/HomePage.tsx; no props)
        |               |-- CatalogPage (src/modules/catalog/CatalogPage.tsx; no props)
        |               |   |-- PageHeading (src/components/ui/PageHeading.tsx; title, eyebrow?, description?)
        |               |   |-- EmptyState (src/components/ui/EmptyState.tsx; title?, message, children?; when empty/no match)
        |               |   `-- ProductCard (src/modules/catalog/ProductCard.tsx; product, photo?)
        |               |       `-- ProductPhotoView (src/modules/catalog/ProductPhotoView.tsx; photo, loading?)
        |               |-- ProductPage (src/modules/product-detail/ProductPage.tsx; no props)
        |               |   `-- ProductContent (src/modules/product-detail/ProductContent.tsx; id)
        |               |       `-- ProductPhotoView (photo, loading)
        |               |-- CartPage (src/modules/cart/CartPage.tsx; no props)
        |               |   |-- PageHeading (title)
        |               |   |-- EmptyState (message, children; when empty)
        |               |   `-- CartContents (src/modules/cart/CartContents.tsx; no props, when cart has lines)
        |               |-- CheckoutPage (src/modules/checkout/CheckoutPage.tsx; no props)
        |               |   |-- PageHeading (title, description)
        |               |   |-- EmptyState (message, children; when empty)
        |               |   `-- CheckoutForm (src/modules/checkout/CheckoutForm.tsx; no props, when cart has lines)
        |               |       `-- shadcn FieldGroup/Field/FieldLabel/FieldError,
        |               |           Input, Button (src/components/ui/; DOM and validation props)
        |               |-- AboutPage (src/app/pages/AboutPage.tsx; no props)
        |               |   `-- PageHeading (title)
        |               `-- NotFoundPage (src/app/pages/NotFoundPage.tsx; no props)
        `-- Footer (src/components/layout/Footer.tsx; no props)
```

`CartProvider` owns the only cart state: product IDs and positive integer quantities. Its actions add, decrease, remove and clear; count is derived. Storage is validated when restored. `CatalogPage` owns search, category and sort; the visible list is derived. `CheckoutForm` owns form state through react-hook-form and one Zod schema, plus local demo-completion state. `RetryBoundary` owns error and retry version. Product and photo promises are cached in the catalog module so React Suspense can read stable promises and start both requests together. Product names, stock and prices come from API data, with money calculated in cents. `Header`, `Footer`, `ProductCard`, `ProductPhotoView`, `HomePage`, `AboutPage` and `NotFoundPage` hold no application state.

The Day 2 bug record is in `debugging-log.md`; the five Day 4 lab findings are in `debug-lab-log.md`. Each entry marks whether it came from source inspection or a live observation.

## Checks

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run preview
```

The pre-commit hook runs lint-staged and typecheck. ESLint rejects explicit `any`, type assertions and non-null assertions. `npm run lint` allows zero warnings. Use the production preview at 360 px and desktop to inspect routing, keyboard access, API requests and Console output before submission.

## Structure

- `src/app/`: route composition and app-wide static pages.
- `src/modules/catalog/`: API and photo-manifest validation, request cache, catalog, cards and photo rendering.
- `public/data/product-photos.json` and `public/photos/`: local photo endpoint and image files.
- `src/modules/product-detail/`: product-by-ID page.
- `src/modules/cart/`: shared Context, reducer, storage and cart page.
- `src/modules/checkout/`: demo form and its Zod schema.
- `src/components/layout/`: shared header and footer.
- `src/components/ui/`: shared retry boundary and shadcn/ui components.
- `src/shared/`: feature-neutral request and money helpers.
- `tests/`: behavior and API checks.

The orange pixel background is CSS decoration behind solid content panels. The single GitHub Pages workflow builds and publishes `dist`.
