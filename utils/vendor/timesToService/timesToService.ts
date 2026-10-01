import { expect, type Locator, type Page } from '@playwright/test';

import { timesToServiceElements } from './timesToService-elements';
import type { TimesToServiceElements } from './timesToService-types';

export class TimesToServiceSection {
  private readonly timesToService: TimesToServiceElements;

  constructor(page: Page) {
    this.timesToService = timesToServiceElements(page);
  }

  //---------------------------ELEMENTS---------------------------------------

  getVendorCreateTimesToServiceHeader(): Locator {
    return this.timesToService.vendorCreateTimesToServiceHeader;
  }

  getVendorCreateTimesToServiceMapButton(): Locator {
    return this.timesToService.vendorCreateTimesToServiceMapButton;
  }

  getVendorCreateTimesToServiceClickToMap(): Locator {
    return this.timesToService.vendorCreateTimesToServiceClickToMap;
  }

  getVendorCreateTimesToServiceLongitude(): Locator {
    return this.timesToService.vendorCreateTimesToServiceLongitude;
  }

  getVendorCreateTimesToServiceLatitude(): Locator {
    return this.timesToService.vendorCreateTimesToServiceLatitude;
  }

  getVendorCreateTimesToServiceProvince(): Locator {
    return this.timesToService.vendorCreateTimesToServiceProvince;
  }

  getVendorCreateTimesToServiceProvinceSelectOptions(provinceName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceProvinceSelectOptions(provinceName);
  }

  getVendorCreateTimesToServiceCity(): Locator {
    return this.timesToService.vendorCreateTimesToServiceCity;
  }

  getVendorCreateTimesToServiceCitySelectOptions(cityName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceCitySelectOptions(cityName);
  }

  getVendorCreateTimesToServiceRegion(): Locator {
    return this.timesToService.vendorCreateTimesToServiceRegion;
  }

  getVendorCreateTimesToServiceRegionSelectOptions(regionName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceRegionSelectOptions(regionName);
  }

  getVendorCreateTimesToServiceNeighborhood(): Locator {
    return this.timesToService.vendorCreateTimesToServiceNeighborhood;
  }

  getVendorCreateTimesToServiceNeighborhoodSelectOptions(neighborhoodName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceNeighborhoodSelectOptions(neighborhoodName);
  }

  getVendorCreateTimesToServiceAddress(): Locator {
    return this.timesToService.vendorCreateTimesToServiceAddress;
  }

  getVendorCreateTimesToServiceAddressTextBox(): Locator {
    return this.timesToService.vendorCreateTimesToServiceAddressTextBox;
  }

  getVendorCreateTimesToServiceTell(): Locator {
    return this.timesToService.vendorCreateTimesToServiceTell;
  }

  getVendorCreateTimesToServiceTellBox(): Locator {
    return this.timesToService.vendorCreateTimesToServiceTellBox;
  }

  getVendorCreateTimesToServiceAddTellButton(): Locator {
    return this.timesToService.vendorCreateTimesToServiceAddTellButton;
  }

  getVendorCreateTimesToServiceDeleteTell(): Locator {
    return this.timesToService.vendorCreateTimesToServiceDeleteTell;
  }

  getVendorCreateTimesToServiceTellIsWrongAllert(): Locator {
    return this.timesToService.vendorCreateTimesToServiceTellIsWrongAllert;
  }

  getVendorCreateTimesToServiceLongitudeAllert(): Locator {
    return this.timesToService.vendorCreateTimesToServiceLongitudeAllert;
  }

  getVendorCreateTimesToServiceLatitudeAllert(): Locator {
    return this.timesToService.vendorCreateTimesToServiceLatitudeAllert;
  }

  getVendorCreateTimesToServiceAddressAllert(): Locator {
    return this.timesToService.vendorCreateTimesToServiceAddressAllert;
  }

  getVendorCreateTimesToServiceEmptyTellAllert(): Locator {
    return this.timesToService.vendorCreateTimesToServiceEmptyTellAllert;
  }

  getVendorCreateTimesToServicePersianKeyBoardAllert(): Locator {
    return this.timesToService.vendorCreateTimesToServicePersianKeyBoardAllert;
  }

  //---------------------------SECTION ACTIONS--------------------------------

  async openTimesToServiceSection(): Promise<void> {
    await this.getVendorCreateTimesToServiceHeader().click();
  }

  async clickMapButton(): Promise<void> {
    await this.getVendorCreateTimesToServiceMapButton().click();
  }

  async clickOnMap(): Promise<void> {
    await this.getVendorCreateTimesToServiceClickToMap().click();
  }

  //---------------------------LOCATION ACTIONS-------------------------------

  async fillLongitude(longitude: string): Promise<void> {
    await this.getVendorCreateTimesToServiceLongitude().fill(longitude);
  }

  async clearLongitude(): Promise<void> {
    await this.getVendorCreateTimesToServiceLongitude().clear();
  }

  async fillLatitude(latitude: string): Promise<void> {
    await this.getVendorCreateTimesToServiceLatitude().fill(latitude);
  }

