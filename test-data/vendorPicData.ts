import path from "node:path";

// ریشه اصلی پروژه را پیدا می‌کند و به assets وصل می‌شود
const ASSETS_PATH = path.resolve(process.cwd(), "assets");

export const vendorMediaData = {
  logo: {
    validLogoPath: path.join(ASSETS_PATH, "logo.png"),
    invalidFormatLogoPath: path.join(ASSETS_PATH, "sample.txt"),
  },
  cover: {
    validCoverPath: path.join(ASSETS_PATH, "cover.jpg"),
    invalidFormatCoverPath: path.join(ASSETS_PATH, "sample.txt"),
  },
};
