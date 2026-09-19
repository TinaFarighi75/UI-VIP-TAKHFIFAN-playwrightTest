import { Page, Locator, expect } from "@playwright/test";
import { promises } from "node:dns";

export class Vendor {
  private readonly page: Page;

  //-------------------------general-----------------

  private readonly vendorCloseSection: Locator;
  private readonly vendorCreateBusinessFileDelete: Locator;
  private readonly vendorCreateBusinessToastMessageInsetingImage: Locator;
  private readonly vendorCreateBusinessToastMessageSuccessInsertingImage: Locator;

  //-------------------------owner business locators-----------------

  private readonly vendorButton: Locator;
  private readonly vendorCreateButton: Locator;
  private readonly vendorCreateHeading: Locator;
  private readonly vendorCreateOwnerHeading: Locator;
  private readonly vendorOpenSectionOwnerInfo: Locator;
  private readonly vendorCreateSelectingSource: Locator;
  private readonly vendorCreateOptionOfSelectSource: Locator;
  private readonly vendorCreateOwnerName: Locator;
  private readonly vendorCreateAllertRequiredOwnerName: Locator;
  private readonly vendorCreateOwnerMobile: Locator;
  private readonly vendorCreateAllertRequiredOwnerMobile: Locator;
  private readonly vendorCreateOwnerMobileAllertDuplicate: Locator;
  private readonly vendorCreateBusinessNameAlreadyRegisterdByMobile: Locator;
  private readonly vendorCreateBusinessOwnerinfoAllertWithoutSelectSource: Locator;

  //-------------------------public business info locator-----------------

  private readonly vendorCreateBusinessPublicInfoHeading: Locator;
  private readonly vendorCreateBusinessPublicInfoCloseSection: Locator;
  private readonly vendorCreateBusinessPublicInfoName: Locator;
  private readonly vendorCreateBussinessPublicInfoListOfCategoryTitle: Locator;
  private readonly vendorCreateBusinessPublicInfoCategoryListOption: Locator;
  private readonly vendorCreateBusinessPublicInfoAlertEmptyName: Locator;
  private readonly vendorCreateBusinessPublicInfoChoosingPosSystemTitle: Locator;
  private readonly vendorCreateBusinessPublicInfoPosSystemListOption: Locator;
  private readonly vendorCreateBusinessPublicInfoPosSystemListOptionAlertWhitOutChoosing: Locator;
  private readonly vendorCreateBusinessPublicInfoChoosingCategory: Locator;
  private readonly vendorCreateBusinessPublicInfoChoosingCategoryAlertWhitOutChoosing: Locator;
  private readonly vendorCreateBusinessPublicInfoChoosingPosTitle: Locator;
  private readonly vendorCreateBusinessPublicInfoChoosingPos: Locator;
  private readonly vendorCreateBusinessPublicInfoDescriptionTitle: Locator;
  private readonly vendorCreateBusinessPublicInfoDescriptionInput: Locator;
  private readonly vendorCreateBusinessPublicInfoDuplicateTitle: Locator;
  private readonly vendorCreateBusinessPublicInfoLogoTitle: Locator;
  private readonly vendorCreateBusinessPublicInfoLogoButten: Locator;
  private readonly vendorCreateBusinessPublicInfoLogoFileInput: Locator;
  private readonly vendorCreateBusinessPublicInfoLogoFileSave: Locator;
  private readonly vendorCreateBusinessPublicInfoCoverTitle:Locator;
  private readonly vendorCreateBusinessPublicInfoCoverButten:Locator;
  private readonly vendorCreateBusinessPublicInfoCoverFileInput:Locator;
  private readonly vendorCreateBusinessPublicInfoCoverFileSave:Locator;   

