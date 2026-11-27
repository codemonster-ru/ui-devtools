# CodeMonster UI Devtools

CodeMonster UI Devtools provides Vue code blocks with syntax highlighting and interactive
playgrounds. These packages have their own releases and integrate with
[CodeMonster UI](https://github.com/codemonster-ru/ui).

## Get started

Use the [CodeBlock guide](packages/codeblock/README.md) to render highlighted code in Vue or
highlight code without a Vue view. The [Playground guide](packages/playground/README.md) covers
source tabs, previews, and the sandbox runtime. Both guides list their installation requirements,
stylesheet imports, and server-rendering entry points.

## Packages

| Package | Public entry | Use |
| --- | --- | --- |
| [`@codemonster-ru/ui-codeblock`](packages/codeblock/README.md) | `/view`, `/highlight` | Vue code blocks, copy controls, and lazy Shiki highlighting |
| [`@codemonster-ru/ui-playground`](packages/playground/README.md) | `/ui`, `/runtime` | Vue source tabs, previews, and browser sessions |
| [`@codemonster-ru/ui-playground-core`](packages/playground-core/README.md) | Root | Sandboxed browser execution, the TypeScript worker, and preview messaging |
| [`@codemonster-ru/ui-playground-vite-plugin`](packages/playground-vite-plugin/README.md) | Root | Vite virtual modules for configured local files |

CodeBlock and the Playground UI use CodeMonster UI 2.x. The Vue component names are
`VfCodeBlock` and `VfPlayground`. See the [VueForge migration guide](https://github.com/codemonster-ru/ui/blob/main/docs/migrate-from-vueforge.md)
for package and import changes.

## Development and support

With Node.js 24.15 or later and npm 11.17, run `npm ci` and `npm run check` to build, type-check,
and test the workspace. The [release workflow](.github/workflows/release-from-tag.yml) publishes
from Git tags.

Use [GitHub Issues](https://github.com/codemonster-ru/ui-devtools/issues) for questions and reproducible bugs.
Follow the [contribution guide](./CONTRIBUTING.md) to propose changes.
Report vulnerabilities through the [security policy](./SECURITY.md).

Licensed under the [MIT License](LICENSE).
