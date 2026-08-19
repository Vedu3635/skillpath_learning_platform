import * as React from "react"
import { INK, MUTED, FAINT, DASH, PAPER } from "../../constants/theme"

void React

export function CourseGridEmpty() {
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
                    textAlign: "center",
                    maxWidth: "360px",
                    background: PAPER,
                    padding: "34px 32px",
                    borderRadius: "18px",
                    border: `1px dashed ${DASH}`,
                }}
            >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px" }}>
                    <path d="M4 7a2 2 0 0 1 2-2h6l3 3h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke={FAINT} strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 800, color: INK }}>
                    No courses yet
                </h3>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.6, color: MUTED }}>
                    Once courses are published, they'll show up here.
                </p>
            </div>
        </div>
    )
}
