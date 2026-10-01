import { expect, type Locator, type Page } from '@playwright/test';

import { createPublicBusinessInfoElements } from './publicBusinessInfo-elements';
import type { PuplicBusinessInfoElements } from './publicBusinessInfo-types';

export class PublicBusinessInfoSection {
  private readonly publicBusinessInfo: PuplicBusinessInfoElements;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.publicBusinessInfo = createPublicBusinessInfoElements(page);
  }

  //---------------------------ELEMENTS (GETTERS)---------------------------------------

  getPublicBusinessInfoHeader(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoHeader;
  }

  getPublicBusinessInfoOpenSection(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoOpenSection;
  }

  getPublicBusinessInfoName(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoName;
  }

  getPublicBusinessInfoSelectCategory(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoSelectCategory;
  }

  getPublicBusinessInfoSelectOptionOfCategory(categoryName: string): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoSelectOptionOfCategory(categoryName);
  }

  getPublicBusinessInfoMenueAddress(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoMenueAddress;
  }

  getPublicBusinessInfoPOSsystem(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoPOSsystem;
  }

  getPublicBusinessInfoPOSsystemSelectOption(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoPOSsystemSelectOption;
  }

  getPublicBusinessInfoPOSsystemDropDown(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoPOSsystemDropDown;
  }

  getPublicBusinessInfoPOSsystemDropDownSelectOption(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoPOSsystemDropDownSeelectOption;
  }

  getPublicBusinessInfoDescription(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoDescription;
  }

  getPublicBusinessInfoDescriptionInputBox(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoDescriptionInputBox;
  }

  getPublicBusinessInfoLogo(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoLogo;
  }

  getPublicBusinessInfoLogoButton(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoLogoButton;
  }

  getPublicBusinessInfoCover(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoCover;
  }

  getPublicBusinessInfoCoverButton(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoCoverButton;
  }

  getPublicBusinessInfoNameEmptyAlert(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoNameEmptyAllert;
  }

  getPublicBusinessInfoCategoryEmptyAlert(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoCategoryEmptyAllert;
  }

  getPublicBusinessInfoPOSsystemDropDownEmptyAlert(): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoPOSsystemDropDownEmptyAllert;
  }

  getPublicBusinessInfoNameExist(businessName: string): Locator {
    return this.publicBusinessInfo.vendorCreatePublicBusinessInfoNameExist(businessName);
  }

  //---------------------------METHODS (ACTIONS)---------------------------------------

  async openPublicBusinessInfoSection(): Promise<void> {
    await this.getPublicBusinessInfoOpenSection().click();
  }

  async fillBusinessName(businessName: string): Promise<void> {
    await this.getPublicBusinessInfoName().fill(businessName);
  }

  async clearBusinessName(): Promise<void> {
    await this.getPublicBusinessInfoName().clear();
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.getPublicBusinessInfoSelectCategory().click();
    await this.getPublicBusinessInfoSelectOptionOfCategory(categoryName).click();
  }

  async fillMenuAddress(menuAddress: string): Promise<void> {
    await this.getPublicBusinessInfoMenueAddress().fill(menuAddress);
  }

  async clearMenuAddress(): Promise<void> {
    await this.getPublicBusinessInfoMenueAddress().clear();
  }

  async selectPOSsystem(option: string): Promise<void> {
    await this.getPublicBusinessInfoPOSsystem().selectOption(option);
  }

  async selectPOSsystemDropDownOption(): Promise<void> {
    await this.getPublicBusinessInfoPOSsystemDropDown().click();
    await this.getPublicBusinessInfoPOSsystemDropDownSelectOption().click();
  }

  async fillDescription(description: string): Promise<void> {
    await this.getPublicBusinessInfoDescriptionInputBox().fill(description);
  }

  async clearDescription(): Promise<void> {
    await this.getPublicBusinessInfoDescriptionInputBox().clear();
  }

  async clickExistingBusinessName(businessName: string): Promise<void> {
    await this.getPublicBusinessInfoNameExist(businessName).click();
  }

  async uploadLogo(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.getPublicBusinessInfoLogoButton().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async uploadCover(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.getPublicBusinessInfoCoverButton().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  //---------------------------WAITS---------------------------------------------------

  async waitForHeaderVisible(): Promise<void> {
    await this.getPublicBusinessInfoHeader().waitFor({ state: 'visible' });
  }

  async waitForNameInputVisible(): Promise<void> {
    await this.getPublicBusinessInfoName().waitFor({ state: 'visible' });
  }

  async waitForCategoryDropdownVisible(): Promise<void> {
    await this.getPublicBusinessInfoSelectCategory().waitFor({ state: 'visible' });
  }

  async waitForDescriptionInputVisible(): Promise<void> {
    await this.getPublicBusinessInfoDescriptionInputBox().waitFor({ state: 'visible' });
  }

  //---------------------------ASSERTIONS---------------------------------------------

  async expectHeaderVisible(): Promise<void> {
    await expect(this.getPublicBusinessInfoHeader()).toBeVisible();
  }

  async expectBusinessNameValue(expectedName: string): Promise<void> {
    await expect(this.getPublicBusinessInfoName()).toHaveValue(expectedName);
  }

  async expectMenuAddressValue(expectedAddress: string): Promise<void> {
    await expect(this.getPublicBusinessInfoMenueAddress()).toHaveValue(expectedAddress);
  }

  async expectDescriptionValue(expectedDescription: string): Promise<void> {
    await expect(this.getPublicBusinessInfoDescriptionInputBox()).toHaveText(expectedDescription);
  }

  async expectNameEmptyAlertVisible(): Promise<void> {
    await expect(this.getPublicBusinessInfoNameEmptyAlert()).toBeVisible();
  }

  async expectCategoryEmptyAlertVisible(): Promise<void> {
    await expect(this.getPublicBusinessInfoCategoryEmptyAlert()).toBeVisible();
  }

  async expectPOSDropDownEmptyAlertVisible(): Promise<void> {
    await expect(this.getPublicBusinessInfoPOSsystemDropDownEmptyAlert()).toBeVisible();
  }

  async expectExistingBusinessLinkVisible(businessName: string): Promise<void> {
    await expect(this.getPublicBusinessInfoNameExist(businessName)).toBeVisible();
  }

  //---------------------------FLOWS (SCENARIOS)--------------------------------------

  /**
   * سناریو: باز کردن سکشن و اطمینان از لود کامل فیلدها
   */
  async openSectionAndWaitReadyFlow(): Promise<void> {
    await this.openPublicBusinessInfoSection();
    await this.waitForHeaderVisible();
    await this.waitForNameInputVisible();
  }

  /**
   * سناریو: پر کردن فیلدهای پایه
   * (پشتیبانی کامل از سناریوهای منفی - فیلدهایی که ارسال نشوند اصلاً دست‌نخورده و خالی باقی می‌مانند)
   */
  async fillBasicInfoFlow(params: {
    businessName?: string;
    categoryName?: string;
    menuAddress?: string;
    description?: string;
  }): Promise<void> {
    if (params.businessName !== undefined) {
      await this.fillBusinessName(params.businessName);
    }

    if (params.categoryName !== undefined) {
      await this.selectCategory(params.categoryName);
    }

    if (params.menuAddress !== undefined) {
      await this.fillMenuAddress(params.menuAddress);
    }

    if (params.description !== undefined) {
      await this.fillDescription(params.description);
    }
  }

  /**
   * سناریو: پر کردن کامل تمام فیلدها شامل صندوق
   * (پشتیبانی کامل از سناریوهای مثبت و منفی)
   */
  async fillFullPublicInfoFlow(params: {
    businessName?: string;
    categoryName?: string;
    menuAddress?: string;
    posOption?: string;
    description?: string;
  }): Promise<void> {
    await this.fillBasicInfoFlow({
      businessName: params.businessName,
      categoryName: params.categoryName,
      menuAddress: params.menuAddress,
      description: params.description,
    });

    if (params.posOption !== undefined) {
      await this.selectPOSsystem(params.posOption);
    }
  }

  /**
   * سناریو: آپلود فایل‌های لوگو و کاور (تکی یا همزمان)
   */
  async uploadMediaFilesFlow(params: { logoPath?: string; coverPath?: string }): Promise<void> {
    if (params.logoPath !== undefined) {
      await this.uploadLogo(params.logoPath);
    }
    if (params.coverPath !== undefined) {
      await this.uploadCover(params.coverPath);
    }
  }

  /**
   * سناریو: پاک کردن تمامی اینپوت‌های متنی فرم
   */
  async clearAllInputsFlow(): Promise<void> {
    await this.clearBusinessName();
    await this.clearMenuAddress();
    await this.clearDescription();
  }

  /**
   * سناریو: بررسی وضعیت نمایش ارورهای فیلدهای اجباری
   */
  async assertAllRequiredAlertsFlow(): Promise<void> {
    await this.expectNameEmptyAlertVisible();
    await this.expectCategoryEmptyAlertVisible();
    await this.expectPOSDropDownEmptyAlertVisible();
  }

  /**
   * سناریو: انتخاب کسب‌وکار از لیست پیشنهادی/موجود
   */
  async selectExistingBusinessFlow(businessName: string): Promise<void> {
    await this.expectExistingBusinessLinkVisible(businessName);
    await this.clickExistingBusinessName(businessName);
  }
}
