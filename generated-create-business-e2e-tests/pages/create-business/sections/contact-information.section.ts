import type { Locator, Page } from "@playwright/test";
import type { ContactInformation } from "../../../test-data/create-business.types";
import { ReactSelectComponent } from "../components/react-select.component";

export class ContactInformationSection {
  private readonly root: Locator;
  private readonly heading: Locator;
  private readonly mapButton: Locator;
  private readonly longitudeInput: Locator;
  private readonly latitudeInput: Locator;
  private readonly addressInput: Locator;
  private readonly phoneInput: Locator;
  private readonly addPhoneButton: Locator;
  private readonly provinceSelect: ReactSelectComponent;
  private readonly citySelect: ReactSelectComponent;
  private readonly areaSelect: ReactSelectComponent;
  private readonly districtSelect: ReactSelectComponent;

  constructor(page: Page) {
    this.heading = page.getByRole("heading", {
      name: "۳. اطلاعات تماس کسب و کار",
    });
    this.root = page.locator(".form-section").filter({ has: this.heading });
    this.mapButton = this.root.getByRole("button", { name: "مشاهده نقشه" });
    this.longitudeInput = this.root.locator('input[name="longitude"]');
    this.latitudeInput = this.root.locator('input[name="latitude"]');
    this.addressInput = this.root.locator('input[name="address"]');
    this.phoneInput = this.root.locator('input[name="phone"]');
    this.addPhoneButton = this.root.getByRole("button", { name: "+ افزودن" });
    this.provinceSelect = new ReactSelectComponent(page, "province");
    this.citySelect = new ReactSelectComponent(page, "city");
    this.areaSelect = new ReactSelectComponent(page, "area");
    this.districtSelect = new ReactSelectComponent(page, "district");
  }

  async fill(data: ContactInformation): Promise<void> {
    await this.longitudeInput.fill(data.longitude);
    await this.latitudeInput.fill(data.latitude);
    await this.provinceSelect.selectOption(data.province);
    await this.citySelect.selectOption(data.city);
    if (data.area) await this.areaSelect.selectOption(data.area);
    if (data.district) await this.districtSelect.selectOption(data.district);
    await this.addressInput.fill(data.address);
    await this.phoneInput.fill(data.phone);
  }

  async addPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.addPhoneButton.click();
  }

  async openMap(): Promise<void> {
    await this.mapButton.click();
  }

  get headingLocator(): Locator {
    return this.heading;
  }

  get mapButtonLocator(): Locator {
    return this.mapButton;
  }

  get longitudeLocator(): Locator {
    return this.longitudeInput;
  }

  get latitudeLocator(): Locator {
    return this.latitudeInput;
  }

  get addressLocator(): Locator {
    return this.addressInput;
  }

  get phoneLocator(): Locator {
    return this.phoneInput;
  }
}
