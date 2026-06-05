import { expect, within } from "storybook/test";
import Link from "./Link.astro";

export default {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: "#", children: "See all posts" },
  parameters: {
    docs: {
      description: {
        component:
          "Styled anchor with explicit variant control. Most prose links don't need this component — base `<a>` styles in `design-tokens.css` handle them. Reach for `Link` when you need a named variant: external indicator, monospace treatment, subtle footer link, or nav items.\n\n**Don'ts:** Don't use `variant=\"nav\"` in body copy — nav items have no underline, which fails WCAG for inline links. Don't fake an external link without `external={true}` — it skips the SR announcement and `rel` safety attributes. Don't pass `rel` or `target` to an external link — they're ignored.",
      },
    },
  },
};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default = {
  args: { variant: "default" },
  parameters: {
    docs: {
      description: {
        story:
          "Inherits the surrounding text color. The underline is faint at rest and snaps to `--accent` on hover. Use inside body copy, post footers, and citation lists.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          'Pass `external={true}` when the link leaves the site. Automatically adds `rel="noopener noreferrer"`, opens in `_blank`, renders a trailing icon (14px, decorative), and appends a visually-hidden "(opens in new tab)" span. You cannot override `rel` or `target` on an external link.',
      },
    },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Mono = {
  args: { variant: "mono" },
  parameters: {
    docs: {
      description: {
        story:
          "Monospace, muted, slightly smaller. Use for file paths, package names, or any link whose text is a technical identifier rather than prose.",
      },
    },
  },
};

export const Subtle = {
  args: { variant: "subtle" },
  parameters: {
    docs: {
      description: {
        story:
          "Muted color, normal typeface. Use for low-hierarchy navigation — footer links, 'back to top' utilities, supporting links inside a card.",
      },
    },
  },
};

export const Nav = {
  args: { variant: "nav", children: "Writing" },
  parameters: {
    docs: {
      description: {
        story:
          'Header navigation items. No underline, muted at rest, full text color on hover. Active state adds a 4px violet dot to the left via `::before` — triggered by `data-active="true"`. SiteHeader sets this from the `currentPath` prop.',
      },
    },
  },
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
