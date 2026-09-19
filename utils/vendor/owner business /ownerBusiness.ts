import type { Locator, Page } from '@playwright/test';

import { createOwnerBusinessElements } from './ownerBusiness-elements';
import type { OwnerBusinessElements } from './ownerBusiness-types';

export class OwnerBusinessSection {
  private readonly OwnerBusiness: OwnerBusinessElements;

  constructor(page: Page) {
    this.OwnerBusiness = createOwnerBusinessElements(page);
  }

  /**
   * رفتن به صفحه کسب‌وکارها
   */
  async openVendorPage(): Promise<void> {
    await this.OwnerBusiness.vendorButton.click();
  }

  /**
   * رفتن به فرم ایجاد کسب‌وکار جدید
   */
  async openCreateBusinessPage(): Promise<void> {
    await this.OwnerBusiness.vendorCreateButton.click();
  }

  /**
   * باز کردن سکشن «اطلاعات صاحب کسب‌وکار»
   */
  async openOwnerInformationSection(): Promise<void> {
    await this.OwnerBusiness.vendorOpenSectionOwnerInfo.click();
  }

  /**
   * انتخاب منبع پیش‌فرض:
   * «جمع‌آوری تارگت به صورت حضوری»
   */
  async selectOwnerInformationSource(): Promise<void> {
    await this.OwnerBusiness.vendorCreateSelectingSource.click();

    await this.OwnerBusiness.vendorCreateOptionOfSelectSource.click();
  }

  /**
   * وارد کردن نام و نام خانوادگی صاحب کسب‌وکار
   */
  async fillOwnerName(ownerName: string): Promise<void> {
    await this.OwnerBusiness.vendorCreateOwnerName.fill(ownerName);
  }

  /**
   * وارد کردن شماره موبایل صاحب کسب‌وکار
   */
  async fillOwnerMobile(ownerMobile: string): Promise<void> {
    await this.OwnerBusiness.vendorCreateOwnerMobile.fill(ownerMobile);
  }

  /**
   * پاک کردن فیلد نام صاحب کسب‌وکار
   */
  async clearOwnerName(): Promise<void> {
    await this.OwnerBusiness.vendorCreateOwnerName.clear();
  }

  /**
   * پاک کردن فیلد شماره موبایل صاحب کسب‌وکار
   */
  async clearOwnerMobile(): Promise<void> {
    await this.OwnerBusiness.vendorCreateOwnerMobile.clear();
  }

  // ------------------ Locator Getterها برای Assertion ------------------

  getCreateBusinessHeading(): Locator {
    return this.OwnerBusiness.vendorCreateHeading;
  }

  getOwnerInformationHeading(): Locator {
    return this.OwnerBusiness.vendorCreateOwnerHeading;
  }

  getRequiredOwnerNameAlert(): Locator {
    return this.OwnerBusiness.vendorCreateAlertRequiredOwnerName;
  }

  getInvalidOwnerMobileAlert(): Locator {
    return this.OwnerBusiness.vendorCreateAlertRequiredOwnerMobile;
  }

  getDuplicateOwnerMobileAlert(): Locator {
    return this.OwnerBusiness.vendorCreateOwnerMobileAlertDuplicate;
  }

  getAlreadyRegisteredBusinessByMobileLink(): Locator {
    return this.OwnerBusiness.vendorCreateBusinessNameAlreadyRegisteredByMobile;
  }

  getSourceRequiredAlert(): Locator {
    return this.OwnerBusiness.vendorCreateBusinessOwnerInfoAlertWithoutSelectSource;
  }
}
