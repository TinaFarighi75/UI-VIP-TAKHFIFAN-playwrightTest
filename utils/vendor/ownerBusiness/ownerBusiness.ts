import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { createOwnerBusinessElements } from './ownerBusiness-elements';
import type { OwnerBusinessElements } from './ownerBusiness-types';

export class OwnerBusinessSection {
  private readonly ownerBusiness: OwnerBusinessElements;

  constructor(page: Page) {
    this.ownerBusiness = createOwnerBusinessElements(page);
  }

  //---------------------------ELEMENTS---------------------------------------

  getVendorOwnerHeading(): Locator {
    return this.ownerBusiness.vendorCreateOwnerHeading;
  }

  getVendorOpenSectionOwnerInfo(): Locator {
    return this.ownerBusiness.vendorOpenSectionOwnerInfo;
  }

  getVendorSelectingSource(): Locator {
    return this.ownerBusiness.vendorCreateSelectingSource;
  }

  getVendorOptionOfSelectSource(): Locator {
    return this.ownerBusiness.vendorCreateOptionOfSelectSource;
  }

  getVendorOwnerName(): Locator {
    return this.ownerBusiness.vendorCreateOwnerName;
  }

  getVendorAlertRequiredOwnerName(): Locator {
    return this.ownerBusiness.vendorCreateAlertRequiredOwnerName;
  }

  getVendorOwnerMobile(): Locator {
    return this.ownerBusiness.vendorCreateOwnerMobile;
  }

  getVendorAlertRequiredOwnerMobile(): Locator {
    return this.ownerBusiness.vendorCreateAlertRequiredOwnerMobile;
  }

  getVendorOwnerMobileAlertDuplicate(): Locator {
    return this.ownerBusiness.vendorCreateOwnerMobileAlertDuplicate;
  }

  getVendorBusinessNameAlreadyRegisteredByMobile(businessName: string): Locator {
    return this.ownerBusiness.vendorCreateBusinessNameAlreadyRegisteredByMobile(businessName);
  }

  getVendorBusinessOwnerInfoAlertWithoutSelectSource(): Locator {
    return this.ownerBusiness.vendorCreateBusinessOwnerInfoAlertWithoutSelectSource;
  }

  getVendorAvailableVendor(vendorName: string): Locator {
    return this.ownerBusiness.vendorCreateBusinessOwnerInfoAvailableVendor(vendorName);
  }

  //---------------------------METHODS (ACTIONS)------------------------------

  async openOwnerInformationSection(): Promise<void> {
    await this.getVendorOpenSectionOwnerInfo().click();
  }

  async selectOwnerInformationSource(): Promise<void> {
    await this.getVendorSelectingSource().click();
    await this.getVendorOptionOfSelectSource().click();
  }

  async fillOwnerName(ownerName: string): Promise<void> {
    await this.getVendorOwnerName().fill(ownerName);
  }

  async fillOwnerMobile(ownerMobile: string): Promise<void> {
    await this.getVendorOwnerMobile().fill(ownerMobile);
  }

  async clearOwnerName(): Promise<void> {
    await this.getVendorOwnerName().clear();
  }

  async clearOwnerMobile(): Promise<void> {
    await this.getVendorOwnerMobile().clear();
  }

  async clickAlreadyRegisteredBusiness(businessName: string): Promise<void> {
    await this.getVendorBusinessNameAlreadyRegisteredByMobile(businessName).click();
  }

  async clickAvailableVendor(vendorName: string): Promise<void> {
    await this.getVendorAvailableVendor(vendorName).click();
  }

  //---------------------------WAITS------------------------------------------

  async waitForOwnerSectionHeadingVisible(): Promise<void> {
    await this.getVendorOwnerHeading().waitFor({ state: 'visible' });
  }

  async waitForSourceSelectorVisible(): Promise<void> {
    await this.getVendorSelectingSource().waitFor({ state: 'visible' });
  }

  async waitForOwnerNameVisible(): Promise<void> {
    await this.getVendorOwnerName().waitFor({ state: 'visible' });
  }

  async waitForOwnerMobileVisible(): Promise<void> {
    await this.getVendorOwnerMobile().waitFor({ state: 'visible' });
  }

  //---------------------------ASSERTIONS-------------------------------------

  async expectOwnerSectionVisible(): Promise<void> {
    await expect(this.getVendorOwnerHeading()).toBeVisible();
  }

