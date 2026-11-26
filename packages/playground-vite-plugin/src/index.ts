import path from 'node:path';
import type { Plugin } from 'vite';

export type PlaygroundVirtualExportMode = 'default' | 'namespace' | { named: string };

export interface PlaygroundVirtualEntryConfig {
  file: string;
  export?: PlaygroundVirtualExportMode;
}

export type PlaygroundVirtualEntryValue = string | PlaygroundVirtualEntryConfig;

export interface PlaygroundVirtualPluginOptions {
  entries: Record<string, PlaygroundVirtualEntryValue>;
  virtualPrefix?: string;
  pluginName?: string;
  exportMode?: PlaygroundVirtualExportMode;
}

export function playgroundVirtualPlugin(options: PlaygroundVirtualPluginOptions): Plugin {
  const virtualPrefix = options.virtualPrefix ?? 'virtual:ui-playground/';
  const resolvedPrefix = `\0${virtualPrefix}`;
  const pluginName = options.pluginName ?? 'ui-playground-virtual';
  const defaultExportMode = options.exportMode ?? 'default';

  return {
    name: pluginName,
    resolveId(id) {
      const normalizedId = normalizeVirtualId(id);
      if (!normalizedId.startsWith(virtualPrefix) && !normalizedId.startsWith(resolvedPrefix)) {
        return null;
      }

      const entryId = normalizedId.startsWith(resolvedPrefix)
        ? normalizedId.slice(resolvedPrefix.length)
        : normalizedId.slice(virtualPrefix.length);
      if (!options.entries[entryId]) {
        return null;
      }

      return `${resolvedPrefix}${entryId}`;
    },
    load(id) {
      const normalizedId = normalizeVirtualId(id);
      if (!normalizedId.startsWith(resolvedPrefix) && !normalizedId.startsWith(virtualPrefix)) {
        return null;
      }

      const entryId = normalizedId.startsWith(resolvedPrefix)
        ? normalizedId.slice(resolvedPrefix.length)
        : normalizedId.slice(virtualPrefix.length);
      const entry = options.entries[entryId];
      if (!entry) {
        return null;
      }

      const entryConfig = typeof entry === 'string' ? { file: entry } : entry;
      const resolvedFile = path.resolve(entryConfig.file);
      const mode = entryConfig.export ?? defaultExportMode;

      if (mode === 'namespace') {
        return `export * from ${JSON.stringify(resolvedFile)};`;
      }

      if (typeof mode === 'object' && typeof mode.named === 'string' && mode.named.length > 0) {
        return `export { ${mode.named} } from ${JSON.stringify(resolvedFile)};`;
      }

      return `export { default } from ${JSON.stringify(resolvedFile)};`;
    },
  };
}

function normalizeVirtualId(id: string): string {
  if (id.startsWith('/@id/__x00__')) {
    return `\0${id.slice('/@id/__x00__'.length)}`;
  }

  return id;
}
