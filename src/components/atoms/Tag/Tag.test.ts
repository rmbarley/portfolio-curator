import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./Tag.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Tag", () => {
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

  test("outlined variant renders border class", async () => {
    await renderStory(composed.Outlined);
    const tag = document.body.querySelector(".tag--outlined");
    expect(tag).toBeTruthy();
  });

  test("default variant has no border class", async () => {
    await renderStory(composed.Default);
    const tag = document.body.querySelector(".tag");
    expect(tag).toBeTruthy();
    expect(tag?.classList.contains("tag--outlined")).toBe(false);
  });
});
