import { expect, type Locator, type Page } from '@playwright/test';

import { contactToBusinessElements } from './contactToBussiness-elements';
import type { ContactToBusinessElements } from './contactToBusiness-types';

export interface FillLocationParams {
  longitude?: string;
  latitude?: string;
  provinceName?: string;
  cityName?: string;
  regionName?: string;
  neighborhoodName?: string;
  address?: string;
}

export interface FillContactInfoParams extends FillLocationParams {
  tells?: string[];
}

export class ContactToBusinessSection {
  private readonly page: Page;
  private readonly contactToBusiness: ContactToBusinessElements;

  constructor(page: Page) {
    this.page = page;
    this.contactToBusiness = contactToBusinessElements(page);
  }

  //---------------------------ELEMENTS---------------------------------------

  getVendorCreateContactToBusinessHeader(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessHeader;
  }

  getVendorCreateContactToBusinessMapButton(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessMapButton;
  }

  getVendorCreateContactToBusinessClickToMap(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessClickToMap;
  }

  getVendorCreateContactToBusinessLongitude(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessLongitude;
  }

  getVendorCreateContactToBusinessLatitude(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessLatitude;
  }

  getVendorCreateContactToBusinessProvince(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessProvince;
  }

  getVendorCreateContactToBusinessProvinceSelectOptions(provinceName: string): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessProvinceSelectOptions(provinceName);
  }

  getVendorCreateContactToBusinessCity(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessCity;
  }

  getVendorCreateContactToBusinessCitySelectOptions(cityName: string): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessCitySelectOptions(cityName);
  }

  getVendorCreateContactToBusinessRegion(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessRegion;
  }

  getVendorCreateContactToBusinessRegionSelectOptions(regionName: string): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessRegionSelectOptions(regionName);
  }

  getVendorCreateContactToBusinessNeighborhood(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessNeighborhood;
  }

  getVendorCreateContactToBusinessNeighborhoodSelectOptions(neighborhoodName: string): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessNeighborhoodSelectOptions(neighborhoodName);
  }

  getVendorCreateContactToBusinessAddress(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessAddress;
  }

  getVendorCreateContactToBusinessAddressTextBox(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessAddressTextBox;
  }

  getVendorCreateContactToBusinessTell(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessTell;
  }

  getVendorCreateContactToBusinessTellBox(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessTellBox;
  }

  getVendorCreateContactToBusinessAddTellButton(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessAddTellButton;
  }

  getVendorCreateContactToBusinessDeleteTell(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessDeleteTell;
  }

  getVendorCreateContactToBusinessTellIsWrongAllert(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessTellIsWrongAllert;
  }

  getVendorCreateContactToBusinessLongitudeAllert(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessLongitudeAllert;
  }

  getVendorCreateContactToBusinessLatitudeAllert(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessLatitudeAllert;
  }

  getVendorCreateContactToBusinessAddressAllert(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessAddressAllert;
  }

  getVendorCreateContactToBusinessEmptyTellAllert(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessEmptyTellAllert;
  }

  getVendorCreateContactToBusinessPersianKeyBoardAllert(): Locator {
    return this.contactToBusiness.vendorCreateContactToBusinessPersianKeyBoardAllert;
  }

  //---------------------------ACTIONS----------------------------------------

  async openContactToBusinessSection(): Promise<void> {
    await this.getVendorCreateContactToBusinessHeader().click();
  }

  async clickMapButton(): Promise<void> {
    await this.getVendorCreateContactToBusinessMapButton().click();
  }

  async clickOnMap(): Promise<void> {
    await this.getVendorCreateContactToBusinessClickToMap().click();
  }

  async fillLongitude(longitude: string): Promise<void> {
    await this.getVendorCreateContactToBusinessLongitude().fill(longitude);
  }

  async clearLongitude(): Promise<void> {
    await this.getVendorCreateContactToBusinessLongitude().clear();
  }

  async fillLatitude(latitude: string): Promise<void> {
    await this.getVendorCreateContactToBusinessLatitude().fill(latitude);
  }

  async clearLatitude(): Promise<void> {
    await this.getVendorCreateContactToBusinessLatitude().clear();
  }

  async selectProvince(provinceName: string): Promise<void> {
    await this.getVendorCreateContactToBusinessProvince().click();
    await this.getVendorCreateContactToBusinessProvinceSelectOptions(provinceName).click();
  }

  async selectCity(cityName: string): Promise<void> {
    await this.getVendorCreateContactToBusinessCity().click();
    await this.getVendorCreateContactToBusinessCitySelectOptions(cityName).click();
  }

  async selectRegion(regionName: string): Promise<void> {
    await this.getVendorCreateContactToBusinessRegion().click();
    await this.getVendorCreateContactToBusinessRegionSelectOptions(regionName).click();
  }

  async selectNeighborhood(neighborhoodName: string): Promise<void> {
    await this.getVendorCreateContactToBusinessNeighborhood().click();
    await this.getVendorCreateContactToBusinessNeighborhoodSelectOptions(neighborhoodName).click();
  }

  async fillAddress(address: string): Promise<void> {
    await this.getVendorCreateContactToBusinessAddressTextBox().fill(address);
  }

  async clearAddress(): Promise<void> {
    await this.getVendorCreateContactToBusinessAddressTextBox().clear();
  }

  async fillTell(tell: string): Promise<void> {
    await this.getVendorCreateContactToBusinessTellBox().fill(tell);
  }

  async clearTell(): Promise<void> {
    await this.getVendorCreateContactToBusinessTellBox().clear();
  }

  async addTell(): Promise<void> {
    await this.getVendorCreateContactToBusinessAddTellButton().click();
  }

  async fillAndAddTell(tell: string): Promise<void> {
    await this.fillTell(tell);
    await this.addTell();
  }

  async deleteTell(index: number = 0): Promise<void> {
    await this.getVendorCreateContactToBusinessDeleteTell().nth(index).click();
  }

  async deleteFirstTell(): Promise<void> {
    await this.deleteTell(0);
  }

  async deleteLastTell(): Promise<void> {
    const deleteButtons = this.getVendorCreateContactToBusinessDeleteTell();
    const count = await deleteButtons.count();
    if (count > 0) {
      await deleteButtons.nth(count - 1).click();
    }
  }

  async deleteAllTells(): Promise<void> {
    const deleteButtons = this.getVendorCreateContactToBusinessDeleteTell();
    while ((await deleteButtons.count()) > 0) {
      await deleteButtons.first().click();
    }
  }

  async fillContactInformation(address: string, tell: string): Promise<void> {
    await this.fillAddress(address);
    await this.fillTell(tell);
  }

  async clearContactInformation(): Promise<void> {
    await this.clearAddress();
    await this.clearTell();
  }

  //---------------------------INVALID TRIGGER ACTIONS------------------------

  async fillInvalidLongitude(longitude: string): Promise<void> {
    await this.fillLongitude(longitude);
    await this.getVendorCreateContactToBusinessLongitude().blur();
  }

  async fillInvalidLatitude(latitude: string): Promise<void> {
    await this.fillLatitude(latitude);
    await this.getVendorCreateContactToBusinessLatitude().blur();
  }

  async fillInvalidTell(tell: string): Promise<void> {
    await this.fillTell(tell);
    await this.getVendorCreateContactToBusinessTellBox().blur();
  }

  async fillPersianTell(tell: string): Promise<void> {
    await this.fillTell(tell);
    await this.getVendorCreateContactToBusinessTellBox().blur();
  }

  async leaveAddressEmpty(): Promise<void> {
    await this.clearAddress();
    await this.getVendorCreateContactToBusinessAddressTextBox().blur();
  }

  async leaveTellEmpty(): Promise<void> {
    await this.clearTell();
    await this.getVendorCreateContactToBusinessTellBox().blur();
  }

  //---------------------------WAITS------------------------------------------

  async waitForHeaderVisible(): Promise<void> {
    await this.getVendorCreateContactToBusinessHeader().waitFor({ state: 'visible' });
  }

  async waitForAddressInputVisible(): Promise<void> {
    await this.getVendorCreateContactToBusinessAddressTextBox().waitFor({ state: 'visible' });
  }

  async waitForTellInputVisible(): Promise<void> {
    await this.getVendorCreateContactToBusinessTellBox().waitFor({ state: 'visible' });
  }

  async waitForMapVisible(): Promise<void> {
    await this.getVendorCreateContactToBusinessClickToMap().waitFor({ state: 'visible' });
  }

  //---------------------------ASSERTIONS-------------------------------------

  async expectInvalidTellAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessTellIsWrongAllert()).toBeVisible();
  }

  async expectInvalidTellAlertHidden(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessTellIsWrongAllert()).toBeHidden();
  }

  async expectInvalidLongitudeAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessLongitudeAllert()).toBeVisible();
  }

  async expectInvalidLongitudeAlertHidden(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessLongitudeAllert()).toBeHidden();
  }

  async expectInvalidLatitudeAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessLatitudeAllert()).toBeVisible();
  }

  async expectInvalidLatitudeAlertHidden(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessLatitudeAllert()).toBeHidden();
  }

  async expectRequiredAddressAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessAddressAllert()).toBeVisible();
  }

  async expectRequiredAddressAlertHidden(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessAddressAllert()).toBeHidden();
  }

  async expectEmptyTellAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessEmptyTellAllert()).toBeVisible();
  }

  async expectEmptyTellAlertHidden(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessEmptyTellAllert()).toBeHidden();
  }

  async expectPersianKeyboardAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessPersianKeyBoardAllert()).toBeVisible();
  }

  async expectPersianKeyboardAlertHidden(): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessPersianKeyBoardAllert()).toBeHidden();
  }

  async expectAddressValue(value: string): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessAddressTextBox()).toHaveValue(value);
  }

  async expectLongitudeValue(value: string): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessLongitude()).toHaveValue(value);
  }

  async expectLatitudeValue(value: string): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessLatitude()).toHaveValue(value);
  }

  async expectAddedTellsCount(count: number): Promise<void> {
    await expect(this.getVendorCreateContactToBusinessDeleteTell()).toHaveCount(count);
  }

  //---------------------------FLOWS (SCENARIOS)------------------------------

  /**
   * سناریو: باز کردن سکشن اطلاعات تماس و انتظار برای آماده شدن فرم
   */
  async openSectionAndWaitReadyFlow(): Promise<void> {
    await this.openContactToBusinessSection();
    await this.waitForAddressInputVisible();
  }

  /**
   * سناریو: پر کردن بخش موقعیت جغرافیایی و آدرس (سازگار با تست‌های مثبت و منفی)
   */
  async fillLocationFlow(params: FillLocationParams): Promise<void> {
    if (params.longitude !== undefined) await this.fillLongitude(params.longitude);
    if (params.latitude !== undefined) await this.fillLatitude(params.latitude);
    if (params.provinceName !== undefined) await this.selectProvince(params.provinceName);
    if (params.cityName !== undefined) await this.selectCity(params.cityName);
    if (params.regionName !== undefined) await this.selectRegion(params.regionName);
    if (params.neighborhoodName !== undefined) await this.selectNeighborhood(params.neighborhoodName);
    if (params.address !== undefined) await this.fillAddress(params.address);
  }

  /**
   * سناریو: افزودن آرایه‌ای از شماره تماس‌ها پشت سر هم
   */
  async addMultiplePhonesFlow(tells: string[]): Promise<void> {
    for (const tell of tells) {
      await this.fillAndAddTell(tell);
    }
  }

  /**
   * سناریو: پر کردن کامل تمام اطلاعات تماس و آدرس
   */
  async fillCompleteContactInfoFlow(params: FillContactInfoParams): Promise<void> {
    await this.fillLocationFlow(params);

    if (params.tells && params.tells.length > 0) {
      await this.addMultiplePhonesFlow(params.tells);
    }
  }

  /**
   * سناریو: تست اعتبارسنجی فیلدهای خالی (Negative Test)
   */
  async assertRequiredErrorsForEmptyContactInputs(): Promise<void> {
    await this.leaveAddressEmpty();
    await this.expectRequiredAddressAlertVisible();
  }
}
