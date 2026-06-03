import { composeStories, renderStory } from "@storybook-astro/framework/testing";
import axe from "axe-core";
import { afterEach, describe, expect, test } from "vitest";
import * as stories from "./PostRow.stories";

const composed = composeStories(stories);

const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("PostRow", () => {
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

  test("renders exactly one link wrapping the title", async () => {
    await renderStory(composed.Full);
    const links = document.body.querySelectorAll("a");
    expect(links).toHaveLength(1);
    expect(links[0].textContent?.trim()).toBe(
      "I spent a week looking at LLM traces by hand. Here's what I found.",
    );
  });

  test("reading time span has aria-label='estimated reading time'", async () => {
    await renderStory(composed.Full);
    const span = document.body.querySelector('[aria-label="estimated reading time"]');
    expect(span).not.toBeNull();
    expect(span?.textContent).toMatch(/min/);
  });

  test("date column renders <time> with correct datetime attribute", async () => {
    await renderStory(composed.Full);
    const time = document.body.querySelector("time");
    expect(time).not.toBeNull();
    expect(time?.getAttribute("datetime")).toBe("2026-09-20");
  });

  test("no-AI badge rendered when noAI=true", async () => {
    await renderStory(composed.Full);
    const badge = document.body.querySelector(".badge--highlight");
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim().toLowerCase()).toMatch(/no ai/);
  });

  test("grade badge rendered when grade is provided", async () => {
    await renderStory(composed.Full);
    const badge = document.body.querySelector(".badge--neutral");
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toMatch(/91/);
  });

  test("grade badge absent when grade is not provided", async () => {
    await renderStory(composed.WithoutGrade);
    const badge = document.body.querySelector(".badge--neutral");
    expect(badge).toBeNull();
  });

  test("description renders when provided", async () => {
    await renderStory(composed.Full);
    const desc = document.body.querySelector(".post-row__desc");
    expect(desc).not.toBeNull();
  });

  test("description absent when not provided", async () => {
    await renderStory(composed.WithoutDescription);
    const desc = document.body.querySelector(".post-row__desc");
    expect(desc).toBeNull();
  });

  test("post-row--borderless class applied when bordered=false", async () => {
    await renderStory(composed.LastInList_NoBottomBorder);
    const article = document.body.querySelector("article");
    expect(article?.classList.contains("post-row--borderless")).toBe(true);
  });

  test("border class absent when bordered=true (default)", async () => {
    await renderStory(composed.Full);
    const article = document.body.querySelector("article");
    expect(article?.classList.contains("post-row--borderless")).toBe(false);
  });

  test("type tag rendered when type is provided", async () => {
    await renderStory(composed.Full);
    const tags = document.body.querySelectorAll(".tag");
    const typeTag = Array.from(tags).find((t) => t.textContent?.includes("deep dive"));
    expect(typeTag).not.toBeNull();
  });
});
