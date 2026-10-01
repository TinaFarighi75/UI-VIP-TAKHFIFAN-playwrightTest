import type { Page } from '@playwright/test';
import type { VendorCreateFinancialInformationElements } from './financialInformation-types';

export const vendorCreateFinancialInformationElements = (page: Page): VendorCreateFinancialInformationElements => {
  return {
    // هدر و عناوین
    vendorCreateFinancialInformationHeader: page.getByRole('heading', { name: '۵. اطلاعات مالی' }),
    vendorCreateFinancialInformationBusinessTypeTitle: page.getByText('نوع کسب و کار'),
    vendorCreateFinancialInformationDocumentsUploadHint: page.getByText('تصاویر مدارک (حداکثر حجم قابل قبول ۲ مگابایت)'),

    // فیلدها و سلکت‌ها
    vendorCreateFinancialInformationBusinessTypeSelect: page.locator('#businessType'),
    vendorCreateFinancialInformationNationalIdInput: page.locator('#nationalId'),
    vendorCreateFinancialInformationGivenNameInput: page.locator('#givenName'),
    vendorCreateFinancialInformationSurnameInput: page.locator('#surname'),
    vendorCreateFinancialInformationBankAccountInput: page.locator('#bankAccount'),
    vendorCreateFinancialInformationShebaInput: page.locator('#sheba'),

    // فیلدهای شرطی (حقوقی و اتباع)
    vendorCreateFinancialInformationEconomicCodeInput: page.locator('#economicCode'),
    vendorCreateFinancialInformationFidaCodeInput: page.locator('#fida_code'),

    // دکمه‌ها
    vendorCreateFinancialInformationShebaInquiryButton: page.getByRole('button', { name: 'استعلام' }),

    // ارورها و آلرت‌های الزامی بودن فیلدها
    vendorCreateFinancialInformationNationalIdRequiredAlert: page.getByText('شناسه ملی ضروری است'),
    vendorCreateFinancialInformationGivenNameRequiredAlert: page.getByText('نام صاحب حساب ضروری است'),
    vendorCreateFinancialInformationSurnameRequiredAlert: page.getByText('نام خانوادگی صاحب حساب ضروری است'),
    vendorCreateFinancialInformationEconomicCodeRequiredAlert: page.getByText('کد اقتصادی ضروری است'),

    // ارورها و اعتبارسنجی مقادیر نامعتبر
    vendorCreateFinancialInformationShebaInvalidToast: page.locator('div[role="alert"].Toastify__toast-body', {
      hasText: 'شماره شبا باید ۲۶ کاراکتر (IR + ۲۴ رقم) و فقط شامل اعداد باشد.',
    }),
    vendorCreateFinancialInformationNationalIdLegalInvalidAlert: page.getByText('شماره ملی باید 11 رقم باشد'),
    vendorCreateFinancialInformationNationalIdRealInvalidAlert: page.getByText('شماره ملی باید 10 رقم باشد'),
    vendorCreateFinancialInformationFidaCodeInvalidAlert: page.getByText('کد فراگیر باید 12 رقم باشد'),
    vendorCreateFinancialInformationNationalIdInvalidFormatAlert: page.getByText("کدملی نامعتبر است"),
    // اضافه کردن به آبجکت المان‌ها:
vendorCreateInvalidLongitudeAlert: page.getByText('رکورد نامعتبر است طول جغرافیایی انتخاب شده در ایران نیست'),

  };
};
