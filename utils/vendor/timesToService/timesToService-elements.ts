import type { Page } from '@playwright/test';

import type { TimesToServiceElements } from './timesToService-types';

export const timesToServiceElements = (page: Page): TimesToServiceElements => ({


      vendorCreateTimesToServiceHeader:page.getByRole('button', { name: '۳. اطلاعات تماس کسب و کار' }),
    //   vendorCreateTimesToServiceOpenSection:,
      vendorCreateTimesToServiceMapButton: page.getByRole('button', { name: 'مشاهده نقشه' }),
      vendorCreateTimesToServiceClickToMap:page.getByText('+−Leaflet©Neshan ©OSM'),
      vendorCreateTimesToServiceLongitude:page.getByRole('textbox', { name: '* طول جغرافیایی' }),
      vendorCreateTimesToServiceLatitude:page.getByRole('textbox', { name: '* عرض جغرافیایی' }),
      vendorCreateTimesToServiceProvince:page.getByText('*استان'),
      vendorCreateTimesToServiceProvinceSelectOptions:(provinceName: string) =>  page.getByText(provinceName, { exact: true }),
      vendorCreateTimesToServiceCity: page.getByText('*شهر'),
      vendorCreateTimesToServiceCitySelectOptions:(CityName: string) => page.getByText(CityName, { exact: true }),
      vendorCreateTimesToServiceRegion:page.getByText('منطقه', { exact: true }),
      vendorCreateTimesToServiceRegionSelectOptions:(RegionName: string) => page.getByText(RegionName, { exact: true }),
      vendorCreateTimesToServiceNeighborhood: page.getByText('محله', {exact: true,}),
      vendorCreateTimesToServiceNeighborhoodSelectOptions:(NeighborhoodName: string) => page.getByText(NeighborhoodName, { exact: true }),
      vendorCreateTimesToServiceAddress:page.getByText('* آدرس'),
      vendorCreateTimesToServiceAddressTextBox: page.getByRole('textbox', { name: '* آدرس' }),
      vendorCreateTimesToServiceTell:page.getByText('* شماره تماس'),
      vendorCreateTimesToServiceTellBox: page.getByRole('textbox', { name: '* شماره تماس' }),
      vendorCreateTimesToServiceAddTellButton:page.getByRole('button', { name: '+ افزودن' }),
      vendorCreateTimesToServiceDeleteTell:page.locator('i.simple-icon-trash'),
      vendorCreateTimesToServiceTellIsWrongAllert:page.getByText('شماره تماس وارد شده معتبر نیست'),
      vendorCreateTimesToServiceLongitudeAllert:page.getByText('طول جغرافیایی معتبر نیست'),
      vendorCreateTimesToServiceLatitudeAllert:page.getByText('عرض جغرافیایی معتبر نیست'),
      vendorCreateTimesToServiceAddressAllert:page.getByText('وارد کردن آدرس الزامی است'),
      vendorCreateTimesToServiceEmptyTellAllert:page.getByText('حداقل یک شماره تماس باید وارد شود'),
      vendorCreateTimesToServicePersianKeyBoardAllert:page.getByText("لطفا زبان کیبورد خود را تغییر دهید"),

});
