import { APIResponse } from "@playwright/test";
import type { CompletedResponse } from "./completed-type";
import { BaseApi } from "../../Base/base";

export class Completed extends BaseApi {
  private baseUrl = "https://stgiran-vip.takhfifan.com/api/v1";

  //------------------COMPLETED---------------------------

  async completedRequest(
    token: string,
    business_id: number,
    workflow_state: string = "complete",
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/user_panel/business/${business_id}/update_state`;

    this.response = await this.request.post(finalUrl, {
      data: {
        workflow_state: workflow_state,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }

  async getCompletedResponse(): Promise<CompletedResponse> {
    if (!this.response) {
      throw new Error("No response found. Call completedRequest() first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}
