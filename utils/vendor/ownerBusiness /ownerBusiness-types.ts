import type { Locator } from '@playwright/test';

export type OwnerBusinessElements = {
 
  vendorCreateOwnerHeading: Locator;
  vendorOpenSectionOwnerInfo: Locator;
  vendorCreateSelectingSource: Locator;
  vendorCreateOptionOfSelectSource: Locator;
  vendorCreateOwnerName: Locator;
  vendorCreateAlertRequiredOwnerName: Locator;
  vendorCreateOwnerMobile: Locator;
  vendorCreateAlertRequiredOwnerMobile: Locator;
  vendorCreateOwnerMobileAlertDuplicate: Locator;
  vendorCreateBusinessOwnerInfoAlertWithoutSelectSource: Locator;
  vendorCreateBusinessOwnerInfoAvailableVendor: (vendorName: string) => Locator;
  vendorCreateBusinessNameAlreadyRegisteredByMobile: (businessName: string) => Locator;

};
