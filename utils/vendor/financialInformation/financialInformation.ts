//utils/vendor/financialInformation/financialInformation.ts

import { expect, type Locator, type Page } from "@playwright/test";

import { vendorCreateFinancialInformationElements } from "./financialInformation-elements";
import type {
  BusinessTypeValue,
  VendorCreateFinancialInformationElements,
} from "./financialInformation-types";

// ----------------------------- Params (Options Object) -----------------------------

export type FillFinancialInformationParams = {
  businessType?: BusinessTypeValue;

  // real/legal
  nationalId?: string;

  // foreign
  fidaCode?: string;

  givenName?: string;
  surname?: string;

  bankAccount?: string;
  sheba?: string;

  // legal only
  economicCode?: string;

  // actions
  inquirySheba?: boolean; // click "استعلام"
};

export class VendorCreateFinancialInformationSection {
  private readonly financial: VendorCreateFinancialInformationElements;

  constructor(private readonly page: Page) {
    this.financial = vendorCreateFinancialInformationElements(page);
  }

  //---------------------------ELEMENTS (GETTERS)------------------------------------

  getVendorCreateFinancialInformationHeader(): Locator {
    return this.financial.vendorCreateFinancialInformationHeader;
  }

  getVendorCreateFinancialInformationBusinessTypeTitle(): Locator {
    return this.financial.vendorCreateFinancialInformationBusinessTypeTitle;
  }

  getVendorCreateFinancialInformationDocumentsUploadHint(): Locator {
    return this.financial.vendorCreateFinancialInformationDocumentsUploadHint;
  }

  getVendorCreateFinancialInformationBusinessTypeSelect(): Locator {
    return this.financial.vendorCreateFinancialInformationBusinessTypeSelect;
  }

  getVendorCreateFinancialInformationNationalIdInput(): Locator {
    return this.financial.vendorCreateFinancialInformationNationalIdInput;
  }

  getVendorCreateFinancialInformationGivenNameInput(): Locator {
    return this.financial.vendorCreateFinancialInformationGivenNameInput;
  }

  getVendorCreateFinancialInformationSurnameInput(): Locator {
    return this.financial.vendorCreateFinancialInformationSurnameInput;
  }

  getVendorCreateFinancialInformationBankAccountInput(): Locator {
    return this.financial.vendorCreateFinancialInformationBankAccountInput;
  }

  getVendorCreateFinancialInformationShebaInput(): Locator {
    return this.financial.vendorCreateFinancialInformationShebaInput;
  }

  getVendorCreateFinancialInformationEconomicCodeInput(): Locator {
    return this.financial.vendorCreateFinancialInformationEconomicCodeInput;
  }

  getVendorCreateFinancialInformationFidaCodeInput(): Locator {
    return this.financial.vendorCreateFinancialInformationFidaCodeInput;
  }

  getVendorCreateFinancialInformationShebaInquiryButton(): Locator {
    return this.financial.vendorCreateFinancialInformationShebaInquiryButton;
  }

  // Alerts / required
  getVendorCreateFinancialInformationNationalIdRequiredAlert(): Locator {
    return this.financial
      .vendorCreateFinancialInformationNationalIdRequiredAlert;
  }

  getVendorCreateFinancialInformationGivenNameRequiredAlert(): Locator {
    return this.financial
      .vendorCreateFinancialInformationGivenNameRequiredAlert;
  }

  getVendorCreateFinancialInformationSurnameRequiredAlert(): Locator {
    return this.financial.vendorCreateFinancialInformationSurnameRequiredAlert;
  }

  getVendorCreateFinancialInformationEconomicCodeRequiredAlert(): Locator {
    return this.financial
      .vendorCreateFinancialInformationEconomicCodeRequiredAlert;
  }

  // invalid validations
  getVendorCreateFinancialInformationShebaInvalidToast(): Locator {
    return this.financial.vendorCreateFinancialInformationShebaInvalidToast;
  }

  getVendorCreateFinancialInformationNationalIdLegalInvalidAlert(): Locator {
    return this.financial
      .vendorCreateFinancialInformationNationalIdLegalInvalidAlert;
  }

  getVendorCreateFinancialInformationNationalIdRealInvalidAlert(): Locator {
    return this.financial
      .vendorCreateFinancialInformationNationalIdRealInvalidAlert;
  }

