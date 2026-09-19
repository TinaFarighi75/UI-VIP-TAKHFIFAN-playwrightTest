import type { CreateBusinessData } from "./create-business.types";

export const createBusinessDefaults: Readonly<CreateBusinessData> = {
  owner: {
    source: "جمع‌آوری تارگت به صورت حضوری",
    fullName: "کاربر تست خودکار",
    mobile: "09120000000",
  },
  general: {
    businessName: "کسب و کار تست خودکار",
    category: "رستوران و کافی شاپ",
    menuUrl: "https://example.com/menu",
    cashierMachine: "false",
    description: "ایجاد شده توسط تست خودکار Playwright",
  },
  contact: {
    longitude: "51.3890",
    latitude: "35.6892",
    province: "تهران",
    city: "تهران",
    address: "تهران، آدرس تست خودکار",
    phone: "02112345678",
  },
  financial: {
    businessType: "real",
    nationalId: "0013540269",
    givenName: "کاربر",
    surname: "تست",
    bankAccount: "1234567890",
    sheba: "012345678901234567890123",
  },
};

export const validationData = {
  invalidMobiles: ["9123456789", "09123", "abcdefghijk"],
  invalidNationalIds: ["123", "abcdefghij"],
  invalidShebas: ["123", "abcdefghijklmnopqrstuvwx"],
} as const;
