import type { Locator, Page } from "@playwright/test";
import type { OwnerInformation } from "../../../test-data/create-business.types";
import { ReactSelectComponent } from "../components/react-select.component";

export class OwnerInformationSection {
  private readonly root: Locator;
  private readonly heading: Locator;
  private readonly fullNameInput: Locator;
  private readonly mobileInput: Locator;
  private readonly sourceSelect: ReactSelectComponent;

  constructor(page: Page) {
    this.heading = page.getByRole("heading", {
      name: "۱. اطلاعات صاحب کسب و کار",
    });
    this.root = page.locator(".form-section").filter({ has: this.heading });
    this.fullNameInput = this.root.locator('input[id="name"]');
    this.mobileInput = this.root.locator("#mobile");
    this.sourceSelect = new ReactSelectComponent(page, "source");
  }

  async fill(data: OwnerInformation): Promise<void> {
    await this.sourceSelect.selectOption(data.source);
    await this.fullNameInput.fill(data.fullName);
    await this.mobileInput.fill(data.mobile);
  }

  async fillFullName(value: string): Promise<void> {
    await this.fullNameInput.fill(value);
  }

  async fillMobile(value: string): Promise<void> {
    await this.mobileInput.fill(value);
  }

  async selectSource(value: string): Promise<void> {
    await this.sourceSelect.selectOption(value);
  }

  get headingLocator(): Locator {
    return this.heading;
  }

  get fullNameLocator(): Locator {
    return this.fullNameInput;
  }

  get mobileLocator(): Locator {
    return this.mobileInput;
  }
}
