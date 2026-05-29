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
      localStorage.setItem("theme", name === "LightMode" ? "light" : "dark");

      await renderStory(Story);
      initThemeToggle();

      const button = within(document.body).getByRole("button");
      expect(button).toBeTruthy();
      expect(button).toHaveAttribute(
        "aria-label",
        name === "LightMode" ? "Switch to dark theme" : "Switch to light theme",
      );
      expect(document.documentElement).toHaveAttribute(
        "data-theme",
        name === "LightMode" ? "light" : "dark",
      );

      await userEvent.click(button);

      expect(document.documentElement).toHaveAttribute(
        "data-theme",
        name === "LightMode" ? "dark" : "light",
      );
      expect(localStorage.getItem("theme")).toBe(name === "LightMode" ? "dark" : "light");
      expect(button).toHaveAttribute(
        "aria-label",
        name === "LightMode" ? "Switch to light theme" : "Switch to dark theme",
      );

      const results = await axe.run(document.body, {
        runOnly: A11Y_TAGS,
        rules: { region: { enabled: false } },
      });
      expect(results.violations).toEqual([]);
    });
  }
});
