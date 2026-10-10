// tests/vendor-create.spec.ts

import { test, expect } from "../utils/fixtures";
import { users } from "../test-data/userAdmin-data";
import { vendorCreateData } from "../test-data/createVendor-data";
import { urls } from "../test-data/url-data";
import path from "path";

test.describe("Vendor Create E2E LifeCycle & Sync Flow", () => {
  // استفاده از سشن ذخیره‌شده ادمین
  test.use({ storageState: "playwright/.auth/user.json" });

  // ⏱️ افزایش تایم‌اوت کل تست برای جلوگیری از تایم‌اوت ۳۰ ثانیه‌ای استیجینگ در beforeEach
  test.setTimeout(90000);

  // -------------------------------------------------------------------------
  // 0.0 Test Data Variables
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
    randomSuffix = Math.floor(100000 + Math.random() * 900000);
    dynamicVendorName = `تست وندور خودکار ${randomSuffix}`;
    dynamicOwnerMobile = `0912${randomSuffix.toString().padStart(7, "0")}`;
    duplicateMobile = String(vendorCreateData.ownerMobile);

    logoPath = path.resolve(__dirname, "../assets/logo.png");
    coverPath = path.resolve(__dirname, "../assets/cover.png");
    invalidFilePath = path.resolve(__dirname, "../assets/sample.txt");
  });

  // ✅ این هوک باعث می‌شود هر دو تست قبل از اجرا وارد پنل شوند

  test.beforeEach(async ({ page, vendorCreateApi }) => {
    // افزایش تایم‌اوت ناوبری به ۶۰ ثانیه به همراه حالت commit یا domcontentloaded
    await page.goto(urls.urlPanel, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // اطمینان از این‌که آدرس URL درست است
    await expect(page).toHaveURL(urls.urlPanel, { timeout: 15000 });

    // به جای networkidle، منتظر لود شدن منوی اصلی یا دکمه وندورها بمانید
    await vendorCreateApi.general.getVendorsButton().waitFor({
      state: "visible",
      timeout: 30000,
    });
  });

  test("TC01: check user login and button visibility", async ({
    vendorCreateApi,
  }) => {
    // ۱. بررسی visible بودن دکمه
    await expect(vendorCreateApi.general.getVendorsButton()).toBeVisible();

    // ۲. کلیک روی دکمه و باز شدن زیرمنو
    await vendorCreateApi.general.selectVendorsButton();

    await expect(vendorCreateApi.general.getVendorsListButton()).toBeVisible();
    await expect(vendorCreateApi.general.getVendorsListButton()).toBeEnabled();
    await expect(vendorCreateApi.general.getVendorCreateButton()).toBeVisible();
    await expect(vendorCreateApi.general.getVendorCreateButton()).toBeEnabled();
  });

  test("TC02: Vendor Create E2E LifeCycle & Sync Flow with has pos and pic for logo and cover", async ({
    page,
    vendorCreateApi,
    syncFlowApi,
    authTokenAdmin,
  }) => {
    // نویگیشن به صفحه ایجاد وندور از طریق منو (حالا چون در پنل هستیم به‌درستی کار می‌کند)
    await vendorCreateApi.general.openCreateBusinessFromMenu();
    await expect(page).toHaveURL(urls.urlCreateVendor);
    await vendorCreateApi.general.expectOnCreateBusinessPage();

    // -------------------------------------------------------------------------
    // 2. Section 1: Owner Business Information (اطلاعات مالک)
    // -------------------------------------------------------------------------
    await vendorCreateApi.ownerBusiness.openOwnerSectionAndWaitUntilReady(); // باز و بست کردن سکشن
    await vendorCreateApi.ownerBusiness.expectOwnerSectionVisible(); // بررسی قابل مشاهده بودن سکشن
    await vendorCreateApi.ownerBusiness.expectOwnerNameValue(""); // بررسی خالی بودن نام
    await vendorCreateApi.ownerBusiness.expectOwnerMobileValue(""); // بررسی خالی بودن موبایل

    await vendorCreateApi.ownerBusiness.fillOwnerInfoFlow({
      ownerName: vendorCreateData.ownerName,
      ownerMobile: dynamicOwnerMobile,
    }); // فقط پر کردن نام و موبایل بدون انتخاب منبع
    await vendorCreateApi.ownerBusiness.expectSourceRequiredAlertVisible(); //بررسی نمایش alert برای عدم انتخاب منبع
    await vendorCreateApi.ownerBusiness.clearOwnerInfoFlow(); //پاک کردن نام و موبایل
    await vendorCreateApi.ownerBusiness.assertRequiredErrorsForEmptyInputs(); // بررسی نمایش خظا در اینپوت پاک های خالی
    await vendorCreateApi.ownerBusiness.assertSourceNotSelectedError(); // بررسی نمایش خطا برای عدم انتخاب منبع
    await vendorCreateApi.ownerBusiness.fillDuplicateMobileAndAssert({
      ownerName: vendorCreateData.ownerName,
      duplicateMobile: duplicateMobile,
    }); // پر کردن موبایل تکراری و بررسی نمایش alert
    await vendorCreateApi.ownerBusiness.expectDuplicateMobileAlertVisible(); // بررسی نمایش alert برای موبایل تکراری
    await expect(
      vendorCreateApi.ownerBusiness.getVendorAvailableVendor(
        vendorCreateData.businessName[0],
      ),
    ).toBeVisible(); //نمایش وندوری که با این شماره وجود  داره
    await vendorCreateApi.ownerBusiness.clearOwnerInfoFlow(); // پاک کردن نام و موبایل
    await vendorCreateApi.ownerBusiness.assertRequiredErrorsForEmptyInputs(); // بررسی نمایش خظا در اینپوت پاک های خالی
    await vendorCreateApi.ownerBusiness.assertSourceNotSelectedError(); // بررسی نمایش خطا برای عدم انتخاب منبع

    // پر کردن نام و موبایل و انتخاب منبع
    await vendorCreateApi.ownerBusiness.fillOwnerInfoAndSelectSourceFlow({
      ownerName: vendorCreateData.ownerName,
      ownerMobile: dynamicOwnerMobile,
    });
    await vendorCreateApi.ownerBusiness.expectOwnerNameValue(
      vendorCreateData.ownerName,
    );
    await vendorCreateApi.ownerBusiness.expectOwnerMobileValue(
      dynamicOwnerMobile,
    );
    await expect(
      vendorCreateApi.ownerBusiness.getVendorOwnerMobileAlertDuplicate(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.ownerBusiness.getVendorBusinessOwnerInfoAlertWithoutSelectSource(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.ownerBusiness.getVendorAlertRequiredOwnerName(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.ownerBusiness.getVendorAlertRequiredOwnerMobile(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.ownerBusiness.getVendorOwnerMobileAlertDuplicate(),
    ).toBeHidden();

    // -------------------------------------------------------------------------
    // 3. Section 2: Public Business Information (اطلاعات عمومی کسب و کار)
    // -------------------------------------------------------------------------

    await vendorCreateApi.publicBusinessInfo.openSectionAndWaitReadyFlow(); // باز و بست کردن سکشن
    await vendorCreateApi.publicBusinessInfo.expectHeaderVisible(); // بررسی قابل مشاهده بودن سکشن
    await vendorCreateApi.publicBusinessInfo.expectBusinessNameValue(""); // بررسی خالی بودن نام کسب و کار
    await vendorCreateApi.publicBusinessInfo.expectMenuAddressValue(""); // بررسی خالی بودن آدرس منو
    await vendorCreateApi.publicBusinessInfo.expectDescriptionValue(""); // بررسی خالی بودن توضیحات

    await vendorCreateApi.publicBusinessInfo.fillBasicInfoFlow({
      businessName: vendorCreateData.businessName[0],
      categoryName: "",
      menuAddress: "",
      description: vendorCreateData.businessDescription[0],
    }); // پر کردن اطلاعات با نام موجود

    await vendorCreateApi.publicBusinessInfo.expectExistingBusinessLinkVisible(
      vendorCreateData.businessName[0],
    ); // بررسی نمایش لینک کسب و کار موجود
    await vendorCreateApi.publicBusinessInfo.clearAllInputsFlow(); // پاک کردن تمام اینپوت‌ها
    await vendorCreateApi.publicBusinessInfo.assertAllRequiredAlertsFlow(); // بررسی نمایش alert برای تمام اینپوت‌های اجباری

    await vendorCreateApi.publicBusinessInfo.fillFullPublicInfoFlow({
      businessName: dynamicVendorName,
      categoryName: vendorCreateData.businessCategory[0],
      menuAddress: "",
      posOption: vendorCreateData.businessMarketPlace[1], // "دارد"
      description: vendorCreateData.businessDescription[0],
    }); // پر کردن دیتا برای حالتی که صندوق داشته باشد
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoPOSsystemDropDownEmptyAlert(),
    ).toBeVisible(); // بررسی حالتی که هنوز هیج صندوقی انتخاب نشده
    await vendorCreateApi.publicBusinessInfo.selectPOSsystemDropDownOption(
      vendorCreateData.businessMarketPlaceName[0],
    );
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoPOSsystemDropDownEmptyAlert(),
    ).toBeHidden(); //بعد از انتخاب ارورش باید بره

    await vendorCreateApi.publicBusinessInfo.assertAllRequiredAlertsHiddenFlow(); // بررسی اینکه هیچ خطایی دیده نشود بعد از پر کردن همه فیلد ها
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoLogo(),
    ).toBeVisible();
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoLogo(),
    ).toBeVisible();
    // بارگذاری لوگو
    await vendorCreateApi.publicBusinessInfo.uploadLogo(invalidFilePath);

    // ۲. تست مثبت: آپلود فایل معتبر
    await vendorCreateApi.publicBusinessInfo.uploadLogo(logoPath);
    // 👈 کلیک روی دکمه «ذخیره» مودال کراپ برای شروع آپلود واقعی
    await vendorCreateApi.general.saveLogoFromDialog();
    await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // ۳. حذف لوگو
    await vendorCreateApi.general.deleteLogo();
    // در صورت نیاز به بررسی محو شدن تصویر:
    // await vendorCreateApi.publicBusinessInfo.expectLogoDeleted();

    // ۴. آپلود مجدد فایل معتبر
    await vendorCreateApi.publicBusinessInfo.uploadLogo(logoPath);
    await vendorCreateApi.general.saveLogoFromDialog();
    await vendorCreateApi.general.expectUploadSuccessToastVisible();
    // بارگذاری کاور

    // await expect(
    //   vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoCover(),
    // ).toBeVisible();
    // await expect(
    //   vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoCoverButton(),
    // ).toBeVisible();
    // await vendorCreateApi.publicBusinessInfo.uploadCover(invalidFilePath);

    // // ۲. تست مثبت: آپلود فایل معتبر
    // await vendorCreateApi.publicBusinessInfo.uploadCover(coverPath);
    // // 👈 کلیک روی دکمه «ذخیره» مودال کراپ برای شروع آپلود واقعی
    // await vendorCreateApi.general.saveCoverFromDialog();
    // await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // // ۳. حذف لوگو
    // await vendorCreateApi.general.deleteCover();

    // // ۴. آپلود مجدد فایل معتبر
    // await vendorCreateApi.publicBusinessInfo.uploadCover(coverPath);
    // await vendorCreateApi.general.saveCoverFromDialog();
    // await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // -------------------------------------------------------------------------
    // 4. Section 3: Contact to Business Information ( اطلاعات تماس کسب و کار)
    // -------------------------------------------------------------------------

    await vendorCreateApi.contactToBusiness.openSectionAndWaitReadyFlow();

    await vendorCreateApi.contactToBusiness.fillLatitude(
      vendorCreateData.Latitude[0],
    );
    await vendorCreateApi.contactToBusiness.fillLongitude(
      vendorCreateData.Longitude[0],
    );
    await vendorCreateApi.contactToBusiness.clearLatitude();
    await vendorCreateApi.contactToBusiness.clearLongitude();
    await vendorCreateApi.contactToBusiness.expectInvalidLatitudeAlertVisible();
    await vendorCreateApi.contactToBusiness.expectInvalidLongitudeAlertVisible();
    await vendorCreateApi.contactToBusiness.expectEmptyTellAlertVisible();
    await vendorCreateApi.contactToBusiness.expectRequiredAddressAlertVisible();
    await vendorCreateApi.contactToBusiness.fillLatitude(
      vendorCreateData.Latitude[0],
    );
    await vendorCreateApi.contactToBusiness.fillLongitude(
      vendorCreateData.Longitude[0],
    );
    await vendorCreateApi.contactToBusiness.expectInvalidLatitudeAlertHidden();
    await vendorCreateApi.contactToBusiness.expectInvalidLongitudeAlertHidden();
    await vendorCreateApi.contactToBusiness.fillAddress(
      vendorCreateData.address[0],
    );
    await vendorCreateApi.contactToBusiness.expectRequiredAddressAlertHidden();
    await vendorCreateApi.contactToBusiness.fillAndAddTell(
      vendorCreateData.tell[1],
    );
    await vendorCreateApi.contactToBusiness.expectInvalidTellAlertVisible();
    await vendorCreateApi.contactToBusiness.deleteAllTells();
    await vendorCreateApi.contactToBusiness.expectInvalidTellAlertHidden();

    await vendorCreateApi.contactToBusiness.fillAndAddTell(
      vendorCreateData.tell[0],
    );

    await vendorCreateApi.contactToBusiness.selectProvince(
      vendorCreateData.province[0],
    );
    await vendorCreateApi.contactToBusiness.selectCity(
      vendorCreateData.city[0],
    );
    await vendorCreateApi.contactToBusiness.selectNeighborhood(
      vendorCreateData.Neighborhood[0],
    );
    await vendorCreateApi.contactToBusiness.selectRegion(
      vendorCreateData.Region[0],
    );
    // -------------------------------------------------------------------------
    // 5. Section 4: Times to Service Business Information (روز ها و ساعت های سرویس دهی)
    // -------------------------------------------------------------------------

    // ۱. باز کردن سکشن روزها و ساعات سرویس‌دهی در صورتی که بسته باشد
    await vendorCreateApi.timesToService.clickTimesToServiceHeader();
    await vendorCreateApi.timesToService.expectTimesToServiceHeaderVisible();

    // ۲. فعال کردن روز شنبه
    const saturday = vendorCreateData.day[1]; // "شنبه"
    await vendorCreateApi.timesToService.checkDaySwitch(saturday);
    await vendorCreateApi.timesToService.expectDaySwitchToBeChecked(saturday);

    // ۳. فعال کردن روز سه‌شنبه
    const tuesday = vendorCreateData.day[4]; // "سه شنبه"
    await vendorCreateApi.timesToService.checkDaySwitch(tuesday);
    await vendorCreateApi.timesToService.expectDaySwitchToBeChecked(tuesday);

    // ۴. فعال کردن روز جمعه
    const friday = vendorCreateData.day[7]; // "جمعه"
    await vendorCreateApi.timesToService.checkDaySwitch(friday);
    await vendorCreateApi.timesToService.expectDaySwitchToBeChecked(friday);

    // ۵. تنظیم ساعت شروع جمعه: ۱۱:۰۰ صبح
    // متد setStartTime(dayName, hour, minute)
    await vendorCreateApi.timesToService.setStartTime(friday, "11", "00");

    // ۶. تنظیم ساعت پایان جمعه: ۲۴:۰۰ شب (یا 23:59 / 00 بسته به بیزنس استیجینگ)
    await vendorCreateApi.timesToService.setEndTime(friday, "24", "00");

    // ۷. بررسی و Asserts مقادیر ست شده روی اینپوت‌های جمعه
    await vendorCreateApi.timesToService.expectDayStartTimeValue(
      friday,
      "11:00",
    );
    await vendorCreateApi.timesToService.expectDayEndTimeValue(friday, "24:00");

    // -------------------------------------------------------------------------
    // 6. Section 5: Finance Business Information (اطلاعات مالی)
    // -------------------------------------------------------------------------
  });
});
