import { test as base, expect } from "@playwright/test";
import { LoginAdmin } from "./login/loginAdminPannel";
// import { VendorsPage } from "./classes/VendorsPage";

type MyFixtures = {
  loginAdmin: LoginAdmin;
  // vendorsPage: VendorsPage;
};

export const test = base.extend<MyFixtures>({
  loginAdmin: async ({ page }, use) => {
    await use(new LoginAdmin(page));
  },

  // vendorsPage: async ({ page }, use) => {
  //   await use(new VendorsPage(page));
  // },
});

export { expect };
