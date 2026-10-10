import type { Page } from "@playwright/test";

import type { GeneralObject } from "./general-types";

export const createGeneralElements = (page: Page): GeneralObject => ({
  vendorCloseSection: page.locator(".simple-icon-arrow-up"),

  // delete buttons (بهتر است بعداً scoped شوند، فعلاً حذف/تغییر key نمی‌دهم)
  vendorCreateBusinessFileDelete: page.locator(".sc-AxiKw"),
  deleteLogo: page.locator(".sc-AxiKw"),
  deleteCover: page.locator(".sc-AxiKw"),

  // toasts
  // toasts (پوشش کامل ذ/ز، ی/ي و فاصله‌گذاری‌ها با RegEx)
  vendorCreateBusinessToastMessageInsertingImage: page
    .getByText(/در\s*حال\s*بارگ[ذز]ار[یي]\s*تصویر/i)
    .last(),
  vendorCreateBusinessToastMessageSuccessInsertingImage: page
    .getByText(/بارگ[ذز]ار[یي]\s*با\s*موفقیت\s*انجام\s*شد/i)
    .last(),
  vendorCreateBusinessToastMessageFailedInsertingImage: page
    .getByText(/در\s*بارگ[ذز]ار[یي]\s*خطا[یی]\s*رخ\s*داده\s*است/i)
    .last(),

  // navigation
  vendorsButton: page.getByRole("link", { name: "کسب و کارها" }),
  vendorsList: page.getByRole("link", { name: "لیست کسب و کارها" }),
  vendorCreateBusinessButton: page.getByRole("link", {
    name: "ایجاد کسب و کار جدید",
  }),

  // page title
  vendorCreateTitleOfPage: page.getByRole("heading", {
    name: "ایجاد کسب و کار جدید",
  }),

  // actions
  submitButton: page.getByRole("button", { name: "ثبت" }),

  // dialog save buttons
  // (اگر واقعاً دو دیالوگ مختلف دارید، بعداً باید اینها را scoped کنیم؛ فعلاً همان ساختار شما حفظ شد)
  saveSelectlogo: page
    .getByRole("dialog")
    .getByRole("button", { name: "ذخیره", exact: true }),
  saveSelectCover: page.locator('button.btn-success:has-text("ذخیره")').last(),
});
