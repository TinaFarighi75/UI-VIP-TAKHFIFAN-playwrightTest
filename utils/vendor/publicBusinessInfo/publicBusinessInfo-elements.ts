import type { Page } from '@playwright/test';

import type { PuplicBusinessInfoElements } from './publicBusinessInfo-types';

export const createPublicBusinessInfoElements = (page: Page): PuplicBusinessInfoElements => ({
vendorCreatePublicBusinessInfoHeader: page.getByRole('heading', { name: '۲. اطلاعات عمومی کسب و کار' }),
vendorCreatePublicBusinessInfoOpenSection: page.locator('#section2 > .simple-icon-arrow-down'),
vendorCreatePublicBusinessInfoName:page.getByRole('textbox', { name: '* نام کسب و کار' }),
vendorCreatePublicBusinessInfoSelectCategory:page.locator('#category > .css-yk16xz-control > .css-1hwfws3'),
vendorCreatePublicBusinessInfoSelectOptionOfCategory: (categoryName: string) =>
  page.getByText(categoryName),
vendorCreatePublicBusinessInfoMenueAddress:page.getByRole('textbox', { name: 'آدرس منو' }),
vendorCreatePublicBusinessInfoPOSsystem:page.getByLabel('انتخاب کنیدداردندارد* صندوق فروشگاهی'),
vendorCreatePublicBusinessInfoPOSsystemSelectOption:page.getByLabel('انتخاب کنیدداردندارد* صندوق فروشگاهی'),
vendorCreatePublicBusinessInfoPOSsystemDropDown:page.locator('#cash_register_id > .css-yk16xz-control > .css-1hwfws3'),
vendorCreatePublicBusinessInfoPOSsystemDropDownSeelectOption:page.getByText('باران', { exact: true }),
vendorCreatePublicBusinessInfoDescription:page.getByText('توضیحات کسب و کار'),
vendorCreatePublicBusinessInfoDescriptionInputBox:page.getByRole('textbox', { name: 'Rich Text Editor, main' }),
vendorCreatePublicBusinessInfoLogo:page.getByText('نشان تجاری کسب و کار (حداکثر حجم قابل قبول ۲ مگابایت)'),
vendorCreatePublicBusinessInfoLogoButton:page.locator('.sc-AxirZ').first(),
vendorCreatePublicBusinessInfoCover:page.getByText('تصاویر کسب و کار (حداکثر حجم قابل قبول ۲ مگابایت)'),
vendorCreatePublicBusinessInfoCoverButton:page.locator('.business-tour__images > div > .form-group > .sc-AxjAm > .sc-AxirZ'),
vendorCreatePublicBusinessInfoNameEmptyAllert:page.getByText('نام کسب و کار ضروری است'),
vendorCreatePublicBusinessInfoCategoryEmptyAllert:page.getByText('انتخاب دسته بندی ضروری است'),
vendorCreatePublicBusinessInfoPOSsystemDropDownEmptyAllert:page.getByText('انتخاب صندوق فروشگاهی ضروری است'),

vendorCreatePublicBusinessInfoNameExist: (businessName: string) =>
  page.getByRole('link', { name: businessName, exact: true }),


  
});
