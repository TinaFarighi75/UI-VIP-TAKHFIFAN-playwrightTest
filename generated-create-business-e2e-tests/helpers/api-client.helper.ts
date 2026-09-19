import type { APIRequestContext, APIResponse } from "@playwright/test";

export class CreateBusinessApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async deleteBusiness(
    businessId: string,
    endpointTemplate = "/api/businesses/{id}",
  ): Promise<APIResponse> {
    const endpoint = endpointTemplate.replace(
      "{id}",
      encodeURIComponent(businessId),
    );
    return this.request.delete(endpoint);
  }
}
