import { test as base } from "@playwright/test";
import { LoginService } from "./login/loginAdminPannel";
import { Auth } from "./auth/auth";
import { users } from "../test-data/user-data";
import { SyncFlow } from "./syncFlow/syncFlow";
type MyFixtures = {
  loginAdminApi: LoginService;
  authApi: Auth;
  authTokenAdmin: string;
  syncFlowApi: SyncFlow;
};

export const test = base.extend<MyFixtures>({
  loginAdminApi: async ({ request }, use) => {
    await use(new LoginService(request));
  },
  authApi: async ({ request }, use) => {
    await use(new Auth(request));
  },
  authTokenAdmin: async ({ authApi }, use) => {
    const defaultUser = users[0];
    await authApi.loginRequest(defaultUser.username, defaultUser.password);
    const loginData = await authApi.getValidLoginResponselogin();
    await use(loginData.token);
  },

  syncFlowApi: async ({ request }, use) => {
    await use(new SyncFlow(request));
  },
});

export { expect } from "@playwright/test";
