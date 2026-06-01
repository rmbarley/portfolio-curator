export const SITE_URL = "https://ryanbarley.com";

export const NAV = {
  Now: "/now",
  Writing: "/writing",
  Building: "/building",
  Reading: "/reading",
  Ask: "/ask",
  Resume: "/resume.pdf",
  Contact: "/contact",
} as const;

export const BOTTOM_NAV = {
  Now: "/now",
  Colophon: "/colophon",
  Feed: "/feed.xml",
} as const;

export const INTERNAL = {
  colophon: "/colophon", // "How I work" link in hero + footer
  syllabus: "/building#syllabus",
  feed: "/feed.xml",
  signals: "/api/signals.json", // Curator endpoint
} as const;

export const EXTERNAL = {
  github: "https://github.com/yourname",
  bluesky: "https://bsky.app/profile/yourname.bsky.social",
  mastodon: "https://hachyderm.io/@yourname",
  linkedin: "https://linkedin.com/in/yourname",
  nowNowNow: "https://nownownow.com", // Now page explainer aside
  sivers: "https://sivers.org/nowff", // "What is this?" explainer
  rubric: "https://github.com/yourname/curator/blob/main/RUBRIC.md",
} as const;
