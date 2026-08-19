import { useState, useEffect } from 'react'
import { CourseGrid } from './components/CourseGrid/CourseGrid'
import { Navbar } from './components/App/Navbar'
import { HeroHeader } from './components/App/HeroHeader'
import { Footer } from './components/App/Footer'
import { DISPLAY_FONT, THEME_STYLES } from './constants/theme'

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
    <div className="sp-root" data-theme={theme} style={{ minHeight: '100vh', fontFamily: DISPLAY_FONT, display: 'flex', flexDirection: 'column' }}>
      <style>{THEME_STYLES}</style>

      {/* Header Navbar with Merged Controls */}
      <Navbar
        accentColor={accentColor}
        showCategory={showCategory}
        isDarkMode={isDarkMode}
        onSetAccentColor={(color) => setAccentColor(color)}
        onToggleShowCategory={() => setShowCategory(!showCategory)}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '40px 20px 40px', boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero Section */}
        <HeroHeader accentColor={accentColor} />

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
          <CourseGrid accentColor={accentColor} showCategory={showCategory} />
        </main>

        {/* Footer with 3 navigation links and dynamic copyright year */}
        <Footer accentColor={accentColor} />
      </div>
    </div>
  )
}