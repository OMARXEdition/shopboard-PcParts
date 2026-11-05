# Debug lab log

Source: https://shopboard-api.vercel.app/debug-lab and its linked debug-lab-src.zip, inspected on 2026-11-05.

Evidence: the five findings below were established by reading the actual lab source and its published reproduction steps. The symptoms are expected results of those defects, not claimed live browser observations. React DevTools Components/Console verification remains pending because browser automation was unavailable. Fixes below are proposed changes to the external lab; this repository does not contain a copied lab project.

## Bug 1 — Missing category keys

- **What I saw:** Source inspection found mapped category spans without keys. Reloading the lab should produce React's unique-key warning naming CategoryChips; the Console check is pending.
- **Component:** CategoryChips.
- **How I found it:** Read src/components/CategoryChips.tsx in the lab download and compared it with the first reproduction step.
- **Cause:** Line 9 returns a span from categories.map without a key. React needs stable identity for each sibling.
- **Fix:** Use `<span key={category} className="chip">{category}</span>`. Categories are unique strings derived from the product data.

## Bug 2 — A stray zero in the UI

- **What I saw:** The source uses numeric values on the left of JSX conditional expressions. Sold-out products and an empty cart should show an unwanted 0; live rendering is pending.
- **Component:** StockNote and CartPanel.
- **How I found it:** Read StockNote.tsx line 6 and CartPanel.tsx line 19, following the lab's sold-out/empty-cart instructions.
- **Cause:** `stock && ...` and `cart.length && ...` evaluate to the number 0 when empty, which React renders as text.
- **Fix:** Use `stock > 0 && ...` and `cart.length > 0 && ...`, or explicit ternaries with a meaningful sold-out/empty message.

## Bug 3 — Saved heart moves to another product

- **What I saw:** ProductCard owns its saved state, but ProductList keys cards by array index. Saving Leather Tote Bag and sorting should attach the heart to the item now occupying that position; the browser interaction is pending.
- **Component:** ProductList and ProductCard.
- **How I found it:** Compared ProductList.tsx lines 17–18 with the saved useState in ProductCard.tsx line 12.
- **Cause:** `key={index}` identifies positions, not products. React reuses a card's local state for a different product after reordering.
- **Fix:** Map products without the index parameter and render `<ProductCard key={product.id} product={product} onAdd={onAdd} />`.

## Bug 4 — Featured order cannot be restored

- **What I saw:** Price sorting mutates the products prop directly. Selecting Featured afterward should preserve the sorted order instead of the original order; live verification is pending.
- **Component:** ProductList.
- **How I found it:** Read src/components/ProductList.tsx line 13 and traced the products prop back to App's shared PRODUCTS array.
- **Cause:** `products.sort(...)` changes the input array in place. Featured later returns that same mutated array.
- **Fix:** Use `const shown = sort === 'price-asc' ? [...products].sort((a, b) => a.price - b.price) : products`. Keep the canonical array unchanged.

## Bug 5 — Quantity changes without a render

- **What I saw:** The plus handler changes the item object but supplies the same cart reference back to React. The visible quantity and total can remain stale, then jump when another product causes a render; interactive verification is pending.
- **Component:** CartRow, CartPanel, and App.
- **How I found it:** Traced CartRow.tsx lines 10–12 through CartPanel to App.tsx line 37 (`onChange={() => setCart(cart)}`).
- **Cause:** `item.qty = item.qty + 1` mutates a prop, and `setCart(cart)` uses the existing array reference. React can skip the state update because the reference is unchanged.
- **Fix:** Let App own the update. Pass an `(id: number) => void` increase callback through CartPanel to CartRow. Call it with `item.id`; in App use `setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))`.

## AI involvement and remaining checks

AI fetched and inspected the original lab source, traced the defects, and drafted this explanation. No successful Console or React DevTools session is claimed. To finish the manual lab requirement, follow the five steps on the linked lab, inspect component props/state/keys, and record actual results before claiming those observations.
