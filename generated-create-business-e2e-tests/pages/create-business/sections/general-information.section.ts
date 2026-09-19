import type { Locator, Page } from "@playwright/test";
import type { GeneralInformation } from "../../../test-data/create-business.types";
import { FileUploadComponent } from "../components/file-upload.component";
import { ReactSelectComponent } from "../components/react-select.component";

export class GeneralInformationSection {
  private readonly root: Locator;
  private readonly heading: Locator;
  private readonly businessNameInput: Locator;
  private readonly menuUrlInput: Locator;
  private readonly cashierMachineSelect: Locator;
  private readonly descriptionEditor: Locator;
  private readonly categorySelect: ReactSelectComponent;

  readonly logoUpload: FileUploadComponent;
  readonly businessImagesUpload: FileUploadComponent;

  constructor(page: Page) {
    this.heading = page.getByRole("heading", {
      name: "۲. اطلاعات عمومی کسب و کار",
    });
    this.root = page.locator(".form-section").filter({ has: this.heading });
    this.businessNameInput = this.root.locator('input[id="name"]');
    this.menuUrlInput = this.root.locator("#menu_url");
    this.cashierMachineSelect = this.root.locator("#isCashierMachine");
    this.descriptionEditor = this.root.getByRole("textbox", {
      name: "Rich Text Editor, main",
    });
    this.categorySelect = new ReactSelectComponent(page, "category");

    const uploadGroups = this.root.locator(".form-group.has-float-label").filter({
      has: page.locator('input[type="file"]'),
    });
    this.logoUpload = new FileUploadComponent(uploadGroups.nth(0));
    this.businessImagesUpload = new FileUploadComponent(uploadGroups.nth(1));
  }

  async fill(data: GeneralInformation): Promise<void> {
    await this.businessNameInput.fill(data.businessName);
    await this.categorySelect.selectOption(data.category);
    if (data.menuUrl) await this.menuUrlInput.fill(data.menuUrl);
    await this.cashierMachineSelect.selectOption(data.cashierMachine);
    if (data.description) await this.descriptionEditor.fill(data.description);
  }

  async fillBusinessName(value: string): Promise<void> {
    await this.businessNameInput.fill(value);
  }

  async selectCategory(value: string): Promise<void> {
    await this.categorySelect.selectOption(value);
  }

  async selectCashierMachine(value: "true" | "false"): Promise<void> {
    await this.cashierMachineSelect.selectOption(value);
  }

  get headingLocator(): Locator {
    return this.heading;
  }

  get businessNameLocator(): Locator {
    return this.businessNameInput;
  }

  get cashierMachineLocator(): Locator {
    return this.cashierMachineSelect;
  }

  get descriptionLocator(): Locator {
    return this.descriptionEditor;
  }
}
