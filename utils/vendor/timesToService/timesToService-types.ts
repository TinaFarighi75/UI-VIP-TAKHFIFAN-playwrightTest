import type { Locator } from "@playwright/test";

export type TimesToServiceElements = {

    vendorCreateTimesToServiceHeader:Locator;
    // vendorCreateTimesToServiceOpenSection:Locator;
    vendorCreateTimesToServiceMapButton:Locator;
    vendorCreateTimesToServiceClickToMap:Locator;
    vendorCreateTimesToServiceLongitude:Locator;
    vendorCreateTimesToServiceLatitude:Locator;
    vendorCreateTimesToServiceProvince:Locator;
    vendorCreateTimesToServiceProvinceSelectOptions:(provinceName: string) => Locator;
    vendorCreateTimesToServiceCity:Locator;
    vendorCreateTimesToServiceCitySelectOptions:(CityName: string) => Locator;
    vendorCreateTimesToServiceRegion:Locator;
    vendorCreateTimesToServiceRegionSelectOptions:(RegionName: string) => Locator;
    vendorCreateTimesToServiceNeighborhood:Locator;
    vendorCreateTimesToServiceNeighborhoodSelectOptions:(NeighborhoodName: string) => Locator;
    vendorCreateTimesToServiceAddress:Locator;
    vendorCreateTimesToServiceAddressTextBox:Locator;
    vendorCreateTimesToServiceTell:Locator;
    vendorCreateTimesToServiceTellBox:Locator;
    vendorCreateTimesToServiceAddTellButton:Locator;
    vendorCreateTimesToServiceDeleteTell:Locator;
    vendorCreateTimesToServiceTellIsWrongAllert:Locator;
    vendorCreateTimesToServiceLongitudeAllert:Locator;
    vendorCreateTimesToServiceLatitudeAllert:Locator;
    vendorCreateTimesToServiceAddressAllert:Locator;
    vendorCreateTimesToServiceEmptyTellAllert:Locator;
    vendorCreateTimesToServicePersianKeyBoardAllert:Locator


};
