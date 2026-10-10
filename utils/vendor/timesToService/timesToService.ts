//utils/vendor/timesToService/timesToService.ts
import { expect, type Locator, type Page } from "@playwright/test";
import { timesToServiceElements } from "./timesToService-elements";
import type { TimesToServiceElements, TimeType } from "./timesToService-types";

export class TimesToServiceSection {
  private readonly timesToService: TimesToServiceElements;

  constructor(page: Page) {
    this.timesToService = timesToServiceElements(page);
  }

  //---------------------------ELEMENTS---------------------------------------

  getVendorCreateTimesToServiceHeader(): Locator {
    return this.timesToService.vendorCreateTimesToServiceHeader;
  }

  getVendorCreateTimesToServiceOpenSection(): Locator {
    return this.timesToService.vendorCreateTimesToServiceOpenSection;
  }

  getVendorCreateTimesToServiceDayLabel(dayName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceDayLabel(dayName);
  }

  getVendorCreateTimesToServiceDaySwitch(dayName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceDaySwitch(dayName);
  }

  getVendorCreateTimesToServiceDayStartTimeInput(dayName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceDayStartTimeInput(
      dayName,
    );
  }

  getVendorCreateTimesToServiceDayEndTimeInput(dayName: string): Locator {
    return this.timesToService.vendorCreateTimesToServiceDayEndTimeInput(
      dayName,
    );
  }

  getActiveTimePickerPopup(): Locator {
    return this.timesToService.vendorCreateTimesToServiceActiveTimePickerPopup;
  }

  getTimePickerFirstBoxInput(): Locator {
    return this.timesToService
      .vendorCreateTimesToServiceTimePickerFirstBoxInput;
  }

  getTimePickerSecondBoxInput(): Locator {
    return this.timesToService
      .vendorCreateTimesToServiceTimePickerSecondBoxInput;
  }

  getTimePickerFirstBoxArrowUp(): Locator {
    return this.timesToService
      .vendorCreateTimesToServiceTimePickerFirstBoxArrowUp;
  }

  getTimePickerFirstBoxArrowDown(): Locator {
    return this.timesToService
      .vendorCreateTimesToServiceTimePickerFirstBoxArrowDown;
  }

  getTimePickerSecondBoxArrowUp(): Locator {
    return this.timesToService
      .vendorCreateTimesToServiceTimePickerSecondBoxArrowUp;
  }

  getTimePickerSecondBoxArrowDown(): Locator {
    return this.timesToService
      .vendorCreateTimesToServiceTimePickerSecondBoxArrowDown;
  }

  getTimePickerSubmitButton(): Locator {
    return this.timesToService.vendorCreateTimesToServiceTimePickerSubmitButton;
  }

  //---------------------------SECTION ACTIONS--------------------------------

  async openTimesToServiceSection(): Promise<void> {
    await this.getVendorCreateTimesToServiceOpenSection().click();
  }

  async clickTimesToServiceHeader(): Promise<void> {
    await this.getVendorCreateTimesToServiceHeader().click();
    await this.getVendorCreateTimesToServiceHeader().click();
  }

  //---------------------------DAY & SWITCH ACTIONS--------------------------

  async clickDayLabel(dayName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceDayLabel(dayName).click();
  }

  async toggleDaySwitch(dayName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceDaySwitch(dayName).click();
  }

  async checkDaySwitch(dayName: string): Promise<void> {
    const isChecked = await this.isDaySwitchChecked(dayName);
    if (!isChecked) {
      await this.toggleDaySwitch(dayName);
    }
  }

  async uncheckDaySwitch(dayName: string): Promise<void> {
    const isChecked = await this.isDaySwitchChecked(dayName);
    if (isChecked) {
      await this.toggleDaySwitch(dayName);
    }
  }

  async toggleAllDaysSwitch(): Promise<void> {
    await this.toggleDaySwitch("همه روزها");
  }

  async checkAllDaysSwitch(): Promise<void> {
    await this.checkDaySwitch("همه روزها");
  }

  async uncheckAllDaysSwitch(): Promise<void> {
    await this.uncheckDaySwitch("همه روزها");
  }

  //---------------------------TIME PICKER ACTIONS----------------------------

  async openStartTimePicker(dayName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceDayStartTimeInput(dayName).click();
    await expect(this.getActiveTimePickerPopup()).toBeVisible();
  }

  async openEndTimePicker(dayName: string): Promise<void> {
    await this.getVendorCreateTimesToServiceDayEndTimeInput(dayName).click();
    await expect(this.getActiveTimePickerPopup()).toBeVisible();
  }

  async clickTimePickerSubmit(): Promise<void> {
    await this.getTimePickerSubmitButton().click();
    await expect(this.getActiveTimePickerPopup()).toBeHidden();
  }

  async fillTimePickerValues(
    firstValue: string,
    secondValue: string,
  ): Promise<void> {
    await this.getTimePickerFirstBoxInput().fill(firstValue);
    await this.getTimePickerSecondBoxInput().fill(secondValue);
  }

