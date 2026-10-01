import type { Locator } from '@playwright/test';

export type TimeType = 'start' | 'end';

export type TimesToServiceElements = {
  // هدر و باز کردن سکشن
  vendorCreateTimesToServiceHeader: Locator;
  vendorCreateTimesToServiceOpenSection: Locator;

  // المان‌های مربوط به روزها
  vendorCreateTimesToServiceDayRow: (dayName: string) => Locator;
  vendorCreateTimesToServiceDayLabel: (dayName: string) => Locator;
  vendorCreateTimesToServiceDaySwitch: (dayName: string) => Locator;

  // اینپوت‌های بازکننده تایم‌پیکر
  vendorCreateTimesToServiceDayStartTimeInput: (dayName: string) => Locator;
  vendorCreateTimesToServiceDayEndTimeInput: (dayName: string) => Locator;

  // پاپ‌آپ فعال تایم‌پیکر (در لحظه کلیک روی هر اینپوت ظاهر می‌شود)
  vendorCreateTimesToServiceActiveTimePickerPopup: Locator;
  vendorCreateTimesToServiceTimePickerFirstBoxInput: Locator;
  vendorCreateTimesToServiceTimePickerFirstBoxArrowUp: Locator;
  vendorCreateTimesToServiceTimePickerFirstBoxArrowDown: Locator;
  vendorCreateTimesToServiceTimePickerSecondBoxInput: Locator;
  vendorCreateTimesToServiceTimePickerSecondBoxArrowUp: Locator;
  vendorCreateTimesToServiceTimePickerSecondBoxArrowDown: Locator;
  vendorCreateTimesToServiceTimePickerSubmitButton: Locator;
};
