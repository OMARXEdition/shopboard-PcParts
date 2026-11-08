# Architecture

`src/app/App.tsx` composes the shared layout, cart provider, hash routes, Suspense and retry boundary. Route modules are lazy imports. Hash routing keeps direct route refreshes usable on GitHub Pages without a server rewrite.

The catalog feature validates unknown API JSON and exposes stable cached promises for React `use`. A product page requests `/api/products/:id`; the catalog and cart pages request `/api/products`. The catalog and product pages also fetch `public/data/product-photos.json`, a local manifest of paths to licensed photos in `public/photos/`. Both requests start before suspension to avoid a waterfall. Photo data never replaces API product data. `VITE_SHOPBOARD_API_BASE` selects normal, delayed, failed or empty API behavior without changing application code. The shared request client accepts the trusted HTTPS course base and resolves local paths against Vite's base.

The cart Context is mounted above the routes. Its reducer stores only product IDs and quantities; it never stores names or prices. The cart page derives totals from the current catalog in integer cents. Storage reads and writes can fail without disabling the in-memory cart. Checkout owns only its form and local demo completion state. Search, category and sort live only in the catalog page, and filtered products are derived during render.

The shared layout does not fetch data. The page content sits inside Suspense and a retryable Error Boundary, so a slow or failed catalog leaves navigation available. No effect is used to fetch products; the only cart effect persists state, and it skips the initial write to preserve saved data.

Tests cover API validation, product-by-ID requests, cart state, routing, form validation and page states. Production preview must be checked at mobile and desktop sizes with keyboard access and a clean normal-path Console.
