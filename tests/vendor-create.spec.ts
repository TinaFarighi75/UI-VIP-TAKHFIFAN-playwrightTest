// tests/vendor-create.spec.ts

import { test, expect } from "../utils/fixtures";
import { users } from "../test-data/userAdmin-data";
import { vendorCreateData } from "../test-data/createVendor-data";
import { urls } from "../test-data/url-data";
import path from "path";
import { asyncWrapProviders } from "async_hooks";

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
    // افزایش تایم‌اوت ناوبری به ۶۰ ثانیه به همراه حالت domcontentloaded
    await page.goto(urls.urlPanel, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // اطمینان از این‌که آدرس URL درست است
    await expect(page).toHaveURL(urls.urlPanel, { timeout: 30000 });

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

  test("TC02: Vendor Create E2E LifeCycle & Sync Flow with has pos and pic for logo and cover @vendorCreate @smoke @regretion", async ({
    page,
    vendorCreateApi,
    syncFlowApi,
    authTokenAdmin,
  }) => {
    // نویگیشن به صفحه ایجاد وندور از طریق منو (حالا چون در پنل هستیم به‌درستی کار می‌کند)
    await vendorCreateApi.general.openCreateBusinessFromMenu();
    await expect(page).toHaveURL(urls.urlCreateVendor, { timeout: 30000 });
    await vendorCreateApi.general.expectOnCreateBusinessPage();

    // -------------------------------------------------------------------------
    // 2. Section 1: Owner Business Information (اطلاعات مالک)
    // -------------------------------------------------------------------------
    // await vendorCreateApi.ownerBusiness.openOwnerSectionAndWaitUntilReady(); // باز و بست کردن سکشن
    await vendorCreateApi.ownerBusiness.expectOwnerSectionVisible(); // بررسی قابل مشاهده بودن سکشن
    await vendorCreateApi.ownerBusiness.expectOwnerNameValue(""); // بررسی خالی بودن نام
    await vendorCreateApi.ownerBusiness.expectOwnerMobileValue(""); // بررسی خالی بودن موبایل

    await vendorCreateApi.ownerBusiness.fillOwnerInfoFlow({
      ownerName: vendorCreateData.ownerName,
      ownerMobile: dynamicOwnerMobile,
    }); // فقط پر کردن نام و موبایل بدون انتخاب منبع
    await vendorCreateApi.ownerBusiness.expectSourceRequiredAlertVisible(); // بررسی نمایش alert برای عدم انتخاب منبع
    await vendorCreateApi.ownerBusiness.clearOwnerInfoFlow(); // پاک کردن نام و موبایل
    await vendorCreateApi.ownerBusiness.assertRequiredErrorsForEmptyInputs(); // بررسی نمایش خطا در اینپوت‌های خالی
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
    ).toBeVisible(); // نمایش وندوری که با این شماره وجود دارد
    await vendorCreateApi.ownerBusiness.clearOwnerInfoFlow(); // پاک کردن نام و موبایل
    await vendorCreateApi.ownerBusiness.assertRequiredErrorsForEmptyInputs(); // بررسی نمایش خطا در اینپوت‌های خالی
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

    // -------------------------------------------------------------------------
    // 3. Section 2: Public Business Information (اطلاعات عمومی کسب و کار)
    // -------------------------------------------------------------------------

    // await vendorCreateApi.publicBusinessInfo.openSectionAndWaitReadyFlow(); // باز و بست کردن سکشن
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
    ).toBeVisible(); // بررسی حالتی که هنوز هیچ صندوقی انتخاب نشده
    await vendorCreateApi.publicBusinessInfo.selectPOSsystemDropDownOption(
      vendorCreateData.businessMarketPlaceName[0],
    );
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoPOSsystemDropDownEmptyAlert(),
    ).toBeHidden(); // بعد از انتخاب ارورش باید بره

    await vendorCreateApi.publicBusinessInfo.assertAllRequiredAlertsHiddenFlow(); // بررسی اینکه هیچ خطایی دیده نشود بعد از پر کردن همه فیلد ها
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoLogo(),
    ).toBeVisible();
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoLogoButton(),
    ).toBeVisible();
    // بارگذاری لوگو
    // await vendorCreateApi.publicBusinessInfo.uploadLogo(invalidFilePath);// باگ دارن الان کار نمیکنه اگر بزارم دیگه نمیاره

    // ۲. تست مثبت: آپلود فایل معتبر
    await vendorCreateApi.publicBusinessInfo.uploadLogo(logoPath);
    // 👈 کلیک روی دکمه «ذخیره» مودال کراپ برای شروع آپلود واقعی
    await vendorCreateApi.general.saveLogoFromDialog();
    await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // // ۳. حذف لوگو
    // await vendorCreateApi.general.deleteLogo();

    // // ۴. آپلود مجدد فایل معتبر
    // await vendorCreateApi.publicBusinessInfo.uploadLogo(logoPath);
    // await vendorCreateApi.general.saveLogoFromDialog();
    // await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // بارگذاری کاور
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoCover(),
    ).toBeVisible();
    await expect(
      vendorCreateApi.publicBusinessInfo.getPublicBusinessInfoCoverButton(),
    ).toBeVisible();
    // await vendorCreateApi.publicBusinessInfo.uploadCover(invalidFilePath);

    // ۲. تست مثبت: آپلود فایل معتبر
    await vendorCreateApi.publicBusinessInfo.uploadCover(coverPath);
    // 👈 کلیک روی دکمه «ذخیره» مودال کراپ برای شروع آپلود واقعی
    await vendorCreateApi.general.saveCoverFromDialog();
    await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // // ۳. حذف لوگو
    // await vendorCreateApi.general.deleteCover();

    // // ۴. آپلود مجدد فایل معتبر
    // await vendorCreateApi.publicBusinessInfo.uploadCover(coverPath);
    // await vendorCreateApi.general.saveCoverFromDialog();
    // await vendorCreateApi.general.expectUploadSuccessToastVisible();

    // -------------------------------------------------------------------------
    // 4. Section 3: Contact to Business Information (اطلاعات تماس کسب و کار)
    // -------------------------------------------------------------------------

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
    await vendorCreateApi.contactToBusiness.clickMapButton();
    await vendorCreateApi.contactToBusiness.clickOnMap();
    await page.waitForTimeout(10000);
    await expect(
      vendorCreateApi.contactToBusiness.getVendorCreateContactToBusinessLongitude(),
    ).not.toHaveValue("");
    await expect(
      vendorCreateApi.contactToBusiness.getVendorCreateContactToBusinessLatitude(),
    ).not.toHaveValue("");
    await expect(
      vendorCreateApi.contactToBusiness.getVendorCreateContactToBusinessProvince(),
    ).not.toHaveText("انتخاب استان");
    await expect(
      vendorCreateApi.contactToBusiness.getVendorCreateContactToBusinessAddress(),
    ).not.toHaveValue("");
    // اگر به خود باکس دراپ‌داون اشاره دارد:
    await expect(
      vendorCreateApi.contactToBusiness.getVendorCreateContactToBusinessNeighborhood(),
    ).not.toContainText("انتخاب محله");

    await expect(
      vendorCreateApi.contactToBusiness.getVendorCreateContactToBusinessRegion(),
    ).not.toContainText("انتخاب منطقه");

    await vendorCreateApi.contactToBusiness.expectInvalidLatitudeAlertHidden();
    await vendorCreateApi.contactToBusiness.expectInvalidLongitudeAlertHidden();

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

    // // -------------------------------------------------------------------------
    // // 5. Section 4: Times to Service Business Information (روزها و ساعت‌های سرویس‌دهی)
    // // -------------------------------------------------------------------------

    // // ۱. باز کردن سکشن روزها و ساعات سرویس‌دهی در صورتی که بسته باشد
    await vendorCreateApi.timesToService.clickTimesToServiceHeader();
    await vendorCreateApi.timesToService.expectTimesToServiceHeaderVisible();

    // // ۲. فعال کردن روز شنبه
    const saturday = vendorCreateData.day[1]; // "شنبه"
    await vendorCreateApi.timesToService.checkDaySwitch(saturday);
    await vendorCreateApi.timesToService.expectDaySwitchToBeChecked(saturday);

    // // ۳. فعال کردن روز سه‌شنبه
    const tuesday = vendorCreateData.day[4]; // "سه شنبه"
    await vendorCreateApi.timesToService.checkDaySwitch(tuesday);
    await vendorCreateApi.timesToService.expectDaySwitchToBeChecked(tuesday);

    // // ۴. فعال کردن روز جمعه
    const friday = vendorCreateData.day[7]; // "جمعه"
    await vendorCreateApi.timesToService.checkDaySwitch(friday);
    await vendorCreateApi.timesToService.expectDaySwitchToBeChecked(friday);

    // // ۵. تنظیم ساعت شروع جمعه: ۱۱:۳۰ صبح
    await vendorCreateApi.timesToService.setStartTime(friday, "11", "30");

    // // ۶. تنظیم ساعت پایان جمعه: ۲۳:۳۰ شب
    await vendorCreateApi.timesToService.setEndTime(friday, "23", "30");

    // // ۷. بررسی و Asserts مقادیر ست شده روی اینپوت‌های جمعه
    await vendorCreateApi.timesToService.expectDayStartTimeValue(
      friday,
      "11:30",
    );
    await vendorCreateApi.timesToService.expectDayEndTimeValue(friday, "23:30");

    // // -------------------------------------------------------------------------
    // // 6. Section 5: Finance Business Information (اطلاعات مالی)
    // // -------------------------------------------------------------------------

    // // باز کردن سکشن اطلاعات مالی و اطمینان از لود کامل
    await vendorCreateApi.financialInformation.waitForFinancialInformationHeaderVisible();
    await vendorCreateApi.financialInformation.ensureSectionOpen();

    // // بررسی نمایش و فعال بودن فیلدهای شبا، شماره حساب و دکمه استعلام
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationShebaInput(),
    ).toBeVisible();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationShebaInput(),
    ).toBeEnabled();

    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationBankAccountInput(),
    ).toBeVisible();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationBankAccountInput(),
    ).toBeEnabled();

    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationShebaInquiryButton(),
    ).toBeVisible();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationShebaInquiryButton(),
    ).toBeEnabled();

    // // =========================================================================
    // // سناریو ۱: نوع کسب و کار حقوقی (Legal)
    // // =========================================================================
    await vendorCreateApi.financialInformation.selectBusinessType("legal");

    // تریگر خطاهای الزامی بودن فیلدها با روش مطمئن React Hook Form
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationGivenNameInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationSurnameInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationEconomicCodeInput(),
    );

    // // ارورهای الزامی بودن فیلدها باید نمایش داده شوند
    await vendorCreateApi.financialInformation.expectNationalIdRequiredAlertVisible();
    await vendorCreateApi.financialInformation.expectGivenNameRequiredAlertVisible();
    await vendorCreateApi.financialInformation.expectSurnameRequiredAlertVisible();
    await vendorCreateApi.financialInformation.expectEconomicCodeRequiredAlertVisible();

    // // شناسه ملی ۲ رقمی -> نمایش ارور ۱۱ رقمی بودن
    await vendorCreateApi.financialInformation.fillNationalId("12");
    await vendorCreateApi.financialInformation.expectNationalIdLegalInvalidAlertForLegalVisible();

    // // نام و نام خانوادگی را وارد کن -> ارورها نباید نمایش داده شوند
    await vendorCreateApi.financialInformation.fillGivenName(
      vendorCreateData.ownerName,
    );
    await vendorCreateApi.financialInformation.fillSurname(
      vendorCreateData.ownerFamily,
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationGivenNameRequiredAlert(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationSurnameRequiredAlert(),
    ).toBeHidden();

    // // شناسه ملی معتبر از فایل دیتا -> ارورها مخفی شوند
    await vendorCreateApi.financialInformation.fillNationalId(
      vendorCreateData.legalnationalID,
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdLegalInvalidAlert(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdRequiredAlert(),
    ).toBeHidden();

    // // کد اقتصادی از فایل دیتا -> ارور مخفی شود
    await vendorCreateApi.financialInformation.fillEconomicCode(
      vendorCreateData.EconomicCode,
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationEconomicCodeRequiredAlert(),
    ).toBeHidden();

    // // =========================================================================
    // // سناریو ۲: نوع کسب و کار اتباع خارجی (Foreign)
    // // =========================================================================
    await vendorCreateApi.financialInformation.selectBusinessType("foreign");

    // // تریگر مجدد ارورهای الزامی اتباع
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationFidaCodeInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationGivenNameInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationSurnameInput(),
    );

    // // ارورهای الزامی اتباع
    await vendorCreateApi.financialInformation.expectGivenNameRequiredAlertVisible();
    await vendorCreateApi.financialInformation.expectSurnameRequiredAlertVisible();

    // // کد فراگیر ۱۱ رقمی -> نمایش ارور ۱۲ رقمی
    await vendorCreateApi.financialInformation.fillFidaCode("12345678901");
    await vendorCreateApi.financialInformation.expectFidaCodeInvalidAlertVisible();

    // // کد فراگیر صحیح از فایل دیتا (۱۲ رقمی) -> ارور مخفی شود
    await vendorCreateApi.financialInformation.fillFidaCode(
      vendorCreateData.foreignNationalCode,
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationFidaCodeInvalidAlert(),
    ).toBeHidden();

    // // نام و نام خانوادگی را وارد کن -> ارورها مخفی شوند
    await vendorCreateApi.financialInformation.fillGivenName(
      vendorCreateData.ownerName,
    );
    await vendorCreateApi.financialInformation.fillSurname(
      vendorCreateData.ownerFamily,
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationGivenNameRequiredAlert(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationSurnameRequiredAlert(),
    ).toBeHidden();

    // // =========================================================================
    // // سناریو ۳: نوع کسب و کار حقیقی (Real)
    // // =========================================================================
    await vendorCreateApi.financialInformation.selectBusinessType("real");

    // // تریگر ارورهای الزامی حقیقی
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationGivenNameInput(),
    );
    await vendorCreateApi.financialInformation.triggerRequiredValidation(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationSurnameInput(),
    );

    // // ارورهای الزامی بودن فیلدها
    await vendorCreateApi.financialInformation.expectNationalIdRequiredAlertVisible();
    await vendorCreateApi.financialInformation.expectGivenNameRequiredAlertVisible();
    await vendorCreateApi.financialInformation.expectSurnameRequiredAlertVisible();

    // // کد ملی دوم (نامعتبر) -> نمایش ارور "کدملی نامعتبر است"
    await vendorCreateApi.financialInformation.fillNationalId(
      vendorCreateData.nationalID[1],
    );
    await vendorCreateApi.financialInformation.expectNationalIdInvalidFormatAlertVisible();

    // // کد ملی اول (معتبر) -> ارورها مخفی شوند
    await vendorCreateApi.financialInformation.fillNationalId(
      vendorCreateData.nationalID[0],
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdInvalidFormatAlert(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdRealInvalidAlert(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationNationalIdRequiredAlert(),
    ).toBeHidden();

    // // وارد کردن نام و نام خانوادگی -> هیچ اروری نباید باقی بماند
    await vendorCreateApi.financialInformation.fillGivenName(
      vendorCreateData.ownerName,
    );
    await vendorCreateApi.financialInformation.fillSurname(
      vendorCreateData.ownerFamily,
    );
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationGivenNameRequiredAlert(),
    ).toBeHidden();
    await expect(
      vendorCreateApi.financialInformation.getVendorCreateFinancialInformationSurnameRequiredAlert(),
    ).toBeHidden();

    // // -------------------------------------------------------------------------
    // // 7. Section 6: click on submit Button (ثبت وندور)
    // // -------------------------------------------------------------------------
    console.log(await page.locator("button.btn-submit").count());
    console.log(await page.locator("button.btn-submit").isEnabled());

    await vendorCreateApi.general.submit();
    await vendorCreateApi.general.submit();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(urls.urlListOfVendor, { timeout: 30000 });

    // -------------------------------------------------------------------------
    // 8. Section 7: sync Business Flow (سینک کسب و کار و بررسی آیدی‌ها)
    // -------------------------------------------------------------------------
    // مطمئن شوید بعد از کلیک روی ثبت نهایی، صفحه به حالت پایدار رسیده است:
    await page.waitForLoadState("networkidle");

    const syncResult = await syncFlowApi.executeFullSyncFlow(
      authTokenAdmin,
      dynamicVendorName,
      salesAgentId,
    );

    // // چاپ خروجی در لاگ تست
    console.log(`✅ Business ID: ${syncResult.businessId}`);
    console.log(`✅ V3 ID: ${syncResult.v3Id}`);

    // // ۱. اطمینان از وجود و پر بودن Business ID
    expect(syncResult.businessId).toBeTruthy();

    // // ۲. اطمینان از اینکه v3_id نال یا خالی نیست و ثبت شده است
    expect(syncResult.v3Id).not.toBeNull();
    expect(syncResult.v3Id).toBeDefined();
  });
});
