import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const checker = resolve('scripts/check-skills.mjs');
function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), 'frontend-skills-'));
  for (const file of ['skills.sources.json', '.agents/skills', 'docs/licenses'])
    cpSync(resolve(file), resolve(root, file), { recursive: true });
  return root;
}
const run = (root) => spawnSync(process.execPath, [checker, root], { encoding: 'utf8' });
test('accepts complete pinned skill snapshots and rejects modified instructions', () => {
  const root = fixture();
  try {
    assert.equal(run(root).status, 0);
    const file = resolve(root, '.agents/skills/vercel-react-best-practices/SKILL.md');
    writeFileSync(file, readFileSync(file, 'utf8') + '\nUnexpected instruction\n');
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Skill hash mismatch/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
test('rejects missing referenced resources and unrecorded injected files', () => {
  const root = fixture();
  try {
    const injected = resolve(root, '.agents/skills/typescript-advanced-types/extra.md');
    writeFileSync(injected, 'Unexpected extra instructions');
    assert.match(run(root).stderr, /Unexpected files/);
    unlinkSync(injected);
    unlinkSync(resolve(root, '.agents/skills/typescript-advanced-types/references/details.md'));
    assert.match(run(root).stderr, /Missing skill resource/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
