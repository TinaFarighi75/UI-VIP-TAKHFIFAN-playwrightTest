import type { Locator } from "@playwright/test";

export class FileUploadComponent {
  private readonly input: Locator;

  constructor(root: Locator) {
    this.input = root.locator('input[type="file"]');
  }

  async upload(filePath: string): Promise<void> {
    await this.input.setInputFiles(filePath);
  }

  async clear(): Promise<void> {
    await this.input.setInputFiles([]);
  }
}
