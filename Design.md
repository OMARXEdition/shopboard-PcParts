# Shopboard-PcParts design

## Approved direction

A retro PC-parts store inspired by the supplied 1990s pixel-web reference, with
original pixel branding and hero artwork, plus licensed real hardware photographs. This is a store rather than a studio
portfolio. Names, specifications and prices are demo data; real photographs represent hardware categories rather than exact demo models.

## Visual language

Use a deep navy grid background, teal and orange accents, cream window panels,
purple title bars, crisp stepped borders and offset shadows. Use an original pixel-art desktop computer in the hero and real photographs on product cards and in product details. Pixel styling remains in the logo, decorative grid, typography and window chrome. Keep
real selectable text over decorative artwork. Avoid flashing, excessive motion,
fake discounts, ratings, certifications, or fabricated business claims.

## Typography

Use Jersey 10 for headlines, navigation and menu option labels, and standalone
prices, quantities and cart counts. Product names and descriptions use system
sans-serif, including embedded numbers such as RTX 5070 and 32 GB. Specifications,
form fields, instructions and long text also use system sans-serif. Use normal
fallbacks while the webfont loads and avoid fixed text heights that clip glyphs.

## Page and interaction

- Header with wordmark, catalog navigation and cart count.
- Hero with a short hardware-focused message, browse action and an original pixel-art computer illustration.
- Category navigation, labeled search and sorting controls, and product-window cards.
- Product details in an accessible modal, with photograph, description, specs and add action.
- Cart drawer with quantities, remove, clear, total, empty state and demo notice.
- Footer with accurate project information, no invented contact details.
- Reusable accessible toast feedback without duplicate additions.

Loading, empty catalog, failed fetch with retry, no search results, and unavailable
images all need intentional states. A failed API response must not look like a
successful empty result.

## Responsive and accessible

Start with one column at 360 px and use min-width breakpoints for larger grids.
Keep touch controls usable, text readable, and layout free of horizontal overflow.
Use semantic landmarks, one h1, labels, visible focus, meaningful alt text, keyboard
operation and focus restoration for dialogs. Respect reduced motion preferences.

## Out of scope

Real orders/payments, authentication, PC compatibility checks, a backend service,
3D rendering, and copying the reference's artwork or studio branding.

## Approved artwork and pointer update

Use the original pixel-art hero and logo. Use local, correctly attributed real photographs for every hardware category; product images must not be AI-generated images, renders, pixel hardware drawings, external hotlinks, or photos of unrelated components. Keep photos naturally rendered with object-fit: contain and without pixelated image rendering. Preserve adequate source resolution and aspect ratios. Each photo must have source, author and license recorded in the asset-source documentation and visible photo credits. Two demo products may share a clearly representative category photo; never imply that their fictional names/specifications describe the exact photographed model.

The hero includes a decorative cursor-lit teal field, subtle grid parallax, and fixed
pixel particles that shift in response to pointer position. It must not intercept
interaction or replace useful content. Schedule at most one animation frame per burst
of pointer input; no continuous animation loop. Reset on pointer exit/window blur,
respect live reduced-motion settings, disable pointer animation on coarse touch input,
and clean up all listeners and pending frames during React Strict Mode remounting.
