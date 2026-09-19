import { test, expect } from "../../fixtures/create-business.fixture";
import { expectCurrentPath } from "../../helpers/assertions.helper";
import { CreateBusinessPage } from "../../pages/create-business/create-business.page";

test.describe("Create business page structure", () => {
  test("shows all five form sections and submit action", async ({
    page,
    createBusinessPage,
  }) => {
    await expectCurrentPath(page, CreateBusinessPage.route);
    await expect(createBusinessPage.titleLocator).toBeVisible();
    await expect(createBusinessPage.owner.headingLocator).toBeVisible();
    await expect(createBusinessPage.general.headingLocator).toBeVisible();
    await expect(createBusinessPage.contact.headingLocator).toBeVisible();
    await expect(createBusinessPage.serviceHours.headingLocator).toBeVisible();
    await expect(createBusinessPage.financial.headingLocator).toBeVisible();
    await expect(createBusinessPage.submitButtonLocator).toBeVisible();
  });
});
