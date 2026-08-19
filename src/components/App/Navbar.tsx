import * as React from "react"
import { SunIcon, MoonIcon, BrandMark } from "../Common/Icons"
import { MONO_FONT } from "../../constants/theme"

void React

interface NavbarProps {
    accentColor: string
    isDarkMode: boolean
    onToggleTheme: () => void
}

export function Navbar({ accentColor, isDarkMode, onToggleTheme }: NavbarProps) {
    return (
        <nav className="sp-nav">
            <div style={{
                maxWidth: '1240px',
                margin: '0 auto',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
            }}>
                <a href="#overview" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--sp-ink)' }}>
                    <BrandMark accentColor={accentColor} />
                    <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.01em' }}>Skillpath</span>
                    <span style={{ fontFamily: MONO_FONT, fontSize: '10px', fontWeight: 600, color: 'var(--sp-muted)', border: '1px solid var(--sp-border)', borderRadius: '999px', padding: '2px 8px', letterSpacing: '0.04em' }}>
                        UI KIT
                    </span>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
                    <a href="#overview" className="sp-nav-link">Overview</a>
                    <a href="#controls" className="sp-nav-link">Controls</a>
                    <a href="#preview" className="sp-nav-link">Preview</a>
                </div>

                <button
                    onClick={onToggleTheme}
                    aria-label="Toggle dark mode"
                    className="sp-focusable"
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        border: '1px solid var(--sp-border)',
                        background: 'var(--sp-surface)',
                        color: 'var(--sp-ink)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color .32s ease, border-color .32s ease, color .32s ease',
                        flexShrink: 0,
                    }}
                >
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </nav>
    )
}
