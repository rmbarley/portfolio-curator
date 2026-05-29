import "../src/styles/design-tokens.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Fail CI on serious and critical Axe violations; warn on moderate/minor
      config: {},
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
