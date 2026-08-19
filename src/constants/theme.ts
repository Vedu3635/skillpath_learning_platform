export const INK = "#12141C"
export const MUTED = "#5B6272"
export const FAINT = "#9297A6"
export const PAPER = "#FFFFFF"
export const LINE = "#E4E6EC"
export const DASH = "#D3D6DE"

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
