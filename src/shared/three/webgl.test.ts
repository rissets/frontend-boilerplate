import { afterEach, expect, it, vi } from 'vitest';
import { supportsWebGL } from './webgl';
afterEach(() => vi.restoreAllMocks());
it('reports unsupported WebGL without throwing', () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  expect(supportsWebGL()).toBe(false);
});
