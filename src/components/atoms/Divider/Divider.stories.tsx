import { expect } from "storybook/test";
import Divider from "./Divider.astro";

export default {
  title: "Atoms/Divider",
  component: Divider,
};

export const Small = {
  args: { spacing: "sm" },
};

export const Medium = {
  args: { spacing: "md" },
};

export const Large = {
  args: { spacing: "lg" },
};

export const Decorative = {
  args: { decorative: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const el = canvasElement.querySelector(".divider");
    expect(el?.tagName.toLowerCase()).toBe("div");
    expect(el?.getAttribute("role")).toBe("presentation");
  },
};

export const RenderTest_DecorativeIsNotAnnounced = {
  name: "RenderTest · Decorative renders div[role=presentation], not hr",
  args: { decorative: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(canvasElement.querySelector("hr")).toBeNull();
    const div = canvasElement.querySelector("div[role='presentation']");
    expect(div).toBeTruthy();
  },
};

export const RenderTest_DefaultRendersHr = {
  name: "RenderTest · Default renders semantic <hr>",
  args: { decorative: false },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(canvasElement.querySelector("hr")).toBeTruthy();
    expect(canvasElement.querySelector("[role='presentation']")).toBeNull();
  },
};
