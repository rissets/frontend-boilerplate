import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';
const root = realpathSync(resolve(process.argv[2] ?? '.'));
function local(path) {
  if (typeof path !== 'string' || isAbsolute(path))
    throw new Error('Use a project-relative skill path.');
  const file = resolve(root, path);
  if (!existsSync(file)) throw new Error('Missing skill resource: ' + path);
  const real = realpathSync(file);
  const rel = relative(root, real);
  if (rel === '..' || rel.startsWith('..' + sep))
    throw new Error('Skill path escapes project: ' + path);
  return real;
}
function verify(path, hash, bytes) {
  const data = readFileSync(local(path));
  if (createHash('sha256').update(data).digest('hex') !== hash)
    throw new Error('Skill hash mismatch: ' + path);
  if (bytes !== undefined && data.length !== bytes) throw new Error('Skill size mismatch: ' + path);
}
// Collect relative paths from the installed tree; never execute vendored code.
function allFiles(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '__pycache__' || entry.name === '.DS_Store') return [];
    const path = resolve(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error('Unexpected symlink in installed skill: ' + path);
    return entry.isDirectory() ? allFiles(path, prefix + entry.name + '/') : [prefix + entry.name];
  });
}
const manifest = JSON.parse(readFileSync(local('skills.sources.json'), 'utf8'));
if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.skills) || !manifest.skills.length)
  throw new Error('Invalid skills source manifest.');
const names = new Set();
let total = 0;
for (const skill of manifest.skills) {
  if (!/^[a-z0-9-]+$/.test(skill.name) || names.has(skill.name))
    throw new Error('Invalid or duplicate skill name.');
  names.add(skill.name);
  if (!/^[a-f0-9]{40}$/.test(skill.commit)) throw new Error('Pin each skill to a full commit.');
  if (skill.directory !== '.agents/skills/' + skill.name)
    throw new Error('Unexpected skill directory.');
  const expectedUrl =
    'https://github.com/' + skill.repository + '/tree/' + skill.commit + '/' + skill.sourcePath;
  if (skill.sourceUrl !== expectedUrl)
    throw new Error('Skill source URL does not match pinned revision.');
  if (!Array.isArray(skill.files) || !skill.files.length) throw new Error('Missing skill files.');
  const expected = new Set();
  for (const file of skill.files) {
    if (
      typeof file.path !== 'string' ||
      file.path.split('/').some((part) => part === '..') ||
      isAbsolute(file.path)
    )
      throw new Error('Invalid skill file path.');
    if (expected.has(file.path)) throw new Error('Duplicate skill file.');
    expected.add(file.path);
    verify(skill.directory + '/' + file.path, file.sha256, file.bytes);
    total++;
  }
  if (!expected.has('SKILL.md')) throw new Error('Missing SKILL.md.');
  const text = readFileSync(local(skill.directory + '/SKILL.md'), 'utf8');
  if (!text.startsWith('---\n') || !text.includes('\nname: ' + skill.name + '\n'))
    throw new Error('Skill identity does not match manifest.');
  const actual = allFiles(local(skill.directory));
  if (actual.length !== expected.size || actual.some((file) => !expected.has(file)))
    throw new Error('Unexpected files in installed skill: ' + skill.name);
  if (!skill.license || !skill.licenseFiles?.length)
    throw new Error('Missing skill license evidence.');
  skill.licenseFiles.forEach(local);
}
for (const notice of manifest.localNotices ?? []) verify(notice.path, notice.sha256);
console.log('Skill integrity passed (' + names.size + ' skills, ' + total + ' source files).');