  async expectOwnerNameRequiredAlertVisible(): Promise<void> {
    await expect(this.getVendorAlertRequiredOwnerName()).toBeVisible();
  }

  async expectOwnerMobileFormatAlertVisible(): Promise<void> {
    await expect(this.getVendorAlertRequiredOwnerMobile()).toBeVisible();
  }

  async expectSourceRequiredAlertVisible(): Promise<void> {
    await expect(this.getVendorBusinessOwnerInfoAlertWithoutSelectSource()).toBeVisible();
  }

  async expectDuplicateMobileAlertVisible(): Promise<void> {
    await expect(this.getVendorOwnerMobileAlertDuplicate()).toBeVisible();
  }

  async expectOwnerNameValue(ownerName: string): Promise<void> {
    await expect(this.getVendorOwnerName()).toHaveValue(ownerName);
  }

  async expectOwnerMobileValue(ownerMobile: string): Promise<void> {
    await expect(this.getVendorOwnerMobile()).toHaveValue(ownerMobile);
  }

  //---------------------------FLOWS (SCENARIOS)------------------------------

  /**
   * سناریو: باز کردن سکشن و صبر برای آماده بودن فیلدها
   * (برای اینکه تست‌ها قبل از interact کردن flaky نشوند)
   */
  async openOwnerSectionAndWaitUntilReady(): Promise<void> {
    await this.openOwnerInformationSection();
    await this.waitForOwnerSectionHeadingVisible();
    await this.waitForOwnerNameVisible();
    await this.waitForOwnerMobileVisible();
    await this.waitForSourceSelectorVisible();
  }

  /**
   * سناریو: پر کردن نام و موبایل (بدون انتخاب منبع)
   */
  async fillOwnerInfoFlow(params: { ownerName: string; ownerMobile: string }): Promise<void> {
    await this.fillOwnerName(params.ownerName);
    await this.fillOwnerMobile(params.ownerMobile);
  }

  /**
   * سناریو: پر کردن اطلاعات + انتخاب منبع
   */
  async fillOwnerInfoAndSelectSourceFlow(params: {
    ownerName: string;
    ownerMobile: string;
  }): Promise<void> {
    await this.fillOwnerInfoFlow(params);
    await this.selectOwnerInformationSource();
  }

  /**
   * سناریو: پاک کردن همه فیلدهای این سکشن
   */
  async clearOwnerInfoFlow(): Promise<void> {
    await this.clearOwnerName();
    await this.clearOwnerMobile();
  }

  /**
   * سناریو: اعتبارسنجی خطاهای حالت خالی (بدون submit داخلی)
   * این فقط وضعیت alertها را چک می‌کند؛ submit در کلاس General انجام می‌شود.
   */
  async assertRequiredErrorsForEmptyInputs(): Promise<void> {
    await this.expectOwnerNameRequiredAlertVisible();
    // در UI شما پیام موبایل "فرمت شماره همراه صحیح نیست" است
    // معمولاً در حالت خالی هم همین می‌آید، پس همین را assert می‌کنیم
    await this.expectOwnerMobileFormatAlertVisible();
  }

  /**
   * سناریو: وقتی منبع انتخاب نشده باشد، خطای مربوطه باید نمایش داده شود.
   */
  async assertSourceNotSelectedError(): Promise<void> {
    await this.expectSourceRequiredAlertVisible();
  }

  /**
   * سناریو: وارد کردن موبایل تکراری و چک کردن پیام خطا
   * (فرض: بعد از blur/submit یا بعد از call API این alert می‌آید)
   */
  async fillDuplicateMobileAndAssert(params: {
    ownerName: string;
    duplicateMobile: string;
  }): Promise<void> {
    await this.fillOwnerName(params.ownerName);
    await this.fillOwnerMobile(params.duplicateMobile);

    // اگر پیام بعد از blur می‌آید:
    await this.getVendorOwnerMobile().blur().catch(() => {});
    await this.expectDuplicateMobileAlertVisible();
  }

  /**
   * سناریو: کلیک روی کسب‌وکارهایی که با موبایل نمایش داده می‌شوند
   */
  async selectBusinessFromAlreadyRegisteredListFlow(businessName: string): Promise<void> {
    await this.clickAlreadyRegisteredBusiness(businessName);
  }

  /**
   * سناریو: انتخاب vendor موجود
   */
  async selectAvailableVendorFlow(vendorName: string): Promise<void> {
    await this.clickAvailableVendor(vendorName);
  }
}
