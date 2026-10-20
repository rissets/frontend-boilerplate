import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
const checker = resolve('scripts/check-architecture.mjs');
function check(files) {
  const root = mkdtempSync(resolve(tmpdir(), 'feature-boundaries-'));
  try {
    const sources = {
      'src/features/alpha/index.ts': "export {Alpha} from './ui/Alpha';",
      'src/features/alpha/ui/Alpha.tsx': 'export const Alpha=()=>null;',
      'src/features/beta/index.ts': 'export const beta=1;',
      'src/features/beta/model/value.ts': 'export const value=1;',
      'src/styles/index.css': '',
      ...files,
    };
    for (const [name, source] of Object.entries(sources)) {
      const file = resolve(root, name);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, source);
    }
    writeFileSync(
      resolve(root, 'tsconfig.app.json'),
      JSON.stringify({
        compilerOptions: {
          moduleResolution: 'bundler',
          module: 'esnext',
          paths: { '@/*': ['./src/*'] },
        },
      }),
    );
    return spawnSync(process.execPath, [checker, root], { encoding: 'utf8' });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
test('accepts public feature imports and CSS side effects', () => {
  const result = check({
    'src/pages/Home.tsx': "import {Alpha} from '@/features/alpha'; import '../styles/index.css';",
  });
  assert.equal(result.status, 0, result.stderr);
});
test('rejects deep imports, including dynamic imports', () => {
  for (const source of [
    "import {Alpha} from '@/features/alpha/ui/Alpha';",
    "const page=import('@/features/alpha/ui/Alpha');",
  ]) {
    const result = check({ 'src/pages/Home.tsx': source });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /public index/);
  }
});
test('rejects dependencies from shared to features', () => {
  const result = check({ 'src/shared/bad.ts': "import {beta} from '@/features/beta';" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /upper layers/);
});
test('rejects sibling feature dependencies and model to UI dependencies', () => {
  let result = check({
    'src/features/alpha/api/bad.ts': "import {value} from '@/features/beta/model/value';",
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /different features/);
  result = check({ 'src/features/alpha/model/bad.ts': "import {Alpha} from '../ui/Alpha';" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /model must remain/);
});
test('rejects pictographic glyphs in application source', () => {
  const result = check({
    'src/pages/Emoji.tsx': 'export const label="' + String.fromCodePoint(0x1f4e6) + '";',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /SVG icons/);
});
