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
  signals: "/api/signals.json",
} as const;

export const EXTERNAL = {
  nowNowNow: "https://nownownow.com",
  sivers: "https://sivers.org/nowff",
  rubric: "https://github.com/yourname/curator/blob/main/RUBRIC.md",
} as const;
