import type { Locator, Page } from '@playwright/test';

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

  //---------------------------METHODS---------------------------------------

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
}
