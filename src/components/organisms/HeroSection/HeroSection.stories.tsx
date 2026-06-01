import { expect, within } from "storybook/test";
import HeroSection from "./HeroSection.astro";

const lede = "I write about the parts of software <em>engineers</em> still have to do.";
const intro =
  "<strong>Software engineer.</strong> Currently building AI-powered tools at Fountain Life. Recently finished an MS in Computer Science (AI concentration) at Georgia Tech. Writing my way from mid-level to staff in twelve months of structured study, in public.";
const aside =
  'Twenty essays this year, written without AI. The Curator, a learning agent I built to help me stay on top of all this, grades each one against a public rubric before it gets published. <a href="/colophon">How I work</a>';

export default {
  title: "Organisms/HeroSection",
  component: HeroSection,
  args: {
    primaryCta: { label: "Read the latest", href: "/writing" },
    secondaryCta: { label: "The syllabus", href: "/now" },
    lede,
    intro,
    aside,
  },
};

// ─── CTA variants ─────────────────────────────────────────────────────────────

export const BothCTAs = {
  name: "Both CTAs",
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const links = within(canvasElement).getAllByRole("link");

    expect(links.some((a) => a.textContent?.includes("Read the latest"))).toBe(true);
    expect(links.some((a) => a.textContent?.includes("The syllabus"))).toBe(true);
  },
};

export const PrimaryOnly = {
  name: "Primary CTA only",
  args: { secondaryCta: undefined },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(within(canvasElement).queryByText("The syllabus")).toBeNull();
    expect(within(canvasElement).getByText("Read the latest")).toBeTruthy();
  },
};

// ─── Aside variants ─────────────────────────────────────────────────────────────

export const WithAside = {
  name: "With aside",
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(canvasElement.querySelector("aside")).toBeTruthy();
  },
};

export const WithoutAside = {
  name: "Without aside",
  args: { aside: undefined },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(canvasElement.querySelector("aside")).toBeNull();
  },
};

// ─── Responsive ───────────────────────────────────────────────────────────────

export const Mobile = {
  name: "Mobile",
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// ─── A11y / semantics ───────────────────────────────────────────────────────────

export const RenderTest_LedeIsH1 = {
  name: "RenderTest · lede is the page h1",
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const h1 = within(canvasElement).getByRole("heading", { level: 1 });
    expect(h1.tagName.toLowerCase()).toBe("h1");
    expect(h1.textContent).toContain("I write about the parts of software");
  },
};

export const RenderTest_DOMOrder = {
  name: "RenderTest · lede precedes meta in DOM (despite visual swap)",
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const ordered = canvasElement.querySelectorAll("h1, .hero__meta");
    expect(ordered.length).toBe(2);
    expect(ordered[0].tagName.toLowerCase()).toBe("h1");
    expect(ordered[1].classList.contains("hero__meta")).toBe(true);
  },
};
