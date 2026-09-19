import { test, expect } from "../../fixtures/create-business.fixture";
import { buildCreateBusinessData } from "../../helpers/test-data.helper";

test.describe("Financial information", () => {
  test("supports all documented business types", async ({
    createBusinessPage,
  }) => {
    const select = createBusinessPage.financial.businessTypeLocator;

    await expect(select.locator("option")).toHaveText([
      "حقیقی",
      "حقوقی",
      "اتباع خارجی",
    ]);
  });

  test("accepts account owner and identification fields", async ({
    createBusinessPage,
  }) => {
    const { financial } = buildCreateBusinessData();

    await createBusinessPage.financial.fill(financial);

    await expect(createBusinessPage.financial.businessTypeLocator).toHaveValue(
      financial.businessType,
    );
    await expect(createBusinessPage.financial.nationalIdLocator).toHaveValue(
      financial.nationalId ?? "",
    );
    await expect(createBusinessPage.financial.givenNameLocator).toHaveValue(
      financial.givenName,
    );
    await expect(createBusinessPage.financial.surnameLocator).toHaveValue(
      financial.surname,
    );
    await expect(createBusinessPage.financial.shebaLocator).toHaveValue(
      financial.sheba ?? "",
    );
    await expect(
      createBusinessPage.financial.inquiryButtonLocator,
    ).toBeVisible();
  });
});
