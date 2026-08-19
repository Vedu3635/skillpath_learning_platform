import * as React from "react"
import { MONO_FONT } from "../../constants/theme"

void React

interface HeroHeaderProps {
    accentColor: string
}

export function HeroHeader({ accentColor }: HeroHeaderProps) {
    return (
        <header id="overview" style={{ marginBottom: '34px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                margin: '0 0 12px 0',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                backgroundImage: `linear-gradient(120deg, var(--sp-ink) 0%, ${accentColor} 115%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                Skillpath Course Grid
            </h1>

            <p style={{
                color: 'var(--sp-muted)',
                fontSize: '15px',
                margin: 0,
                fontWeight: 500,
                maxWidth: '540px',
                lineHeight: 1.55,
            }}>
                Regional pricing, ticket-style course cards, and the API fallback states — adjust the controls to see the component respond.
            </p>
        </header>
    )
}
