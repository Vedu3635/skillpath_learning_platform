import * as React from "react"
import { Course } from "../../types/course"
import { formatPrice } from "../../services/courseApi"
import { INK, MUTED, LINE, DASH, PAPER, MONO_FONT } from "../../constants/theme"

void React

interface CourseCardProps {
    course: Course
    country: "IN" | "US" | null
    countryFailed: boolean
    accentColor: string
    showCategory: boolean
    idx: number
}

export function CourseCard({
    course,
    country,
    countryFailed,
    accentColor,
    showCategory,
    idx,
}: CourseCardProps) {
    const hasAttributeChips = course.shortCourse || course.refundable

    return (
        <div
            className="cg-ticket cg-card"
            style={{
                ["--cg-accent" as any]: accentColor,
                display: "flex",
                flexDirection: "column",
                border: `1px solid ${LINE}`,
                borderRadius: "18px",
                padding: "22px 22px 18px",
                background: PAPER,
                boxSizing: "border-box",
                minWidth: 0,
                boxShadow: "0 1px 2px rgba(18, 20, 28, 0.04)",
                transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background-color 0.32s ease, border-color 0.32s ease",
                animationDelay: `${Math.min(idx, 8) * 40}ms`,
            }}
        >
            {/* Top row: Type badge on top-left, Category badge on top-right */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "13px" }}>
                <div
                    style={{
                        display: "inline-flex",
                        fontFamily: MONO_FONT,
                        fontSize: "10.5px",
                        fontWeight: 700,
                        color: accentColor,
                        backgroundColor: accentColor + "18",
                        border: `1px solid ${accentColor}35`,
                        padding: "4px 9px",
                        borderRadius: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                    }}
                >
                    {course.courseType}
                </div>

                {showCategory && (
                    <span
                        style={{
                            padding: "3px 10px",
                            borderRadius: "999px",
                            background: "var(--sp-chip-bg, #F4F5F7)",
                            border: `1px solid ${LINE}`,
                            color: "var(--sp-chip-text, #3F4453)",
                            fontSize: "11px",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {course.mainCategory}
                    </span>
                )}
            </div>

            {/* Title */}
            <h3
                style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                    lineHeight: 1.32,
                    fontWeight: 800,
                    color: INK,
                    letterSpacing: "-0.015em",
                }}
            >
                {course.courseName}
            </h3>

            {/* Description */}
            <p
                style={{
                    margin: "0 0 12px",
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    color: MUTED,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {course.description}
            </p>

            {/* Attribute chips (Short course, Refundable) */}
            {hasAttributeChips && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {course.shortCourse && (
                        <span style={{ padding: "3px 9px", borderRadius: "999px", background: "var(--sp-chip-bg, #F4F5F7)", border: `1px solid ${LINE}`, color: "var(--sp-chip-text, #3F4453)", fontSize: "11px", fontWeight: 600 }}>
                            Short course
                        </span>
                    )}
                    {course.refundable && (
                        <span style={{ padding: "3px 9px", borderRadius: "999px", background: "var(--sp-chip-bg, #F4F5F7)", border: `1px solid ${LINE}`, color: "var(--sp-chip-text, #3F4453)", fontSize: "11px", fontWeight: 600 }}>
                            Refundable
                        </span>
                    )}
                </div>
            )}

            {/* Perforation / ticket stub divider */}
            <div style={{ position: "relative", marginTop: "auto", paddingTop: "16px" }}>
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "-22px",
                        right: "-22px",
                        top: 0,
                        borderTop: `1.5px dashed ${DASH}`,
                    }}
                />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                    <div>
                        <div
                            style={{
                                fontFamily: MONO_FONT,
                                fontSize: "21px",
                                fontWeight: 700,
                                color: INK,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {formatPrice(course, country)}
                        </div>

                        {countryFailed && country === "US" && (
                            <div
                                style={{
                                    marginTop: "4px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "10.5px",
                                    fontWeight: 600,
                                    color: "var(--sp-estimated-text, #9A6700)",
                                    backgroundColor: "var(--sp-estimated-bg, #FFF6E5)",
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                }}
                            >
                                Estimated pricing
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="cg-cta cg-focusable"
                        style={{
                            border: "none",
                            borderRadius: "10px",
                            padding: "10px 18px",
                            background: accentColor,
                            color: "#FFFFFF",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "filter 0.15s ease",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Enrol now
                    </button>
                </div>
            </div>
        </div>
    )
}
