# Debugging log

Record real issues as they occur. No historical bugs are invented to fill this
file. Shopboard's earlier lessons are documented in AGENTS.md, not presented as
new observations in this project.

## Entry template

Copy this block for an actual observed bug and replace every placeholder:

```markdown
## Bug N: Short description

- **What I saw:**
- **Type:** runtime / logic / state
- **How I found it:** Console, test, breakpoint, network request, or storage inspection.
- **Cause:** File and line at the time of diagnosis, and why it was wrong.
- **Fix:**
- **Did I use AI? For what?**
- **Verification:** Command or browser scenario, result, and remaining limitations.
```

## Verification boundary

Automated checks do not establish that visual rendering was inspected. Record
browser checks separately and report them as pending if tooling is blocked.

## Bug 1 — Prettier could not read its configuration

- **What I saw:** Prettier reported an unexpected U+FEFF character in `.prettierrc.json`.
- **Type:** runtime (development tooling)
- **How I found it:** Running `npm run format` after scaffolding on Windows PowerShell.
- **Cause:** Windows PowerShell `Set-Content -Encoding utf8` wrote a byte-order mark into the JSON configuration; Prettier's config parser rejected it.
- **Fix:** Save project text using explicit UTF-8 without a BOM, then rerun formatting. Do not alter dependency files by hand.
- **Did I use AI? For what?** Yes. AI scaffolded the files, observed the error, corrected the encoding, and reran the checks.

## Bug 2 — Test expected the deployment base in Vitest's default environment

- **What I saw:** API tests received `/data/products.json` instead of `/Shopboard-PcParts/data/products.json`.
- **Type:** logic (test environment)
- **How I found it:** Running domain tests after implementing the base-aware API boundary.
- **Cause:** Vitest supplies its own default `BASE_URL`; the assertion intended to test the repository deployment prefix but had not configured that test environment.
- **Fix:** Set the deployment base explicitly with `vi.stubEnv` in test setup. The application still reads Vite's base rather than hardcoding it. Production HTTP checks separately verify the real build.
- **Did I use AI? For what?** Yes. AI wrote the assertion, investigated the failing URL, configured the test environment, and reran it.

## Bug 3 — Retry test did not account for Strict Mode cleanup

- **What I saw:** The retry test could not find the error-state button after enabling React Strict Mode in the component tests.
- **Type:** logic (test fixture)
- **How I found it:** Running the storefront tests in Strict Mode.
- **Cause:** Strict Mode starts, cancels, and restarts the initial loading effect. A single rejected mock response belonged to the canceled request, so the next successful mock response immediately loaded the catalog.
- **Fix:** Make both initial Strict Mode requests fail in the fixture, then return success on Retry. Keep request cancellation in the application and retain Strict Mode tests.
- **Did I use AI? For what?** Yes. AI created and corrected the fixture after observing the failure.

## Verification ledger

- Domain tests were observed failing before the API/cart/catalog implementations existed; React tests were observed failing before App existed.
- The declared lint-tool dependency tree initially reported twelve moderate audit findings from minimatch. A documented package override selects patched minimatch 11.0.1; npm updates the lockfile.
- Original pixel SVG illustrations were XML-validated; a test checks every product's shipped image path.
- Browser screenshots, mobile overflow measurements, actual font appearance, and keyboard focus behavior require visual browser verification. Browser tooling was unavailable in the host session; these checks are not claimed as passed.
