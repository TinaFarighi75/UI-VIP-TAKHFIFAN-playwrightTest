import type { Page } from '@playwright/test';
import type { ContactToBusinessElements } from './contactToBussiness-types';

export const contactToBusinessElements = (page: Page): ContactToBusinessElements => ({

  vendorCreateContactToBusinessHeader: page.getByRole('button', { name: '۳. اطلاعات تماس کسب و کار' }),
  // vendorCreateContactToBusinessOpenSection:,
  vendorCreateContactToBusinessMapButton: page.getByRole('button', { name: 'مشاهده نقشه' }),
  vendorCreateContactToBusinessClickToMap: page.getByText('+−Leaflet©Neshan ©OSM'),
  vendorCreateContactToBusinessLongitude: page.getByRole('textbox', { name: '* طول جغرافیایی' }),
  vendorCreateContactToBusinessLatitude: page.getByRole('textbox', { name: '* عرض جغرافیایی' }),
  vendorCreateContactToBusinessProvince: page.getByText('*استان'),
  vendorCreateContactToBusinessProvinceSelectOptions: (provinceName: string) => page.getByText(provinceName, { exact: true }),
  vendorCreateContactToBusinessCity: page.getByText('*شهر'),
  vendorCreateContactToBusinessCitySelectOptions: (cityName: string) => page.getByText(cityName, { exact: true }),
  vendorCreateContactToBusinessRegion: page.getByText('منطقه', { exact: true }),
  vendorCreateContactToBusinessRegionSelectOptions: (regionName: string) => page.getByText(regionName, { exact: true }),
  vendorCreateContactToBusinessNeighborhood: page.getByText('محله', { exact: true }),
  vendorCreateContactToBusinessNeighborhoodSelectOptions: (neighborhoodName: string) => page.getByText(neighborhoodName, { exact: true }),
  vendorCreateContactToBusinessAddress: page.getByText('* آدرس'),
  vendorCreateContactToBusinessAddressTextBox: page.getByRole('textbox', { name: '* آدرس' }),
  vendorCreateContactToBusinessTell: page.getByText('* شماره تماس'),
  vendorCreateContactToBusinessTellBox: page.getByRole('textbox', { name: '* شماره تماس' }),
  vendorCreateContactToBusinessAddTellButton: page.getByRole('button', { name: '+ افزودن' }),
  vendorCreateContactToBusinessDeleteTell: page.locator('i.simple-icon-trash'),
  vendorCreateContactToBusinessTellIsWrongAllert: page.getByText('شماره تماس وارد شده معتبر نیست'),
  vendorCreateContactToBusinessLongitudeAllert: page.getByText('طول جغرافیایی معتبر نیست'),
  vendorCreateContactToBusinessLatitudeAllert: page.getByText('عرض جغرافیایی معتبر نیست'),
  vendorCreateContactToBusinessAddressAllert: page.getByText('وارد کردن آدرس الزامی است'),
  vendorCreateContactToBusinessEmptyTellAllert: page.getByText('حداقل یک شماره تماس باید وارد شود'),
  vendorCreateContactToBusinessPersianKeyBoardAllert: page.getByText("لطفا زبان کیبورد خود را تغییر دهید"),

});
