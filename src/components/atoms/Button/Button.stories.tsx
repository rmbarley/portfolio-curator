import { expect, fn, userEvent, within } from "storybook/test";
import Button from "./Button.astro";

export default {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'The only button atom. Every call-to-action, form submit, and filter toggle routes through `variant`. When you need a button that navigates, pass `as="a"` — the rendered HTML will be `<a>`, not `<button>`.\n\n**Don\'ts:** Two primary buttons side by side — one primary, one ghost. Chip as a nav link — use `ghost` + `as="a"` instead. Wrapping text inside a button — buttons are short labels. `<button onclick="navigate()">` for navigation — use `as="a"` + `href`.',
      },
    },
  },
};

// ─── Ghost (default variant) ──────────────────────────────────────────────────

export const Ghost = {
  args: { variant: "ghost", children: "See all posts" },
  parameters: {
    docs: {
      description: {
        story:
          "The default. Use for secondary actions — 'See all posts', 'View on GitHub', nav-adjacent CTAs where you want a visible control without competing with a primary action. Hover turns the text violet.",
      },
    },
  },
};

export const GhostSmall = {
  name: "Ghost · sm",
  args: { variant: "ghost", size: "sm", children: "See all posts" },
};

// ─── Primary ──────────────────────────────────────────────────────────────────

export const Primary = {
  args: { variant: "primary", children: "Read my work" },
  parameters: {
    docs: {
      description: {
        story:
          "One per view. Reserved for the single most important action — hero CTA, form submit. Multiple primaries on the same screen compete with each other; reach for ghost for secondary actions.",
      },
    },
  },
};

export const PrimarySmall = {
  name: "Primary · sm",
  args: { variant: "primary", size: "sm", children: "Read my work" },
  parameters: {
    docs: {
      description: {
        story:
          "`md` is the default and matches the base button in the mockup. Use `sm` for tight layouts — chip counts, inline toolbars, footer actions.",
      },
    },
  },
};

// ─── Chip ─────────────────────────────────────────────────────────────────────

export const ChipUnpressed = {
  name: "Chip (unpressed)",
  args: { variant: "chip", pressed: false, children: "Deep dive" },
  parameters: {
    docs: {
      description: {
        story:
          "A filter toggle. Used in `FilterChipGroup` on the writing index. Pill-shaped, monospace, muted by default. The `pressed` prop maps directly to `aria-pressed`.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const chip = within(canvasElement).getByRole("button");
    await expect(chip).toHaveAttribute("aria-pressed", "false");
  },
};

export const ChipPressed = {
  name: "Chip (pressed)",
  args: { variant: "chip", pressed: true, children: "Deep dive" },
  parameters: {
    docs: {
      description: {
        story:
          "Pressed state is surface-fill + full-text color — not the accent, just elevated contrast.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const chip = within(canvasElement).getByRole("button");
    await expect(chip).toHaveAttribute("aria-pressed", "true");
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithLeadingIcon = {
  name: "With leading icon",
  args: { variant: "ghost", iconLeading: "AppWindowMac", children: "See all posts" },
  parameters: {
    docs: {
      description: {
        story:
          "Pass Lucide icon names as `iconLeading` or `iconTrailing`, or provide custom SVG through the named slots. Icons render inside the flex container with a `0.4rem` gap; 20px is the correct size per the iconography spec.",
      },
    },
  },
};

export const WithTrailingIcon = {
  name: "With trailing icon",
  args: {
    variant: "primary",
    size: "md",
    children: "View project",
    iconTrailing: "ArrowRight",
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const DisabledPrimary = {
  name: "Disabled (primary)",
  args: { variant: "primary", disabled: true, children: "Submitting…" },
  parameters: {
    docs: {
      description: {
        story:
          'Uses `aria-disabled="true"` and `tabindex="-1"` rather than native `disabled`. This keeps the element in the DOM for screen readers while removing it from the tab sequence. `pointer-events: none` prevents mouse interaction.',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();

    const spy = fn();
    button.addEventListener("click", spy);
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await user.click(button);
    expect(spy).not.toHaveBeenCalled();
  },
};

export const DisabledGhost = {
  name: "Disabled (ghost)",
  args: { variant: "ghost", disabled: true, children: "Unavailable" },
};

// ─── As anchor ────────────────────────────────────────────────────────────────

export const AsLink = {
  name: "As <a>",
  args: {
    as: "a",
    href: "/about",
    variant: "ghost",
    children: "View on GitHub",
    iconTrailing: "ExternalLink",
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the action navigates, pass `as="a"` and `href`. This renders a semantic `<a>` — correct for screen readers and right-click behavior. Do not use `<button onclick="navigate()">` when a link is the right element.',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    expect(link.tagName.toLowerCase()).toBe("a");
    await expect(link).toHaveAttribute("href", "/about");
    expect(canvas.queryByRole("button")).toBeNull();
  },
};

export const AsLinkDisabled = {
  name: "As <a> (disabled)",
  args: { as: "a", variant: "ghost", disabled: true, children: "View on GitHub" },
  parameters: {
    docs: {
      description: {
        story:
          'For `<a>`, `disabled` strips `href` — without `href`, the anchor loses its link role, which is correct (a disabled link shouldn\'t be navigable). Uses `aria-disabled="true"` + `tabindex="-1"` instead of the native attribute.',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // <a> without href has no 'link' role — query by text instead
    const el = within(canvasElement).getByText("View on GitHub");
    const anchor = el.closest("a");

    expect(anchor).toBeTruthy();
    expect(anchor?.tagName.toLowerCase()).toBe("a");
    await expect(anchor).toHaveAttribute("aria-disabled", "true");
    await expect(anchor).toHaveAttribute("tabindex", "-1");
    await expect(anchor).not.toHaveAttribute("href");
  },
};

// ─── Interaction tests (behavior with no natural visual home) ─────────────────

export const InteractionTest_ClickFires = {
  name: "InteractionTest · Click fires handler",
  args: { variant: "primary", children: "Click me" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = within(canvasElement).getByRole("button");
    const spy = fn();
    button.addEventListener("click", spy);
    await userEvent.click(button);
    expect(spy).toHaveBeenCalledOnce();
  },
};

export const InteractionTest_KeyboardActivation = {
  name: "InteractionTest · Space and Enter both activate",
  args: { variant: "primary", children: "Keyboard test" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = within(canvasElement).getByRole("button");
    const spy = fn();
    button.addEventListener("click", spy);

    button.focus();
    await userEvent.keyboard(" ");
    expect(spy).toHaveBeenCalledOnce();

    await userEvent.keyboard("{Enter}");
    expect(spy).toHaveBeenCalledTimes(2);
  },
};
