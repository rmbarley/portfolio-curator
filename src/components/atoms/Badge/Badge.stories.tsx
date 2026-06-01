import { expect, within } from "storybook/test";
import Badge from "./Badge.astro";

export default {
  title: "Atoms/Badge",
  component: Badge,
};

// ─── NoAI — highlight, uppercase ─────────────────────────────────────────────

export const NoAI = {
  name: "NoAI (highlight · uppercase)",
  args: { tone: "highlight", uppercase: true, children: "no AI" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const badge = within(canvasElement).getByText("no AI").closest("span");
    expect(badge).toBeTruthy();
    expect(badge?.classList.contains("badge--highlight")).toBe(true);
    expect(badge?.classList.contains("badge--uppercase")).toBe(true);
  },
};

// ─── Grade — neutral ──────────────────────────────────────────────────────────

export const Grade = {
  name: "Grade (neutral)",
  args: { tone: "neutral", uppercase: false, children: "graded 91/100" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const badge = within(canvasElement).getByText("graded 91/100").closest("span");
    expect(badge).toBeTruthy();
    expect(badge?.classList.contains("badge--neutral")).toBe(true);
    expect(badge?.classList.contains("badge--uppercase")).toBe(false);
  },
};

// ─── Stale — highlight, non-uppercase ────────────────────────────────────────

export const Stale = {
  name: "Stale (highlight · non-uppercase)",
  args: { tone: "highlight", uppercase: false, children: "updated 47 days ago" },
};
