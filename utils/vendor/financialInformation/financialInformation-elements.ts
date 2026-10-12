import type { Page } from "@playwright/test";
import type { VendorCreateFinancialInformationElements } from "./financialInformation-types";

export const vendorCreateFinancialInformationElements = (
  page: Page,
): VendorCreateFinancialInformationElements => {
  return {
    // هدر و عناوین
    vendorCreateFinancialInformationHeader: page.getByRole("heading", {
      name: "۵. اطلاعات مالی",
    }),
    vendorCreateFinancialInformationBusinessTypeTitle:
      page.getByText("نوع کسب و کار"),
    vendorCreateFinancialInformationDocumentsUploadHint: page.getByText(
      "تصاویر مدارک (حداکثر حجم قابل قبول ۲ مگابایت)",
    ),

    // فیلدها و سلکت‌ها
    vendorCreateFinancialInformationBusinessTypeSelect:
      page.locator("#businessType"),
    vendorCreateFinancialInformationNationalIdInput:
      page.locator("#nationalId"),
    vendorCreateFinancialInformationGivenNameInput: page.locator("#givenName"),
    vendorCreateFinancialInformationSurnameInput: page.locator("#surname"),
    vendorCreateFinancialInformationBankAccountInput:
      page.locator("#bankAccount"),
    vendorCreateFinancialInformationShebaInput: page.locator("#sheba"),

    // فیلدهای شرطی (حقوقی و اتباع)
    vendorCreateFinancialInformationEconomicCodeInput:
      page.locator("#economicCode"),
    vendorCreateFinancialInformationFidaCodeInput: page.locator("#fida_code"),

    // دکمه‌ها
    vendorCreateFinancialInformationShebaInquiryButton: page.getByRole(
      "button",
      { name: "استعلام" },
    ),

    // ارورها و آلرت‌های الزامی بودن فیلدها (منعطف با Regex)
    vendorCreateFinancialInformationGivenNameRequiredAlert: page.getByText(
      /نام\s*صاحب\s*حساب\s*(ضروری|الزامی)\s*است/,
    ),
    vendorCreateFinancialInformationSurnameRequiredAlert: page.getByText(
      /نام\s*خانوادگی\s*صاحب\s*حساب\s*(ضروری|الزامی)\s*است/,
    ),
    vendorCreateFinancialInformationEconomicCodeRequiredAlert: page.getByText(
      /کد\s*اقتصادی\s*(ضروری|الزامی)\s*است/,
    ),

    // ارورها و اعتبارسنجی مقادیر نامعتبر
    vendorCreateFinancialInformationShebaInvalidToast: page.locator(
      'div[role="alert"].Toastify__toast-body',
      {
        hasText:
          "شماره شبا باید ۲۶ کاراکتر (IR + ۲۴ رقم) و فقط شامل اعداد باشد.",
      },
    ),
    vendorCreateFinancialInformationNationalIdLegalInvalidAlert: page.getByText(
      /شماره\s*ملی\s*باید\s*11\s*رقم\s*باشد/,
    ),
    vendorCreateFinancialInformationNationalIdRealInvalidAlert: page.getByText(
      /شماره\s*ملی\s*باید\s*10\s*رقم\s*باشد/,
    ),
    vendorCreateFinancialInformationFidaCodeInvalidAlert: page.getByText(
      /کد\s*فراگیر\s*باید\s*12\s*رقم\s*باشد/,
    ),
    vendorCreateFinancialInformationNationalIdInvalidFormatAlert:
      page.getByText(/کدملی\s*نامعتبر\s*است/),
    vendorCreateInvalidLongitudeAlert: page.getByText(
      "رکورد نامعتبر است طول جغرافیایی انتخاب شده در ایران نیست",
    ),

    // ارور الزامی بودن شناسه ملی یا کدملی (دقیقاً تارگت div.text-danger برای جلوگیری از مچ شدن با لیبل span)
    vendorCreateFinancialInformationNationalIdRequiredAlert: page
      .locator("div.text-danger")
      .filter({ hasText: /^(شناسه\s*ملی|کدملی)\s*(ضروری|الزامی)\s*است$/ })
      .first(),
  };
};
