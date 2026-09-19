import { test as base, expect } from "./base.fixture";
import { assertAuthenticated } from "../helpers/auth.helper";
import { CreateBusinessPage } from "../pages/create-business/create-business.page";

type CreateBusinessFixtures = {
  createBusinessPage: CreateBusinessPage;
};

export const test = base.extend<CreateBusinessFixtures>({
  createBusinessPage: async ({ authenticatedPage }, use) => {
    const createBusinessPage = new CreateBusinessPage(authenticatedPage);
    await createBusinessPage.goto();
    await assertAuthenticated(authenticatedPage);
    await use(createBusinessPage);
  },
});

export { expect };
