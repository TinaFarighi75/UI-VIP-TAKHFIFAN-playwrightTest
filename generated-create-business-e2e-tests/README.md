# Create Business E2E Tests

Playwright/TypeScript test suite for the Persian **Create business** page:

`/panel/app/dashboards/business/create`

## Coverage

- Page and five-section structure
- Owner and general information inputs
- Contact information and map entry point
- Service-day switches and time-field state
- Financial fields and business types
- Required-field and mobile validation
- Reusable React Select and file-upload components

The suite uses Page Object Model classes, custom fixtures, isolated test data,
and no fixed sleeps or XPath selectors.

## Important assumptions

- Tests run against a non-production environment.
- An authenticated `storageState` is available.
- Persian labels and validation messages match the supplied DOM.
- Dropdown options such as source, category, province, and city are
  environment data and may need adjustment in `test-data/create-business.data.ts`.
- The included tests do not submit a valid form, so they do not create a
  persistent business record.

See `INTEGRATION_GUIDE.md` before running and `docs/test-scenarios.md` for the
scenario inventory.
