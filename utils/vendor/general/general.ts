//utils/vendor/general/general.ts
import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { createGeneralElements } from "./general-elements";
import type { GeneralObject } from "./general-types";

type UploadResult = "success" | "failed";

export class General {
  protected readonly general: GeneralObject;
  protected readonly page: Page; // <--- این خط اضافه شد

  constructor(page: Page) {
    this.page = page; // <--- این خط اضافه شد

    this.general = createGeneralElements(page);
  }

  // ---------------------------ELEMENTS (GETTERS)----------------------------

  getVendorsButton(): Locator {
    return this.general.vendorsButton;
  }

  getVendorsListButton(): Locator {
    return this.general.vendorsList;
  }

  getVendorCreateButton(): Locator {
    return this.general.vendorCreateBusinessButton;
  }

  getImageUploadingToastMessage(): Locator {
    return this.general.vendorCreateBusinessToastMessageInsertingImage;
  }

  getImageUploadSuccessToastMessage(): Locator {
    return this.general.vendorCreateBusinessToastMessageSuccessInsertingImage;
  }

  getCloseSection(): Locator {
    return this.general.vendorCloseSection;
  }

  getDeleteFile(): Locator {
    return this.general.vendorCreateBusinessFileDelete;
  }

  getVendorCreateTitlePage(): Locator {
    return this.general.vendorCreateTitleOfPage;
  }

  getSubmitButton(): Locator {
    return this.general.submitButton;
  }

  getSaveSelectlogo(): Locator {
    return this.general.saveSelectlogo;
  }

  getSaveSelectCover(): Locator {
    // FIX: قبلاً اشتباه saveSelectlogo برمی‌گرداند
    return this.general.saveSelectCover;
  }

  getDeleteLogo(): Locator {
    return this.general.deleteLogo;
  }

  getDeleteCover(): Locator {
    return this.general.deleteCover;
  }

  getFailedInsertPicAllert(): Locator {
    return this.general.vendorCreateBusinessToastMessageFailedInsertingImage;
  }

  // ---------------------------ACTIONS (YOUR METHODS)------------------------

  async goToCreateVendorPage(): Promise<void> {
    await this.getVendorCreateButton().click();
  }

  async goToListOfBusinessPage(): Promise<void> {
    await this.getVendorsListButton().click();
  }

  async selectVendorsButton(): Promise<void> {
    await this.getVendorsButton().click();
  }

  async submit(): Promise<void> {
    await this.waitForAllUploadToastsToDisappear();

    await this.page.evaluate(() => {
      document
        .querySelectorAll(".Toastify, .toast, .modal-backdrop")
        .forEach((el) => {
          (el as HTMLElement).style.pointerEvents = "none";
        });
    });

    const submitBtn = this.page.locator("button.btn-submit").filter({
      hasText: /^ثبت$/,
    });

    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.waitFor({ state: "visible" });

    // کلیک واقعی DOM (نه pointer Playwright)
    await submitBtn.evaluate((el: HTMLButtonElement) => el.click());
  }
  async closeSection(): Promise<void> {
    await this.getCloseSection().click();
  }

  async deleteVendorCreateBusinessFile(): Promise<void> {
    // همان رفتاری که داشتی، ولی از getter استفاده می‌کنیم
    await this.getDeleteFile().click();
  }

  // actions جدید اما عمومی
  async saveLogoFromDialog(): Promise<void> {
    await this.getSaveSelectlogo().click();
  }

  async saveCoverFromDialog(): Promise<void> {
    // دکمه ذخیره داخل مودال (سبز، یا متن ذخیره)
    const saveBtn = this.page
      .locator("button")
      .filter({ hasText: /ذخ[یي]ره/ })
      .last();

    // تا ۱۰ ثانیه منتظر ظاهر شدن دکمه می‌مانیم
    await saveBtn.waitFor({ state: "visible", timeout: 10000 });

    // کلیک با اطمینان
    await saveBtn.click({ force: true });
  }

  async deleteLogo(): Promise<void> {
    await this.getDeleteLogo().click();
  }

  async deleteCover(): Promise<void> {
    await this.getDeleteCover().click();
  }

  // ---------------------------WAITS (YOUR METHODS)--------------------------

  async waitForImageUploadSuccessToastMessage(): Promise<void> {
    await this.getImageUploadSuccessToastMessage().waitFor({
      state: "visible",
    });
  }

  async waitForImageUploadingToastMessage(): Promise<void> {
    await this.getImageUploadingToastMessage().waitFor({ state: "visible" });
  }

  async waitForImageUploadingToastMessageToDisappear(): Promise<void> {
    await this.getImageUploadingToastMessage().waitFor({ state: "hidden" });
  }

  async waitForImageUploadSuccessToastMessageToDisappear(): Promise<void> {
    await this.getImageUploadSuccessToastMessage().waitFor({ state: "hidden" });
  }

  async waitForImageUploadSuccessToastMessageToBeVisible(): Promise<void> {
    await this.getImageUploadSuccessToastMessage().waitFor({
      state: "visible",
    });
  }

  async waitForImageUploadingToastMessageToBeVisible(): Promise<void> {
    await this.getImageUploadingToastMessage().waitFor({ state: "visible" });
  }

  async waitForImageUplodingFailedVisible(): Promise<void> {
    await this.getFailedInsertPicAllert().waitFor({ state: "visible" });
  }

  async waitForImageUplodingFailedDisappear(): Promise<void> {
    await this.getFailedInsertPicAllert().waitFor({ state: "hidden" });
  }

