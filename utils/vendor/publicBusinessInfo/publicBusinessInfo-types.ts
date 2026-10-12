import type { Locator } from "@playwright/test";

export type PuplicBusinessInfoElements = {
  vendorCreatePublicBusinessInfoHeader: Locator;
  vendorCreatePublicBusinessInfoOpenSection: Locator;
  vendorCreatePublicBusinessInfoName: Locator;
  vendorCreatePublicBusinessInfoSelectCategory: Locator;
  vendorCreatePublicBusinessInfoSelectOptionOfCategory: (
    categoryName: string,
  ) => Locator;
  vendorCreatePublicBusinessInfoMenueAddress: Locator;
  vendorCreatePublicBusinessInfoPOSsystem: Locator;
  vendorCreatePublicBusinessInfoPOSsystemSelectOption: Locator;
  vendorCreatePublicBusinessInfoPOSsystemDropDown: Locator;
  vendorCreatePublicBusinessInfoPOSsystemDropDownSelectOption: (
    posName?: string,
  ) => Locator;
  vendorCreatePublicBusinessInfoCoverInput: Locator;
  vendorCreatePublicBusinessInfoDescription: Locator;
  vendorCreatePublicBusinessInfoDescriptionInputBox: Locator;
  vendorCreatePublicBusinessInfoLogo: Locator;
vendorCreatePublicBusinessInfoLogoInput: Locator;
  vendorCreatePublicBusinessInfoLogoButton: Locator;
  vendorCreatePublicBusinessInfoCover: Locator;
  vendorCreatePublicBusinessInfoCoverButton: Locator;
  vendorCreatePublicBusinessInfoNameEmptyAllert: Locator;
  vendorCreatePublicBusinessInfoCategoryEmptyAllert: Locator;
  vendorCreatePublicBusinessInfoPOSsystemDropDownEmptyAllert: Locator;
  vendorCreatePublicBusinessInfoNameExist: (businessName: string) => Locator;
};
