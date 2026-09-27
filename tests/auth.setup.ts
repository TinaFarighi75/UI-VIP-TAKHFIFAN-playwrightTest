import { test as setup } from '../utils/fixtures';
import { expect } from '@playwright/test';
import{users} from '../test-data/userAdmin-data';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via API and service', async ({ page, loginAdminApi }) => {
    const userTest= users[0];
  // استفاده از سرویسی که نوشتی
  const loginData = await loginAdminApi.login(userTest.email, userTest.password);

  // ریدایرکت به لینک جادویی برای ست شدن کوکی‌ها
  await page.goto(loginData.login_url);
  
  // اطمینان از لاگین
  await page.waitForLoadState('networkidle');
  
  // ذخیره سشن
  await page.context().storageState({ path: authFile });
});
