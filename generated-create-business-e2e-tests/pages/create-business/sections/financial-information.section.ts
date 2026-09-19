import type { Locator, Page } from "@playwright/test";
import type { FinancialInformation } from "../../../test-data/create-business.types";
import { FileUploadComponent } from "../components/file-upload.component";

export class FinancialInformationSection {
  private readonly root: Locator;
  private readonly heading: Locator;
  private readonly businessTypeSelect: Locator;
  private readonly nationalIdInput: Locator;
  private readonly givenNameInput: Locator;
  private readonly surnameInput: Locator;
  private readonly bankAccountInput: Locator;
  private readonly shebaInput: Locator;
  private readonly inquiryButton: Locator;

  readonly documentsUpload: FileUploadComponent;

  constructor(page: Page) {
    this.heading = page.getByRole("heading", { name: "۵. اطلاعات مالی" });
    this.root = page.locator(".form-section").filter({ has: this.heading });
    this.businessTypeSelect = this.root.locator("#businessType");
    this.nationalIdInput = this.root.locator("#nationalId");
    this.givenNameInput = this.root.locator("#givenName");
    this.surnameInput = this.root.locator("#surname");
    this.bankAccountInput = this.root.locator("#bankAccount");
    this.shebaInput = this.root.locator("#sheba");
    this.inquiryButton = this.root.getByRole("button", { name: "استعلام" });
    this.documentsUpload = new FileUploadComponent(
      this.root.locator(".form-group.has-float-label").filter({
        has: this.root.locator('input[type="file"]'),
      }),
    );
  }

  async fill(data: FinancialInformation): Promise<void> {
    await this.businessTypeSelect.selectOption(data.businessType);
    if (data.nationalId) await this.nationalIdInput.fill(data.nationalId);
    await this.givenNameInput.fill(data.givenName);
    await this.surnameInput.fill(data.surname);
    if (data.bankAccount) await this.bankAccountInput.fill(data.bankAccount);
    if (data.sheba) await this.shebaInput.fill(data.sheba);
  }

  async requestShebaInquiry(): Promise<void> {
    await this.inquiryButton.click();
  }

  get headingLocator(): Locator {
    return this.heading;
  }

  get businessTypeLocator(): Locator {
    return this.businessTypeSelect;
  }

  get nationalIdLocator(): Locator {
    return this.nationalIdInput;
  }

  get givenNameLocator(): Locator {
    return this.givenNameInput;
  }

  get surnameLocator(): Locator {
    return this.surnameInput;
  }

  get shebaLocator(): Locator {
    return this.shebaInput;
  }

  get inquiryButtonLocator(): Locator {
    return this.inquiryButton;
  }
}
