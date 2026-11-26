import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'ui-playground-copy-css-entries',
      closeBundle() {
        for (const fileName of ['tokens.css', 'playground.css', 'critical.css']) {
          copyFileSync(resolve(__dirname, 'src', fileName), resolve(__dirname, 'dist', fileName));
        }
        const autoDir = resolve(__dirname, 'dist/auto');
        mkdirSync(autoDir, { recursive: true });
        writeFileSync(resolve(autoDir, 'ui.js'), "import '../index.css';\nexport * from '../ui.js';\n");
      },
    },
  ],
  build: {
    lib: {
      entry: {
        ui: resolve(__dirname, 'src/ui.ts'),
        runtime: resolve(__dirname, 'src/runtime.ts'),
      },
      cssFileName: 'index',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        '@codemonster-ru/ui-playground-core',
        '@codemonster-ru/ui-codeblock/view',
        /^@codemonster-ru\/ui-vue(?:\/.*)?$/,
      ],
    },
  },
});
