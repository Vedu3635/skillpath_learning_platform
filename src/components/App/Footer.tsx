import * as React from "react"

void React

interface FooterProps {
    accentColor: string
}

export function Footer({ accentColor }: FooterProps) {
    return (
        <footer
            style={{
                width: "100%",
                marginTop: "48px",
                paddingTop: "24px",
                paddingBottom: "24px",
                borderTop: "1px solid var(--sp-border, #E5E7EB)",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    textAlign: "center",
                }}
            >
                {/* Nav Links */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "24px",
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="#courses"
                        style={{
                            color: accentColor,
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: 600,
                        }}
                    >
                        Courses
                    </a>

                    <a
                        href="#about"
                        style={{
                            color: accentColor,
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: 600,
                        }}
                    >
                        About
                    </a>

                    <a
                        href="#support"
                        style={{
                            color: accentColor,
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: 600,
                        }}
                    >
                        Support
                    </a>
                </nav>

                {/* Copyright */}
                <div
                    style={{
                        fontSize: "12px",
                        color: "var(--sp-muted, #9CA3AF)",
                    }}
                >
                    © {new Date().getFullYear()} Course Platform. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
