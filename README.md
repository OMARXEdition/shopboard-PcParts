# Shopboard-PcParts

A retro PC-parts demo storefront built with React, TypeScript and Vite. Browse
hardware, search, filter, sort, view details and keep a cart across refreshes.

**Demo only:** USD prices are sample data and real photos represent hardware categories, not the exact fictional demo models.
There is no payment flow, account system, backend, or compatibility checker.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, including the `/Shopboard-PcParts/` path. On Windows,
use `npm.cmd` and `npx.cmd` if PowerShell blocks the corresponding .ps1 launchers.

## Checks and production preview

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run preview
```

Use `npm run format` to apply Prettier. npm manages package-lock.json; do not edit
it manually. Install activates Husky when the project is a Git repository. The
pre-commit hook checks staged files and TypeScript.

## Product data

The browser fetches `public/data/products.json` over HTTP using Vite's configured
base path. It is a static JSON endpoint, not a separate backend. Edit that JSON to
change the catalog and keep IDs stable. Product records contain name, category,
description, integer-cent price, image path, alt text and labeled specifications.
Validation rejects malformed responses and the UI provides retry rather than
silently substituting products. All product images use locally hosted, licensed real hardware photos. Photo credits are available in the footer and asset-source documentation.

The cart saves IDs and positive integer quantities under its own storage key.
Names and prices come from the loaded catalog; unavailable browser storage should
leave an in-memory cart usable.

## Project guides

- [Design.md](Design.md): approved visual direction and font rules.
- [AGENTS.md](AGENTS.md): architecture, workflow and lessons from Shopboard.
- [Architecture](docs/architecture.md): modules, boundaries and data flow.
- [Asset sources](docs/asset-sources.md): artwork and font origins.
- [Debugging log](debugging-log.md): real bugs and verification evidence.
- [Implementation plan](docs/superpowers/plans/2026-11-04-shopboard-pcparts.md).
- [Superpowers source](.agents/SOURCE.md): project-local skills and license.

## GitHub Pages

The project assumes the repository name `Shopboard-PcParts` and base path
`/Shopboard-PcParts/`. Update both configuration and verification if that changes.
The included workflow installs locked dependencies, runs checks, builds, and
publishes only `dist`. After explicitly choosing to publish, create the repository,
push the project, and select GitHub Actions as the Pages source. No repository
creation or publishing is implied by the local setup.

Verify the production preview and deployed site, including JSON and image URLs,
rather than attempting to import TypeScript source on the static host.

The demo cart permits up to 999 of each part; the increase control disables at that limit, and other add actions explain the limit.
