import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../../docs/ui-v1-inventory.json' with { type: 'json' };

for (const item of inventory) {
  const name = item.file.replace('.tsx', '');
  test(`ui-v1 renders ${name}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(`/tests/fixtures/ui.html?component=${name}`);
    const fixture = page.getByTestId('fixture');
    await expect(fixture).toBeAttached();
    await expect(fixture).toHaveAttribute('data-component', name);
    expect(await fixture.evaluate((node) => node.childNodes.length)).toBeGreaterThan(0);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    expect(errors).toEqual([]);
  });
}
for (const width of [390, 1366])
  for (const theme of ['light', 'dark']) {
    test(`starter ${width}px ${theme}`, async ({ page }) => {
      const requests: string[] = [];
      page.on('request', (request) => {
        if (new URL(request.url()).pathname.startsWith('/api/')) requests.push(request.url());
      });
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Mulai dari sini.' })).toBeVisible();
      await expect(page.locator('html')).toHaveClass(new RegExp(theme));
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      expect(await page.evaluate(() => document.fonts.check('16px Workspace'))).toBe(true);
      expect(await page.locator('body').innerText()).not.toMatch(
        /demo|procurement|pengadaan|dashboard/i,
      );
      expect(requests).toEqual([]);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.screenshot({
        path: `test-results/starter-${test.info().project.name}-${width}-${theme}.png`,
        fullPage: true,
      });
      await page.getByRole('button', { name: 'Ganti tema' }).click();
      await expect(page.locator('html')).toHaveClass(
        new RegExp(theme === 'dark' ? 'light' : 'dark'),
      );
    });
  }
test('theme follows system changes and a preference changed in another tab', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass('dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveClass('light');
  const otherTab = await context.newPage();
  await otherTab.goto('/');
  await otherTab.evaluate(() => localStorage.setItem('theme', 'dark'));
  await expect(page.locator('html')).toHaveClass('dark');
  await otherTab.close();
});
test('unknown path returns to starter', async ({ page }) => {
  await page.goto('/halaman-tidak-ada');
  await expect(page.getByRole('heading', { name: 'Halaman tidak ditemukan' })).toBeVisible();
  await page.getByRole('link', { name: 'Kembali' }).click();
  await expect(page.getByRole('heading', { name: 'Mulai dari sini.' })).toBeVisible();
});
const fixtureUrl = (name: string) => `/tests/fixtures/ui.html?component=${name}`;
test('calendar selects a date and navigates month', async ({ page }) => {
  await page.goto(fixtureUrl('calendar'));
  await page.getByRole('button', { name: 'Tuesday, October 20th, 2026' }).click();
  await expect(page.getByRole('status', { name: 'Tanggal terpilih' })).toHaveText('20');
  await page.getByRole('button', { name: 'Go to the Next Month' }).click();
  await expect(page.getByText('November 2026', { exact: true })).toBeVisible();
});
for (const orientation of ['horizontal', 'vertical']) {
  test(`resizable ${orientation} responds to keyboard`, async ({ page }) => {
    await page.goto(fixtureUrl('resizable') + `&orientation=${orientation}`);
    const group = page.locator('[data-slot=resizable-panel-group]');
    const panel = page.locator('[data-panel]').first();
    const separator = page.getByRole('separator', { name: 'Ubah ukuran panel' });
    await expect(separator).toBeVisible();
    await expect(group).toHaveAttribute('data-orientation', orientation);
    await expect(separator).toHaveAttribute(
      'aria-orientation',
      orientation === 'horizontal' ? 'vertical' : 'horizontal',
    );
    const dimension = () =>
      panel.evaluate(
        (node, axis) => node.getBoundingClientRect()[axis === 'horizontal' ? 'width' : 'height'],
        orientation,
      );
    const before = await dimension();
    await separator.focus();
    await separator.press(orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown');
    await expect.poll(dimension).toBeGreaterThan(before);
  });
}
test('chart renders the legend and a zero tooltip value', async ({ page }) => {
  await page.goto(fixtureUrl('chart'));
  await expect(page.locator('.recharts-surface')).toBeVisible();
  await expect(page.locator('.recharts-legend-wrapper')).toContainText('Nilai');
  await expect(page.locator('.recharts-tooltip-wrapper')).toContainText('0');
  await expect(page.locator('.recharts-tooltip-wrapper')).toContainText('Nilai');
});
test('form validates and submits through the shared model', async ({ page }) => {
  await page.goto(fixtureUrl('form'));
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByText('Nama wajib diisi')).toBeVisible();
  await page.getByRole('textbox', { name: 'Nama' }).fill('Nama pengujian');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByText('Tersimpan', { exact: true })).toBeVisible();
  await expect(page.getByText('Nama wajib diisi')).toHaveCount(0);
});
test('dialog traps focus and restores its trigger', async ({ page }) => {
  await page.goto(fixtureUrl('dialog'));
  const trigger = page.getByRole('button', { name: 'Buka dialog' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('select changes its value', async ({ page }) => {
  await page.goto(fixtureUrl('select'));
  await page.getByRole('combobox', { name: 'Pilihan' }).click();
  await page.getByRole('option', { name: 'Dua', exact: true }).click();
  await expect(page.getByRole('combobox')).toHaveText('Dua');
});
test('toast is announced after interaction', async ({ page }) => {
  await page.goto(fixtureUrl('sonner'));
  await page.getByRole('button', { name: 'Tampilkan pesan' }).click();
  await expect(page.getByText('Pesan tersampaikan')).toBeVisible();
});
