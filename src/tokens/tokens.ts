// AAR — generated from tokens.json. Não edite: rode npm run tokens.
export const themes = ["light","dark"] as const;
export type Theme = (typeof themes)[number];
export const colors = {
  "light": {
    "ground": "#F7FBFF",
    "surface": "#FFFFFF",
    "mist": "#DCE8FB",
    "action": "#2456E6",
    "action-deep": "#163A9E",
    "on-action": "#FFFFFF",
    "ink": "#0B1B33",
    "ink-soft": "#3B4B66",
    "inverse": "#0B1B33",
    "on-inverse": "#FFFFFF",
    "on-inverse-soft": "#C9D6EE",
    "on-inverse-accent": "#9DBBF5",
    "line": "#D6E2F5",
    "line-soft": "#E6EEF9",
    "line-pending": "#A9BCDB",
    "positive": "#1F7A4D",
    "positive-soft": "#E2F3EA",
    "warning": "#8A5A00",
    "warning-soft": "#FBEFD6",
    "negative": "#A23B1E",
    "negative-soft": "#F8E3DC"
  },
  "dark": {
    "ground": "#0B1B33",
    "surface": "#12264A",
    "mist": "#1B3463",
    "action": "#9DBBF5",
    "action-deep": "#C9D6EE",
    "on-action": "#0B1B33",
    "ink": "#F2F6FD",
    "ink-soft": "#B7C6DF",
    "inverse": "#F2F6FD",
    "on-inverse": "#0B1B33",
    "on-inverse-soft": "#3B4B66",
    "on-inverse-accent": "#2456E6",
    "line": "#2A4170",
    "line-soft": "#1E3359",
    "line-pending": "#4A6189",
    "positive": "#6BC79A",
    "positive-soft": "#173D33",
    "warning": "#E9B85C",
    "warning-soft": "#40331A",
    "negative": "#F0957A",
    "negative-soft": "#47231C"
  }
} as const;
export const spacing = {
  "space-4": "4px",
  "space-8": "8px",
  "space-12": "12px",
  "space-16": "16px",
  "space-20": "20px",
  "space-28": "28px",
  "space-40": "40px",
  "space-64": "64px",
  "space-96": "96px",
  "space-112": "112px",
  "space-120": "120px"
} as const;
export const radius = {
  "radius-bubble": "4px",
  "radius-sm": "12px",
  "radius-md": "16px",
  "radius-lg": "20px",
  "radius-xl": "28px",
  "radius-2xl": "32px",
  "radius-pill": "999px"
} as const;
