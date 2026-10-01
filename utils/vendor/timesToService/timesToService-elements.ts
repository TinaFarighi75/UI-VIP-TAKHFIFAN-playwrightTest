import type { Page } from '@playwright/test';
import type { TimesToServiceElements } from './timesToService-types';

export const timesToServiceElements = (page: Page): TimesToServiceElements => {
  const getDayRow = (dayName: string) =>
    page.locator('li.list-group-item').filter({
      has: page.locator('span.name', { hasText: dayName }),
    });

  // اشاره به پاپ‌آپی که در صفحه کلاس "fade show" گرفته و باز است
  const activePopup = page.locator('.fade.show .time-input__section');
  const timeBoxes = activePopup.locator('.time-box');

  return {
    vendorCreateTimesToServiceHeader: page.getByRole('heading', { name: '۴. روزها و ساعات سرویس دهی' }),
    vendorCreateTimesToServiceOpenSection: page.locator('#section4 > .simple-icon-arrow-down'),

    vendorCreateTimesToServiceDayRow: (dayName: string) => getDayRow(dayName),

    vendorCreateTimesToServiceDayLabel: (dayName: string) =>
      getDayRow(dayName).locator('span.name'),

    vendorCreateTimesToServiceDaySwitch: (dayName: string) =>
      getDayRow(dayName).getByRole('switch'),

    vendorCreateTimesToServiceDayStartTimeInput: (dayName: string) =>
      getDayRow(dayName).locator('input.time-input-responsive').first(),

    vendorCreateTimesToServiceDayEndTimeInput: (dayName: string) =>
      getDayRow(dayName).locator('input.time-input-responsive').last(),

    // المان‌های پاپ‌آپی که الان باز است
    vendorCreateTimesToServiceActiveTimePickerPopup: activePopup,

    // باکس اول (معمولاً ساعت)
    vendorCreateTimesToServiceTimePickerFirstBoxInput: timeBoxes.first().locator('input.time-input'),
    vendorCreateTimesToServiceTimePickerFirstBoxArrowUp: timeBoxes.first().locator('.simple-icon-arrow-up'),
    vendorCreateTimesToServiceTimePickerFirstBoxArrowDown: timeBoxes.first().locator('.simple-icon-arrow-down'),

    // باکس دوم (معمولاً دقیقه)
    vendorCreateTimesToServiceTimePickerSecondBoxInput: timeBoxes.last().locator('input.time-input'),
    vendorCreateTimesToServiceTimePickerSecondBoxArrowUp: timeBoxes.last().locator('.simple-icon-arrow-up'),
    vendorCreateTimesToServiceTimePickerSecondBoxArrowDown: timeBoxes.last().locator('.simple-icon-arrow-down'),

    // دکمه تایید
    vendorCreateTimesToServiceTimePickerSubmitButton: activePopup.locator('button.time-submit'),
  };
};