  constructor(page: Page) {
    this.page = page;

    //-------------------------general-----------------

    this.vendorCloseSection = page.locator(".simple-icon-arrow-up");
    this.vendorCreateBusinessFileDelete = page.locator(".sc-AxiKw");
    this.vendorCreateBusinessToastMessageInsetingImage =  page.getByText('درحال بارگزاری تصویر')
    this.vendorCreateBusinessToastMessageSuccessInsertingImage = page.getByText('بارگذاری با موفقیت انجام شد')

    //-------------------------owner business locators-----------------

    this.vendorButton = page.getByRole("link", { name: "کسب و کارها" });
    this.vendorCreateButton = page.getByRole("link", {
      name: "ایجاد کسب و کار جدید",
    });
    this.vendorCreateHeading = page.getByRole("heading", {
      name: "ایجاد کسب و کار جدید",
    });
    this.vendorCreateOwnerHeading = page.getByRole("heading", {
      name: "۱. اطلاعات صاحب کسب و کار",
    });
    this.vendorOpenSectionOwnerInfo = page.locator("#section1");
    this.vendorCreateSelectingSource = page.getByText("* انتخاب منبع");
    this.vendorCreateOptionOfSelectSource = page.getByText(
      "جمع‌آوری تارگت به صورت حضوری",
      { exact: true },
    );
    this.vendorCreateOwnerName = page.locator("input[id='name']");
    this.vendorCreateAllertRequiredOwnerName = page.getByText(
      "نام و نام خانوادگی ضروری است",
    );
    this.vendorCreateOwnerMobile = page.locator("input[id='mobile']");
    this.vendorCreateAllertRequiredOwnerMobile = page.getByText(
      "فرمت شماره همراه صحیح نیست",
    );
    this.vendorCreateOwnerMobileAllertDuplicate = page.getByText(
      "شماره قبلا ثبت شده است.",
    );
    this.vendorCreateBusinessNameAlreadyRegisterdByMobile = page.getByRole(
      "link",
      { name: "تریاکیانو - محمد حسین بهمن ابادی" },
    );
    this.vendorCreateBusinessOwnerinfoAllertWithoutSelectSource =
      page.getByText("انتخاب منبع ضروری است");

    //-------------------------public business info locator-----------------

    this.vendorCreateBusinessPublicInfoHeading = page.getByRole("heading", {
      name: "۲. اطلاعات عمومی کسب و کار",
    });

    this.vendorCreateBusinessPublicInfoCloseSection = page
      .locator(".simple-icon-arrow-down.mr-2")
      .first();

    this.vendorCreateBusinessPublicInfoName = page.locator("input[id='name']");
    this.vendorCreateBussinessPublicInfoListOfCategoryTitle =
      page.getByText("* انتخاب دسته‌بندی");
    this.vendorCreateBusinessPublicInfoCategoryListOption = page.getByText(
      "رستوران و کافی شاپ",
      {
        exact: true,
      },
    );
    this.vendorCreateBusinessPublicInfoAlertEmptyName = page.getByText(
      "نام کسب و کار ضروری است",
    );
    this.vendorCreateBusinessPublicInfoPosSystemListOptionAlertWhitOutChoosing =
      page.getByText("انتخاب صندوق فروشگاهی ضروری است");
    this.vendorCreateBusinessPublicInfoChoosingPosSystemTitle =
      page.getByText("* صندوق فروشگاهی");
    this.vendorCreateBusinessPublicInfoPosSystemListOption = page.getByLabel(
      "انتخاب کنیدداردندارد* صندوق فروشگاهی",
    );
    this.vendorCreateBusinessPublicInfoChoosingCategoryAlertWhitOutChoosing =
      page.getByText("انتخاب دسته‌بندی ضروری است");

    this.vendorCreateBusinessPublicInfoChoosingCategory = page.locator(
      'select[name="category"]',
    );
    this.vendorCreateBusinessPublicInfoChoosingPosTitle = page.getByText(
      "* انتخاب صندوق فروشگاهی",
    );
    this.vendorCreateBusinessPublicInfoChoosingPos = page.getByText("پارسیان", {
      exact: true,
    });
    this.vendorCreateBusinessPublicInfoDescriptionTitle =
      page.getByText("توضیحات کسب و کار");
    this.vendorCreateBusinessPublicInfoDescriptionInput = page.getByRole(
      "textbox",
      { name: "Rich Text Editor, main" },
    );
    this.vendorCreateBusinessPublicInfoDuplicateTitle = page.getByRole("link", {
      name: "تریاکیانو",
    });
    this.vendorCreateBusinessPublicInfoLogoTitle = page.getByText(
      "نشان تجاری کسب و کار (حداکثر حجم قابل قبول ۲ مگابایت)",
    );

    this.vendorCreateBusinessPublicInfoLogoButten = page
      .locator(".sc-AxirZ")
      .first();

    this.vendorCreateBusinessPublicInfoLogoFileInput = page
      .locator('input[type="file"]')
      .nth(1);
    this.vendorCreateBusinessPublicInfoLogoFileSave = page.getByRole("button", {
      name: "ذخیره",
    });
    this.vendorCreateBusinessPublicInfoCoverTitle = page.getByText(
      "تصویر کاور کسب و کار (حداکثر حجم قابل قبول ۲ مگابایت)",
    );
    this.vendorCreateBusinessPublicInfoCoverButten = page
      .locator(".sc-AxirZ")
      .first();
    this.vendorCreateBusinessPublicInfoCoverFileInput = page
      .locator('input[type="file"]')
      .nth(1);
    this.vendorCreateBusinessPublicInfoCoverFileSave = page.getByRole("button", {
      name: "ذخیره",
    });
  }

