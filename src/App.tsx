import { useState, useEffect } from 'react'
import { CourseGrid } from './components/CourseGrid/CourseGrid'
import { Navbar } from './components/App/Navbar'
import { HeroHeader } from './components/App/HeroHeader'
import { ControlToolbar } from './components/App/ControlToolbar'
import { DISPLAY_FONT, MONO_FONT, THEME_STYLES } from './constants/theme'

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
  }, [isDarkMode])

  const theme = isDarkMode ? 'dark' : 'light'

  return (
    <div className="sp-root" data-theme={theme} style={{ minHeight: '100vh', fontFamily: DISPLAY_FONT }}>
      <style>{THEME_STYLES}</style>

      {/* Header Navbar */}
      <Navbar
        accentColor={accentColor}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '44px 20px 60px' }}>
        {/* Hero Section */}
        <HeroHeader accentColor={accentColor} />

        {/* Control Toolbar */}
        <ControlToolbar
          accentColor={accentColor}
          showCategory={showCategory}
          onSetAccentColor={(color) => setAccentColor(color)}
          onToggleShowCategory={() => setShowCategory(!showCategory)}
        />

        {/* Component Sandbox Container */}
        <main id="preview" style={{
          width: '100%',
          position: 'relative',
          backgroundColor: 'var(--sp-sandbox-bg)',
          border: '1px solid var(--sp-border)',
          borderRadius: '20px',
          padding: '10px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontFamily: MONO_FONT,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--sp-muted)',
            textTransform: 'uppercase',
            backgroundColor: 'var(--sp-surface)',
            border: '1px solid var(--sp-border)',
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