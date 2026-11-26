# CodeMonster UI Devtools

Standalone packages for Vue source highlighting and playgrounds. They follow a separate release
cadence from the CodeMonster UI design-system packages.

| Package | Public entry | Responsibility |
| --- | --- | --- |
| `@codemonster-ru/ui-codeblock` | `/view`, `/highlight` | Vue code rendering, copy controls, and lazy Shiki highlighting in SSR and the browser |
| `@codemonster-ru/ui-playground` | `/ui`, `/runtime` | Vue tabs, source and preview rendering, and browser session orchestration |
| `@codemonster-ru/ui-playground-core` | root | Sandboxed browser execution, TypeScript worker, and preview messaging |
| `@codemonster-ru/ui-playground-vite-plugin` | root | Vite virtual modules for configured local files |

CodeBlock and the Playground UI use CodeMonster UI 2.0. Start with the
[CodeBlock](packages/codeblock/README.md) and [Playground](packages/playground/README.md) package
guides for the stylesheet and Vue SSR entry points. The Vue components keep the existing
`VfCodeBlock` and `VfPlayground` names; their npm import paths change.

## Local verification

With Node.js 24.15+ and npm 11.17, run `npm ci` and `npm run check`. Until the CodeMonster UI
2.0 dependencies are published, use verified local tarballs through a test registry that serves
the required package names and versions.

Build and test before packing. Publish CodeMonster UI 2.0 first, then publish the CodeBlock and
Playground Core packages before the Playground UI adapter. The Vite plugin has an independent
publish order.

The source and tests originated at `codemonster-ru/ui@d9879116` before the VueForge packages were
archived. Those packages and their old npm versions are tracked in the archived VueForge project.
