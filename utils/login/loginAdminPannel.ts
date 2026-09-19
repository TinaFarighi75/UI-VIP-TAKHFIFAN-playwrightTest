import { Page, Locator, expect } from "@playwright/test";
import { promises } from "node:dns";

export class LoginAdmin {
  private readonly page: Page;

  // لوکیتورها

  private readonly logo: Locator;
  private readonly loginTitle: Locator;
  private readonly loginHelper: Locator;
  private readonly usernameInput: Locator;
  private readonly usernameLabel: Locator;
  private readonly passwordInput: Locator;
  private readonly passwordLabel: Locator;
  private readonly entryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("img", { name: "تخفیفان" });
    this.loginTitle = page.getByText("ورود به کسب و کار تخفیفانی");
    this.loginHelper = page.getByText(
      "برای ورود، شماره همراه یا ایمیل خود را وارد کنید",
    );

    this.usernameInput = page.locator('input[name="username"]');
    this.usernameLabel = page.locator('label[for="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.passwordLabel = page.locator('label[for="password"]');
    this.entryButton = page.getByRole("button", { name: "ورود" });
  }

  async gotoPanel(): Promise<void> {
    await this.page.goto("/pwa/login");
  }

  async verifyLoginPage(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.loginTitle).toBeVisible();
    await expect(this.loginHelper).toBeVisible();

    await expect(this.usernameLabel).toHaveText("شماره همراه یا ایمیل");

    await expect(this.usernameInput).toBeEnabled();
    await expect(this.entryButton).toBeDisabled();
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await expect(this.passwordLabel).toHaveText("رمز عبور");
    await expect(this.passwordInput).toBeEnabled();
    await this.passwordInput.fill(password);
    await expect(this.entryButton).toBeEnabled();
    await this.entryButton.click();
  }

  async dashboardPanel(): Promise<void> {
    await expect(this.page).toHaveURL(/\/panel\/app\/dashboards\//);
  }
}
