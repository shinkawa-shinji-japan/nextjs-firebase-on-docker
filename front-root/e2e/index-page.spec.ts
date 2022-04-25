import { test, expect, chromium } from '@playwright/test';

// const host = 'nextjs-app'; // dockerのサービス名で接続
// const host = 'localhost'; //
// const host = '192.168.?.??'; // （メモ）ホストPCのIPには接続できない
const host = '192.168.96.2'; // `docker exec -it [コンテナ名] hostname -I`で取得したnextjs-appコンテナのIPを割り当てる
// const host = 'localhost.com'; // container_nameで接続
const port = '3000';
const origin = `http://${host}:${port}`;

test('should navigate to the sample page', async ({ page }) => {
  // await chromium.launch({ headless: false, slowMo: 100 }); //
  // await page.goto(origin, { waitUntil: 'load' });

  await page.goto(origin);
  await page.locator('text=sample').click();
  await page.screenshot({ path: './e2e/screenshot1.png', fullPage: true });
  await expect(page.locator('[data-test-id=mode]')).toContainText('development');
  await page.locator('text=sample').click();
  await page.waitForNavigation({ url: `${origin}/sample` }); // ← wait処理を入れないと完全に画面遷移する前に次の処理が実行される
  await page.screenshot({ path: './e2e/screenshot2.png', fullPage: true });
});
