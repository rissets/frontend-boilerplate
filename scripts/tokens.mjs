import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const tokens = JSON.parse(readFileSync('design.tokens.json', 'utf8'));
let css = '/* Generated from design.tokens.json */\n';
for (const [mode, values] of Object.entries(tokens))
  css +=
    (mode === 'light' ? ':root' : '.dark') +
    '{\n' +
    Object.entries(values)
      .map(([key, value]) => '  --' + key + ': ' + value + ';')
      .join('\n') +
    '\n}\n';
mkdirSync('src/styles', { recursive: true });
if (process.argv.includes('--check')) {
  if (readFileSync('src/styles/tokens.css', 'utf8') !== css) throw new Error('Token drift');
} else writeFileSync('src/styles/tokens.css', css);
