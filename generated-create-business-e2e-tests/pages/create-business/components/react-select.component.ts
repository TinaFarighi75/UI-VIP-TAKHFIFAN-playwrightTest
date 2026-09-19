import type { Locator, Page } from "@playwright/test";

export class ReactSelectComponent {
  private readonly container: Locator;
  private readonly input: Locator;

  constructor(
    private readonly page: Page,
    containerId: string,
  ) {
    this.container = page.locator(`#${containerId}`);
    this.input = this.container.locator('input[aria-autocomplete="list"]');
  }

  async selectOption(option: string): Promise<void> {
    await this.input.click();
    await this.input.fill(option);
    await this.page.getByText(option, { exact: true }).last().click();
  }

  async clear(): Promise<void> {
    await this.input.fill("");
  }

  get containerLocator(): Locator {
    return this.container;
  }
}
