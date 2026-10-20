import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';
const root = realpathSync(resolve(process.argv[2] ?? '.'));
const rows = JSON.parse(readFileSync(resolve(root, 'assets.manifest.json'), 'utf8'));
if (!Array.isArray(rows)) throw new Error('Asset manifest must be an array.');
function local(path) {
  if (typeof path !== 'string') throw new Error('Missing asset path');
  const file = resolve(root, path);
  if (!existsSync(file)) throw new Error('Missing asset or notice: ' + path);
  const real = realpathSync(file);
  if (relative(root, real).startsWith('..' + sep) || relative(root, real) === '..')
    throw new Error('Asset path escapes project.');
  return real;
}
const seen = new Set();
for (const row of rows) {
  for (const key of [
    'path',
    'kind',
    'title',
    'author',
    'sourceUrl',
    'license',
    'licenseUrl',
    'licenseFile',
    'attribution',
    'sha256',
  ])
    if (typeof row[key] !== 'string' || !row[key])
      throw new Error('Missing asset metadata: ' + key);
  if (seen.has(row.path)) throw new Error('Duplicate asset path: ' + row.path);
  seen.add(row.path);
  for (const key of ['sourceUrl', 'licenseUrl'])
    if (new URL(row[key]).protocol !== 'https:')
      throw new Error('Use an HTTPS provenance URL: ' + key);
  local(row.licenseFile);
  if (row.sourceNoticeFile) local(row.sourceNoticeFile);
  const bytes = readFileSync(local(row.path));
  if (createHash('sha256').update(bytes).digest('hex') !== row.sha256)
    throw new Error('Asset hash mismatch: ' + row.path);
  if (row.bytes !== undefined && row.bytes !== bytes.length)
    throw new Error('Asset size mismatch: ' + row.path);
  if (
    row.path.endsWith('.glb') &&
    (bytes.length < 20 ||
      bytes.toString('utf8', 0, 4) !== 'glTF' ||
      bytes.readUInt32LE(4) !== 2 ||
      bytes.readUInt32LE(8) !== bytes.length)
  )
    throw new Error('Invalid GLB container: ' + row.path);
}
console.log('Asset provenance passed (' + rows.length + ' assets).');
