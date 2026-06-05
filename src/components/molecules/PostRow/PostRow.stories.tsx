import { expect, userEvent, within } from "storybook/test";
import PostRow from "./PostRow.astro";

export default {
  title: "Molecules/PostRow",
  component: PostRow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A writing list item with date, title link, description, and metadata badges. Used in the writing index to show one post per row. Only `date`, `title`, and `href` are required — all metadata fields are optional.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "All props present. Shows the complete metadata row: type tag, word count, reading time, NoAI badge, and grade badge.",
      },
    },
  },
};

export const WithoutDescription = {
  args: { ...baseArgs, description: undefined },
  parameters: {
    docs: {
      description: {
        story: "Without `description`, the title sits directly above the metadata row.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "`bordered={false}` removes the bottom border and bottom padding. Use on the last row in a list.",
      },
    },
  },
};

export const Reflection_Type = {
  name: "Reflection type",
  args: { ...baseArgs, type: "reflection" as const },
  parameters: {
    docs: {
      description: {
        story: "Personal retrospective posts. Tag renders 'reflection'.",
      },
    },
  },
};

export const Opinion_Type = {
  name: "Opinion type",
  args: { ...baseArgs, type: "opinion" as const },
  parameters: {
    docs: {
      description: {
        story: "Argument or position pieces. Tag renders 'opinion'.",
      },
    },
  },
};

export const DeepDive_Type = {
  name: "Deep Dive type",
  args: { ...baseArgs, type: "deep dive" as const },
  parameters: {
    docs: {
      description: {
        story: "Long-form analysis posts. Tag renders 'deep dive'.",
      },
    },
  },
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
