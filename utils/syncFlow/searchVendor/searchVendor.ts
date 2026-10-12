//utils/syncFlow/searchVendor/searchVendor.ts
import { APIResponse } from "@playwright/test";
import type { BusinessSearchResponse } from "./searchVendor-type";
import { BaseApi } from "../../Base/base";

export class BusinessSearch extends BaseApi {
  private baseUrl = "https://stgiran-vip.takhfifan.com/api/v1";

  //------------------BUSINESS SEARCH---------------------------

  async businessSearchRequest(
    token: string,
    name: string,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl = url || `${this.baseUrl}/user_panel/business/search`;

    this.response = await this.request.get(finalUrl, {
      params: {
        "filters\[name\]": name,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }

  async getBusinessSearchResponse(): Promise<BusinessSearchResponse> {
    if (!this.response) {
      throw new Error("No response found. Call businessSearchRequest() first.");
    }

    const responseJson = await this.response.json();

    return {
      current_page: responseJson.current_page,
      per_page: responseJson.per_page,
      total_entries: responseJson.total_entries,
      total_pages: responseJson.total_pages,
      data: responseJson.data,
    };
  }
}
