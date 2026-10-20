import {
  readFileSync,
  readdirSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  unlinkSync,
} from 'node:fs';
const { font } = JSON.parse(readFileSync('app.config.json', 'utf8'));
const allowed = ['source-sans-3', 'ibm-plex-sans', 'plus-jakarta-sans'];
if (!allowed.includes(font)) throw new Error('Unknown font preset');
mkdirSync('public/fonts', { recursive: true });
mkdirSync('docs/licenses', { recursive: true });
const pkg = 'node_modules/@fontsource-variable/' + font;
const { variable } = JSON.parse(readFileSync(pkg + '/metadata.json', 'utf8'));
const file = readdirSync(pkg + '/files').find((f) => f.endsWith('-latin-wght-normal.woff2'));
if (!file) throw new Error('Missing font');
copyFileSync(pkg + '/files/' + file, 'public/fonts/' + font + '.woff2');
for (const name of allowed)
  copyFileSync(
    'node_modules/@fontsource-variable/' + name + '/LICENSE',
    'docs/licenses/' + name + '-OFL.txt',
  );
for (const file of readdirSync('public/fonts'))
  if (allowed.some((name) => file === name + '.woff2') && file !== font + '.woff2')
    unlinkSync('public/fonts/' + file);
writeFileSync(
  'src/styles/font.css',
  "@font-face{font-family:Workspace;src:url('/fonts/" +
    font +
    ".woff2') format('woff2');font-weight:" +
    variable.wght.min +
    ' ' +
    variable.wght.max +
    ';font-style:normal;font-display:swap;}\n',
);
