import type { Page } from "@playwright/test";

import type { PuplicBusinessInfoElements } from "./publicBusinessInfo-types";

export const createPublicBusinessInfoElements = (
  page: Page,
): PuplicBusinessInfoElements => ({
  vendorCreatePublicBusinessInfoHeader: page.getByRole("heading", {
    name: "۲. اطلاعات عمومی کسب و کار",
  }),
  vendorCreatePublicBusinessInfoOpenSection: page.locator(
    "#section2 > .simple-icon-arrow-down",
  ),
  vendorCreatePublicBusinessInfoName: page.getByRole("textbox", {
    name: "* نام کسب و کار",
  }),
  vendorCreatePublicBusinessInfoSelectCategory: page.locator(
    "#category > .css-yk16xz-control > .css-1hwfws3",
  ),
  vendorCreatePublicBusinessInfoSelectOptionOfCategory: (
    categoryName: string,
  ) => page.getByText(categoryName, { exact: true }),
  vendorCreatePublicBusinessInfoMenueAddress: page.getByRole("textbox", {
    name: "آدرس منو",
  }),
  // vendorCreatePublicBusinessInfoPOSsystem: page.getByLabel(
  //   "انتخاب کنیدداردندارد* صندوق فروشگاهی",
  // ),
  // سلکتور دراپ‌داون دارد/ندارد صندوق فروشگاهی
  vendorCreatePublicBusinessInfoPOSsystem: page.locator(
    "select#isCashierMachine",
  ),

  // اگر می‌خواهید متغیر قبلی هم حفظ شود و با همان سلکتور کار کند:
  vendorCreatePublicBusinessInfoPOSsystemSelectOption: page.locator(
    "select#isCashierMachine",
  ),

  vendorCreatePublicBusinessInfoPOSsystemDropDown: page.locator(
    "#cash_register_id > .css-yk16xz-control > .css-1hwfws3",
  ),
  vendorCreatePublicBusinessInfoPOSsystemDropDownSelectOption: (
    posName: string = "باران",
  ) => page.getByText(posName, { exact: true }),
  vendorCreatePublicBusinessInfoDescription:
    page.getByText("توضیحات کسب و کار"),
  vendorCreatePublicBusinessInfoDescriptionInputBox: page.getByRole("textbox", {
    name: "Rich Text Editor, main",
  }),
  vendorCreatePublicBusinessInfoLogo: page.getByText(
    "نشان تجاری کسب و کار (حداکثر حجم قابل قبول ۲ مگابایت)",
  ),
  // vendorCreatePublicBusinessInfoLogoButton: page
  //   .getByTestId("logo-uploader")
  //   .locator('input[type="file"]'),
  vendorCreatePublicBusinessInfoCover: page.getByText(
    "تصاویر کسب و کار (حداکثر حجم قابل قبول ۲ مگابایت)",
  ),
  // vendorCreatePublicBusinessInfoCoverButton: page
  //   .getByTestId("images-uploader")
  //   .locator('input[type="file"]'),
  vendorCreatePublicBusinessInfoNameEmptyAllert: page.getByText(
    "نام کسب و کار ضروری است",
  ),
  vendorCreatePublicBusinessInfoCategoryEmptyAllert: page.getByText(
    "انتخاب دسته بندی ضروری است",
  ),
  vendorCreatePublicBusinessInfoPOSsystemDropDownEmptyAllert: page.getByText(
    "انتخاب صندوق فروشگاهی ضروری است",
  ),
  // دکمه/آیکونی که روی صفحه دیده می‌شود:
  vendorCreatePublicBusinessInfoCoverButton: page
    .getByTestId("images-uploader")
    .locator('[tabindex="0"]'), // یا .locator('i.simple-icon-camera')

  // اینپوت فایلی که مخفی است و فقط برای آپلود استفاده می‌شود:
  vendorCreatePublicBusinessInfoCoverInput: page
    .getByTestId("images-uploader")
    .locator('input[type="file"]'),

  // برای لوگو هم به همین شکل:
  vendorCreatePublicBusinessInfoLogoButton: page
    .getByTestId("logo-uploader")
    .locator('[tabindex="0"]'),

  vendorCreatePublicBusinessInfoLogoInput: page
    .getByTestId("logo-uploader")
    .locator('input[type="file"]'),

  vendorCreatePublicBusinessInfoNameExist: (businessName: string) =>
    page.getByRole("link", { name: businessName, exact: true }),
});
