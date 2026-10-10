// tests/vendor-create.spec.ts

import { test, expect } from "../utils/fixtures";
import { users } from "../test-data/userAdmin-data";
import { vendorCreateData } from "../test-data/createVendor-data";
import { urls } from "../test-data/url-data";

import path from "path";

test.describe("Vendor Create E2E LifeCycle & Sync Flow", () => {
  // استفاده از سشن ذخیره‌شده ادمین
  test.use({ storageState: "playwright/.auth/user.json" });
  // 0.0 Test Data Preparation
  // -------------------------------------------------------------------------
  let randomSuffix: number;
  let dynamicVendorName: string;
  let dynamicOwnerMobile: string;
  let createdBusinessId: number;
  let duplicateMobile: string;
  let logoPath: string;
  let coverPath: string;
  let invalidFilePath: string;
  const salesAgentId = 11906;

  test.beforeAll(async () => {
    // 0. Test Data Preparation
    // -------------------------------------------------------------------------
    randomSuffix = Math.floor(100000 + Math.random() * 900000);
    dynamicVendorName = `تست وندور خودکار ${randomSuffix}`;
    dynamicOwnerMobile = `0912${randomSuffix.toString().padStart(7, "0")}`;
    duplicateMobile = String(vendorCreateData.ownerMobile);

    logoPath = path.resolve(__dirname, "../assets/logo.png");
    coverPath = path.resolve(__dirname, "../assets/cover.png");
    invalidFilePath = path.resolve(__dirname, "../assets/sample.txt");
  });

  test("check user login and button visibility", async ({
    page,
    vendorCreateApi,
  }) => {
    // 1. Navigation & Dashboard Assertion
    // -------------------------------------------------------------------------
    await page.goto(urls.urlPanel);
    await expect(page).toHaveURL(urls.urlPanel);
    await page.waitForLoadState("networkidle");

    // ۱. بررسی visible بودن دکمه
    await expect(vendorCreateApi.general.getVendorsButton()).toBeVisible();

    // ۲. کلیک روی دکمه
    await vendorCreateApi.general.selectVendorsButton();

    await expect(vendorCreateApi.general.getVendorsListButton()).toBeVisible();
    await expect(vendorCreateApi.general.getVendorsListButton()).toBeEnabled();
    await expect(vendorCreateApi.general.getVendorCreateButton()).toBeVisible();
    await expect(vendorCreateApi.general.getVendorCreateButton()).toBeEnabled();
  });

  test("Vendor Create E2E LifeCycle & Sync Flow", async ({
    page,
    vendorCreateApi,
    syncFlowApi,
    authTokenAdmin,
  }) => {
    // 1. Navigation & Dashboard Assertion
    // نویگیشن به صفحه ایجاد وندور از طریق منو
    await vendorCreateApi.general.openCreateBusinessFromMenu();
    await expect(page).toHaveURL(urls.urlCreateVendor);
    await vendorCreateApi.general.expectOnCreateBusinessPage();
    // -------------------------------------------------------------------------
    // 2. Section 1: Owner Business Information (اطلاعات مالک)
    // -------------------------------------------------------------------------

    await vendorCreateApi.ownerBusiness.openOwnerSectionAndWaitUntilReady();
    await vendorCreateApi.ownerBusiness.expectOwnerSectionVisible();
    await vendorCreateApi.ownerBusiness.expectOwnerNameValue("");
    await vendorCreateApi.ownerBusiness.expectOwnerMobileValue("");

    await vendorCreateApi.ownerBusiness.fillOwnerInfoFlow({
      ownerName: vendorCreateData.ownerName,
      ownerMobile: dynamicOwnerMobile,
    });
    await vendorCreateApi.ownerBusiness.expectSourceRequiredAlertVisible();
    await vendorCreateApi.ownerBusiness.clearOwnerInfoFlow();
    await vendorCreateApi.ownerBusiness.assertRequiredErrorsForEmptyInputs();
    await vendorCreateApi.ownerBusiness.assertSourceNotSelectedError();
    await vendorCreateApi.ownerBusiness.fillDuplicateMobileAndAssert({
      ownerName: vendorCreateData.ownerName,
      duplicateMobile: duplicateMobile,
    });

    //   // -------------------------------------------------------------------------
    //   // 3. Section 2: Public Business Info (اطلاعات عمومی کسب‌وکار)
    //   // -------------------------------------------------------------------------
    //   await vendorCreateApi.publicBusinessInfo.openSectionAndWaitReadyFlow();

    //   // تست منفی: اعتبارسنجی ارورهای اجباری
    //   await vendorCreateApi.publicBusinessInfo.clearAllInputsFlow();
    //   await vendorCreateApi.general.clickSubmitVendor();
    //   await vendorCreateApi.publicBusinessInfo.assertAllRequiredAlertsFlow();

    //   // تست منفی / ولیدیشن مدیا: آپلود فایل نامعتبر برای لوگو و کاور
    await vendorCreateApi.publicBusinessInfo.uploadMediaFilesFlow({
      logoPath: invalidFilePath,
    });
    await vendorCreateApi.general.expectToastErrorVisible();

    // آپلود فایل‌های معتبر
    await vendorCreateApi.publicBusinessInfo.uploadMediaFilesFlow({
      logoPath: logoPath,
      coverPath: coverPath,
    });
    //   await vendorCreateApi.general.expectToastSuccessVisible();

    //   // تست مثبت: تکمیل اطلاعات عمومی (شامل دسته‌بندی و وضعیت POS)
    //   const posOption = randomSuffix % 2 === 0 ? "has_pos" : "no_pos";
    //   await vendorCreateApi.publicBusinessInfo.fillFullPublicInfoFlow({
    //     businessName: dynamicVendorName,
    //     categoryName: vendorCreateData.publicInfo?.category || "رستوران",
    //     menuAddress: `https://menu-${randomSuffix}.com`,
    //     posOption: posOption,
    //     description: "توضیحات تست اتومیشن به صورت جامع و ساختاریافته",
    //   });

    //   // -------------------------------------------------------------------------
    //   // 4. Section 3: Contact & Location Info (اطلاعات تماس و موقعیت مکانی)
    //   // -------------------------------------------------------------------------
    //   await vendorCreateApi.contactToBusiness.openContactToBusinessSection();

    //   // تست منفی: مختصات جغرافیایی خارج از ایران / نامعتبر
    //   await vendorCreateApi.contactToBusiness.fillLocationInputs({
    //     latitude: "51.5074", // خارج از ایران (لندن)
    //     longitude: "-0.1278",
    //   });
    //   await vendorCreateApi.contactToBusiness.expectInvalidCoordinatesAlertVisible();

    //   // ثبت موقعیت و آدرس و تلفن معتبر داخل ایران
    //   await vendorCreateApi.contactToBusiness.fillContactInfoFlow({
    //     latitude: "35.6892",
    //     longitude: "51.3890",
    //     provinceName: "تهران",
    //     cityName: "تهران",
    //     address: `تهران، خیابان تست، پلاک ${randomSuffix % 100}`,
    //     tells: [`021${Math.floor(10000000 + Math.random() * 90000000)}`],
    //   });

    //   // -------------------------------------------------------------------------
    //   // 5. Section 4: Times to Service (ساعات کاری و ارائه خدمات)
    //   // -------------------------------------------------------------------------
    //   await vendorCreateApi.timesToService.openTimesToServiceSection();
    //   await vendorCreateApi.timesToService.expectTimesToServiceHeaderVisible();

    //   // فعال‌سازی تمام روزها و تنظیم ساعت کاری پیش‌فرض
    //   await vendorCreateApi.timesToService.checkAllDaysSwitch();
    //   await vendorCreateApi.timesToService.setStartTime("شنبه", "09", "00");
    //   await vendorCreateApi.timesToService.setEndTime("شنبه", "22", "00");

    //   await vendorCreateApi.timesToService.expectDayStartTimeValue(
    //     "شنبه",
    //     "09:00",
    //   );
    //   await vendorCreateApi.timesToService.expectDayEndTimeValue("شنبه", "22:00");

    //   // -------------------------------------------------------------------------
    //   // 6. Section 5: Financial Information (اطلاعات مالی و حقوقی)
    //   // -------------------------------------------------------------------------
    //   await vendorCreateApi.financialInformation.openFinancialInformationSection();

    //   // تست منفی: کد ملی نامعتبر / فرمت غلط
    //   await vendorCreateApi.financialInformation.fillNationalCode("12345");
    //   await vendorCreateApi.financialInformation.expectInvalidNationalCodeAlertVisible();

    //   // تکمیل اطلاعات مالی معتبر
    //   await vendorCreateApi.financialInformation.fillFinancialInformationFlow({
    //     nationalCode: "0012345678", // کد ملی معتبر تستی
    //     shebaNumber: "IR120120000000001234567890",
    //     accountOwnerName: `مالک ${randomSuffix}`,
    //   });

    //   // -------------------------------------------------------------------------
    //   // 7. Vendor Creation Submission
    //   // -------------------------------------------------------------------------
    //   // شنود ریسپانس ساخت بیزینس برای دریافت ID ایجاد شده
    //   const createVendorResponsePromise = page.waitForResponse(
    //     (response) =>
    //       response.url().includes("/business") &&
    //       response.request().method() === "POST" &&
    //       response.status() === 201,
    //   );

    //   await vendorCreateApi.general.clickSubmitVendor();

    //   const createVendorResponse = await createVendorResponsePromise;
    //   const responseJson = await createVendorResponse.json();
    //   const createdBusinessId: number =
    //     responseJson.data?.id || responseJson.id || responseJson.business_id;

    //   expect(createdBusinessId).toBeDefined();
    //   await vendorCreateApi.general.expectToastSuccessVisible();

    //   // -------------------------------------------------------------------------
    //   // 8. API SyncFlow Execution (چرخه ۶ مرحله‌ای سینک)
    //   // -------------------------------------------------------------------------

    //   // اجرای ارکستریتور ۶ مرحله‌ای سینک با ایجنت ۱۱۹۰۶
    //   const syncFlowResult = await syncFlowApi.executeFullSyncFlow({
    //     token: authTokenAdmin,
    //     businessId: createdBusinessId,
    //     salesAgentId: salesAgentId,
    //   });

    //   expect(syncFlowResult.syncSuccess).toBeTruthy();

    //   // -------------------------------------------------------------------------
    //   // 9. Post-Sync Verification (تایید سینک با بررسی v3_id پس از وقفه ۵ تا ۱۰ ثانیه‌ای)
    //   // -------------------------------------------------------------------------
    //   // تأخیر بین ۵ الی ۱۰ ثانیه برای پردازش صف و پایگاه داده در بک‌اند
    //   await page.waitForTimeout(7000);

    //   const searchResponse = await syncFlowApi.businessSearch.searchBusiness(
    //     authTokenAdmin,
    //     dynamicVendorName,
    //   );
    //   const searchData = await searchResponse.json();

    //   const syncedBusiness = searchData.data?.find(
    //     (b: any) => b.id === createdBusinessId || b.name === dynamicVendorName,
    //   );

    //   expect(syncedBusiness).toBeDefined();
    //   // بررسی وجود v3_id در آبجکت بعد از اتمام سینک
    //   expect(syncedBusiness.v3_id).toBeTruthy();
  });
});
//بدون صندوق با دسته بندی دیگه و اینکه از نقشه انتخاب بشه کاور هم نداشته باشه و لوگو
