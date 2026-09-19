import type { CreateBusinessData } from "../test-data/create-business.types";
import { createBusinessDefaults } from "../test-data/create-business.data";

export function uniqueSuffix(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildCreateBusinessData(
  overrides: Partial<CreateBusinessData> = {},
): CreateBusinessData {
  const suffix = uniqueSuffix();

  return {
    owner: { ...createBusinessDefaults.owner, ...overrides.owner },
    general: {
      ...createBusinessDefaults.general,
      businessName: `کسب و کار تست ${suffix}`,
      ...overrides.general,
    },
    contact: { ...createBusinessDefaults.contact, ...overrides.contact },
    financial: { ...createBusinessDefaults.financial, ...overrides.financial },
  };
}
