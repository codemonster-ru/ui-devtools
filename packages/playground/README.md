# CodeMonster Playground

![npm version](https://img.shields.io/npm/v/@codemonster-ru/ui-playground)
![npm downloads](https://img.shields.io/npm/dm/@codemonster-ru/ui-playground)
![license](https://img.shields.io/npm/l/@codemonster-ru/ui-playground)

A Vue 3 UI adapter for running interactive code playground sessions.

Coordinated release: `@codemonster-ru/ui-playground@1.0.0`.

## Requirements

- Node.js 24.15 or newer for consumer tooling and SSR.
- Vue `^3.5.0`.
- CodeMonster UI CSS, tokens, and Vue adapter at `^2.0.0`.

## Install

```bash
npm install vue@^3.5.0 @codemonster-ru/ui-vue@^2.0.0 @codemonster-ru/ui-css@^2.0.0 @codemonster-ru/ui-tokens@^2.0.0 @codemonster-ru/ui-playground
```

```bash
pnpm add vue@^3.5.0 @codemonster-ru/ui-vue@^2.0.0 @codemonster-ru/ui-css@^2.0.0 @codemonster-ru/ui-tokens@^2.0.0 @codemonster-ru/ui-playground
```

```bash
yarn add vue@^3.5.0 @codemonster-ru/ui-vue@^2.0.0 @codemonster-ru/ui-css@^2.0.0 @codemonster-ru/ui-tokens@^2.0.0 @codemonster-ru/ui-playground
```

## Quick start

There is no root Playground export. Import the UI plugin from `/ui` and install it explicitly:

```ts
import { createApp } from 'vue';
import '@codemonster-ru/ui-tokens/tokens.css';
import '@codemonster-ru/ui-css/foundation.css';
import { VfPlaygroundPlugin } from '@codemonster-ru/ui-playground/ui';

const app = createApp({});
app.use(VfPlaygroundPlugin);
```

The browser `/ui` entry always loads Playground CSS. Explicit entries (`style.css`, `tokens.css`,
`critical.css`, and `playground.css`) are for SSR client stylesheets and CSS-only use; they do not
disable the public browser `/ui` auto-CSS wrapper. Load `tokens.css` first when composing granular
CSS entries.

## Lazy UI

```ts
import { VfPlaygroundAsync } from '@codemonster-ru/ui-playground/ui';
```

`VfPlaygroundAsync` provides async rendering and a skeleton fallback. Because `/ui` also exports the
synchronous component and plugin, importing this wrapper from `/ui` does not guarantee a separate UI
bundle. Dynamically import the entire `/ui` entry at a route or component boundary when bundle-level
UI deferral is required.

The sandbox runtime remains deferred until a browser session is created. The TypeScript compiler is
loaded separately only when the sandbox receives a `.ts` file or an inline `text/typescript` script.
It runs in a dedicated Web Worker so compiler parsing and transpilation do not block the Playground
UI. Component mode and JavaScript/HTML-only sandboxes do not download its roughly 1 MiB gzip worker.

Use `/runtime` only when creating sessions directly:

```ts
import { createPlaygroundSession } from '@codemonster-ru/ui-playground/runtime';
```

The package is ESM-only. SSR keeps the first render deterministic and delays iframe/session work
until mount. Node ESM `/ui` is CSS-free; import CodeMonster UI and Playground styles from the client entry.

## Runtime modes

Pass `component` to render an application-owned Vue component with an optional source view. Pass
`files`, `entry`, and `framework` to render editable sources in the sandboxed iframe. Keep app
components and sandboxed user code on their respective rendering paths.

## License

[MIT](https://github.com/codemonster-ru/ui-devtools/blob/main/packages/playground/LICENSE)
