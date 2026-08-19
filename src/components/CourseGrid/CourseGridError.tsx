import * as React from "react"
import { INK, MUTED, LINE, PAPER, MONO_FONT } from "../../constants/theme"

void React

interface CourseGridErrorProps {
    onRetry: () => void
}

export function CourseGridError({ onRetry }: CourseGridErrorProps) {
    return (
        <div
            className="cg-root"
            style={{
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
            }}
        >
            <div
                style={{
                    maxWidth: "380px",
                    textAlign: "center",
                    background: PAPER,
                    padding: "34px 32px",
                    borderRadius: "18px",
                    border: `1px solid ${LINE}`,
                }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px" }}>
                    <path d="M12 9v4M12 16.5h.01M10.29 3.86l-8.4 14.55A1.5 1.5 0 0 0 3.19 20.6h17.62a1.5 1.5 0 0 0 1.3-2.19L13.71 3.86a1.5 1.5 0 0 0-2.6 0Z" stroke="#B42318" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 800, color: INK, letterSpacing: "-0.01em" }}>
                    Courses didn't load
                </h3>

                <p style={{ margin: "0 0 22px", fontSize: "13.5px", lineHeight: 1.6, color: MUTED }}>
                    Check your connection and try again.
                </p>

                <button
                    type="button"
                    className="cg-retry cg-focusable"
                    onClick={onRetry}
                    style={{
                        border: "none",
                        borderRadius: "10px",
                        padding: "11px 22px",
                        background: INK,
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 700,
                        fontFamily: MONO_FONT,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                    }}
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
