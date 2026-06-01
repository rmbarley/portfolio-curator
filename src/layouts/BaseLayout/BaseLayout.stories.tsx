import BaseLayout from "./BaseLayout.astro";

export default {
  title: "Layouts/BaseLayout",
  component: BaseLayout,
};

export const HomePage = {
  name: "BaseLayout · HomePage",
  args: {
    title: "Ryan Barley",
    description: "Ryan's homepage and portfolio curator.",
    currentPath: "/",
    showThemeToggle: true,
    slots: {
      default: `
        <section>
          <h1>Writing, building, and curating the useful parts.</h1>
          <p>A focused home page composition with recent work, current notes, and a clear primary action.</p>
        </section>
      `,
    },
  },
};

export const NowPage = {
  name: "BaseLayout · NowPage",
  args: {
    title: "Now · Ryan Barley",
    description: "What Ryan is currently focused on.",
    currentPath: "/now",
    showThemeToggle: true,
    slots: {
      default: `
        <article>
          <h1>Now</h1>
          <p>Current focus: refining the content pipeline, tightening layout primitives, and keeping the site readable on small screens.</p>
        </article>
      `,
    },
  },
};
