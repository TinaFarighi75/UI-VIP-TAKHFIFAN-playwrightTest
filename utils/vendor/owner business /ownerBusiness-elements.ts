import type { Page } from '@playwright/test';

import type { OwnerBusinessElements } from './ownerBusiness-types';

export const createOwnerBusinessElements = (
  page: Page,
): OwnerBusinessElements => ({
  vendorButton: page.getByRole('link', {
    name: 'کسب و کارها',
  }),

  vendorCreateButton: page.getByRole('link', {
    name: 'ایجاد کسب و کار جدید',
  }),

  vendorCreateHeading: page.getByRole('heading', {
    name: 'ایجاد کسب و کار جدید',
  }),

  vendorCreateOwnerHeading: page.getByRole('heading', {
    name: '۱. اطلاعات صاحب کسب و کار',
  }),

  vendorOpenSectionOwnerInfo: page.locator('#section1'),

  vendorCreateSelectingSource: page.getByText('* انتخاب منبع', {
    exact: true,
  }),

  vendorCreateOptionOfSelectSource: page.getByText(
    'جمع‌آوری تارگت به صورت حضوری',
    {
      exact: true,
    },
  ),

  vendorCreateOwnerName: page.locator("input[id='name']"),

  vendorCreateAlertRequiredOwnerName: page.getByText(
    'نام و نام خانوادگی ضروری است',
    {
      exact: true,
    },
  ),

  vendorCreateOwnerMobile: page.locator("input[id='mobile']"),

  vendorCreateAlertRequiredOwnerMobile: page.getByText(
    'فرمت شماره همراه صحیح نیست',
    {
      exact: true,
    },
  ),

  vendorCreateOwnerMobileAlertDuplicate: page.getByText(
    'شماره قبلا ثبت شده است.',
    {
      exact: true,
    },
  ),

  vendorCreateBusinessNameAlreadyRegisteredByMobile: page.getByRole('link', {
    name: 'تریاکیانو - محمد حسین بهمن ابادی',
  }),

  vendorCreateBusinessOwnerInfoAlertWithoutSelectSource: page.getByText(
    'انتخاب منبع ضروری است',
    {
      exact: true,
    },
  ),
});
