import "../src/styles/design-tokens.css";

// withThemeByDataAttribute uses React useEffect internally and never fires
// in @storybook-astro/framework. Use a plain-function decorator instead so
// data-theme is set synchronously on every story render.
function applyTheme(StoryFn, context) {
  const theme = context.globals?.theme ?? "dark";
  document.documentElement.setAttribute("data-theme", theme);
  return StoryFn();
}

export const globalTypes = {
  theme: {
    name: "Theme",
    defaultValue: "dark",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "dark", icon: "circle", title: "Dark" },
        { value: "light", icon: "circlehollow", title: "Light" },
      ],
      dynamicTitle: true,
    },
  },
};

const preview = {
  decorators: [applyTheme],
  parameters: {
    // Background is controlled entirely by data-theme + CSS custom properties.
    // Disabling the addon prevents its persisted globals from overpainting the canvas.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Fail CI on serious and critical Axe violations; warn on moderate/minor
      // region rule suppressed globally — @storybook-astro/framework doesn't
      // support synchronous DOM-node decorators, so we can't inject a <main>
      // wrapper at the preview level. Individual stories opt-in to landmarks
      // via their own markup (article, section, etc.).
      config: {
        rules: [{ id: "region", enabled: false }],
      },
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
        },
      },
      manual: false,
    },
  },
};
export default preview;
