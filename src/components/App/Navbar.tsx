import * as React from "react"
import { SunIcon, MoonIcon, BrandMark } from "../Common/Icons"
import { COLOR_PRESETS, MONO_FONT } from "../../constants/theme"

void React

interface NavbarProps {
    accentColor: string
    showCategory: boolean
    isDarkMode: boolean
    onSetAccentColor: (color: string) => void
    onToggleShowCategory: () => void
    onToggleTheme: () => void
}

export function Navbar({
    accentColor,
    showCategory,
    isDarkMode,
    onSetAccentColor,
    onToggleShowCategory,
    onToggleTheme,
}: NavbarProps) {
    return (
        <nav className="sp-nav">
            <div style={{
                maxWidth: '1240px',
                margin: '0 auto',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                flexWrap: 'wrap',
            }}>
                {/* Brand logo */}
                <a href="#overview" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--sp-ink)' }}>
                    <BrandMark accentColor={accentColor} />
                    <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em' }}>Skillpath</span>
                </a>

                {/* Controls: Accent swatches (Dev mode only), Category switch & Theme toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {import.meta.env.DEV && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontWeight: 700, fontSize: '11px', color: 'var(--sp-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    Accent
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                    {COLOR_PRESETS.map((preset) => {
                                        const active = accentColor.toLowerCase() === preset.color.toLowerCase()
                                        return (
                                            <button
                                                key={preset.color}
                                                onClick={() => onSetAccentColor(preset.color)}
                                                aria-label={preset.label}
                                                aria-pressed={active}
                                                title={preset.label}
                                                className="sp-focusable"
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    backgroundColor: preset.color,
                                                    border: active ? '2px solid var(--sp-ring)' : '2px solid transparent',
                                                    boxShadow: active ? `0 0 0 2px ${preset.color}` : 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    transition: 'transform 0.15s ease',
                                                }}
                                            />
                                        )
                                    })}
                                    <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--sp-border)', margin: '0 2px' }} />
                                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                        <input
                                            type="color"
                                            value={accentColor}
                                            onChange={(e) => onSetAccentColor(e.target.value)}
                                            style={{ width: '24px', height: '24px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent', padding: 0 }}
                                        />
                                        <span style={{ fontFamily: MONO_FONT, fontSize: '11px', color: 'var(--sp-muted)', fontWeight: 600 }}>
                                            {accentColor.toUpperCase()}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--sp-border)' }} />
                        </>
                    )}

                    {/* Category Switch */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <span style={{ fontWeight: 700, fontSize: '11px', color: 'var(--sp-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Category
                        </span>
                        <button
                            role="switch"
                            aria-checked={showCategory}
                            onClick={onToggleShowCategory}
                            className="sp-focusable"
                            style={{
                                width: '36px',
                                height: '20px',
                                borderRadius: '999px',
                                border: 'none',
                                backgroundColor: showCategory ? accentColor : 'var(--sp-track-off)',
                                position: 'relative',
                                cursor: 'pointer',
                                padding: 0,
                                transition: 'background-color 0.2s ease',
                                flexShrink: 0,
                            }}
                        >
                            <span style={{
                                position: 'absolute',
                                top: '2px',
                                left: showCategory ? '18px' : '2px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: '#FFFFFF',
                                transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                            }} />
                        </button>
                    </div>

                    <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--sp-border)' }} />

                    {/* Theme toggle */}
                    <button
                        onClick={onToggleTheme}
                        aria-label="Toggle dark mode"
                        className="sp-focusable"
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '9px',
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
            </div>
        </nav>
    )
}