  // waits جدید و سناریومحور
  async waitForAnyUploadResultVisible(): Promise<UploadResult> {
    const success = this.getImageUploadSuccessToastMessage();
    const failed = this.getFailedInsertPicAllert();

    const result = await Promise.race([
      success.waitFor({ state: "visible" }).then(() => "success" as const),
      failed.waitFor({ state: "visible" }).then(() => "failed" as const),
    ]);

    return result;
  }

  /**
   * سناریو: انتظار برای پایان فرآیند آپلود (موفق یا ناموفق)
   * - به سرعت پیام موفقیت یا خطا را تشخیص می‌دهد
   * - در صورت وجود پیام "در حال بارگذاری"، تا مخفی شدن آن و آمدن نتیجه صبر می‌کند
   */
  async waitForUploadProcessToFinish(timeout = 15000): Promise<UploadResult> {
    const successToast = this.getImageUploadSuccessToastMessage();
    const failedToast = this.getFailedInsertPicAllert();

    // همزمان منتظر اولین توست نتیجه (موفق یا ناموفق) می‌مانیم
    const result = await Promise.race([
      successToast
        .waitFor({ state: "visible", timeout })
        .then(() => "success" as const),
      failedToast
        .waitFor({ state: "visible", timeout })
        .then(() => "failed" as const),
    ]);

    // اگر پیام "در حال بارگذاری" هنوز باز بود، صبر می‌کنیم برود تا UI کاملاً آزاد شود
    await this.getImageUploadingToastMessage()
      .waitFor({ state: "hidden", timeout: 3000 })
      .catch(() => {});

    return result;
  }

  async waitForAllUploadToastsToDisappear(): Promise<void> {
    await Promise.all([
      this.getImageUploadingToastMessage()
        .waitFor({ state: "hidden" })
        .catch(() => {}),
      this.getImageUploadSuccessToastMessage()
        .waitFor({ state: "hidden" })
        .catch(() => {}),
      this.getFailedInsertPicAllert()
        .waitFor({ state: "hidden" })
        .catch(() => {}),
    ]);
  }

  // ---------------------------ASSERTIONS-----------------------------------

  async expectOnCreateBusinessPage(): Promise<void> {
    await expect(this.getVendorCreateTitlePage()).toBeVisible();
  }

  async expectSubmitButtonEnabled(): Promise<void> {
    await expect(this.getSubmitButton()).toBeEnabled();
  }

  async expectSubmitButtonDisabled(): Promise<void> {
    await expect(this.getSubmitButton()).toBeDisabled();
  }

  async expectNoUploadToastsVisible(): Promise<void> {
    await expect(this.getImageUploadingToastMessage()).toBeHidden();
    await expect(this.getImageUploadSuccessToastMessage()).toBeHidden();
    await expect(this.getFailedInsertPicAllert()).toBeHidden();
  }
  async expectUploadSuccessToastVisible(): Promise<void> {
    await expect(this.getImageUploadSuccessToastMessage()).toBeVisible({
      timeout: 15000,
    });
  }

  async expectUploadFailedToastVisible(): Promise<void> {
    await expect(this.getFailedInsertPicAllert()).toBeVisible({
      timeout: 15000,
    });
  }
  // ---------------------------FLOWS (SCENARIOS)----------------------------

  /**
   * سناریو: رفتن به صفحه ایجاد کسب‌وکار از منو
   * (برای اکثر تست‌ها مفید)
   */
  async openCreateBusinessFromMenu(): Promise<void> {
    await this.selectVendorsButton();
    await this.goToCreateVendorPage();
    await this.expectOnCreateBusinessPage();
  }

  /**
   * سناریو: رفتن به لیست کسب‌وکارها از منو
   */
  async openVendorsListFromMenu(): Promise<void> {
    await this.selectVendorsButton();
    await this.goToListOfBusinessPage();
  }

  /**
   * سناریو: ثبت فرم + انتظار برای نتیجه آپلود (اگر آپلودی در جریان باشد)
   * - اگر فرآیند آپلود toast داشته باشد، نتیجه success/failed را برمی‌گرداند
   * - اگر toast نیاید، صرفاً submit می‌کند و null برمی‌گرداند
   */
  async submitAndWaitForPossibleUploadResult(): Promise<UploadResult | null> {
    await this.submit();

    // اگر هیچ toastی ظاهر نشد، سریع برگرد
    const anyToastAppeared = await Promise.race([
      this.getImageUploadingToastMessage()
        .waitFor({ state: "visible" })
        .then(() => true),
      this.getImageUploadSuccessToastMessage()
        .waitFor({ state: "visible" })
        .then(() => true),
      this.getFailedInsertPicAllert()
        .waitFor({ state: "visible" })
        .then(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 2500)),
    ]);

    if (!anyToastAppeared) return null;

    return await this.waitForUploadProcessToFinish();
  }

  /**
   * سناریو: ذخیره لوگو از دیالوگ + انتظار برای نتیجه آپلود
   */
  async saveLogoAndWaitForUploadResult(): Promise<UploadResult> {
    await this.saveLogoFromDialog();
    return await this.waitForUploadProcessToFinish();
  }

  /**
   * سناریو: ذخیره کاور از دیالوگ + انتظار برای نتیجه آپلود
   */
  async saveCoverAndWaitForUploadResult(): Promise<UploadResult> {
    await this.saveCoverFromDialog();
    return await this.waitForUploadProcessToFinish();
  }

  /**
   * سناریو: حذف فایل (عمومی) + بستن سکشن (اگر لازم باشد)
   * چون locator حذف‌ها مشترک است، فعلاً همین رفتار عمومی را نگه می‌داریم.
   */
  async deleteFileAndCloseSection(): Promise<void> {
    await this.deleteVendorCreateBusinessFile();
    await this.closeSection();
  }
}
