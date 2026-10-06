import { APIResponse } from "@playwright/test";
import type { SyncResponse } from "./sync-type";
import { BaseApi } from "../../Base/base";

export class Sync extends BaseApi {
  private baseUrl = "https://stgiran-vip.takhfifan.com/api/v1";

  //------------------SYNC---------------------------

  async syncRequest(
    token: string,
    business_id: number | string,
    workflow_state: string = "sync",
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

  async getSyncResponse(): Promise<SyncResponse> {
    if (!this.response) {
      throw new Error("No response found. Call syncRequest() first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}
