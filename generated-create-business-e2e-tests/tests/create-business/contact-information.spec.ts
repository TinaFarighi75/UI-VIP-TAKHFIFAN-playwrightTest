import { test, expect } from "../../fixtures/create-business.fixture";
import { buildCreateBusinessData } from "../../helpers/test-data.helper";
import { expectEnabledFields } from "../../helpers/assertions.helper";

test.describe("Business contact information", () => {
  test("shows map action and editable required contact fields", async ({
    createBusinessPage,
  }) => {
    await expect(createBusinessPage.contact.mapButtonLocator).toBeVisible();
    await expectEnabledFields([
      createBusinessPage.contact.longitudeLocator,
      createBusinessPage.contact.latitudeLocator,
      createBusinessPage.contact.addressLocator,
      createBusinessPage.contact.phoneLocator,
    ]);
  });

  test("accepts coordinates, address and phone", async ({
    createBusinessPage,
  }) => {
    const { contact } = buildCreateBusinessData();

    await createBusinessPage.contact.longitudeLocator.fill(contact.longitude);
    await createBusinessPage.contact.latitudeLocator.fill(contact.latitude);
    await createBusinessPage.contact.addressLocator.fill(contact.address);
    await createBusinessPage.contact.phoneLocator.fill(contact.phone);

    await expect(createBusinessPage.contact.longitudeLocator).toHaveValue(
      contact.longitude,
    );
    await expect(createBusinessPage.contact.latitudeLocator).toHaveValue(
      contact.latitude,
    );
    await expect(createBusinessPage.contact.addressLocator).toHaveValue(
      contact.address,
    );
    await expect(createBusinessPage.contact.phoneLocator).toHaveValue(
      contact.phone,
    );
  });
});
