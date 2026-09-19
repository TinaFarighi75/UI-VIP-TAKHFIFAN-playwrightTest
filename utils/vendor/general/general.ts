import type { Locator, Page } from '@playwright/test';

import { createGeneralElements } from './general-elements';
import type { GeneralObject } from './general-types';

export class GeneralSection {
  private readonly general: GeneralObject;

  constructor(page: Page) {
    this.general = createGeneralElements(page);
  }

  /**
   * بستن یا جمع کردن سکشن فعلی
   */
  async closeSection(): Promise<void> {
    await this.general.vendorCloseSection.click();
  }

  /**
   * حذف فایل آپلودشده در فرم ایجاد کسب‌وکار
   */
  async deleteVendorCreateBusinessFile(): Promise<void> {
    await this.general.vendorCreateBusinessFileDelete.click();
  }

  /**
   * Locator پیام «درحال بارگزاری تصویر»
   * برای assertion در فایل test استفاده می‌شود.
   */
  getImageUploadingToastMessage(): Locator {
    return this.general.vendorCreateBusinessToastMessageInsertingImage;
  }

  /**
   * Locator پیام موفقیت آپلود تصویر
   * برای assertion در فایل test استفاده می‌شود.
   */
  getImageUploadSuccessToastMessage(): Locator {
    return this.general
      .vendorCreateBusinessToastMessageSuccessInsertingImage;
  }
  
  async waitForImageUploadSuccessToastMessage(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageSuccessInsertingImage.waitFor({
      state: 'visible',
    });
  } 

  async waitForImageUploadingToastMessage(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageInsertingImage.waitFor({
      state: 'visible',
    });
  } 
  async waitForImageUploadingToastMessageToDisappear(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageInsertingImage.waitFor({
      state: 'hidden',
    });
  } 
  async waitForImageUploadSuccessToastMessageToDisappear(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageSuccessInsertingImage.waitFor({
      state: 'hidden',
    });
  } 
  async waitForImageUploadSuccessToastMessageToBeVisible(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageSuccessInsertingImage.waitFor({
      state: 'visible',
    });
  } 

  async waitForImageUploadingToastMessageToBeVisible(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageInsertingImage.waitFor({
      state: 'visible',
    });
  }
  

}
