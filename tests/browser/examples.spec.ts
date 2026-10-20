import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import config from '../../app.config.json' with { type: 'json' };
const storageKey = config.appId + ':example-items:v1';
function runtimeErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('example item create, validation, filtering, status and persistence', async ({ page }) => {
  const errors = runtimeErrors(page);
  await page.goto('/examples/feature');
  await expect(page.getByText('Catatan pertama', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Tambah item', exact: true }).click();
  await expect(page.getByText('Nama wajib diisi')).toBeVisible();
  await page.getByRole('textbox', { name: 'Nama item', exact: true }).fill('Item pengujian');
  await page.getByRole('button', { name: 'Tambah item', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Menyimpan...' })).toBeDisabled();
  await expect(page.getByText('Item pengujian', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Arsipkan Item pengujian', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Aktifkan Item pengujian', exact: true }),
  ).toBeVisible();
  await page.getByRole('combobox', { name: 'Status', exact: true }).selectOption('active');
  await expect(page.getByText('Item pengujian', { exact: true })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Status', exact: true }).selectOption('all');
  await page.getByRole('searchbox', { name: 'Cari item', exact: true }).fill('tidak ditemukan');
  await expect(page.getByText('Tidak ada item yang cocok', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Item pengujian', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Aktifkan Item pengujian', exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('example local corruption is visible and resets only its own namespace', async ({ page }) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, 'broken');
    localStorage.setItem('unrelated-record', 'keep');
  }, storageKey);
  await page.goto('/examples/feature');
  await expect(page.getByRole('alert')).toContainText('Data lokal belum dapat dibaca');
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe('broken');
  await page.getByRole('button', { name: 'Pulihkan sampel', exact: true }).click();
  await expect(page.getByText('Catatan pertama', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('unrelated-record'))).toBe('keep');
});

test('failed local writes retain the form and never report successful saves', async ({ page }) => {
  await page.addInitScript((key) => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name, value) {
      if (name === key) throw new Error('Quota exceeded');
      return original.call(this, name, value);
    };
  }, storageKey);
  await page.goto('/examples/feature');
  await expect(page.getByText('Catatan pertama', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Nama item', exact: true }).fill('Belum tersimpan');
  await page.getByRole('button', { name: 'Tambah item', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Perubahan belum tersimpan');
  await expect(page.getByRole('textbox', { name: 'Nama item', exact: true })).toHaveValue(
    'Belum tersimpan',
  );
  await expect(page.getByText('Item berhasil ditambahkan.', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('cell', { name: 'Belum tersimpan', exact: true })).toHaveCount(0);
});

test('GLB loading, real rendering, spring rotation, switch and unmount are clean', async ({
  page,
  browserName,
}) => {
  const errors = runtimeErrors(page);
  await page.route('**/models/box.glb', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await route.continue();
  });
  await page.goto('/examples/visual');
  await expect(page.getByText('Memuat objek 3D', { exact: true })).toBeVisible();
  const scene = page.locator('[data-scene-state]');
  await expect(scene).toHaveAttribute('data-scene-state', /ready|unavailable/, { timeout: 20000 });
  const state = await scene.getAttribute('data-scene-state');
  test.info().annotations.push({ type: 'webgl', description: state ?? 'unknown' });
  if (state === 'ready') {
    const canvas = page.getByRole('img', { name: 'Model Box dari Cesium', exact: true });
    await expect(canvas).toBeVisible();
    const before = createHash('sha256')
      .update(await canvas.screenshot())
      .digest('hex');
    await page.getByRole('button', { name: 'Putar kanan', exact: true }).click();
    await expect(page.getByLabel('Sudut objek')).toHaveText('45°');
    await page.waitForTimeout(450);
    expect(
      createHash('sha256')
        .update(await canvas.screenshot())
        .digest('hex'),
    ).not.toBe(before);
    await page.getByRole('button', { name: 'Atur ulang objek', exact: true }).click();
    await expect(page.getByLabel('Sudut objek')).toHaveText('0°');
    await page.getByRole('button', { name: 'Geometri dasar', exact: true }).click();
    await expect(scene).toHaveAttribute('data-scene-state', 'ready');
    await expect(page.getByRole('img', { name: 'Kubus dengan material biru' })).toBeVisible();
  } else {
    expect(browserName).toBe('webkit');
    await expect(page.getByText('Pratinjau 3D tidak tersedia')).toBeVisible();
  }
  await page.getByRole('link', { name: 'Contoh fitur', exact: true }).click();
  await expect(page.getByText('Catatan pertama', { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('missing WebGL keeps DOM information, no model fetch and disabled controls', async ({
  page,
}) => {
  const models: string[] = [];
  page.on('request', (request) => {
    if (request.url().endsWith('.glb')) models.push(request.url());
  });
  await page.addInitScript(() =>
    Object.defineProperty(window, 'WebGL2RenderingContext', {
      value: undefined,
      configurable: true,
    }),
  );
  await page.goto('/examples/visual');
  await expect(page.getByText('Pratinjau 3D tidak tersedia')).toBeVisible();
  await expect(page.locator('[data-scene-state]')).toHaveAttribute(
    'data-scene-state',
    'unavailable',
  );
  await expect(page.getByRole('button', { name: 'Putar kanan', exact: true })).toBeDisabled();
  await expect(page.locator('figcaption')).toContainText('Box: satu mesh dan satu material.');
  expect(models).toEqual([]);
});

test('failed model load exposes retry instead of a successful preview', async ({ page }) => {
  let requests = 0;
  await page.route('**/models/box.glb', async (route) => {
    requests++;
    if (requests === 1) await route.fulfill({ status: 503, body: 'Unavailable' });
    else await route.continue();
  });
  await page.goto('/examples/visual');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute(
    'data-scene-state',
    /ready|unavailable/,
    { timeout: 20000 },
  );
  if (requests) {
    await expect(page.getByRole('alert')).toContainText('Objek 3D belum dapat dimuat');
    await expect(page.getByRole('button', { name: 'Putar kanan', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Coba lagi', exact: true }).click();
    await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state', 'ready', {
      timeout: 20000,
    });
    expect(requests).toBe(2);
  } else {
    await expect(page.getByText('Pratinjau 3D tidak tersedia')).toBeVisible();
  }
});

test('feedback variants and reduced motion remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/examples/visual');
  await expect(page.locator('[data-motion-mode]')).toHaveAttribute('data-motion-mode', 'reduced');
  const state = page.getByRole('combobox', { name: 'Tampilkan status', exact: true });
  await state.selectOption('skeleton');
  await expect(page.getByRole('status', { name: 'Memuat konten', exact: true })).toBeVisible();
  await state.selectOption('empty');
  await expect(page.getByText('Belum ada item', { exact: true })).toBeVisible();
  await state.selectOption('error');
  await expect(page.getByRole('alert')).toContainText('Konten contoh belum tersedia');
  await page.getByRole('button', { name: 'Coba lagi', exact: true }).click();
  await expect(state).toHaveValue('loading');
  await page.getByRole('button', { name: 'Tampilkan pesan', exact: true }).click();
  await expect(page.getByText('Pesan ditampilkan dengan transisi singkat.')).toBeVisible();
  await page.getByRole('button', { name: 'Sembunyikan pesan', exact: true }).click();
  await expect(page.getByText('Pesan ditampilkan dengan transisi singkat.')).toHaveCount(0);
});

for (const width of [390, 1366])
  for (const theme of ['light', 'dark'])
    for (const route of ['feature', 'visual']) {
      test(`example ${route} ${width}px ${theme} accessible`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await page.goto('/examples/' + route);
        if (route === 'feature')
          await expect(page.getByText('Catatan pertama', { exact: true })).toBeVisible();
        else
          await expect(page.locator('[data-scene-state]')).toHaveAttribute(
            'data-scene-state',
            /ready|unavailable/,
            { timeout: 20000 },
          );
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('html')).toHaveClass(theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
        expect(await page.locator('body').innerText()).not.toMatch(/\bdemo\b/i);
      });
    }

test('homepage defers 3D dependencies and model until the visual route opens', async ({ page }) => {
  const requests: string[] = [];
  const errors = runtimeErrors(page);
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Mulai dari sini.', exact: true })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const heavy = /three|fiber|drei|react-spring|SceneRenderer|GeometryScene|ModelScene|box\.glb/i;
  expect(requests.filter((url) => heavy.test(new URL(url).pathname))).toEqual([]);
  await page.getByRole('link', { name: '3D dan motion', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: '3D, motion, dan loading', exact: true }),
  ).toBeVisible();
  await expect(page.locator('[data-scene-state]')).toHaveAttribute(
    'data-scene-state',
    /ready|unavailable/,
  );
  if ((await page.locator('[data-scene-state]').getAttribute('data-scene-state')) === 'ready') {
    expect(requests.some((url) => new URL(url).pathname.endsWith('/models/box.glb'))).toBe(true);
  }
  expect(errors).toEqual([]);
});
