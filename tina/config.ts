import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Heading",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "lede",
            label: "Lede",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "body",
            label: "Body",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "channels",
            label: "Contact Channels",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label }),
            },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "value", label: "Display Value", required: true },
              { type: "string", name: "href", label: "URL" },
              {
                type: "string",
                name: "note",
                label: "Note",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "globals",
        label: "Site Globals",
        path: "content/globals",
        format: "json",
        match: { include: "site" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "siteTitle", label: "Site Title" },
          { type: "string", name: "brandName", label: "Brand Name (header wordmark)" },
          { type: "string", name: "footerCredit", label: "Footer Credit (copyright name)" },
          {
            type: "string",
            name: "footerTagline",
            label: "Footer Tagline",
          },
          {
            type: "object",
            name: "nav",
            label: "Primary Navigation",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "URL", required: true },
            ],
          },
          {
            type: "object",
            name: "bottomNav",
            label: "Footer Navigation",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "URL", required: true },
            ],
          },
        ],
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        match: { include: "index" },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "lede",
            label: "Lede",
            description: "Supports inline HTML (<em>, <strong>).",
          },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            description: "Supports inline HTML (<em>, <strong>).",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "aside",
            label: "Aside",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "asideLink",
            label: "Aside Link",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "URL" },
            ],
          },
          {
            type: "object",
            name: "primaryCta",
            label: "Primary CTA",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "URL" },
            ],
          },
          {
            type: "object",
            name: "secondaryCta",
            label: "Secondary CTA",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "URL" },
            ],
          },
        ],
      },
    ],
  },
});
