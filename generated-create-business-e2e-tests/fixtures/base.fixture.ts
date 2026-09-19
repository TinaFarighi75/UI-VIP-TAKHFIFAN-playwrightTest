import {
  test as playwrightTest,
  expect,
  type Page,
} from "@playwright/test";
import { CreateBusinessApiClient } from "../helpers/api-client.helper";

type BaseFixtures = {
  authenticatedPage: Page;
  createBusinessApi: CreateBusinessApiClient;
};

export const test = playwrightTest.extend<BaseFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await use(page);
  },
  createBusinessApi: async ({ request }, use) => {
    await use(new CreateBusinessApiClient(request));
  },
});

export { expect };
