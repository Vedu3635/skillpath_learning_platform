import * as React from "react"
import { COLOR_PRESETS, MONO_FONT } from "../../constants/theme"

void React

interface ControlToolbarProps {
    accentColor: string
    showCategory: boolean
    onSetAccentColor: (color: string) => void
    onToggleShowCategory: () => void
}

export function ControlToolbar({
    accentColor,
    showCategory,
    onSetAccentColor,
    onToggleShowCategory,
}: ControlToolbarProps) {
    return (
        <div id="controls" style={{
            backgroundColor: 'var(--sp-surface-alpha)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 'var(--sp-radius)',
            padding: '20px 24px',
            marginBottom: '28px',
            border: '1px solid var(--sp-border)',
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* Accent color preset & custom picker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '13px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '11.5px', color: 'var(--sp-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Accent
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    backgroundColor: preset.color,
                                    border: active ? '2px solid var(--sp-ring)' : '2px solid transparent',
                                    boxShadow: active ? `0 0 0 2px ${preset.color}` : 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                            />
                        )
                    })}
                    <span style={{ width: '1px', height: '20px', backgroundColor: 'var(--sp-border)', margin: '0 2px' }} />
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
                        <input
                            type="color"
                            value={accentColor}
                            onChange={(e) => onSetAccentColor(e.target.value)}
                            style={{ width: '26px', height: '26px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent', padding: 0 }}
                        />
                        <span style={{ fontFamily: MONO_FONT, fontSize: '11.5px', color: 'var(--sp-muted)' }}>
                            {accentColor.toUpperCase()}
                        </span>
                    </label>
                </div>
            </div>

            {/* Show category toggle switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '11.5px', color: 'var(--sp-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Category
                </span>
                <button
                    role="switch"
                    aria-checked={showCategory}
                    onClick={onToggleShowCategory}
                    className="sp-focusable"
                    style={{
                        width: '38px',
                        height: '22px',
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
                        top: '3px',
                        left: showCategory ? '19px' : '3px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                    }} />
                </button>
            </div>
        </div>
    )
}
