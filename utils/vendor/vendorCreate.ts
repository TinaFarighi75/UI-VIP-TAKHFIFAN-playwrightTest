//utils/vendor/vendorCreate/vendorCreate.ts
import type { Page } from "@playwright/test";

import { General } from "./general/general";
import { OwnerBusinessSection } from "./ownerBusiness/ownerBusiness";
import { PublicBusinessInfoSection } from "./publicBusinessInfo/publicBusinessInfo";
import { ContactToBusinessSection } from "./contactToBusiness/contactToBusiness";
import { TimesToServiceSection } from "./timesToService/timesToService";
import { VendorCreateFinancialInformationSection } from "./financialInformation/financialInformation";

/**
 * Facade/Orchestrator: دسترسی به تمام سکشن‌های صفحه ساخت وندور
 * از طریق یک کلاس واحد، بدون نیاز به instantiate کردن جداگانه هر سکشن
 */
export class VendorCreate {
  public readonly general: General;
  public readonly ownerBusiness: OwnerBusinessSection;
  public readonly publicBusinessInfo: PublicBusinessInfoSection;
  public readonly contactToBusiness: ContactToBusinessSection;
  public readonly timesToService: TimesToServiceSection;
  public readonly financialInformation: VendorCreateFinancialInformationSection;

  constructor(page: Page) {
    this.general = new General(page);
    this.ownerBusiness = new OwnerBusinessSection(page);
    this.publicBusinessInfo = new PublicBusinessInfoSection(page);
    this.contactToBusiness = new ContactToBusinessSection(page);
    this.timesToService = new TimesToServiceSection(page);
    this.financialInformation = new VendorCreateFinancialInformationSection(
      page,
    );
  }
}
