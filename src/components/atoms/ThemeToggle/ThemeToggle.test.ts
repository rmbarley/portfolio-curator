import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { expect, userEvent, within } from "storybook/test";
import { afterEach, beforeEach, describe, test } from "vitest";
import * as stories from "./ThemeToggle.stories";
import { initThemeToggle } from "./theme-toggle";

const composed = composeStories(stories);
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

beforeEach(() => {
  localStorage.removeItem("theme");
  document.documentElement.removeAttribute("data-theme");
});

afterEach(() => {
  document.body.innerHTML = "";
  localStorage.removeItem("theme");
  document.documentElement.removeAttribute("data-theme");
});

describe("ThemeToggle", () => {
  for (const [name, Story] of Object.entries(composed)) {
    test(name, async () => {
      const initial = name === "LightMode" ? "light" : "dark";
      const toggled = initial === "light" ? "dark" : "light";

      localStorage.setItem("theme", initial);
      await renderStory(Story);
      initThemeToggle();

      const button = within(document.body).getByRole("button");
      expect(button).toBeTruthy();
      expect(button).toHaveAttribute("aria-label", `Switch to ${toggled} theme`);
      expect(document.documentElement).toHaveAttribute("data-theme", initial);

      await userEvent.click(button);

      expect(document.documentElement).toHaveAttribute("data-theme", toggled);
      expect(localStorage.getItem("theme")).toBe(toggled);
      expect(button).toHaveAttribute("aria-label", `Switch to ${initial} theme`);

      const results = await axe.run(document.body, {
        runOnly: A11Y_TAGS,
        rules: { region: { enabled: false } },
      });
      expect(results.violations).toEqual([]);
    });
  }
});
