import Link from "./Link.astro";

export default {
  title: "Atoms/Link",
  component: Link,
  args: { href: "#", children: "See all posts" },
};

// ─── Default (default variant) ──────────────────────────────────────────────────

export const Default = {
  args: { variant: "default" },
};

export const Hover = {
  args: { href: "#", children: "See all posts" },
  parameters: { pseudo: { hover: true } },
};

export const Focus = {
  args: { href: "#", variant: "default" },
  parameters: { pseudo: { focusVisible: true } },
};

// ─── External Link ──────────────────────────────────────────────────
export const External = {
  args: { variant: "default", external: true },
};

// ─── Variants ──────────────────────────────────────────────────
export const Mono = {
  args: { variant: "mono" },
};

export const Subtle = {
  args: { variant: "subtle" },
};
