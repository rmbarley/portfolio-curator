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
    coverage: {
      provider: 'v8',
      // Scoped to .ts/.tsx logic only. Coverage on compiled .astro files is
      // noise (the compiler collapses the template into one function), so we
      // don't measure them. Stories are fixtures and *.test.ts is the harness.
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.*', '**/*.test.*', '**/*.d.ts'],
      reporter: ['text', 'html'],
      // Dormant for now: with no .ts/.tsx source the report is 0/0 and passes
      // vacuously. The gate auto-activates when the first logic module lands —
      // and since v8 counts un-imported files too, new untested code will fail.
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
