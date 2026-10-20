import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const checker = resolve('scripts/check-assets.mjs');
function check(change) {
  const root = mkdtempSync(resolve(tmpdir(), 'asset-provenance-'));
  try {
    mkdirSync(resolve(root, 'public'));
    writeFileSync(resolve(root, 'public/asset.txt'), 'original');
    writeFileSync(resolve(root, 'license.txt'), 'license');
    const row = {
      path: 'public/asset.txt',
      kind: 'text',
      title: 'Asset',
      author: 'Author',
      sourceUrl: 'https://example.org/asset',
      license: 'custom',
      licenseUrl: 'https://example.org/license',
      licenseFile: 'license.txt',
      attribution: 'Author',
      sha256: createHash('sha256').update('original').digest('hex'),
    };
    change?.(row, root);
    writeFileSync(resolve(root, 'assets.manifest.json'), JSON.stringify([row]));
    return spawnSync(process.execPath, [checker, root], { encoding: 'utf8' });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
test('accepts an intact asset with recorded license', () => {
  const result = check();
  assert.equal(result.status, 0, result.stderr);
});
test('rejects changed bytes and missing notices', () => {
  let result = check((_row, root) => writeFileSync(resolve(root, 'public/asset.txt'), 'tampered'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /hash mismatch/);
  result = check((row) => {
    row.licenseFile = 'missing.txt';
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing asset or notice/);
});