  getVendorCreateFinancialInformationFidaCodeInvalidAlert(): Locator {
    return this.financial.vendorCreateFinancialInformationFidaCodeInvalidAlert;
  }

  getVendorCreateFinancialInformationNationalIdInvalidFormatAlert(): Locator {
    return this.financial
      .vendorCreateFinancialInformationNationalIdInvalidFormatAlert;
  }
  getVendorCreateInvalidLongitudeAlert(): Locator {
    return this.financial.vendorCreateInvalidLongitudeAlert;
  }
  //---------------------------SECTION ACTIONS---------------------------------------

  /**
   * این سکشن با کلیک روی هدر باز/بسته می‌شود
   */
  async clickFinancialInformationHeader(): Promise<void> {
    await this.getVendorCreateFinancialInformationHeader().click();
  }

  //---------------------------FIELD ACTIONS----------------------------------------

  async clickBusinessTypeTitle(): Promise<void> {
    await this.getVendorCreateFinancialInformationBusinessTypeTitle().click();
  }

  async selectBusinessType(value: BusinessTypeValue): Promise<void> {
    await this.getVendorCreateFinancialInformationBusinessTypeSelect().selectOption(
      value,
    );
  }

  async fillNationalId(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationNationalIdInput().fill(value);
  }

  async fillFidaCode(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationFidaCodeInput().fill(value);
  }

  async fillGivenName(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationGivenNameInput().fill(value);
  }

  async fillSurname(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationSurnameInput().fill(value);
  }

  async fillBankAccount(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationBankAccountInput().fill(
      value,
    );
  }

  async fillSheba(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationShebaInput().fill(value);
  }

  async fillEconomicCode(value: string): Promise<void> {
    await this.getVendorCreateFinancialInformationEconomicCodeInput().fill(
      value,
    );
  }

  async clickShebaInquiry(): Promise<void> {
    await this.getVendorCreateFinancialInformationShebaInquiryButton().click();
  }

  //---------------------------WAITS (STABILITY)-------------------------------------

  async waitForFinancialInformationHeaderVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationHeader(),
    ).toBeVisible();
  }

  async waitForBusinessTypeSelectVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationBusinessTypeSelect(),
    ).toBeVisible();
  }

  //---------------------------ASSERTIONS--------------------------------------------

  async expectFinancialInformationHeaderVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationHeader(),
    ).toBeVisible();
  }

  async expectBusinessTypeTitleVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationBusinessTypeTitle(),
    ).toBeVisible();
  }

  async expectDocumentsUploadHintVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationDocumentsUploadHint(),
    ).toBeVisible();
  }

  async expectBusinessTypeValue(value: BusinessTypeValue): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationBusinessTypeSelect(),
    ).toHaveValue(value);
  }

  async expectNationalIdValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationNationalIdInput(),
    ).toHaveValue(value);
  }

  async expectFidaCodeValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationFidaCodeInput(),
    ).toHaveValue(value);
  }

  async expectGivenNameValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationGivenNameInput(),
    ).toHaveValue(value);
  }

  async expectSurnameValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationSurnameInput(),
    ).toHaveValue(value);
  }

  async expectBankAccountValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationBankAccountInput(),
    ).toHaveValue(value);
  }

  async expectShebaValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationShebaInput(),
    ).toHaveValue(value);
  }

  async expectEconomicCodeValue(value: string): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationEconomicCodeInput(),
    ).toHaveValue(value);
  }

  // Required alerts
  async expectNationalIdRequiredAlertVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationNationalIdRequiredAlert(),
    ).toBeVisible();
  }

  async expectGivenNameRequiredAlertVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationGivenNameRequiredAlert(),
    ).toBeVisible();
  }

  async expectSurnameRequiredAlertVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationSurnameRequiredAlert(),
    ).toBeVisible();
  }

  async expectEconomicCodeRequiredAlertVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationEconomicCodeRequiredAlert(),
    ).toBeVisible();
  }

  // Invalid alerts/toast
  async expectShebaInvalidToastVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationShebaInvalidToast(),
    ).toBeVisible();
  }

  async expectNationalIdInvalidAlertForLegalVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationNationalIdLegalInvalidAlert(),
    ).toBeVisible();
  }

  async expectNationalIdInvalidAlertForRealVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationNationalIdRealInvalidAlert(),
    ).toBeVisible();
  }

  async expectFidaCodeInvalidAlertVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationFidaCodeInvalidAlert(),
    ).toBeVisible();
  }

  async expectNationalIdInvalidFormatAlertVisible(): Promise<void> {
    await expect(
      this.getVendorCreateFinancialInformationNationalIdInvalidFormatAlert(),
    ).toBeVisible();
  }
  async expectInvalidLongitudeAlertVisible(): Promise<void> {
    await expect(this.getVendorCreateInvalidLongitudeAlert()).toBeVisible();
  }
  //---------------------------VISIBILITY & STATE METHODS----------------------------

  async isEconomicCodeInputVisible(): Promise<boolean> {
    return this.getVendorCreateFinancialInformationEconomicCodeInput().isVisible();
  }

  async isFidaCodeInputVisible(): Promise<boolean> {
    return this.getVendorCreateFinancialInformationFidaCodeInput().isVisible();
  }

  async getBusinessTypeValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationBusinessTypeSelect().inputValue();
  }

  async getNationalIdValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationNationalIdInput().inputValue();
  }

  async getGivenNameValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationGivenNameInput().inputValue();
  }

  async getSurnameValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationSurnameInput().inputValue();
  }

  async getBankAccountValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationBankAccountInput().inputValue();
  }

  async getShebaValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationShebaInput().inputValue();
  }

  async getEconomicCodeValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationEconomicCodeInput().inputValue();
  }

  async getFidaCodeValue(): Promise<string> {
    return this.getVendorCreateFinancialInformationFidaCodeInput().inputValue();
  }

  //---------------------------FLOWS (Options Object Pattern)-------------------------

  /**
   * پر کردن سکشن اطلاعات مالی با Options Object
   * - هر فیلدی undefined باشد، نادیده گرفته می‌شود (برای تست منفی عالی است)
   * - businessType تعیین‌کننده فیلدهای شرطی است:
   *   - legal => economicCode (اجباری)
   *   - foreign => fidaCode
   */
  async fillFinancialInformation(
    params: FillFinancialInformationParams,
  ): Promise<void> {
    if (params.businessType !== undefined) {
      await this.selectBusinessType(params.businessType);
    }

    // nationalId (real/legal)
    if (params.nationalId !== undefined) {
      await this.fillNationalId(params.nationalId);
    }

    // foreign
    if (params.fidaCode !== undefined) {
      await this.fillFidaCode(params.fidaCode);
    }

    if (params.givenName !== undefined) {
      await this.fillGivenName(params.givenName);
    }

    if (params.surname !== undefined) {
      await this.fillSurname(params.surname);
    }

    if (params.bankAccount !== undefined) {
      await this.fillBankAccount(params.bankAccount);
    }

    if (params.sheba !== undefined) {
      await this.fillSheba(params.sheba);
    }

    // legal only
    if (params.economicCode !== undefined) {
      await this.fillEconomicCode(params.economicCode);
    }

    if (params.inquirySheba) {
      await this.clickShebaInquiry();
    }
  }

  /**
   * سناریوی حقوقی (legal): انتخاب حقوقی + پر کردن economicCode (اگر داده شود)
   */
  async fillLegalBusinessFinancialInfo(
    params: Omit<FillFinancialInformationParams, "businessType">,
  ): Promise<void> {
    await this.fillFinancialInformation({ ...params, businessType: "legal" });
  }

  /**
   * سناریوی حقیقی (real)
   */
  async fillRealBusinessFinancialInfo(
    params: Omit<FillFinancialInformationParams, "businessType">,
  ): Promise<void> {
    await this.fillFinancialInformation({ ...params, businessType: "real" });
  }

  /**
   * سناریوی اتباع خارجی (foreign)
   */
  async fillForeignBusinessFinancialInfo(
    params: Omit<FillFinancialInformationParams, "businessType">,
  ): Promise<void> {
    await this.fillFinancialInformation({ ...params, businessType: "foreign" });
  }
}
