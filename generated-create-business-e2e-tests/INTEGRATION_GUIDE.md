# Integration Guide

No existing project file was changed.

## 1. Include the generated tests

The current `playwright.config.ts` uses `testDir: "./tests"`, so this isolated
folder is outside test discovery. Either copy this folder's contents into the
project's matching test architecture or update the configuration yourself:

```ts
export default defineConfig({
  testDir: "./generated-create-business-e2e-tests/tests",
  fullyParallel: true,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "https://stgiran-vip.takhfifan.com",
    storageState: "playwright/.auth/user.json",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
```

If the generated folder remains in place, add
`generated-create-business-e2e-tests/**/*.ts` to `tsconfig.json`'s `include`
array for project-wide type checking.

## 2. Authentication

Generate `playwright/.auth/user.json` with the project's setup test before the
feature tests run. Keep credentials in environment variables or a secret store;
do not commit credentials or the generated storage state.

The existing Chromium project already points to:

```text
playwright/.auth/user.json
```

## 3. Run

After integrating the test directory:

```bash
npx playwright test
npx playwright test --project=chromium
npx playwright test --grep "Create business"
```

## 4. Environment-specific data

Review `test-data/create-business.data.ts`. Source/category/location options
must exist in the target environment. Use unique mobile and national-ID data
only if adding a valid-submit test.

## 5. Cleanup for future create tests

`helpers/api-client.helper.ts` contains a typed cleanup client with a placeholder
endpoint. Replace its endpoint template with the real API route and call it from
test teardown when a test intentionally creates a business.