  async clickFirstBoxArrowUp(): Promise<void> {
    await this.getTimePickerFirstBoxArrowUp().click();
  }

  async clickFirstBoxArrowDown(): Promise<void> {
    await this.getTimePickerFirstBoxArrowDown().click();
  }

  async clickSecondBoxArrowUp(): Promise<void> {
    await this.getTimePickerSecondBoxArrowUp().click();
  }

  async clickSecondBoxArrowDown(): Promise<void> {
    await this.getTimePickerSecondBoxArrowDown().click();
  }

  /**
   * تنظیم زمان روی اینپوت باز شده با وارد کردن مقادیر و کلیک روی تایید
   */
  async setTime(
    dayName: string,
    type: TimeType,
    firstValue: string,
    secondValue: string,
  ): Promise<void> {
    if (type === "start") {
      await this.openStartTimePicker(dayName);
    } else {
      await this.openEndTimePicker(dayName);
    }
    await this.fillTimePickerValues(firstValue, secondValue);
    await this.clickTimePickerSubmit();
  }

  async setStartTime(
    dayName: string,
    firstValue: string,
    secondValue: string,
  ): Promise<void> {
    await this.setTime(dayName, "start", firstValue, secondValue);
  }

  async setEndTime(
    dayName: string,
    firstValue: string,
    secondValue: string,
  ): Promise<void> {
    await this.setTime(dayName, "end", firstValue, secondValue);
  }

  //---------------------------ASSERTIONS-------------------------------------

  async expectTimesToServiceHeaderVisible(): Promise<void> {
    await expect(this.getVendorCreateTimesToServiceHeader()).toBeVisible();
  }

  async expectDayLabelVisible(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayLabel(dayName),
    ).toBeVisible();
  }

  async expectDaySwitchToBeChecked(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDaySwitch(dayName),
    ).toBeChecked();
  }

  async expectDaySwitchToBeUnchecked(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDaySwitch(dayName),
    ).not.toBeChecked();
  }

  async expectDaySwitchToBeDisabled(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDaySwitch(dayName),
    ).toBeDisabled();
  }

  async expectDaySwitchToBeEnabled(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDaySwitch(dayName),
    ).toBeEnabled();
  }

  async expectDayStartTimeInputsDisabled(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayStartTimeInput(dayName),
    ).toBeDisabled();
  }

  async expectDayEndTimeInputsDisabled(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayEndTimeInput(dayName),
    ).toBeDisabled();
  }

  async expectDayStartTimeInputsEnabled(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayStartTimeInput(dayName),
    ).toBeEnabled();
  }

  async expectDayEndTimeInputsEnabled(dayName: string): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayEndTimeInput(dayName),
    ).toBeEnabled();
  }

  async expectDayStartTimeValue(
    dayName: string,
    expectedTime: string,
  ): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayStartTimeInput(dayName),
    ).toHaveValue(expectedTime);
  }

  async expectDayEndTimeValue(
    dayName: string,
    expectedTime: string,
  ): Promise<void> {
    await expect(
      this.getVendorCreateTimesToServiceDayEndTimeInput(dayName),
    ).toHaveValue(expectedTime);
  }

  async expectTimePickerPopupVisible(): Promise<void> {
    await expect(this.getActiveTimePickerPopup()).toBeVisible();
  }

  async expectTimePickerPopupHidden(): Promise<void> {
    await expect(this.getActiveTimePickerPopup()).toBeHidden();
  }

  //---------------------------VISIBILITY & STATE METHODS---------------------

  async isTimesToServiceHeaderVisible(): Promise<boolean> {
    return this.getVendorCreateTimesToServiceHeader().isVisible();
  }

  async isDayLabelVisible(dayName: string): Promise<boolean> {
    return this.getVendorCreateTimesToServiceDayLabel(dayName).isVisible();
  }

  async isDaySwitchChecked(dayName: string): Promise<boolean> {
    return this.getVendorCreateTimesToServiceDaySwitch(dayName).isChecked();
  }

  async isDaySwitchDisabled(dayName: string): Promise<boolean> {
    return this.getVendorCreateTimesToServiceDaySwitch(dayName).isDisabled();
  }

  async isDayStartTimeInputDisabled(dayName: string): Promise<boolean> {
    return this.getVendorCreateTimesToServiceDayStartTimeInput(
      dayName,
    ).isDisabled();
  }

  async isDayEndTimeInputDisabled(dayName: string): Promise<boolean> {
    return this.getVendorCreateTimesToServiceDayEndTimeInput(
      dayName,
    ).isDisabled();
  }

  async isTimePickerPopupVisible(): Promise<boolean> {
    return this.getActiveTimePickerPopup().isVisible();
  }

  async getDayStartTimeInputValue(dayName: string): Promise<string> {
    return this.getVendorCreateTimesToServiceDayStartTimeInput(
      dayName,
    ).inputValue();
  }

  async getDayEndTimeInputValue(dayName: string): Promise<string> {
    return this.getVendorCreateTimesToServiceDayEndTimeInput(
      dayName,
    ).inputValue();
  }
}
