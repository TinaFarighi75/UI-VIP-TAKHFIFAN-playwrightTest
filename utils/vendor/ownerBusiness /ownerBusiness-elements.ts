import type { Page } from '@playwright/test';
import type { OwnerBusinessElements } from './ownerBusiness-types';

export const createOwnerBusinessElements = (page: Page): OwnerBusinessElements => ({
  vendorCreateOwnerHeading: page.getByRole('heading', {
    name: '۱. اطلاعات صاحب کسب و کار',
  }),

  vendorOpenSectionOwnerInfo: page.locator('#section1'),

  // نکته: ستاره و فاصله‌ها ممکنه در UI متفاوت رندر شوند
  // exact:false پایدارتره؛ ولی متن اصلی شما حفظ شده
  vendorCreateSelectingSource: page.getByText('انتخاب منبع', { exact: false }),

  vendorCreateOptionOfSelectSource: page.getByText('جمع‌آوری تارگت به صورت حضوری', {
    exact: true,
  }),

  vendorCreateOwnerName: page.locator("input[id='name']"),

  vendorCreateAlertRequiredOwnerName: page.getByText('نام و نام خانوادگی ضروری است', {
    exact: true,
  }),

  vendorCreateOwnerMobile: page.locator("input[id='mobile']"),

  vendorCreateAlertRequiredOwnerMobile: page.getByText('فرمت شماره همراه صحیح نیست', {
    exact: true,
  }),

  vendorCreateOwnerMobileAlertDuplicate: page.getByText('شماره قبلا ثبت شده است.', {
    exact: true,
  }),

  vendorCreateBusinessNameAlreadyRegisteredByMobile: (businessName: string) =>
    page.getByRole('link', { name: businessName }),

  vendorCreateBusinessOwnerInfoAlertWithoutSelectSource: page.getByText('انتخاب منبع ضروری است', {
    exact: true,
  }),

  vendorCreateBusinessOwnerInfoAvailableVendor: (vendorName: string) =>
    page.getByRole('link', { name: vendorName }),
});
