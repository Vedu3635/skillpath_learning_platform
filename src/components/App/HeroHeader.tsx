import * as React from "react"
import { MONO_FONT } from "../../constants/theme"

void React

interface HeroHeaderProps {
    accentColor: string
}

const STATS = [
    { value: "50K+", label: "Learners enrolled" },
    { value: "4.9 / 5", label: "Avg. course rating" },
    { value: "120+", label: "Tracks live" },
]

function UsersIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M16 4.3a3.2 3.2 0 0 1 0 6.2M18.5 20c0-2.9-1.9-5.3-4.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    )
}

function StarIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    )
}

function LayersIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const STAT_ICONS = [UsersIcon, StarIcon, LayersIcon]

const HERO_STYLES = `
    .hh-cta {
        transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;
    }
    .hh-cta:hover {
        transform: translateY(-2px);
        filter: brightness(1.05);
    }
    .hh-secondary {
        transition: color 0.15s ease, gap 0.15s ease;
    }
    .hh-secondary:hover {
        color: var(--sp-ink);
        gap: 9px;
    }
    .hh-stats {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap: wrap;
        row-gap: 18px;
    }
    .hh-stat {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 28px;
    }
    .hh-stat + .hh-stat {
        border-left: 1px dashed var(--sp-border, #E4E6EC);
    }
    @media (max-width: 560px) {
        .hh-stat + .hh-stat { border-left: none; }
        .hh-stat { padding: 0 16px; }
    }
`

export function HeroHeader({ accentColor }: HeroHeaderProps) {
    return (
        <header
            id="overview"
            style={{
                position: "relative",
                marginBottom: "48px",
                padding: "60px 24px 0",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "28px",
                background: "var(--sp-surface-alpha, rgba(255, 255, 255, 0.6))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--sp-border, #E4E6EC)",
                overflow: "hidden",
                boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.32s ease, border-color 0.32s ease",
            }}
        >
            <style>{HERO_STYLES}</style>

            {/* Ambient glow — kept subtle, secondary to the perforation signature below */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-160px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "560px",
                    height: "320px",
                    background: `radial-gradient(circle, ${accentColor}20 0%, ${accentColor}00 70%)`,
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    zIndex: 0,
                    transition: "background 0.4s ease",
                }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "720px" }}>
                {/* Headline */}
                <h1
                    style={{
                        fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                        fontWeight: 800,
                        margin: "0 0 16px 0",
                        letterSpacing: "-0.035em",
                        lineHeight: 1.08,
                        backgroundImage: `linear-gradient(125deg, var(--sp-ink) 25%, ${accentColor} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Accelerate your tech career with expert-led skill paths.
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        color: "var(--sp-muted)",
                        fontSize: "16px",
                        margin: "0 0 32px 0",
                        fontWeight: 500,
                        maxWidth: "560px",
                        lineHeight: 1.6,
                    }}
                >
                    Gain job-ready expertise in software engineering, UI design, product management, and data science through practical, structured course tracks.
                </p>

                {/* CTAs */}
                <div style={{ display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap", justifyContent: "center", marginBottom: "44px" }}>
                    <a
                        href="#preview"
                        className="sp-focusable hh-cta"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "13px 28px",
                            borderRadius: "12px",
                            background: accentColor,
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 700,
                            textDecoration: "none",
                            boxShadow: `0 8px 22px ${accentColor}38`,
                        }}
                    >
                        Browse courses
                    </a>
                </div>
            </div>

            {/* Perforation — the ticket-stub motif from the course cards, carried up
                into the hero so the whole page reads as one system rather than a
                generic hero bolted onto a component demo. */}
            <div style={{ position: "relative", width: "100%", zIndex: 1 }}>
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "-7px",
                        top: "0",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "var(--sp-bg, #F5F6F8)",
                        transform: "translateY(-50%)",
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        right: "-7px",
                        top: "0",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "var(--sp-bg, #F5F6F8)",
                        transform: "translateY(-50%)",
                    }}
                />
                <div style={{ borderTop: "1.5px dashed var(--sp-border, #E4E6EC)" }} />

                <div className="hh-stats" style={{ padding: "26px 24px" }}>
                    {STATS.map((stat, i) => {
                        const Icon = STAT_ICONS[i]
                        return (
                            <div className="hh-stat" key={stat.label}>
                                <span style={{ color: accentColor, display: "flex" }}>
                                    <Icon />
                                </span>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontFamily: MONO_FONT, fontSize: "17px", fontWeight: 700, color: "var(--sp-ink)", lineHeight: 1.2 }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: "11.5px", color: "var(--sp-muted)", fontWeight: 500 }}>
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </header>
    )
}