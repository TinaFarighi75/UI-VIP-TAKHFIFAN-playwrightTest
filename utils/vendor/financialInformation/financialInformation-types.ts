import type { Locator } from '@playwright/test';

export type BusinessTypeValue = 'real' | 'legal' | 'foreign';

export type VendorCreateFinancialInformationElements = {
  // هدر و عناوین
  vendorCreateFinancialInformationHeader: Locator;
  vendorCreateFinancialInformationBusinessTypeTitle: Locator;
  vendorCreateFinancialInformationDocumentsUploadHint: Locator;

  // فیلدها و سلکت‌ها
  vendorCreateFinancialInformationBusinessTypeSelect: Locator;
  vendorCreateFinancialInformationNationalIdInput: Locator;
  vendorCreateFinancialInformationGivenNameInput: Locator;
  vendorCreateFinancialInformationSurnameInput: Locator;
  vendorCreateFinancialInformationBankAccountInput: Locator;
  vendorCreateFinancialInformationShebaInput: Locator;

  // فیلدهای شرطی
  vendorCreateFinancialInformationEconomicCodeInput: Locator;
  vendorCreateFinancialInformationFidaCodeInput: Locator;

  // دکمه‌ها
  vendorCreateFinancialInformationShebaInquiryButton: Locator;

  // ارورها و آلرت‌های الزامی بودن فیلدها
  vendorCreateFinancialInformationNationalIdRequiredAlert: Locator;
  vendorCreateFinancialInformationGivenNameRequiredAlert: Locator;
  vendorCreateFinancialInformationSurnameRequiredAlert: Locator;
  vendorCreateFinancialInformationEconomicCodeRequiredAlert: Locator;

  // ارورها و اعتبارسنجی مقادیر نامعتبر
  vendorCreateFinancialInformationShebaInvalidToast: Locator;
  vendorCreateFinancialInformationNationalIdLegalInvalidAlert: Locator;
  vendorCreateFinancialInformationNationalIdRealInvalidAlert: Locator;
  vendorCreateFinancialInformationFidaCodeInvalidAlert: Locator;
};
