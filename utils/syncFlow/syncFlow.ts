//utils/syncFlow/syncFlow.ts

import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "../Base/base";
import { BusinessSearch } from "./searchVendor/searchVendor";
import { SelectExpert } from "./selectExpert/selectExpert";
import { ExpertReview } from "./expertReview/expertReview";
import { Completed } from "./completed/completed";
import { SupervisorsApproval } from "./supervisorsApproval/supervisorsApproval";
import { Sync } from "./sync/sync";

export class SyncFlow extends BaseApi {
  public businessSearch: BusinessSearch;
  public selectExpert: SelectExpert;
  public expertReview: ExpertReview;
  public completed: Completed;
  public supervisorsApproval: SupervisorsApproval;
  public sync: Sync;

  constructor(request: APIRequestContext) {
    super(request);
    this.businessSearch = new BusinessSearch(request);
    this.selectExpert = new SelectExpert(request);
    this.expertReview = new ExpertReview(request);
    this.completed = new Completed(request);
    this.supervisorsApproval = new SupervisorsApproval(request);
    this.sync = new Sync(request);
  }

  //------------------FULL SYNC FLOW---------------------------

  /**
   * ترتیب مراحل:
   * 1. searchVendor
   * 2. selectExpert
   * 3. expertReview
   * 4. completed
   * 5. supervisorsApproval
   * 6. sync
   */
  async executeFullSyncFlow(
    token: string,
    vendor_name: string,
    sales_agent_id: number | string,
    business_id?: number | string,
  ) {
    // 1. Search Vendor
    const searchRes = await this.businessSearch.businessSearchRequest(
      token,
      vendor_name,
    );

    // تعیین قطعی targetBusinessId
    let targetBusinessId: number | string;

    if (business_id) {
      targetBusinessId = business_id;
    } else {
      const searchData = await this.businessSearch.getBusinessSearchResponse();
      if (!searchData.data || searchData.data.length === 0) {
        throw new Error(`Vendor with name "${vendor_name}" not found.`);
      }
      targetBusinessId = searchData.data[0].id;
    }

    // 2. Select Expert (Assign to Sales Agent)
    const selectExpertRes = await this.selectExpert.selectExpertRequest(
      token,
      Number(targetBusinessId),
      sales_agent_id,
    );

    // 3. Expert Review (Workflow State: assign)
    const expertReviewRes = await this.expertReview.expertReviewRequest(
      token,
      Number(targetBusinessId),
      "assign",
    );

    // 4. Completed (Workflow State: complete)
    const completedRes = await this.completed.completedRequest(
      token,
      Number(targetBusinessId),
      "complete",
    );

    // 5. Supervisors Approval (Workflow State: approve)
    const supervisorsApprovalRes =
      await this.supervisorsApproval.supervisorsApprovalRequest(
        token,
        Number(targetBusinessId),
        "approve",
      );

    // 6. Sync (Workflow State: sync)
    const syncRes = await this.sync.syncRequest(
      token,
      Number(targetBusinessId),
      "sync",
    );

    return {
      businessId: targetBusinessId,
      searchRes,
      selectExpertRes,
      expertReviewRes,
      completedRes,
      supervisorsApprovalRes,
      syncRes,
    };
  }
}
