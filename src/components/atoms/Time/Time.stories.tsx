import { expect } from "storybook/test";
import Time from "./Time.astro";

// Fixed reference point keeps all relative stories deterministic.
const NOW = "2026-09-22";

export default {
  title: "Atoms/Time",
  component: Time,
};

// ─── Short ────────────────────────────────────────────────────────────────────

export const Short = {
  args: { date: "2026-09-20", format: "short" },
};

// ─── Long ─────────────────────────────────────────────────────────────────────

export const Long = {
  args: { date: "2026-09-20", format: "long" },
};

// ─── Relative ─────────────────────────────────────────────────────────────────

export const Relative_Today = {
  name: "Relative · today",
  args: { date: NOW, format: "relative", now: NOW },
};

export const Relative_Yesterday = {
  name: "Relative · yesterday",
  args: { date: "2026-09-21", format: "relative", now: NOW },
};

export const Relative_DaysAgo = {
  name: "Relative · days ago",
  args: { date: "2026-09-20", format: "relative", now: NOW },
};

export const Relative_WeeksAgo = {
  name: "Relative · weeks ago",
  args: { date: "2026-09-01", format: "relative", now: NOW },
};

export const Relative_Tomorrow = {
  name: "Relative · tomorrow",
  args: { date: "2026-09-23", format: "relative", now: NOW },
};

export const Relative_InDays = {
  name: "Relative · in days",
  args: { date: "2026-09-25", format: "relative", now: NOW },
};

export const Relative_InWeeks = {
  name: "Relative · in weeks",
  args: { date: "2026-10-13", format: "relative", now: NOW },
};

// ─── Tabular ──────────────────────────────────────────────────────────────────

export const Tabular = {
  args: { date: "2026-09-20", format: "short", tabular: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const el = canvasElement.querySelector("time");
    expect(el?.classList.contains("time--tabular")).toBe(true);
  },
};

// ─── Data tests ───────────────────────────────────────────────────────────────

export const DataTest_DatetimeAttrIsISO = {
  name: "DataTest · datetime attr is ISO regardless of format",
  args: { date: "2026-09-20", format: "long" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const el = canvasElement.querySelector("time");
    await expect(el).toHaveAttribute("datetime", "2026-09-20");
  },
};

export const DataTest_RelativeRespectsNow = {
  name: "DataTest · relative format uses reference date",
  args: { date: "2026-09-20", format: "relative", now: "2026-09-22" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const el = canvasElement.querySelector("time");
    expect(el?.textContent?.trim()).toBe("2 days ago");
  },
};

export const DataTest_RelativeYesterday = {
  name: "DataTest · relative format shows 'yesterday' for 1 day ago",
  args: { date: "2026-09-21", format: "relative", now: "2026-09-22" },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const el = canvasElement.querySelector("time");
    expect(el?.textContent?.trim()).toBe("yesterday");
  },
};
