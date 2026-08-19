import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// Ensure React is referenced if using strict noUnusedLocals
void React


interface CourseGridProps {
    accentColor: string
    showCategory: boolean
}

export default function CourseGrid({
    accentColor,
    showCategory,
}: CourseGridProps) {
    return (
        <div
            style={{
                width: "100%",
                minHeight: "300px",
                padding: "24px",
                boxSizing: "border-box",
                fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "24px",
                }}
            >
                <div
                    style={{
                        border: "1px solid #E2E8F0",
                        borderRadius: "16px",
                        padding: "24px",
                        background: "#FFFFFF",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                >
                    {showCategory && (
                        <div
                            style={{
                                display: "inline-block",
                                fontSize: "12px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                backgroundColor: accentColor + "15",
                                color: accentColor,
                                marginBottom: "14px",
                            }}
                        >
                            Web Development
                        </div>
                    )}

                    <h3
                        style={{
                            margin: "0 0 10px",
                            fontSize: "19px",
                            fontWeight: 700,
                            color: "#0F172A",
                        }}
                    >
                        Course Preview
                    </h3>

                    <p
                        style={{
                            margin: "0 0 20px",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            color: "#64748B",
                        }}
                    >
                        Course data will appear here once the API is connected.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "12px",
                            borderTop: "1px solid #F1F5F9",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "22px",
                                fontWeight: 800,
                                color: accentColor,
                            }}
                        >
                            $99
                        </div>
                        <span
                            style={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#94A3B8",
                            }}
                        >
                            12 Modules
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

CourseGrid.defaultProps = {
    accentColor: "#2563EB",
    showCategory: true,
}

addPropertyControls(CourseGrid, {
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#2563EB",
    },

    showCategory: {
        type: ControlType.Boolean,
        title: "Show Category",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
})