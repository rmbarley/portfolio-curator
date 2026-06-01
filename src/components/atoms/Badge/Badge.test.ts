import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./Badge.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Badge", () => {
  for (const [name, Story] of Object.entries(composed)) {
    test(name, async () => {
      await renderStory(Story);

      if (typeof Story.play === "function") {
        await Story.play({ canvasElement: document.body });
      }

      const results = await axe.run(document.body, {
        runOnly: A11Y_TAGS,
        rules: { region: { enabled: false } },
      });
      expect(results.violations).toEqual([]);
    });
  }

  test("highlight tone applies correct class", async () => {
    await renderStory(composed.NoAI);
    const badge = document.body.querySelector(".badge--highlight");
    expect(badge).toBeTruthy();
  });

  test("neutral tone applies correct class", async () => {
    await renderStory(composed.Grade);
    const badge = document.body.querySelector(".badge--neutral");
    expect(badge).toBeTruthy();
  });

  test("uppercase prop applies text-transform class", async () => {
    await renderStory(composed.NoAI);
    const badge = document.body.querySelector(".badge--uppercase");
    expect(badge).toBeTruthy();
  });

  test("non-uppercase badge has no uppercase class", async () => {
    await renderStory(composed.Grade);
    const badge = document.body.querySelector(".badge");
    expect(badge?.classList.contains("badge--uppercase")).toBe(false);
  });

  test("badge text alone conveys meaning (not color-only)", async () => {
    await renderStory(composed.NoAI);
    const badge = document.body.querySelector(".badge");
    expect(badge?.textContent?.trim()).toBeTruthy();
  });
});
