//utils/login/loginAdminPannel.ts
import { APIRequestContext, expect } from "@playwright/test";
import { LoginResponse } from "./loginAdminPannel-types";

export class LoginService {
  constructor(private readonly request: APIRequestContext) {}

  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api/v1";

  async login(
    email: string,
    pass: string,
    url?: string,
  ): Promise<LoginResponse> {
    const finalUrl = url || `${this.baseUrl}/user_panel/authentication/login`;
    const response = await this.request.post(finalUrl, {
      data: {
        email: email,
        password: pass,
        ua: {
          mobile: null,
          phone: null,
          tablet: null,
          os: null,
          md: {
            ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
            _cache: { phone: null, tablet: null, mobile: null, os: null },
            maxPhoneWidth: 600,
          },
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    });

    expect(response.ok(), "Login API should return 200/2xx").toBeTruthy();

    const data = (await response.json()) as LoginResponse;
    return data;
  }
}
