import { expect, within } from "storybook/test";
import Link from "./Link.astro";

export default {
  title: "Atoms/Link",
  component: Link,
  args: { href: "#", children: "See all posts" },
};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default = {
  args: { variant: "default" },
};

export const Hover = {
  args: { variant: "default" },
  parameters: { pseudo: { hover: true } },
};

export const Focus = {
  args: { variant: "default" },
  parameters: { pseudo: { focusVisible: true } },
};

export const WithLongText = {
  name: "Default · Long text",
  args: {
    variant: "default",
    children: "A very long link that might wrap across multiple lines in a narrow container",
  },
};

// ─── External ─────────────────────────────────────────────────────────────────

export const External = {
  args: { variant: "default", external: true },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Mono = {
  args: { variant: "mono" },
};

export const Subtle = {
  args: { variant: "subtle" },
};

export const Nav = {
  args: { variant: "nav", children: "Writing" },
};

export const NavActive = {
  name: "Nav (active)",
  args: { variant: "nav", children: "Writing", "data-active": "true" },
};

// ─── Trailing icon ────────────────────────────────────────────────────────────

export const WithTrailingIcon = {
  name: "With trailing icon",
  args: { variant: "default", iconTrailing: "ArrowRight", children: "How I work" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const link = within(canvasElement).getByRole("link");
    const icon = link.querySelector("svg");
    expect(icon).toBeTruthy();
    await expect(icon).toHaveAttribute("aria-hidden", "true");
  },
};

// ─── Interaction tests ────────────────────────────────────────────────────────

export const InteractionTest_ExternalAddsRelAndIcon = {
  name: "InteractionTest · External link has rel, icon, and SR text",
  args: { variant: "default", external: true, children: "GitHub" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const link = within(canvasElement).getByRole("link");

    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("target", "_blank");

    const icon = link.querySelector("svg");
    expect(icon).toBeTruthy();
    await expect(icon).toHaveAttribute("aria-hidden", "true");

    const srText = link.querySelector(".sr-only");
    expect(srText).toBeTruthy();
    expect(srText?.textContent).toContain("opens in new tab");
  },
};

export const InteractionTest_ExternalIgnoresOverriddenRelAndTarget = {
  name: "InteractionTest · External link ignores rel/target overrides",
  args: {
    variant: "default",
    external: true,
    rel: "nofollow",
    target: "_self",
    children: "GitHub",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const link = within(canvasElement).getByRole("link");

    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("target", "_blank");
  },
};
