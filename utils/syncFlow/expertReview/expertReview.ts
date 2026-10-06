import { APIResponse } from "@playwright/test";
import type { ExpertReviewResponse } from "./expertReview-type";
import { BaseApi } from "../../Base/base";

export class ExpertReview extends BaseApi {
  private baseUrl = "https://stgiran-vip.takhfifan.com/api/v1";

  //------------------EXPERT REVIEW---------------------------

  async expertReviewRequest(
    token: string,
    business_id: number | string,
    workflow_state: string = "assign",
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

  async getExpertReviewResponse(): Promise<ExpertReviewResponse> {
    if (!this.response) {
      throw new Error("No response found. Call expertReviewRequest() first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}
