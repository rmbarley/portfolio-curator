import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./BaseLayout.stories";

const composed = composeStories(stories);
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("BaseLayout", () => {
  for (const [name, Story] of Object.entries(composed)) {
    test(name, async () => {
      await renderStory(Story);

      expect(document.body.querySelector(".site-header")).toBeTruthy();
      expect(document.body.querySelector(".site-footer")).toBeTruthy();
      expect(document.body.querySelector("main#main")).toBeTruthy();
      expect(document.body.querySelector(".skip-link")).toBeTruthy();

      const results = await axe.run(document.body, {
        runOnly: A11Y_TAGS,
        rules: { region: { enabled: false } },
      });
      expect(results.violations).toEqual([]);
    });
  }
});