  async clearLatitude(): Promise<void> {
    await this.getVendorCreateTimesToServiceLatitude().clear();
  }

  async selectProvince(provinceName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceProvince().click();
    await this.getVendorCreateTimesToServiceProvinceSelectOptions(provinceName).click();
  }

  async selectCity(cityName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceCity().click();
    await this.getVendorCreateTimesToServiceCitySelectOptions(cityName).click();
  }

  async selectRegion(regionName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceRegion().click();
    await this.getVendorCreateTimesToServiceRegionSelectOptions(regionName).click();
  }

  async selectNeighborhood(neighborhoodName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceNeighborhood().click();
    await this.getVendorCreateTimesToServiceNeighborhoodSelectOptions(neighborhoodName).click();
  }

  async fillLocation(
    longitude: string,
    latitude: string,
    provinceName: string,
    cityName: string,
    regionName: string,
    neighborhoodName: string,
    address: string
  ): Promise<void> {
    await this.fillLongitude(longitude);
    await this.fillLatitude(latitude);
    await this.selectProvince(provinceName);
    await this.selectCity(cityName);
    await this.selectRegion(regionName);
    await this.selectNeighborhood(neighborhoodName);
    await this.fillAddress(address);
  }

  //---------------------------ADDRESS ACTIONS--------------------------------

  async fillAddress(address: string): Promise<void> {
    await this.getVendorCreateTimesToServiceAddressTextBox().fill(address);
  }

  async clearAddress(): Promise<void> {
    await this.getVendorCreateTimesToServiceAddressTextBox().clear();
  }

  //---------------------------PHONE ACTIONS----------------------------------

  async fillTell(tell: string): Promise<void> {
    await this.getVendorCreateTimesToServiceTellBox().fill(tell);
  }

  async clearTell(): Promise<void> {
    await this.getVendorCreateTimesToServiceTellBox().clear();
  }

  async addTell(): Promise<void> {
    await this.getVendorCreateTimesToServiceAddTellButton().click();
  }

  async fillAndAddTell(tell: string): Promise<void> {
    await this.fillTell(tell);
    await this.addTell();
  }


  async deleteTell(index: number = 0): Promise<void> {
    await this.getVendorCreateTimesToServiceDeleteTell().nth(index).click();
  }

  async deleteFirstTell(): Promise<void> {
    await this.deleteTell(0);
  }

  async deleteLastTell(): Promise<void> {
    const deleteButtons = this.getVendorCreateTimesToServiceDeleteTell();
    const count = await deleteButtons.count();
    if (count > 0) {
      await deleteButtons.nth(count - 1).click();
    }
  }

  async deleteAllTells(): Promise<void> {
    const deleteButtons = this.getVendorCreateTimesToServiceDeleteTell();
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

  //---------------------------INVALID DATA SCENARIOS-------------------------

  async fillInvalidLongitude(longitude: string): Promise<void> {
    await this.fillLongitude(longitude);
    await this.getVendorCreateTimesToServiceLongitude().blur();
  }

  async fillInvalidLatitude(latitude: string): Promise<void> {
    await this.fillLatitude(latitude);
    await this.getVendorCreateTimesToServiceLatitude().blur();
  }

  async fillInvalidTell(tell: string): Promise<void> {
    await this.fillTell(tell);
    await this.getVendorCreateTimesToServiceTellBox().blur();
  }

  async fillPersianTell(tell: string): Promise<void> {
    await this.fillTell(tell);
    await this.getVendorCreateTimesToServiceTellBox().blur();
  }

  async leaveAddressEmpty(): Promise<void> {
    await this.clearAddress();
    await this.getVendorCreateTimesToServiceAddressTextBox().blur();
  }

  async leaveTellEmpty(): Promise<void> {
    await this.clearTell();
    await this.getVendorCreateTimesToServiceTellBox().blur();
  }

  //---------------------------ALERT ASSERTIONS-------------------------------

  async expectInvalidTellAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServiceTellIsWrongAllert()).toBeVisible();
  }

  async expectInvalidLongitudeAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServiceLongitudeAllert()).toBeVisible();
  }

  async expectInvalidLatitudeAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServiceLatitudeAllert()).toBeVisible();
  }

  async expectRequiredAddressAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServiceAddressAllert()).toBeVisible();
  }

  async expectEmptyTellAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServiceEmptyTellAllert()).toBeVisible();
  }

  async expectPersianKeyboardAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServicePersianKeyBoardAllert()).toBeVisible();
  }

  //---------------------------ALERT VISIBILITY METHODS-----------------------

  async isInvalidTellAlertVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServiceTellIsWrongAllert().isVisible();
  }

  async isInvalidLongitudeAlertVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServiceLongitudeAllert().isVisible();
  }

  async isInvalidLatitudeAlertVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServiceLatitudeAllert().isVisible();
  }

  async isRequiredAddressAlertVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServiceAddressAllert().isVisible();
  }

  async isEmptyTellAlertVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServiceEmptyTellAllert().isVisible();
  }

  async isPersianKeyboardAlertVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServicePersianKeyBoardAllert().isVisible();
  }
}
