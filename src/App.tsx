import { useState, useEffect } from 'react'
import CourseGrid from '../assets/CourseGrid'

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

  // Persist accentColor
  useEffect(() => {
    localStorage.setItem('skillpath_accent', accentColor)
  }, [accentColor])

  // Persist showCategory
  useEffect(() => {
    localStorage.setItem('skillpath_show_category', String(showCategory))
  }, [showCategory])

  // Persist theme & synchronize body background
  useEffect(() => {
    localStorage.setItem('skillpath_theme', isDarkMode ? 'dark' : 'light')
    document.body.style.backgroundColor = isDarkMode ? '#0f172a' : '#f8fafc'
    document.body.style.color = isDarkMode ? '#f8fafc' : '#0f172a'
  }, [isDarkMode])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
      color: isDarkMode ? '#F8FAFC' : '#0F172A',
      transition: 'all 0.3s ease',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            margin: '0 0 12px 0',
            background: isDarkMode
              ? 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)'
              : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Skillpath Course Grid
          </h1>
          <p style={{
            color: isDarkMode ? '#94A3B8' : '#64748B',
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: 500
          }}>
            Framer Code Component Local Preview & Testing Environment
          </p>
        </header>

        {/* Control Panel to emulate Framer Property Controls */}
        <div style={{
          background: isDarkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '40px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #E2E8F0',
          boxShadow: isDarkMode
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          gap: '28px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 600, fontSize: '14px', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
              Accent Color:
            </label>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 600, fontSize: '14px', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
              Show Category:
            </label>
            <input
              type="checkbox"
              checked={showCategory}
              onChange={(e) => setShowCategory(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 600, fontSize: '14px', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
              Theme:
            </label>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: isDarkMode ? '1px solid #475569' : '1px solid #CBD5E1',
                background: isDarkMode ? '#334155' : '#F1F5F9',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </div>

        {/* Component Sandbox */}
        <main style={{
          background: isDarkMode ? '#0F172A' : '#FFFFFF',
          border: isDarkMode ? '1px dashed #334155' : '1px dashed #CBD5E1',
          borderRadius: '24px',
          padding: '8px',
          boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s ease'
        }}>
          <CourseGrid accentColor={accentColor} showCategory={showCategory} />
        </main>
      </div>
    </div>
  )
}

