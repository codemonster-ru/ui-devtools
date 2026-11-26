import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Plugin } from 'vite';
import { playgroundVirtualPlugin } from '../src/index';

function getResolveIdHandler(plugin: Plugin) {
  const resolveId = plugin.resolveId;
  if (!resolveId) {
    throw new Error('resolveId hook is not defined');
  }

  return typeof resolveId === 'function' ? resolveId : resolveId.handler;
}

function getLoadHandler(plugin: Plugin) {
  const load = plugin.load;
  if (!load) {
    throw new Error('load hook is not defined');
  }

  return typeof load === 'function' ? load : load.handler;
}

describe('playgroundVirtualPlugin', () => {
  it('resolves and loads default export entry', async () => {
    const plugin = playgroundVirtualPlugin({
      entries: {
        smoke: '/tmp/smoke.ts',
      },
    });

    const resolved = await getResolveIdHandler(plugin).call(
      {} as never,
      'virtual:ui-playground/smoke',
      undefined,
      {
        attributes: {},
        isEntry: false,
      },
    );
    expect(resolved).toBe('\0virtual:ui-playground/smoke');

    const loaded = await getLoadHandler(plugin).call({} as never, '\0virtual:ui-playground/smoke');
    expect(loaded).toBe(`export { default } from ${JSON.stringify(path.resolve('/tmp/smoke.ts'))};`);
  });

  it('supports namespace export mode', async () => {
    const plugin = playgroundVirtualPlugin({
      entries: {
        smoke: '/tmp/smoke.ts',
      },
      exportMode: 'namespace',
    });

    const loaded = await getLoadHandler(plugin).call({} as never, '\0virtual:ui-playground/smoke');
    expect(loaded).toBe(`export * from ${JSON.stringify(path.resolve('/tmp/smoke.ts'))};`);
  });

  it('supports per-entry named export mode', async () => {
    const plugin = playgroundVirtualPlugin({
      entries: {
        smoke: {
          file: '/tmp/smoke.ts',
          export: { named: 'SmokeDemo' },
        },
      },
    });

    const loaded = await getLoadHandler(plugin).call({} as never, '\0virtual:ui-playground/smoke');
    expect(loaded).toBe(`export { SmokeDemo } from ${JSON.stringify(path.resolve('/tmp/smoke.ts'))};`);
  });

  it('returns null for unresolved virtual entry id', async () => {
    const plugin = playgroundVirtualPlugin({
      entries: {
        known: '/tmp/known.ts',
      },
    });

    const resolved = await getResolveIdHandler(plugin).call(
      {} as never,
      'virtual:ui-playground/unknown',
      undefined,
      {
        attributes: {},
        isEntry: false,
      },
    );
    const loaded = await getLoadHandler(plugin).call({} as never, '\0virtual:ui-playground/unknown');

    expect(resolved).toBeNull();
    expect(loaded).toBeNull();
  });

  it('normalizes /@id/__x00__ virtual id form', async () => {
    const plugin = playgroundVirtualPlugin({
      entries: {
        smoke: '/tmp/smoke.ts',
      },
    });

    const resolved = await getResolveIdHandler(plugin).call(
      {} as never,
      '/@id/__x00__virtual:ui-playground/smoke',
      undefined,
      {
        attributes: {},
        isEntry: false,
      },
    );
    expect(resolved).toBe('\0virtual:ui-playground/smoke');
  });
});
