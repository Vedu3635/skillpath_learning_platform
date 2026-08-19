export const INK = "var(--sp-ink, #12141C)"
export const MUTED = "var(--sp-muted, #5B6272)"
export const FAINT = "var(--sp-faint, #9297A6)"
export const PAPER = "var(--sp-card-bg, #FFFFFF)"
export const LINE = "var(--sp-card-border, #E4E6EC)"
export const DASH = "var(--sp-dash, #D3D6DE)"

export const DISPLAY_FONT =
    "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
export const MONO_FONT =
    "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');`

export const COLOR_PRESETS = [
    { label: 'Blue', color: '#2563EB' },
    { label: 'Purple', color: '#7C3AED' },
    { label: 'Emerald', color: '#059669' },
    { label: 'Crimson', color: '#DC2626' },
    { label: 'Pink', color: '#EC4899' },
]

export const THEME_STYLES = `
  .sp-root {
    --sp-radius: 18px;
  }
  .sp-root[data-theme="light"] {
    --sp-bg: #F5F6F8;
    --sp-sandbox-bg: #FBFBFC;
    --sp-surface: #FFFFFF;
    --sp-surface-alpha: rgba(255, 255, 255, 0.72);
    --sp-border: #E4E6EC;
    --sp-ink: #12141C;
    --sp-muted: #5B6272;
    --sp-faint: #9297A6;
    --sp-dash: #D3D6DE;
    --sp-card-bg: #FFFFFF;
    --sp-card-border: #E4E6EC;
    --sp-chip-bg: #F4F5F7;
    --sp-chip-text: #3F4453;
    --sp-toggle-bg: #F3F4F6;
    --sp-toggle-active-bg: #FFFFFF;
    --sp-skeleton-1: #EEF0F3;
    --sp-skeleton-2: #F7F8FA;
    --sp-estimated-bg: #FFF6E5;
    --sp-estimated-text: #9A6700;
    --sp-track-off: #D6D9E0;
    --sp-ring: #FFFFFF;
  }
  .sp-root[data-theme="dark"] {
    --sp-bg: #0A0C12;
    --sp-sandbox-bg: #0D1017;
    --sp-surface: #12151F;
    --sp-surface-alpha: rgba(18, 21, 31, 0.72);
    --sp-border: #262B3A;
    --sp-ink: #F2F3F6;
    --sp-muted: #8B90A0;
    --sp-faint: #737B92;
    --sp-dash: #2E3547;
    --sp-card-bg: #121520;
    --sp-card-border: #262B3A;
    --sp-chip-bg: #1C2130;
    --sp-chip-text: #C4C9D8;
    --sp-toggle-bg: #181D2A;
    --sp-toggle-active-bg: #282E42;
    --sp-skeleton-1: #181D2B;
    --sp-skeleton-2: #242B3E;
    --sp-estimated-bg: #35260A;
    --sp-estimated-text: #FBBF24;
    --sp-track-off: #334155;
    --sp-ring: #0A0C12;
  }
  .sp-root, .sp-root *, .sp-root *::before, .sp-root *::after {
    transition: background-color .32s ease, border-color .32s ease,
                color .32s ease, box-shadow .32s ease;
  }
  .sp-root {
    background-color: var(--sp-bg);
    color: var(--sp-ink);
  }
  .sp-nav {
    position: sticky;
    top: 0;
    z-index: 30;
    background-color: var(--sp-surface-alpha);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--sp-border);
  }
  .sp-nav-link {
    color: var(--sp-muted);
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 600;
  }
  .sp-nav-link:hover { color: var(--sp-ink); }
  .sp-focusable:focus-visible {
    outline: 2px solid var(--sp-ink);
    outline-offset: 2px;
  }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    .sp-root, .sp-root *, .sp-root *::before, .sp-root *::after,
    html { transition: none !important; scroll-behavior: auto !important; }
  }
`
