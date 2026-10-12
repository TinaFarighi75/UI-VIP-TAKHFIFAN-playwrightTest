// utils/syncFlow/syncFlow.ts

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

  // متد کمکی برای یکسان‌سازی حروف فارسی و فاصله‌ها
  private normalizeString(str: string): string {
    return str
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/\u200C/g, " ") // نیم‌فاصله به فاصله
      .trim();
  }

  //------------------FULL SYNC FLOW---------------------------

  async executeFullSyncFlow(
    token: string,
    vendor_name: string,
    sales_agent_id: number | string,
    business_id?: number | string,
  ) {
    let targetBusinessId: number | string;

    if (business_id) {
      targetBusinessId = business_id;
    } else {
      // 1. سرچ با Retry (حداکثر ۵ بار با فاصله ۲ ثانیه برای آماده شدن دیتابیس)
      let matchedVendor: any = null;
      const normalizedTargetName = this.normalizeString(vendor_name);

      for (let attempt = 1; attempt <= 5; attempt++) {
        await this.businessSearch.businessSearchRequest(token, vendor_name);
        const searchData =
          await this.businessSearch.getBusinessSearchResponse();

        matchedVendor = searchData.data?.find((item: any) => {
          const itemName = item.attributes?.name || "";
          return this.normalizeString(itemName) === normalizedTargetName;
        });

        if (matchedVendor) {
          break;
        }

        // اگر پیدا نشد، ۲ ثانیه صبر می‌کنیم و مجدد سرچ می‌زنیم
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (!matchedVendor) {
        // برای دیباگ دقیق، نام‌های دریافتی از سرچ را هم چاپ می‌کنیم
        const searchData =
          await this.businessSearch.getBusinessSearchResponse();
        const foundNames = searchData.data?.map((i: any) => i.attributes?.name);
        console.log("❌ Available names in search result:", foundNames);

        throw new Error(
          `Vendor with exact name "${vendor_name}" not found in search results after 5 attempts.`,
        );
      }

      targetBusinessId = matchedVendor.id;
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

    // -------------------------------------------------------------
    // 7. بررسی مجدد پس از سینک، چاپ آیدی‌ها و اعتبارسنجی
    // -------------------------------------------------------------
    // ۲ ثانیه صبر برای اعمال تغییرات در سرویس V3
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await this.businessSearch.businessSearchRequest(token, vendor_name);
    const postSyncData = await this.businessSearch.getBusinessSearchResponse();

    const syncedVendor = postSyncData.data?.find(
      (item: any) => String(item.id) === String(targetBusinessId),
    );

    const businessId = syncedVendor?.id;
    const v3Id = syncedVendor?.attributes?.v3_id;

    console.log(`📌 Business ID: ${businessId}`);
    console.log(`📌 V3 ID: ${v3Id}`);

    if (!businessId) {
      throw new Error(
        `[Sync Verification Failed]: Business ID is missing or empty!`,
      );
    }

    if (v3Id === null || v3Id === undefined) {
      throw new Error(
        `[Sync Verification Failed]: v3_id is null or missing for business ID: ${businessId}`,
      );
    }

    return {
      businessId,
      v3Id,
      selectExpertRes,
      expertReviewRes,
      completedRes,
      supervisorsApprovalRes,
      syncRes,
    };
  }
}