  //-------------------------methods-----------------
  
  async gotoVendorCreatePageUrl(): Promise<void> {
    await this.page.goto("/panel/app/dashboards/business/create");
  }

  async selectVendorCreateLink(): Promise<void> {
    await this.vendorButton.click();
    await this.vendorCreateButton.click();
  }

  //-------------------------general-----------------

  async verifyVendorCreateClosingSection(): Promise<void> {
    await this.vendorCloseSection.click();
  }
  //-------------------------owner business locators-----------------

  async verifyVendorCreateOwnerInfoSection(): Promise<void> {
    await expect(this.vendorCreateHeading).toBeVisible();
    await expect(this.vendorCreateOwnerHeading).toBeVisible();
    await expect(this.vendorOpenSectionOwnerInfo).toBeVisible();
    await expect(this.vendorCreateSelectingSource).toBeVisible();
    await expect(this.vendorCreateOptionOfSelectSource).toBeVisible();
    await expect(this.vendorCreateOwnerName).toBeEnabled();
    await expect(this.vendorCreateOwnerMobile).toBeEnabled();
  }
  async fillVendorCreateOwnerInfoSection(
    name: string,
    mobile: string,
  ): Promise<void> {
    await this.vendorCreateOwnerName.fill(name);
    await this.vendorCreateOwnerMobile.fill(mobile);
  }
  async fillVnedorCreateOwnerInfoSectionWithDuplicateMobile(
    mobile: string,
  ): Promise<void> {
    await this.vendorCreateOwnerMobile.fill(mobile);
  }

  async verrifyVendorCreateOwnerInfoWithoutFillingRequiredFields(): Promise<void> {
    await this.vendorCreateSelectingSource.click();
    await this.vendorCreateOptionOfSelectSource.click();
    await expect(this.vendorCreateAllertRequiredOwnerName).toBeVisible();
    await expect(this.vendorCreateAllertRequiredOwnerMobile).toBeVisible();
  }

  async verifyVendorCreateOwnerInfoWithDuplicateMobile(): Promise<void> {
    await expect(this.vendorCreateOwnerMobileAllertDuplicate).toBeVisible();
    await expect(
      this.vendorCreateBusinessNameAlreadyRegisterdByMobile,
    ).toBeVisible();
  }

  async fillVendorCreateOwnerInfoWithWrongMobileFormat(
    mobile: string,
  ): Promise<void> {
    await this.vendorCreateOwnerMobile.fill(mobile);
  }

  async verifyVendorCreateOwnerInfoWITHwrongMobileFormat(): Promise<void> {
    await expect(this.vendorCreateAllertRequiredOwnerMobile).toBeVisible();
  }

  async verifyVendorCreateOwnerInfoWithoutSelectingSource(): Promise<void> {
    await expect(
      this.vendorCreateBusinessOwnerinfoAllertWithoutSelectSource,
    ).toBeVisible();
  }

  //-------------------------public business info locator-----------------

}
