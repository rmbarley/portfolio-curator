import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Scope to tests/ — keeps Playwright away from the Vitest *.test.ts story tests in src/.
  testDir: "tests",
  // Use Astro's default port
  use: {
    baseURL: "http://localhost:4321/",
  },
  // Automatically start your Astro server before tests run
  webServer: {
    command: "npm run preview", // Or 'npm run dev' for development testing
    url: "http://localhost:4321/",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
