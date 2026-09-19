import { test, expect } from "../../fixtures/create-business.fixture";
import { buildCreateBusinessData } from "../../helpers/test-data.helper";

test.describe("Owner and general business information", () => {
  test("accepts owner identity and mobile", async ({ createBusinessPage }) => {
    const data = buildCreateBusinessData();

    await createBusinessPage.owner.fillFullName(data.owner.fullName);
    await createBusinessPage.owner.fillMobile(data.owner.mobile);

    await expect(createBusinessPage.owner.fullNameLocator).toHaveValue(
      data.owner.fullName,
    );
    await expect(createBusinessPage.owner.mobileLocator).toHaveValue(
      data.owner.mobile,
    );
  });

  test("accepts general business fields", async ({ createBusinessPage }) => {
    const data = buildCreateBusinessData();

    await createBusinessPage.general.fillBusinessName(data.general.businessName);
    await createBusinessPage.general.selectCashierMachine(
      data.general.cashierMachine,
    );
    await createBusinessPage.general.descriptionLocator.fill(
      data.general.description ?? "",
    );

    await expect(createBusinessPage.general.businessNameLocator).toHaveValue(
      data.general.businessName,
    );
    await expect(createBusinessPage.general.cashierMachineLocator).toHaveValue(
      data.general.cashierMachine,
    );
    await expect(createBusinessPage.general.descriptionLocator).toContainText(
      data.general.description ?? "",
    );
  });
});
