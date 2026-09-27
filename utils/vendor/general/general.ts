import type { Locator, Page } from "@playwright/test";

import { createGeneralElements } from "./general-elements";
import type { GeneralObject } from "./general-types";
import { promises } from "node:dns";

export class General {
  protected readonly general: GeneralObject;

  constructor(page: Page) {
    this.general = createGeneralElements(page);
  }
  //---------------------------ELEMENTS---------------------------------------

  getVendorsButton(): Locator {
    return this.general.vendorsButton;
  }

  getVendorsListButton(): Locator {
    return this.general.vendorsList;
  }
  getVendorCreateButton(): Locator {
    return this.general.vendorCreateBusinessButton;
  }
  getImageUploadingToastMessage(): Locator {
    return this.general.vendorCreateBusinessToastMessageInsertingImage;
  }

  getImageUploadSuccessToastMessage(): Locator {
    return this.general.vendorCreateBusinessToastMessageSuccessInsertingImage;
  }
  getCloseSection(): Locator {
    return this.general.vendorCloseSection;
  }

  getDeleteFile():Locator{
    return this.general.vendorCreateBusinessFileDelete
  }
  getVendorCreateTitlePage():Locator{
    return this.general.vendorCreateTitleOfPage
  }
  getSubmitButton():Locator{
    return this.general.submitButton
  }
  getSaveSelectlogo():Locator{
    return this.general.saveSelectlogo
  }
  getSaveSelectCover():Locator{
    return this.general.saveSelectlogo
  }
  getDeleteLogo():Locator{
    return this.general.deleteLogo
  }
  getDeleteCover():Locator{
    return this.general.deleteCover
  }
  getFailedInsertPicAllert():Locator{
    return this.general.vendorCreateBusinessToastMessageFailedInsertingImage
  }
  //---------------------------METHODS---------------------------------------

  async goToCreateVendorPage():Promise<void>{
    await this.getVendorCreateButton().click()

  }
  async goToListOfBusinessPage():Promise<void>{
    await this.getVendorsListButton().click()
  }
  async selectVendorsButton():Promise<void>{
    await this.getVendorsButton().click()
  }
  async submit(): Promise<void>{
    await this.getSubmitButton().click()
  }
  async closeSection(): Promise<void> {
    await this.getCloseSection().click();
  }

  async deleteVendorCreateBusinessFile(): Promise<void> {
    await this.general.vendorCreateBusinessFileDelete.click();
  }

  async waitForImageUploadSuccessToastMessage(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageSuccessInsertingImage.waitFor(
      {
        state: "visible",
      },
    );
  }

  async waitForImageUploadingToastMessage(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageInsertingImage.waitFor({
      state: "visible",
    });
  }
  async waitForImageUploadingToastMessageToDisappear(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageInsertingImage.waitFor({
      state: "hidden",
    });
  }
  async waitForImageUploadSuccessToastMessageToDisappear(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageSuccessInsertingImage.waitFor(
      {
        state: "hidden",
      },
    );
  }
  async waitForImageUploadSuccessToastMessageToBeVisible(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageSuccessInsertingImage.waitFor(
      {
        state: "visible",
      },
    );
  }

  async waitForImageUploadingToastMessageToBeVisible(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageInsertingImage.waitFor({
      state: "visible",
    });
  }
    async waitForImageUplodingFailedVisible(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageFailedInsertingImage.waitFor(
      {
        state: "visible",
      },
    );
  }
      async waitForImageUplodingFailedDisappear(): Promise<void> {
    await this.general.vendorCreateBusinessToastMessageFailedInsertingImage.waitFor(
      {
        state: "hidden",
      },
    );
  }
}
