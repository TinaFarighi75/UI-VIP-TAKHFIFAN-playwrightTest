import type { Locator, Page } from "@playwright/test";

export class ServiceHoursSection {
  private readonly root: Locator;
  private readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole("heading", {
      name: "۴. روزها و ساعات سرویس دهی",
    });
    this.root = page.locator(".form-section").filter({ has: this.heading });
  }

  private dayRow(dayName: string): Locator {
    return this.root.locator(".list-group-item").filter({
      has: this.root.getByText(dayName, { exact: true }),
    });
  }

  async toggleDay(dayName: string): Promise<void> {
    await this.dayRow(dayName).getByRole("switch").click();
  }

  getDaySwitch(dayName: string): Locator {
    return this.dayRow(dayName).getByRole("switch");
  }

  getDayTimeInputs(dayName: string): Locator {
    return this.dayRow(dayName).locator('input[type="text"]');
  }

  get headingLocator(): Locator {
    return this.heading;
  }
}
