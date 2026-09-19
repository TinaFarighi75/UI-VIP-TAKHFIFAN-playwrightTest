import { test, expect } from "../../fixtures/create-business.fixture";

test.describe("Service days and hours", () => {
  test("enables Saturday hours when Saturday is activated", async ({
    createBusinessPage,
  }) => {
    const day = "شنبه";
    const daySwitch = createBusinessPage.serviceHours.getDaySwitch(day);
    const timeInputs = createBusinessPage.serviceHours.getDayTimeInputs(day);

    await expect(daySwitch).toHaveAttribute("aria-checked", "false");
    await expect(timeInputs).toHaveCount(2);
    await expect(timeInputs.nth(0)).toBeDisabled();
    await expect(timeInputs.nth(1)).toBeDisabled();

    await createBusinessPage.serviceHours.toggleDay(day);

    await expect(daySwitch).toHaveAttribute("aria-checked", "true");
    await expect(timeInputs.nth(0)).toBeEnabled();
    await expect(timeInputs.nth(1)).toBeEnabled();
  });

  test("all-days switch is off by default", async ({ createBusinessPage }) => {
    await expect(
      createBusinessPage.serviceHours.getDaySwitch("همه روزها"),
    ).toHaveAttribute("aria-checked", "false");
  });
});
