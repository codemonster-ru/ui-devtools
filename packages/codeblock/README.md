# CodeMonster UI CodeBlock

Vue 3 code blocks with Shiki syntax highlighting, line numbers, copy controls, and CodeMonster UI theming.

## Installation

The package requires Vue `^3.5.0` and Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`. The view uses the CodeMonster UI 2.x icon geometry and Vue adapter.

```bash
npm install vue@^3.5.0 @codemonster-ru/ui-codeblock
```

Import the named component from `/view`, or install the default plugin to register it in the app.

```vue
<script setup>
import { VfCodeBlock } from '@codemonster-ru/ui-codeblock/view';
</script>

<template>
  <VfCodeBlock code="const ready = true;" language="typescript" show-line-numbers />
</template>
```

Browser imports of `/view` include the component styles. Node ESM and CommonJS imports skip CSS. For SSR, load `@codemonster-ru/ui-codeblock/style.css` in the client stylesheet if the client entry does not import `/view`. The complete stylesheet includes the copy icon styles. When using individual sheets, load `@codemonster-ru/ui-css/icon.css` for the copy icon and load `tokens.css` before `critical.css` or `codeblock.css`.

The component inherits the nearest `data-cm-theme="light"` or `data-cm-theme="dark"` boundary. The `theme` prop can set either mode explicitly. The component-specific `--vf-codeblock-*` CSS variables are available for overrides atop the shared `--cm-*` tokens.

## Highlighting without the Vue view

```js
import { highlightCodeBlock } from '@codemonster-ru/ui-codeblock/highlight';

const html = await highlightCodeBlock('typescript', 'const ready = true;');
```

The `/highlight` entry is CSS-free. Shiki and its grammars load on demand. Vue SSR awaits highlighting through server prefetch. Use `allowedLanguages` to limit which grammars the runtime can request and `preloadCodeBlockLanguages` to warm up selected languages.

[Changelog](./CHANGELOG.md) · [MIT License](./LICENSE)
