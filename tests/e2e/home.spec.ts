import { expect, test } from "@playwright/test";

// AC-HOME-01 — The hero lede is the page's H1.
test("AC-HOME-01 · exactly one h1 exists", async ({ page }) => {
  await page.goto("/");
  const h1s = page.locator("h1");
  await expect(h1s).toHaveCount(1);
});

// FLOW-05 — Correct landmark structure on the homepage.
test.describe("FLOW-05 · landmark structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has exactly one <main>", async ({ page }) => {
    await expect(page.locator("main")).toHaveCount(1);
  });

  test("has <header> landmark", async ({ page }) => {
    await expect(page.locator("header")).toHaveCount(1);
  });

  test("has <footer> landmark", async ({ page }) => {
    await expect(page.locator("footer")).toHaveCount(1);
  });

  test("all navs have distinct aria-labels", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Footer" })).toBeVisible();
  });

  test("exactly one h1", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
  });
});

// AC-HOME-09 — Skip link is the first focused element.
test("AC-HOME-09 · skip link is first tab stop and targets #main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#main");
});
