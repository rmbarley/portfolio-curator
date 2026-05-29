import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./Button.stories";

// composeStories applies args/decorators and exposes each story's play function.
const composed = composeStories(stories);

// Mirrors the rule set configured for addon-a11y in .storybook/preview.js.
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  // renderStory writes into document.body; clear it so stories don't bleed together.
  document.body.innerHTML = "";
});

describe("Button", () => {
  for (const [name, Story] of Object.entries(composed)) {
    test(name, async () => {
      await renderStory(Story);
      expect(document.body.querySelector(".btn")).toBeTruthy();

      if (typeof Story.play === "function") {
        await Story.play({ canvasElement: document.body });
      }

      // Structural a11y (roles, names, ARIA) runs here. color-contrast comes back
      // as "incomplete" — happy-dom has no layout engine, so pixel-level checks
      // can't run. Those are covered against a real browser in the Playwright
      // e2e layer (see test-plan AC-HOME-07 / AC-POST-08).
      const results = await axe.run(document.body, {
        runOnly: A11Y_TAGS,
        // "region" requires all content to sit inside a landmark — a page-level
        // concern. Stories render a bare component with no surrounding <main>,
        // so it's a false positive here; the e2e layer checks landmarks.
        rules: { region: { enabled: false } },
      });
      expect(results.violations).toEqual([]);
    });
  }
});
