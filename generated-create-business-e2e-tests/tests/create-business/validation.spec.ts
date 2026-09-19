import { test } from "../../fixtures/create-business.fixture";
import { expectValidationMessage } from "../../helpers/assertions.helper";

test.describe("Create business validation", () => {
  test("reports missing required owner and general fields", async ({
    page,
    createBusinessPage,
  }) => {
    await createBusinessPage.submit();

    await expectValidationMessage(page, "انتخاب منبع ضروری است");
    await expectValidationMessage(page, "نام و نام خانوادگی ضروری است");
    await expectValidationMessage(page, "فرمت شماره همراه صحیح نیست");
    await expectValidationMessage(page, "نام کسب و کار ضروری است");
    await expectValidationMessage(page, "انتخاب دسته‌بندی ضروری است");
    await expectValidationMessage(page, "انتخاب صندوق فروشگاهی ضروری است");
  });

  test("rejects an invalid mobile number", async ({
    page,
    createBusinessPage,
  }) => {
    await createBusinessPage.owner.fillMobile("09123");
    await createBusinessPage.submit();

    await expectValidationMessage(page, "فرمت شماره همراه صحیح نیست");
  });
});
