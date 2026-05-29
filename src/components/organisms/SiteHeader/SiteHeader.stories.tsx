import { expect, within } from "storybook/test";
import SiteHeader from "./SiteHeader.astro";

export default {
  title: "Organisms/SiteHeader",
  component: SiteHeader,
  args: { currentPath: "" },
};

// ─── Desktop ──────────────────────────────────────────────────────────────────

export const DesktopDefault = {
  name: "Desktop · Default",
};

export const DesktopNowActive = {
  name: "Desktop · Now active",
  args: { currentPath: "/now" },
};

export const DesktopWritingActive = {
  name: "Desktop · Writing active",
  args: { currentPath: "/writing" },
};

// ─── Mobile (CSS-only stacked layout at ≤480px) ───────────────────────────────

export const MobileDefault = {
  name: "Mobile · Default",
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const MobileStacked = {
  name: "Mobile · Nav stacked",
  args: { currentPath: "/now" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// ─── Interaction tests ────────────────────────────────────────────────────────

export const InteractionTest_ActiveLinkDataAttr = {
  name: "InteractionTest · Active link gets data-active",
  args: { currentPath: "/now" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const nowLink = canvas.getByRole("link", { name: "Now" });
    await expect(nowLink).toHaveAttribute("data-active", "true");

    const writingLink = canvas.getByRole("link", { name: "Writing" });
    await expect(writingLink).toHaveAttribute("data-active", "false");
  },
};
