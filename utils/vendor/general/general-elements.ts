import type { Page } from '@playwright/test';

import type { GeneralObject } from './general-types';

export const createGeneralElements = (page: Page): GeneralObject => ({

  vendorCloseSection: page.locator('.simple-icon-arrow-up'),
  vendorCreateBusinessFileDelete: page.locator('.sc-AxiKw'),
  vendorCreateBusinessToastMessageInsertingImage: page.getByText('درحال بارگزاری تصویر'),
  vendorCreateBusinessToastMessageSuccessInsertingImage: page.getByText('بارگذاری با موفقیت انجام شد'),
  vendorsButton: page.getByRole('link', { name: 'کسب و کارها' }),
  vendorsList:page.getByRole('link', { name: 'لیست کسب و کارها' }),
  vendorCreateBusinessButton:page.getByRole('link', { name: 'ایجاد کسب و کار جدید' }),
  vendorCreateTitleOfPage: page.getByRole('heading', { name: 'ایجاد کسب و کار جدید' }),
  submitButton:page.getByRole('button', { name: 'ثبت' }),
  saveSelectlogo:page.getByRole('dialog').getByRole('button', { name: 'ذخیره', exact: true }),
  saveSelectCover:page.getByRole('dialog').getByRole('button', { name: 'ذخیره', exact: true }),
  deleteLogo:page.locator('.sc-AxiKw'),
  deleteCover:page.locator('.sc-AxiKw'),
  vendorCreateBusinessToastMessageFailedInsertingImage:page.getByText("دربارگزاری خطایی رخ داده است")
});
