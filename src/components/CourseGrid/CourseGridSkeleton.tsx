import * as React from "react"
import { LINE, DASH, PAPER } from "../../constants/theme"

void React

export function CourseGridSkeleton() {
    return (
        <div className="cg-root" style={{ padding: "22px" }}>
            <div className="cg-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            border: `1px solid ${LINE}`,
                            borderRadius: "18px",
                            padding: "22px",
                            background: PAPER,
                            boxSizing: "border-box",
                        }}
                    >
                        <div className="cg-skeleton" style={{ width: "72px", height: "20px", marginBottom: "16px" }} />
                        <div className="cg-skeleton" style={{ width: "88%", height: "18px", marginBottom: "8px" }} />
                        <div className="cg-skeleton" style={{ width: "60%", height: "18px", marginBottom: "18px" }} />
                        <div className="cg-skeleton" style={{ width: "100%", height: "12px", marginBottom: "8px" }} />
                        <div className="cg-skeleton" style={{ width: "80%", height: "12px", marginBottom: "22px" }} />
                        <div style={{ borderTop: `1px dashed ${DASH}`, paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="cg-skeleton" style={{ width: "64px", height: "22px" }} />
                            <div className="cg-skeleton" style={{ width: "92px", height: "34px", borderRadius: "10px" }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
