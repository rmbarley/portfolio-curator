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
      const previousTheme = document.documentElement.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", "light");

      queueMicrotask(() => {
        if (previousTheme) {
          document.documentElement.setAttribute("data-theme", previousTheme);
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      });

      return Story();
    },
  ],
};
