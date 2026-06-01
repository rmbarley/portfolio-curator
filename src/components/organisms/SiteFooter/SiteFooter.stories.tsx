import SiteFooter from "./SiteFooter.astro";

export default {
  title: "Organisms/SiteFooter",
  component: SiteFooter,
};

export const Desktop = {
  name: "Desktop",
};

export const Mobile = {
  name: "Mobile",
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
