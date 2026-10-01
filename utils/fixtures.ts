import { test as base } from "@playwright/test";
import { LoginService } from "./login/loginAdminPannel";

type MyFixtures = {
  loginAdminApi: LoginService;

};

export const test = base.extend<MyFixtures>({
  loginAdminApi: async ({ request }, use) => {
    await use(new LoginService(request));
  },


});

export { expect } from "@playwright/test";
