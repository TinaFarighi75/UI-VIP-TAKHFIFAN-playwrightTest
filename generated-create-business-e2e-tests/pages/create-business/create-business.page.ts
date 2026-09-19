import type { Locator, Page } from "@playwright/test";
import type { CreateBusinessData } from "../../test-data/create-business.types";
import { ContactInformationSection } from "./sections/contact-information.section";
import { FinancialInformationSection } from "./sections/financial-information.section";
import { GeneralInformationSection } from "./sections/general-information.section";
import { OwnerInformationSection } from "./sections/owner-information.section";
import { ServiceHoursSection } from "./sections/service-hours.section";

export class CreateBusinessPage {
  static readonly route = "/panel/app/dashboards/business/create";

  private readonly title: Locator;
  private readonly submitButton: Locator;

  readonly owner: OwnerInformationSection;
  readonly general: GeneralInformationSection;
  readonly contact: ContactInformationSection;
  readonly serviceHours: ServiceHoursSection;
  readonly financial: FinancialInformationSection;

  constructor(private readonly page: Page) {
    this.title = page.getByRole("heading", { name: "ایجاد کسب و کار جدید" });
    this.submitButton = page.getByRole("button", { name: "ثبت", exact: true });
    this.owner = new OwnerInformationSection(page);
    this.general = new GeneralInformationSection(page);
    this.contact = new ContactInformationSection(page);
    this.serviceHours = new ServiceHoursSection(page);
    this.financial = new FinancialInformationSection(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(CreateBusinessPage.route);
  }

  async fillRequiredForm(data: CreateBusinessData): Promise<void> {
    await this.owner.fill(data.owner);
    await this.general.fill(data.general);
    await this.contact.fill(data.contact);
    await this.financial.fill(data.financial);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  get titleLocator(): Locator {
    return this.title;
  }

  get submitButtonLocator(): Locator {
    return this.submitButton;
  }
}
