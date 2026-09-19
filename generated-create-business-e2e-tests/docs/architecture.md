# Architecture

## Layers

- `tests/`: scenario intent and assertions only.
- `fixtures/`: authenticated page lifecycle and ready page objects.
- `pages/create-business/create-business.page.ts`: navigation, section
  composition, whole-page actions.
- `pages/create-business/sections/`: locators and actions scoped to one section.
- `pages/create-business/components/`: reusable UI interaction primitives.
- `test-data/`: typed domain models and safe defaults.
- `helpers/`: data factories, cross-test assertions, auth checks, and API cleanup.

## Locator strategy

The supplied page has no `data-testid` attributes and several controls lack
native labels. The implementation therefore prioritizes:

1. ARIA role and accessible name
2. Stable `id` or `name`
3. Stable Persian text for section boundaries and options
4. CSS classes only for structural scoping where no semantic alternative exists

Duplicate `id="name"` values are handled by locating within the owning section.
No XPath selectors are used.

## Parallel safety

Each test receives a new browser page and constructs its own data. Business
names include a unique suffix. Current tests do not submit valid data, avoiding
shared-state mutation. Any future create test should use a unique mobile number
and delete the created entity through a confirmed API cleanup endpoint.
