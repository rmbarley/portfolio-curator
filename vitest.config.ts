import { defineConfig } from "@storybook-astro/framework/vitest";

// Astro components are SSR-only, so the Storybook addon-vitest browser mode
// (which renders client-side) can't run them. Instead we use the astro
// framework's portable-stories API: renderStory() server-renders each story's
// HTML into the DOM, then we run its play function against it. happy-dom gives
// us a DOM without a real browser (jsdom breaks esbuild's Uint8Array checks).
export default defineConfig({
  test: {
    name: "storybook",
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
    testTimeout: 10000,
    coverage: {
      provider: "v8",
      // Scoped to .ts/.tsx logic only. Coverage on compiled .astro files is
      // noise (the compiler collapses the template into one function), so we
      // don't measure them. Stories are fixtures and *.test.ts is the harness.
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.stories.*", "**/*.test.*", "**/*.d.ts"],
      reporter: ["text", "html", "lcov"],
      // Coverage gate is currently disabled.
      thresholds: { lines: 0, functions: 0, branches: 0, statements: 0 },
    },
  },
});
