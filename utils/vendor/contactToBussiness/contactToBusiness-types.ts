import type { Locator } from '@playwright/test';

export type ContactToBusinessElements = {
  vendorCreateContactToBusinessHeader: Locator;
  vendorCreateContactToBusinessMapButton: Locator;
  vendorCreateContactToBusinessClickToMap: Locator;
  vendorCreateContactToBusinessLongitude: Locator;
  vendorCreateContactToBusinessLatitude: Locator;
  vendorCreateContactToBusinessProvince: Locator;
  vendorCreateContactToBusinessProvinceSelectOptions: (provinceName: string) => Locator;
  vendorCreateContactToBusinessCity: Locator;
  vendorCreateContactToBusinessCitySelectOptions: (cityName: string) => Locator;
  vendorCreateContactToBusinessRegion: Locator;
  vendorCreateContactToBusinessRegionSelectOptions: (regionName: string) => Locator;
  vendorCreateContactToBusinessNeighborhood: Locator;
  vendorCreateContactToBusinessNeighborhoodSelectOptions: (neighborhoodName: string) => Locator;
  vendorCreateContactToBusinessAddress: Locator;
  vendorCreateContactToBusinessAddressTextBox: Locator;
  vendorCreateContactToBusinessTell: Locator;
  vendorCreateContactToBusinessTellBox: Locator;
  vendorCreateContactToBusinessAddTellButton: Locator;
  vendorCreateContactToBusinessDeleteTell: Locator;
  vendorCreateContactToBusinessTellIsWrongAllert: Locator;
  vendorCreateContactToBusinessLongitudeAllert: Locator;
  vendorCreateContactToBusinessLatitudeAllert: Locator;
  vendorCreateContactToBusinessAddressAllert: Locator;
  vendorCreateContactToBusinessEmptyTellAllert: Locator;
  vendorCreateContactToBusinessPersianKeyBoardAllert: Locator;
};
