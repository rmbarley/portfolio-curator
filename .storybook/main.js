import remarkGfm from "remark-gfm";

export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)", "../src/stories/**/*.mdx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "storybook-addon-pseudo-states"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  docs: {
    mdxPluginOptions: {
      mdxCompileOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  },
};
