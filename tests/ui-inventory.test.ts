import { describe, expect, it } from 'vitest';
import inventory from '../docs/ui-v1-inventory.json';

const modules = import.meta.glob<Record<string, unknown>>('../src/shared/ui/*.tsx');

it('includes exactly the 53 ui-v1 source modules', () => {
  expect(
    Object.keys(modules)
      .map((path) => path.split('/').at(-1))
      .sort(),
  ).toEqual(inventory.map((item) => item.file).sort());
  expect(inventory).toHaveLength(53);
});

describe.each(inventory)('$file', (item) => {
  it('loads with all original runtime exports', async () => {
    const module = await modules['../' + item.destination]();
    expect(Object.keys(module).sort()).toEqual(item.exports);
  });
});
