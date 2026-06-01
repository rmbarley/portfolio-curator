import { expect, within } from "storybook/test";
import Tag from "./Tag.astro";

export default {
  title: "Atoms/Tag",
  component: Tag,
};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default = {
  args: { variant: "default", children: "deep dive" },
};

// ─── Outlined ─────────────────────────────────────────────────────────────────

export const Outlined = {
  args: { variant: "outlined", children: "FastAPI" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tag = within(canvasElement).getByText("FastAPI").closest("span");
    expect(tag).toBeTruthy();
    expect(tag?.classList.contains("tag--outlined")).toBe(true);
  },
};

// ─── Long text ────────────────────────────────────────────────────────────────

export const WithLongText = {
  name: "Default · Long text",
  args: {
    variant: "default",
    children: "deep dive · 1,800w · ~10 min",
  },
};

// ─── Multiple in a row ────────────────────────────────────────────────────────

export const MultipleInARow = {
  name: "Multiple in a row",
  render: () => ({
    html: `<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center">
      <span class="tag">deep dive</span>
      <span class="tag">1,800w</span>
      <span class="tag">~10 min</span>
    </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Tags render inline and sit comfortably next to each other.",
      },
    },
  },
};
