import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import { BOTTOM_NAV } from "../../../lib/nav";
import * as stories from "./SiteFooter.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("SiteFooter", () => {
  for (const [name, Story] of Object.entries(composed)) {
    test(name, async () => {
      await renderStory(Story);
      expect(document.body.querySelector(".site-footer")).toBeTruthy();

      const results = await axe.run(document.body, {
        runOnly: A11Y_TAGS,
        rules: { region: { enabled: false } },
      });
      expect(results.violations).toEqual([]);
    });
  }

  test("footer nav has accessible label", async () => {
    await renderStory(composed.Desktop);
    expect(document.body.querySelector('nav[aria-label="Footer"]')).toBeTruthy();
  });

  test("renders all BOTTOM_NAV links", async () => {
    await renderStory(composed.Desktop);
    const navLinks = document.body.querySelectorAll('nav[aria-label="Footer"] a');
    const hrefs = Array.from(navLinks).map((a) => a.getAttribute("href"));
    for (const url of Object.values(BOTTOM_NAV)) {
      expect(hrefs).toContain(url);
    }
  });

  test("copyright paragraph contains current year", async () => {
    await renderStory(composed.Desktop);
    const p = document.body.querySelector(".site-footer p");
    expect(p?.textContent).toContain(String(new Date().getFullYear()));
  });

  test("copyright paragraph contains expected copy", async () => {
    await renderStory(composed.Desktop);
    const p = document.body.querySelector(".site-footer p");
    expect(p?.textContent).toContain("Ryan");
    expect(p?.textContent).toContain("Written without AI");
  });
});
