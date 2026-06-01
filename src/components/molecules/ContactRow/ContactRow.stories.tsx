import { expect, within } from "storybook/test";
import ContactRow from "./ContactRow.astro";

export default {
  title: "Molecules/ContactRow",
  component: ContactRow,
  args: { label: "Email", value: "hello@ryanbarley.com" },
};

// ─── Href / no href ───────────────────────────────────────────────────────────

export const WithHref = {
  args: {
    label: "GitHub",
    value: "github.com/rmbarley",
    href: "https://github.com/rmbarley",
  },
};

export const WithoutHref = {
  name: "Without href (plain text)",
  args: {
    label: "Speaking",
    value: "Available",
    note: "2027 CFPs open. Topics: production AI evals, agent design.",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Plain-text value: there should be no link in the row.
    expect(within(canvasElement).queryByRole("link")).toBeNull();
  },
};

// ─── Note / no note ───────────────────────────────────────────────────────────

export const WithNote = {
  args: {
    href: "mailto:hello@ryanbarley.com",
    note: "I reply within a few days, sooner if it's substantive.",
  },
};

export const WithoutNote = {
  args: { href: "mailto:hello@ryanbarley.com" },
};

// ─── Link kinds ───────────────────────────────────────────────────────────────

export const MailtoLink = {
  name: "Mailto link (not external)",
  args: { href: "mailto:hello@ryanbarley.com" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const link = within(canvasElement).getByRole("link");
    await expect(link).toHaveAttribute("href", "mailto:hello@ryanbarley.com");
    // mailto is not "external" — no new tab, no rel rewrite.
    await expect(link).not.toHaveAttribute("target", "_blank");
  },
};

export const ExternalHttpsLink = {
  name: "External https link",
  args: {
    label: "Bluesky",
    value: "@ryanbarley.bsky.social",
    href: "https://bsky.app/profile/ryanbarley.bsky.social",
    note: "Active. Where most of the syllabus thinking happens out loud.",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const link = within(canvasElement).getByRole("link");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("target", "_blank");
  },
};

export const LongValue = {
  name: "Long value (wraps)",
  args: {
    label: "LinkedIn",
    value: "linkedin.com/in/a-very-long-profile-handle-that-should-wrap-gracefully",
    href: "https://linkedin.com/in/rmbarley",
  },
};

// ─── Semantic test ────────────────────────────────────────────────────────────

export const RenderTest_UsesDefinitionList = {
  name: "RenderTest · uses <dl><dt><dd>, not <div>s",
  args: { label: "Email", value: "hello@ryanbarley.com", href: "mailto:hello@ryanbarley.com" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const dl = canvasElement.querySelector("dl");
    expect(dl).toBeTruthy();

    const dt = dl?.querySelector("dt");
    const dd = dl?.querySelector("dd");
    expect(dt?.textContent).toContain("Email");
    expect(dd).toBeTruthy();
  },
};
