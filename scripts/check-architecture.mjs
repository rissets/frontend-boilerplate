import ts from 'typescript';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
const root = resolve(process.argv[2] ?? '.');
const configFile = ts.readConfigFile(resolve(root, 'tsconfig.app.json'), ts.sys.readFile);
if (configFile.error)
  throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, ' '));
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
const sourceRoot = resolve(root, 'src');
const files = [];
function walk(dir) {
  for (const file of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, file.name);
    if (file.isDirectory()) walk(path);
    else if (/\.tsx?$/.test(file.name)) files.push(path);
  }
}
walk(sourceRoot);
const failures = [];
function checkDependency(file, specifier) {
  if (/\.(css|svg|png|jpe?g|webp|glb|woff2?)(\?.*)?$/.test(specifier)) {
    if (specifier.startsWith('.') && !existsSync(resolve(dirname(file), specifier.split('?')[0])))
      failures.push(relative(root, file) + ': missing asset ' + specifier);
    return;
  }
  const resolved = ts.resolveModuleName(specifier, file, config.options, ts.sys).resolvedModule
    ?.resolvedFileName;
  if (!resolved) {
    if (specifier.startsWith('@/') || specifier.startsWith('.'))
      failures.push(relative(root, file) + ': unresolved ' + specifier);
    return;
  }
  if (resolved.includes(sep + 'node_modules' + sep)) return;
  const from = relative(sourceRoot, file).split(sep);
  const to = relative(sourceRoot, resolved).split(sep);
  if (to[0] === '..') return;
  const reject = (reason) =>
    failures.push(relative(root, file) + ': ' + reason + ' -> ' + specifier);
  if (from[0] === 'shared' && to[0] !== 'shared') reject('shared cannot depend on upper layers');
  if (from[0] === 'features') {
    if (['app', 'pages'].includes(to[0])) reject('features cannot depend on app/pages');
    if (to[0] === 'features' && to[1] !== from[1])
      reject('compose different features in pages/app');
    if (from[2] === 'model' && ['api', 'ui'].includes(to[2]))
      reject('model must remain independent of API/UI');
    if (from[2] === 'api' && to[0] === 'features' && to[2] === 'ui')
      reject('API cannot depend on UI');
  }
  if (from[0] === 'pages' && to[0] === 'app') reject('pages cannot depend on app');
  if (
    ['app', 'pages'].includes(from[0]) &&
    to[0] === 'features' &&
    to.slice(2).join('/') !== 'index.ts'
  )
    reject('consume a feature through its public index.ts');
}
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  if (/\p{Extended_Pictographic}/u.test(content))
    failures.push(
      relative(root, file) + ': emoji/pictographic glyphs are forbidden; use SVG icons',
    );
  const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteralLike(node.moduleSpecifier)
    )
      checkDependency(file, node.moduleSpecifier.text);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const argument = node.arguments[0];
      if (argument && ts.isStringLiteralLike(argument)) checkDependency(file, argument.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log('Architecture and icon policy passed (' + files.length + ' files).');
