import { expect, within } from "storybook/test";
import Heading from "./Heading.astro";

export default {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Semantic heading with the Fraunces display treatment. `level` and `visualSize` are independent — the HTML element is always driven by `level`. Use `visualSize` only when document structure and visual hierarchy genuinely diverge.\n\n**Don'ts:** Don't skip heading levels — use `visualSize` if the visual size needs to change. Don't demote `level` just for a smaller appearance. Don't use `softness=100` for primary headings — it reads as decorative at large sizes. Don't place more than one `<h1>` per page.",
      },
    },
  },
};

// ─── Semantic levels at default visual size ───────────────────────────────────

export const H1_DefaultSize = {
  name: "h1 · default size (step-6)",
  args: { level: 1, children: "The work that got me here" },
  parameters: {
    docs: {
      description: {
        story:
          "Each level has a default visual size matching the type scale in `design-tokens.css`. These defaults are correct for most uses — only override with `visualSize` when document structure and visual hierarchy genuinely diverge.",
      },
    },
  },
};

export const H2_Default = {
  name: "h2 · default (step-4)",
  args: { level: 2, children: "Recent writing" },
};

export const H3_Default = {
  name: "h3 · default (step-2)",
  args: { level: 3, children: "On reading carefully" },
};

export const H4_Default = {
  name: "h4 · default (step-1)",
  args: { level: 4, children: "A note on sources" },
};

// ─── Visual size override ─────────────────────────────────────────────────────

export const H1_SmallerVisual = {
  name: "h1 · step-4 visual override",
  args: { level: 1, visualSize: "4", children: "Section title (h1, smaller)" },
  parameters: {
    docs: {
      description: {
        story:
          "Use `visualSize` when the semantic level and visual weight need to differ — e.g., an `<h2>` in a narrow sidebar where step-4 would be too loud. The HTML element is still the correct semantic level; screen readers and document outlines are unaffected.",
      },
    },
  },
};

// ─── Softness axis ────────────────────────────────────────────────────────────

export const Soft30 = {
  name: "softness=30 (tight — hero)",
  args: { level: 1, softness: 30, children: "I build things that last." },
  parameters: {
    docs: {
      description: {
        story:
          "Fraunces `SOFT` axis at 30 — tight, high-contrast strokes. Use for hero headings and anywhere you want Fraunces to feel confident rather than warm.",
      },
    },
  },
};

export const Soft60 = {
  name: "softness=60 (default)",
  args: { level: 2, softness: 60, children: "Recent writing" },
  parameters: {
    docs: {
      description: {
        story: "The default. A balanced middle ground, right for most section headings.",
      },
    },
  },
};

export const Soft100 = {
  name: "softness=100 (warm — blockquotes, italics)",
  args: { level: 2, softness: 100, children: "A warm, looser heading" },
  parameters: {
    docs: {
      description: {
        story:
          "Open, loose, slightly whimsical. Reserve for blockquote callouts or wherever the editorial tone is warmer. Don't use for primary headings — it reads as decorative at large sizes.",
      },
    },
  },
};

// ─── Balance ──────────────────────────────────────────────────────────────────

export const WithBalance = {
  name: "balance=true (h3 explicit override)",
  args: {
    level: 3,
    balance: true,
    children: "A long-ish subsection heading that benefits from balanced wrapping",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`text-wrap: balance` distributes text across lines to avoid a single orphaned word on the last line. Defaults `true` for h1/h2, `false` for h3/h4.",
      },
    },
  },
};

export const WithoutBalance = {
  name: "balance=false (long heading wraps ragged)",
  args: {
    level: 1,
    balance: false,
    children: "This long heading does not have text-wrap balance applied so it wraps naturally",
  },
};

// ─── Render tests ─────────────────────────────────────────────────────────────
// RenderTest_LevelPropDrivesElement split into four stories so each level is
// individually named in the test run and the visual snapshot is stored separately.

export const RenderTest_Level1 = {
  name: "RenderTest · level=1 renders <h1>",
  args: { level: 1, children: "Level one heading" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const heading = within(canvasElement).getByRole("heading", { level: 1 });
    expect(heading.tagName.toLowerCase()).toBe("h1");
  },
};

export const RenderTest_Level2 = {
  name: "RenderTest · level=2 renders <h2>",
  args: { level: 2, children: "Level two heading" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const heading = within(canvasElement).getByRole("heading", { level: 2 });
    expect(heading.tagName.toLowerCase()).toBe("h2");
  },
};

export const RenderTest_Level3 = {
  name: "RenderTest · level=3 renders <h3>",
  args: { level: 3, children: "Level three heading" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const heading = within(canvasElement).getByRole("heading", { level: 3 });
    expect(heading.tagName.toLowerCase()).toBe("h3");
  },
};

export const RenderTest_Level4 = {
  name: "RenderTest · level=4 renders <h4>",
  args: { level: 4, children: "Level four heading" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const heading = within(canvasElement).getByRole("heading", { level: 4 });
    expect(heading.tagName.toLowerCase()).toBe("h4");
  },
};

export const RenderTest_VisualSizeOverridesDefault = {
  name: "RenderTest · visualSize overrides default (h2 at step-6)",
  args: { level: 2, visualSize: "6", children: "Big h2, semantic level preserved" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const heading = within(canvasElement).getByRole("heading", { level: 2 });
    // Semantic level is h2
    expect(heading.tagName.toLowerCase()).toBe("h2");
    // Size class confirms step-6 is applied (CSS env won't resolve clamp(), so check class)
    expect(heading.classList.contains("heading--6")).toBe(true);
    expect(heading.classList.contains("heading--4")).toBe(false);
  },
};
