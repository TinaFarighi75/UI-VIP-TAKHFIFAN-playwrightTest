import type { Page } from '@playwright/test';

import type { GeneralObject } from './general-types';

export const createGeneralElements = (page: Page): GeneralObject => ({
  vendorCloseSection: page.locator('.simple-icon-arrow-up'),

  vendorCreateBusinessFileDelete: page.locator('.sc-AxiKw'),

  vendorCreateBusinessToastMessageInsertingImage: page.getByText('درحال بارگزاری تصویر', {
    exact: true,
  }),

  vendorCreateBusinessToastMessageSuccessInsertingImage: page.getByText('بارگذاری با موفقیت انجام شد', {
    exact: true,
  }),
});
