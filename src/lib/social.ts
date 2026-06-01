export const SOCIAL = {
  email: {
    label: "Email",
    value: "hello@ryanbarley.com",
    href: "mailto:hello@ryanbarley.com",
    note: "I reply within a few days, sooner if it's substantive.",
  },
  bluesky: {
    label: "Bluesky",
    value: "@ryanbarley.bsky.social",
    href: "https://bsky.app/profile/ryanbarley.bsky.social",
    note: "Active. Where most of the syllabus thinking happens out loud.",
  },
  github: {
    label: "GitHub",
    value: "github.com/rmbarley",
    href: "https://github.com/rmbarley",
    note: "Public repos: the Curator, this site, the syllabus, MCP server.",
  },
  linkedin: {
    label: "LinkedIn",
    value: "linkedin.com/in/rmbarley",
    href: "https://linkedin.com/in/rmbarley",
    note: "I'm here but I post less. DMs open for legitimate inquiries.",
  },
  speaking: {
    label: "Speaking",
    value: "Available",
    note: "2027 CFPs open. Topics: production AI evals, agent design.",
  },
} as const;

export type Socials = typeof SOCIAL;
export type SocialName = keyof Socials;
export type Social = Socials[SocialName];

export const SOCIAL_ENTRIES = Object.entries(SOCIAL) as [SocialName, Social][];
