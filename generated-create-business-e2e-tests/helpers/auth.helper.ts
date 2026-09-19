import { expect, type Page } from "@playwright/test";

export async function assertAuthenticated(page: Page): Promise<void> {
  await expect(page).not.toHaveURL(/\/(?:pwa\/)?login(?:[/?#]|$)/);
}

export async function assertLoginRedirect(page: Page): Promise<void> {
  await expect(page).toHaveURL(/\/(?:pwa\/)?login(?:[/?#]|$)/);
}
