import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./Prose.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Prose", () => {
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

  test("renders a .prose wrapper", async () => {
    await renderStory(composed.Default_LongArticle);
    expect(document.body.querySelector(".prose")).toBeTruthy();
  });

  test("small size adds prose--small class", async () => {
    await renderStory(composed.Small_Sidebar);
    expect(document.body.querySelector(".prose--small")).toBeTruthy();
  });

  test("default size does not add prose--small class", async () => {
    await renderStory(composed.Default_LongArticle);
    const el = document.body.querySelector(".prose");
    expect(el?.classList.contains("prose--small")).toBe(false);
  });

  test("blockquote is present inside prose", async () => {
    await renderStory(composed.WithBlockquote);
    expect(document.body.querySelector("blockquote")).toBeTruthy();
  });

  test("code blocks are present inside prose", async () => {
    await renderStory(composed.WithCodeBlock);
    expect(document.body.querySelector("pre")).toBeTruthy();
    expect(document.body.querySelector("code")).toBeTruthy();
  });

  test("inline code is distinct from pre code", async () => {
    await renderStory(composed.WithInlineCode);
    const inlineCodes = document.body.querySelectorAll("p code");
    expect(inlineCodes.length).toBeGreaterThan(0);
    expect(document.body.querySelector("pre")).toBeNull();
  });
});
