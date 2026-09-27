import type { Locator, Page } from '@playwright/test';

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
}
