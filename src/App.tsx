import { useState, useEffect } from 'react'
import CourseGrid from '../assets/CourseGrid'

const COLOR_PRESETS = [
  { label: 'Blue', color: '#2563EB' },
  { label: 'Purple', color: '#7C3AED' },
  { label: 'Emerald', color: '#059669' },
  { label: 'Crimson', color: '#DC2626' },
  { label: 'Pink', color: '#EC4899' },
]

const MONO_FONT = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
const DISPLAY_FONT = "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('skillpath_accent') || '#2563EB'
  })
  const [showCategory, setShowCategory] = useState(() => {
    const saved = localStorage.getItem('skillpath_show_category')
    return saved !== null ? saved === 'true' : true
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('skillpath_theme') === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('skillpath_accent', accentColor)
  }, [accentColor])

  useEffect(() => {
    localStorage.setItem('skillpath_show_category', String(showCategory))
  }, [showCategory])

  useEffect(() => {
    localStorage.setItem('skillpath_theme', isDarkMode ? 'dark' : 'light')
    document.body.style.backgroundColor = isDarkMode ? '#0A0C12' : '#F5F6F8'
    document.body.style.color = isDarkMode ? '#F2F3F6' : '#12141C'
    document.body.style.fontFamily = DISPLAY_FONT
  }, [isDarkMode])

  const panelBg = isDarkMode ? 'rgba(22, 25, 35, 0.72)' : 'rgba(255, 255, 255, 0.72)'
  const panelBorder = isDarkMode ? '#262B3A' : '#E4E6EC'
  const labelColor = isDarkMode ? '#8B90A0' : '#5B6272'
  const cardSurface = isDarkMode ? '#12151F' : '#FFFFFF'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0A0C12' : '#F5F6F8',
      color: isDarkMode ? '#F2F3F6' : '#12141C',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      padding: '48px 20px 60px',
      boxSizing: 'border-box',
      fontFamily: DISPLAY_FONT,
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* Hero — title gradient is live-linked to the accent control below,
            so changing it demonstrates the property control end to end. */}
        <header style={{ marginBottom: '34px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontFamily: MONO_FONT,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '14px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
            Framer code component · live preview
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 4vw, 2.9rem)',
            fontWeight: 800,
            margin: '0 0 10px 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            background: `linear-gradient(120deg, ${isDarkMode ? '#F2F3F6' : '#12141C'} 0%, ${accentColor} 115%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Skillpath Course Grid
          </h1>
          <p style={{
            color: labelColor,
            fontSize: '15px',
            margin: 0,
            fontWeight: 500,
            maxWidth: '560px',
            lineHeight: 1.55,
          }}>
            Regional pricing, ticket-style course cards, and the API fallback states — adjust the controls to see the component respond.
          </p>
        </header>

        {/* Control toolbar */}
        <div style={{
          background: panelBg,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: '18px',
          padding: '20px 24px',
          marginBottom: '28px',
          border: `1px solid ${panelBorder}`,
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Accent color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '13px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: '11.5px', color: labelColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Accent
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {COLOR_PRESETS.map((preset) => {
                const active = accentColor.toLowerCase() === preset.color.toLowerCase()
                return (
                  <button
                    key={preset.color}
                    onClick={() => setAccentColor(preset.color)}
                    aria-label={preset.label}
                    aria-pressed={active}
                    title={preset.label}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: preset.color,
                      border: active ? `2px solid ${isDarkMode ? '#0A0C12' : '#FFFFFF'}` : '2px solid transparent',
                      boxShadow: active ? `0 0 0 2px ${preset.color}` : 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                )
              })}
              <span style={{ width: '1px', height: '20px', background: panelBorder, margin: '0 2px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{ width: '26px', height: '26px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent', padding: 0 }}
                />
                <span style={{ fontFamily: MONO_FONT, fontSize: '11.5px', color: labelColor }}>
                  {accentColor.toUpperCase()}
                </span>
              </label>
            </div>
          </div>

          {/* Show category toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 700, fontSize: '11.5px', color: labelColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Category
            </span>
            <button
              role="switch"
              aria-checked={showCategory}
              onClick={() => setShowCategory(!showCategory)}
              style={{
                width: '38px',
                height: '22px',
                borderRadius: '999px',
                border: 'none',
                background: showCategory ? accentColor : (isDarkMode ? '#334155' : '#D6D9E0'),
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                padding: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: '3px',
                left: showCategory ? '19px' : '3px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#FFFFFF',
                transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }} />
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: `1px solid ${panelBorder}`,
              background: isDarkMode ? '#1B1F2B' : '#F4F5F7',
              color: isDarkMode ? '#F2F3F6' : '#12141C',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Sandbox */}
        <main style={{
          width: '100%',
          position: 'relative',
          background: isDarkMode ? '#0D1017' : '#FBFBFC',
          border: `1px solid ${panelBorder}`,
          borderRadius: '20px',
          padding: '10px',
          boxSizing: 'border-box',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontFamily: MONO_FONT,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: labelColor,
            textTransform: 'uppercase',
            background: cardSurface,
            border: `1px solid ${panelBorder}`,
            borderRadius: '999px',
            padding: '4px 10px',
            zIndex: 1,
          }}>
            Preview
          </div>
          <CourseGrid accentColor={accentColor} showCategory={showCategory} />
        </main>
      </div>
    </div>
  )
}