import '@codemonster-ru/ui-css/tabs.css';
import './tokens.css';
import './critical.css';
import './playground.css';

import type { Component } from 'vue';
import { createAsyncWithSkeleton } from '@codemonster-ru/ui-vue';

export * from './index';
export const VfPlaygroundAsync = createAsyncWithSkeleton<Component>({
  loader: async () => {
    const module = await import('./VfPlayground.vue');

    return module.default;
  },
  delay: 0,
  radius: 'var(--vf-playground-radius-lg, var(--cm-radius-overlay))',
  defaultMinHeight: 'var(--vf-playground-height, var(--cm-breakpoint-xs, 480px))',
});
