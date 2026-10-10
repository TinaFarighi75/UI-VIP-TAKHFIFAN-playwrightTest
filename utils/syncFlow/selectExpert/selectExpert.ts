//utils/syncFlow/selectExpert/selectExpert.ts
import { APIResponse } from "@playwright/test";
import type { SelectExpertResponse } from "./selectExpert-type";
import { BaseApi } from "../../Base/base";

export class SelectExpert extends BaseApi {
  private baseUrl = "https://stgiran-vip.takhfifan.com/api/v1";

  //------------------SELECT EXPERT---------------------------

  async selectExpertRequest(
    token: string,
    business_id: number | string,
    sales_agent_id: number | string,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url ||
      `${this.baseUrl}/user_panel/business/${business_id}/assign_to_sales_agent`;

    this.response = await this.request.post(finalUrl, {
      data: {
        sales_agent_id: String(sales_agent_id),
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }

  async getSelectExpertResponse(): Promise<SelectExpertResponse> {
    if (!this.response) {
      throw new Error("No response found. Call selectExpertRequest() first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}
