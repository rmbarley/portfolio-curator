import { expect, userEvent, within } from "storybook/test";
import PostRow from "./PostRow.astro";

export default {
  title: "Molecules/PostRow",
  component: PostRow,
};

const baseArgs = {
  date: "2026-09-20",
  title: "I spent a week looking at LLM traces by hand. Here's what I found.",
  href: "#",
  description:
    "Aggregate metrics are dangerous without error analysis. A taxonomy of three failure modes the Curator hides from every dashboard it has.",
  type: "deep dive" as const,
  wordCount: 1800,
  readingTime: 10,
  noAI: true,
  grade: 91,
};

// ─── Render stories (visual + a11y) ──────────────────────────────────────────

export const Full = {
  args: { ...baseArgs },
};

export const WithoutDescription = {
  args: { ...baseArgs, description: undefined },
};

export const WithoutGrade = {
  args: { ...baseArgs, grade: undefined },
};

export const WithLongTitle = {
  args: {
    ...baseArgs,
    title:
      "Bounded contexts are the best idea in software architecture, and now LLMs make them necessary — a deep dive into twenty years of DDD discipline.",
  },
};

export const LastInList_NoBottomBorder = {
  name: "LastInList (no bottom border)",
  args: { ...baseArgs, bordered: false },
};

export const Reflection_Type = {
  name: "Reflection type",
  args: { ...baseArgs, type: "reflection" as const },
};

export const Opinion_Type = {
  name: "Opinion type",
  args: { ...baseArgs, type: "opinion" as const },
};

export const DeepDive_Type = {
  name: "Deep Dive type",
  args: { ...baseArgs, type: "deep dive" as const },
};

// ─── Interaction tests ────────────────────────────────────────────────────────

export const InteractionTest_TitleIsTheOnlyLink = {
  args: { ...baseArgs },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const links = within(canvasElement).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent(baseArgs.title);
  },
};

export const InteractionTest_ReadingTimeAriaLabel = {
  args: { ...baseArgs },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const span = canvasElement.querySelector('[aria-label="estimated reading time"]');
    expect(span).not.toBeNull();
    expect(span?.textContent).toMatch(/min/);
  },
};

export const KeyboardTest_TabToTitle = {
  args: { ...baseArgs },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    canvasElement.focus();
    await userEvent.tab();
    const link = within(canvasElement).getByRole("link");
    expect(link).toHaveFocus();
  },
};
