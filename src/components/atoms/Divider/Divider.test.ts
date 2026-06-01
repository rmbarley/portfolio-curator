import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./Divider.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Divider", () => {
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

  test("default renders <hr>", async () => {
    await renderStory(composed.Large);
    expect(document.body.querySelector("hr")).toBeTruthy();
  });

  test("decorative renders <div role=presentation>, not <hr>", async () => {
    await renderStory(composed.Decorative);
    expect(document.body.querySelector("hr")).toBeNull();
    expect(document.body.querySelector("div[role='presentation']")).toBeTruthy();
  });

  test("spacing classes are applied", async () => {
    await renderStory(composed.Small);
    expect(document.body.querySelector(".divider--sm")).toBeTruthy();

    document.body.innerHTML = "";
    await renderStory(composed.Medium);
    expect(document.body.querySelector(".divider--md")).toBeTruthy();

    document.body.innerHTML = "";
    await renderStory(composed.Large);
    expect(document.body.querySelector(".divider--lg")).toBeTruthy();
  });
});
