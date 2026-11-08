# ShopBoard design

## Reference and adaptation

The earlier ShopBoard used a supplied 1990s pixel-web reference for its window borders, strong title type and compact cards. This fashion version keeps clear framed sections and Jersey 10 headings, then uses an orange and plum palette for the course API's bags, shoes and accessories. The API supplies no images, so a separate local photo manifest provides representative pictures while API names, category, price and stock remain authoritative.

This is a fashion demo built on the course API. It shows all 12 returned products without local substitutions. Product cards combine API text with locally bundled, credited photos. No claims about real inventory, payment or order placement are made.

Use a warm orange pixel-grid background, deep plum panels, cream cards and clear window borders. Keep Jersey 10 for large headings and standalone numbers; use the body font for product names, labels and form text. Start with one column at 360 px and expand using min-width breakpoints. Controls need labels, visible focus and keyboard operation.

The shared header, footer and cart remain visible while a page loads or fails. Product details are a route rather than a dialog. Checkout is a validated demo form with no payment fields and no backend submission. Loading, API error with retry, empty catalog, no search match and unknown route each have their own message.

## Product photography and orange pixel background

Use one locally bundled, licensed category-matching photograph for each course API product. Keep API names, categories, prices, stock and IDs authoritative; a static JSON manifest under `public/data/` supplies only image paths and attribution, fetched through the same base-aware JSON client. The manifest contains URLs to files, not image bytes. A missing photo entry does not change product data.

Use a warm orange page background with sparse pixel blocks and stepped lines behind content. Build the decoration with CSS, keep it outside the reading order and pointer interaction, and keep cards and controls on solid high-contrast surfaces. No motion is needed.
