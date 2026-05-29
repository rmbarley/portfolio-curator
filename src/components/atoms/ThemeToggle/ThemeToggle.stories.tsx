import ThemeToggle from "./ThemeToggle.astro";

export default {
  title: "Atoms/ThemeToggle",
  component: ThemeToggle,
};

export const DarkMode = {
  name: "Dark mode active",
};

export const LightMode = {
  name: "Light mode active",
  decorators: [
    (Story: () => unknown) => {
      document.documentElement.setAttribute("data-theme", "light");
      return Story();
    },
  ],
};
