import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./Time.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Time", () => {
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

  test("renders a <time> element", async () => {
    await renderStory(composed.Short);
    expect(document.body.querySelector("time")).toBeTruthy();
  });

  test("datetime attr is machine-readable ISO regardless of display format", async () => {
    await renderStory(composed.Long);
    const el = document.body.querySelector("time");
    expect(el?.getAttribute("datetime")).toBe("2026-09-20");
  });

  test("short format produces the dot-separated pattern", async () => {
    await renderStory(composed.Short);
    const text = document.body.querySelector("time")?.textContent?.trim() ?? "";
    expect(text).toMatch(/^[A-Z][a-z]+ \d+ · \d{4}$/);
  });

  test("long format produces the written-out date", async () => {
    await renderStory(composed.Long);
    const text = document.body.querySelector("time")?.textContent?.trim() ?? "";
    expect(text).toMatch(/^[A-Z][a-z]+ \d+, \d{4}$/);
  });

  test("relative format: 2 days ago", async () => {
    await renderStory(composed.DataTest_RelativeRespectsNow);
    expect(document.body.querySelector("time")?.textContent?.trim()).toBe("2 days ago");
  });

  test("relative format: yesterday", async () => {
    await renderStory(composed.DataTest_RelativeYesterday);
    expect(document.body.querySelector("time")?.textContent?.trim()).toBe("yesterday");
  });

  test("relative format: today", async () => {
    await renderStory(composed.Relative_Today);
    expect(document.body.querySelector("time")?.textContent?.trim()).toBe("today");
  });

  test("relative format: tomorrow", async () => {
    await renderStory(composed.Relative_Tomorrow);
    expect(document.body.querySelector("time")?.textContent?.trim()).toBe("tomorrow");
  });

  test("relative format: in X days", async () => {
    await renderStory(composed.Relative_InDays);
    expect(document.body.querySelector("time")?.textContent?.trim()).toBe("in 3 days");
  });

  test("relative format: in X weeks", async () => {
    await renderStory(composed.Relative_InWeeks);
    expect(document.body.querySelector("time")?.textContent?.trim()).toBe("in 3 weeks");
  });

  test("tabular prop adds tabular-nums class", async () => {
    await renderStory(composed.Tabular);
    expect(document.body.querySelector(".time--tabular")).toBeTruthy();
  });
});
