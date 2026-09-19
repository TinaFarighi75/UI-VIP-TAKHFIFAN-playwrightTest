export type CashierMachineAvailability = "true" | "false";
export type BusinessType = "real" | "legal" | "foreign";

export interface OwnerInformation {
  source: string;
  fullName: string;
  mobile: string;
}

export interface GeneralInformation {
  businessName: string;
  category: string;
  menuUrl?: string;
  cashierMachine: CashierMachineAvailability;
  description?: string;
}

export interface ContactInformation {
  longitude: string;
  latitude: string;
  province: string;
  city: string;
  area?: string;
  district?: string;
  address: string;
  phone: string;
}

export interface FinancialInformation {
  businessType: BusinessType;
  nationalId?: string;
  givenName: string;
  surname: string;
  bankAccount?: string;
  sheba?: string;
}

export interface CreateBusinessData {
  owner: OwnerInformation;
  general: GeneralInformation;
  contact: ContactInformation;
  financial: FinancialInformation;
}
