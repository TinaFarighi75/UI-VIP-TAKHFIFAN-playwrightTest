import type { Locator } from '@playwright/test';

export type OwnerBusinessElements = {
  vendorButton: Locator;
  vendorCreateButton: Locator;
  vendorCreateHeading: Locator;
  vendorCreateOwnerHeading: Locator;
  vendorOpenSectionOwnerInfo: Locator;
  vendorCreateSelectingSource: Locator;
  vendorCreateOptionOfSelectSource: Locator;
  vendorCreateOwnerName: Locator;
  vendorCreateAlertRequiredOwnerName: Locator;
  vendorCreateOwnerMobile: Locator;
  vendorCreateAlertRequiredOwnerMobile: Locator;
  vendorCreateOwnerMobileAlertDuplicate: Locator;
  vendorCreateBusinessNameAlreadyRegisteredByMobile: Locator;
  vendorCreateBusinessOwnerInfoAlertWithoutSelectSource: Locator;
};
