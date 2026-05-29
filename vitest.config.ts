import { defineConfig } from '@storybook-astro/framework/vitest';

// Astro components are SSR-only, so the Storybook addon-vitest browser mode
// (which renders client-side) can't run them. Instead we use the astro
// framework's portable-stories API: renderStory() server-renders each story's
// HTML into the DOM, then we run its play function against it. happy-dom gives
// us a DOM without a real browser (jsdom breaks esbuild's Uint8Array checks).
export default defineConfig({
  test: {
    name: 'storybook',
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
});
