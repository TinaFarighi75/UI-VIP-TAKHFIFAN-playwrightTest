import path from "path";
import { test as setup, expect } from "@playwright/test";
import { LoginAdmin } from "../utils/login/loginAdminPannel";

// این مسیر باید دقیقاً با storageState در playwright.config.ts یکی باشد
const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("ورود مدیر و ذخیره سشن", async ({ page }) => {
  const loginAdmin = new LoginAdmin(page);

  await loginAdmin.gotoPanel();
  await loginAdmin.verifyLoginPage();
  await loginAdmin.fillCredentials("tinafarighi75@gmail.com", "654321");

  await loginAdmin.dashboardPanel();          // منتظر رسیدن به داشبورد
  await page.context().storageState({ path: authFile });  // ذخیره‌ی سشن
});
