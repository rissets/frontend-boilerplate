/** Probe and release one temporary context before loading the renderer bundle. */
export function supportsWebGL(): boolean {
  if (typeof window === 'undefined' || !window.WebGL2RenderingContext) return false;
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}
