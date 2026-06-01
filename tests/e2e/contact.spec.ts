import { expect, test } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  // AC-CONTACT-01 — All contact channels use semantic definition list.
  test("AC-CONTACT-01 · channels use <dl> with <dt>/<dd>", async ({ page }) => {
    const rows = page.locator("main dl");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i).locator("dt")).toHaveCount(1);
      await expect(rows.nth(i).locator("dd")).toHaveCount(1);
    }
  });

  // AC-CONTACT-02 — Email link uses mailto: protocol.
  test("AC-CONTACT-02 · email link uses mailto:", async ({ page }) => {
    const mailto = page.locator('main a[href^="mailto:"]');
    await expect(mailto).toHaveCount(1);
  });

  // AC-CONTACT-03 — External https links have rel="noopener noreferrer".
  test("AC-CONTACT-03 · external links have noopener noreferrer", async ({ page }) => {
    const externals = page.locator('main a[href^="https://"]');
    const count = await externals.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const rel = await externals.nth(i).getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });
});
