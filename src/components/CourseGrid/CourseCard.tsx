import * as React from "react"
import { Course } from "../../types/course"
import { formatPrice } from "../../services/courseApi"
import { INK, MUTED, FAINT, LINE, DASH, MONO_FONT } from "../../constants/theme"

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
                background: "#FFFFFF",
                boxSizing: "border-box",
                minWidth: 0,
                boxShadow: "0 1px 2px rgba(18, 20, 28, 0.04)",
                transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease",
                animationDelay: `${Math.min(idx, 8) * 40}ms`,
            }}
        >
            {/* Type badge */}
            <div
                style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    fontFamily: MONO_FONT,
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: accentColor,
                    backgroundColor: accentColor + "14",
                    border: `1px solid ${accentColor}35`,
                    padding: "4px 9px",
                    borderRadius: "6px",
                    marginBottom: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                }}
            >
                {course.courseType}
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

            {/* Category + attribute chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {showCategory && (
                    <span
                        style={{
                            padding: "4px 10px",
                            borderRadius: "999px",
                            background: "#F4F5F7",
                            border: `1px solid ${LINE}`,
                            color: "#3F4453",
                            fontSize: "11.5px",
                            fontWeight: 600,
                        }}
                    >
                        {course.mainCategory}
                    </span>
                )}
                {course.shortCourse && (
                    <span style={{ padding: "4px 10px", borderRadius: "999px", background: "#F4F5F7", border: `1px solid ${LINE}`, color: "#3F4453", fontSize: "11.5px", fontWeight: 600 }}>
                        Short course
                    </span>
                )}
                {course.refundable && (
                    <span style={{ padding: "4px 10px", borderRadius: "999px", background: "#F0FBF6", border: "1px solid #BFEAD7", color: "#0F7A55", fontSize: "11.5px", fontWeight: 600 }}>
                        Refundable
                    </span>
                )}
            </div>

            {/* Perforation / ticket stub divider */}
            <div style={{ position: "relative", marginTop: "auto" }}>
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
                <div
                    style={{
                        fontFamily: MONO_FONT,
                        fontSize: "10px",
                        fontWeight: 600,
                        color: FAINT,
                        letterSpacing: "0.05em",
                        padding: "10px 0 12px",
                    }}
                >
                    NO. {course.courseCode}
                </div>

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

                        {countryFailed && (
                            <div
                                style={{
                                    marginTop: "4px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "10.5px",
                                    fontWeight: 600,
                                    color: "#9A6700",
                                    backgroundColor: "#FFF6E5",
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
