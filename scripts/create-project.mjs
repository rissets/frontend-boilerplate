import { cpSync, existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const source = realpathSync(fileURLToPath(new URL('..', import.meta.url)));
const [destination, requestedName, ...extra] = process.argv.slice(2);
if (!destination || extra.length)
  throw new Error('Usage: npm run create -- ../project-name ["Project title"]');
const target = resolve(destination);
if (existsSync(target)) throw new Error('Target already exists; choose a new directory.');
let ancestor = dirname(target);
while (!existsSync(ancestor)) ancestor = dirname(ancestor);
const canonicalTarget = resolve(realpathSync(ancestor), relative(ancestor, target));
if (canonicalTarget.startsWith(source + sep))
  throw new Error('Create the project outside this starter directory.');
const appId = basename(target)
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/^-+|-+$/g, '');
if (!appId || appId.length > 214) throw new Error('Target name cannot form a valid package name.');
const name = requestedName || basename(target);
const entries = [
  'src',
  'public',
  'tests',
  'scripts',
  'docs',
  'skills',
  '.agents/skills',
  'skills.sources.json',
  'components.json',
  'index.html',
  'package.json',
  'package-lock.json',
  'app.config.json',
  'design.tokens.json',
  'assets.manifest.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'vitest.config.ts',
  'playwright.config.ts',
  '.gitignore',
  '.env.example',
  '.oxlintrc.json',
  '.prettierrc.json',
  '.prettierignore',
  'README.md',
  'AGENTS.md',
  'PRODUCT.md',
  'DESIGN.md',
  '.impeccable/design.json',
];
// Validate the complete source before creating the destination.
for (const entry of entries)
  if (!existsSync(resolve(source, entry))) throw new Error('Missing starter file: ' + entry);
mkdirSync(target, { recursive: true });
for (const entry of entries)
  cpSync(resolve(source, entry), resolve(target, entry), {
    recursive: true,
    filter: (path) => {
      const name = basename(path);
      return (
        ![
          'node_modules',
          'dist',
          '.git',
          'test-results',
          'playwright-report',
          '.DS_Store',
          '__pycache__',
        ].includes(name) &&
        (!name.startsWith('.env') || name === '.env.example')
      );
    },
  });
for (const file of ['package.json', 'package-lock.json']) {
  const path = resolve(target, file);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  data.name = appId;
  if (data.packages?.['']) data.packages[''].name = appId;
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}
const configPath = resolve(target, 'app.config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
writeFileSync(configPath, JSON.stringify({ ...config, name, appId }, null, 2) + '\n');
const html = resolve(target, 'index.html');
const title = name.replace(
  /[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
);
writeFileSync(
  html,
  readFileSync(html, 'utf8').replace(/<title>[^<]*<\/title>/, '<title>' + title + '</title>'),
);
const quotedTarget = "'" + target.replaceAll("'", "'\\''") + "'";
console.log('Created ' + target + '\nNext: cd ' + quotedTarget + ' && npm ci && npm run dev');
