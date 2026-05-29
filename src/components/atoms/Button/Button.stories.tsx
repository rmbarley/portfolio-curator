import { expect, fn, userEvent, within } from "storybook/test";
import Button from "./Button.astro";

export default {
  title: "Atoms/Button",
  component: Button,
};

// ─── Ghost (default variant) ──────────────────────────────────────────────────

export const Ghost = {
  args: { variant: "ghost", children: "See all posts" },
};

export const GhostSmall = {
  name: "Ghost · sm",
  args: { variant: "ghost", size: "sm", children: "See all posts" },
};

// ─── Primary ──────────────────────────────────────────────────────────────────

export const Primary = {
  args: { variant: "primary", children: "Read my work" },
};

export const PrimarySmall = {
  name: "Primary · sm",
  args: { variant: "primary", size: "sm", children: "Read my work" },
};

// ─── Chip ─────────────────────────────────────────────────────────────────────

export const ChipUnpressed = {
  name: "Chip (unpressed)",
  args: { variant: "chip", pressed: false, children: "Deep dive" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const chip = within(canvasElement).getByRole("button");
    await expect(chip).toHaveAttribute("aria-pressed", "false");
  },
};

export const ChipPressed = {
  name: "Chip (pressed)",
  args: { variant: "chip", pressed: true, children: "Deep dive" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const chip = within(canvasElement).getByRole("button");
    await expect(chip).toHaveAttribute("aria-pressed", "true");
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithLeadingIcon = {
  name: "With leading icon",
  args: { variant: "ghost", iconLeading: "AppWindowMac", children: "See all posts" },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();

    const spy = fn();
    button.addEventListener("click", spy);
    await userEvent.click(button);
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
