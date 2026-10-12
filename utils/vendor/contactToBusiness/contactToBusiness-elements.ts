import type { Page } from "@playwright/test";
import type { ContactToBusinessElements } from "./contactToBusiness-types";

export const contactToBusinessElements = (
  page: Page,
): ContactToBusinessElements => ({
  vendorCreateContactToBusinessHeader: page.getByRole("button", {
    name: "۳. اطلاعات تماس کسب و کار",
  }),
  vendorCreateContactToBusinessMapButton: page.getByRole("button", {
    name: "مشاهده نقشه",
  }),
  vendorCreateContactToBusinessClickToMap: page.getByText(
    "+−Leaflet©Neshan ©OSM",
  ),
  vendorCreateContactToBusinessLongitude: page.getByRole("textbox", {
    name: "* طول جغرافیایی",
  }),
  vendorCreateContactToBusinessLatitude: page.getByRole("textbox", {
    name: "* عرض جغرافیایی",
  }),

  // سلکتور دراپ‌داون شهر
  vendorCreateContactToBusinessCity: page.locator(
    ".css-1pahdxg-control > .css-1hwfws3",
  ),
  vendorCreateContactToBusinessCitySelectOptions: (cityName: string) =>
    page
      .locator("div[class*='-menu']")
      .locator("div[class*='-option']")
      .filter({ hasText: cityName })
      .first()
      .or(page.getByRole("option", { name: cityName, exact: true }))
      .or(page.getByText(cityName, { exact: true }).last()),

  // سلکتور دراپ‌داون منطقه
  vendorCreateContactToBusinessRegion: page
    .locator('div[class*="-control"]')
    .filter({ hasText: /انتخاب منطقه|منطقه/ })
    .or(page.locator("#react-select-6-input"))
    .last(),
  vendorCreateContactToBusinessRegionSelectOptions: (regionName: string) =>
    page
      .locator("div[class*='-menu']")
      .locator("div[class*='-option']")
      .filter({ hasText: regionName })
      .first()
      .or(page.getByRole("option", { name: regionName, exact: true }))
      .or(page.getByText(regionName, { exact: true }).last()),

  vendorCreateContactToBusinessAddress: page.getByText("* آدرس"),
  vendorCreateContactToBusinessAddressTextBox: page.getByRole("textbox", {
    name: "* آدرس",
  }),
  vendorCreateContactToBusinessTell: page.getByText("* شماره تماس"),
  vendorCreateContactToBusinessTellBox: page.getByRole("textbox", {
    name: "* شماره تماس",
  }),
  vendorCreateContactToBusinessAddTellButton: page.getByRole("button", {
    name: "+ افزودن",
  }),
  vendorCreateContactToBusinessDeleteTell: page.locator(
    ".business-form__phone-icon i.simple-icon-trash",
  ),
  vendorCreateContactToBusinessTellIsWrongAllert: page.getByText(
    "شماره تماس وارد شده معتبر نیست",
  ),
  vendorCreateContactToBusinessLongitudeAllert: page.getByText(
    "طول جغرافیایی معتبر نیست",
  ),
  vendorCreateContactToBusinessLatitudeAllert: page.getByText(
    "عرض جغرافیایی معتبر نیست",
  ),
  vendorCreateContactToBusinessAddressAllert: page.getByText(
    "وارد کردن آدرس الزامی است",
  ),
  vendorCreateContactToBusinessEmptyTellAllert: page.getByText(
    "حداقل یک شماره تماس باید وارد شود",
  ),
  vendorCreateContactToBusinessPersianKeyBoardAllert: page.getByText(
    "لطفا زبان کیبورد خود را تغییر دهید",
  ),

  // سلکتور دراپ‌داون استان
  vendorCreateContactToBusinessProvince: page
    .locator('div[class*="-control"]')
    .filter({ hasText: /انتخاب استان|استان/ })
    .or(page.locator("#react-select-4-input"))
    .last(),

  // سلکتور آپشن در منوی باز شده استان
  vendorCreateContactToBusinessProvinceSelectOptions: (provinceName: string) =>
    page
      .locator("div[class*='-menu']")
      .locator("div[class*='-option']")
      .filter({ hasText: provinceName })
      .first()
      .or(page.getByRole("option", { name: provinceName, exact: true }))
      .or(page.getByText(provinceName, { exact: true }).last()),

  // سلکتور دراپ‌داون محله
  vendorCreateContactToBusinessNeighborhood: page
    .locator('div[class*="-control"]')
    .filter({ hasText: /انتخاب محله|محله/ })
    .or(page.locator("#react-select-7-input"))
    .last(),

  // سلکتور آپشن در منوی محله
  vendorCreateContactToBusinessNeighborhoodSelectOptions: (
    neighborhoodName: string,
  ) =>
    page
      .locator("div[class*='-menu']")
      .locator("div[class*='-option']")
      .filter({ hasText: neighborhoodName })
      .first()
      .or(page.getByRole("option", { name: neighborhoodName, exact: true }))
      .or(page.getByText(neighborhoodName, { exact: true }).last()),
});
