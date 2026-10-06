import { test as base } from "@playwright/test";
import { LoginService } from "./login/loginAdminPannel";
import { Auth } from "./auth/auth";
import { users } from "../test-data/user-data";
import { SelectExpert } from "./syncFlow/selectExpert/selectExpert";
import { ExpertReview } from "./syncFlow/expertReview/expertReview";
import { Completed } from "./syncFlow/completed/completed";
import { SupervisorsApproval } from "./syncFlow/supervisorsApproval/supervisorsApproval";

type MyFixtures = {
  loginAdminApi: LoginService;
  authApi: Auth;
  authTokenAdmin: string;
  selectExpertApi: SelectExpert;
  expertReviewApi: ExpertReview;
  completedApi: Completed;
  supervisorsApprovalApi: SupervisorsApproval;
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
  selectExpertApi: async ({ request }, use) => {
    await use(new SelectExpert(request));
  },
  expertReviewApi: async ({ request }, use) => {
    await use(new ExpertReview(request));
  },
  completedApi: async ({ request }, use) => {
    await use(new Completed(request));
  },
  supervisorsApprovalApi: async ({ request }, use) => {
    await use(new SupervisorsApproval(request));
  },
});

export { expect } from "@playwright/test";
