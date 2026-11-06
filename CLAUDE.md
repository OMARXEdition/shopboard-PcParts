# CLAUDE.md

## React workflow

Read AGENTS.md and Design.md before changing the application. Keep each React
component in its own file, feature state near its owner, and reusable controls in
`src/components/ui/`. Keep page, layout and notification pieces in their
`src/components/` subfolders. Pass typed props and callbacks; derive filtered lists and totals
rather than copying them into state. Use the installed Vercel React best-practices
and composition-pattern skills in .claude/skills/ when relevant. Add no other skill
kits or generated agent plans to the repository.

Validate external JSON from unknown values before creating Product records. Keep
state reducers and catalog logic free of DOM access. Render arrays with stable
IDs, and clean up effects and pending animation frames under Strict Mode.

## Rules from mistakes observed in this project

- The catalog parser ended by asserting `data as Product[]`. That assertion hid
  the boundary between external input and trusted data. Validate each field and
  build typed Product values explicitly; an assertion is not runtime validation.
- App.tsx and shared/ui.tsx held multiple components. That made responsibilities
  and prop contracts harder to locate. Give each component its own named file
  and document its props and state in README.md.
- Decorative particles used array indexes as React keys. Indexes describe a
  position, not an item. Give fixed particles stable explicit IDs and use those
  IDs as keys; product cards use product IDs.
- The hero photo replaced the approved pixel-computer illustration. Check
  Design.md before changing asset roles: the hero and logo use pixel artwork,
  while the catalog uses licensed real photographs.

## Verification and reporting

Run lint, formatting checks, TypeScript checks, tests, and the production build
before reporting success. Use React DevTools to inspect the component tree and
identify each component's props and state when browser tooling is available.
Report that check as pending if it was not performed; tests are not a DevTools
inspection. Record real debugging evidence in the project debugging logs and
explain what changed, where, why, and how it was checked. Do not commit generated
plans, prompts, secret files, or unused artwork. Preserve required photo credits.
