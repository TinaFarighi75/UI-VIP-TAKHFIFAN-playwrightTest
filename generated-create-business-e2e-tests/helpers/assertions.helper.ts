import { expect, type Locator, type Page } from "@playwright/test";

export async function expectValidationMessage(
  page: Page,
  message: string | RegExp,
): Promise<void> {
  await expect(page.getByText(message).first()).toBeVisible();
}

export async function expectEnabledFields(
  fields: readonly Locator[],
): Promise<void> {
  for (const field of fields) {
    await expect(field).toBeVisible();
    await expect(field).toBeEnabled();
  }
}

export async function expectCurrentPath(
  page: Page,
  path: string,
): Promise<void> {
  await expect(page).toHaveURL(new RegExp(`${escapeRegExp(path)}(?:[?#].*)?$`));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
