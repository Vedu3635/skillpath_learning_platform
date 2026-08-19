import * as React from "react"
import { Course, CourseGridProps } from "../../types/course"
import { fetchCourses, fetchCountry } from "../../services/courseApi"
import { CourseCard } from "./CourseCard"
import { CourseGridSkeleton } from "./CourseGridSkeleton"
import { CourseGridError } from "./CourseGridError"
import { CourseGridEmpty } from "./CourseGridEmpty"
import { IndiaFlag, USFlag } from "../Common/Icons"
import { DISPLAY_FONT, INK, MUTED, FONT_IMPORT } from "../../constants/theme"

export function CourseGrid({
    accentColor,
    showCategory,
}: CourseGridProps) {
    const [courses, setCourses] = React.useState<Course[]>([])
    const [country, setCountry] = React.useState<"IN" | "US" | null>(null)
    void country
    const [selectedCountry, setSelectedCountry] = React.useState<"IN" | "US" | null>(null)

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [countryFailed, setCountryFailed] = React.useState(false)

    const loadData = React.useCallback(async (signal?: AbortSignal) => {
        setLoading(true)
        setError(false)
        setCountryFailed(false)
        setCountry(null)
        setSelectedCountry(null)
        setCourses([])

        try {
            const courseData = await fetchCourses(signal)

            if (signal?.aborted) return

            setCourses(courseData)

            try {
                const countryData = await fetchCountry(signal)

                if (signal?.aborted) return

                setCountry(countryData.country_code)
                setSelectedCountry(countryData.country_code)
            } catch (err) {
                if (signal?.aborted) return

                setCountry("US")
                setSelectedCountry("US")
                setCountryFailed(true)
            }
        } catch (err) {
            if (signal?.aborted) return

            setError(true)
        } finally {
            if (!signal?.aborted) {
                setLoading(false)
            }
        }
    }, [])

    React.useEffect(() => {
        const controller = new AbortController()

        loadData(controller.signal)

        return () => {
            controller.abort()
        }
    }, [loadData])

    const sharedStyle = FONT_IMPORT + `
        .cg-root {
            width: 100%;
            box-sizing: border-box;
            font-family: ${DISPLAY_FONT};
        }
        .cg-focusable:focus-visible {
            outline: 2px solid var(--cg-accent, #2563EB);
            outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
            .cg-root, .cg-root * {
                animation-duration: 0.001ms !important;
                transition-duration: 0.001ms !important;
            }
        }
        @keyframes cg-shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
        }
        @keyframes cg-fade-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cg-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .cg-skeleton {
            background: linear-gradient(90deg, #EEF0F3 25%, #F7F8FA 37%, #EEF0F3 63%);
            background-size: 800px 100%;
            animation: cg-shimmer 1.4s ease-in-out infinite;
            border-radius: 6px;
        }
        .cg-card {
            animation: cg-fade-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .cg-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
        }
        .cg-ticket:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 30px -12px rgba(18, 20, 28, 0.16);
        }
        .cg-ticket:hover .cg-cta {
            filter: brightness(1.06);
        }
        .cg-cta:focus-visible, .cg-retry:focus-visible {
            outline: 2px solid ${INK};
            outline-offset: 2px;
        }
        @media (max-width: 900px) {
            .cg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        }
        @media (max-width: 600px) {
            .cg-grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }
        }
    `

    if (loading) {
        return (
            <>
                <CourseGridSkeleton />
                <style>{sharedStyle}</style>
            </>
        )
    }

    if (error) {
        return (
            <>
                <CourseGridError onRetry={() => loadData()} />
                <style>{sharedStyle}</style>
            </>
        )
    }

    if (courses.length === 0) {
        return (
            <>
                <CourseGridEmpty />
                <style>{sharedStyle}</style>
            </>
        )
    }

    return (
        <div className="cg-root" style={{ padding: "22px" }} data-cg-accent={accentColor}>
            {/* Header & Demo Pricing Country Toggle */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 700,
                            color: INK,
                        }}
                    >
                        Explore Courses
                    </h2>

                    <p
                        style={{
                            margin: "6px 0 0",
                            fontSize: "14px",
                            color: MUTED,
                        }}
                    >
                        Find the right course for your learning journey.
                    </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Pricing
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "4px",
                            background: "#F3F4F6",
                            borderRadius: "10px",
                            gap: "2px",
                            border: "1px solid #E4E6EC",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedCountry("IN")}
                            aria-label="India pricing (INR)"
                            title="India pricing (INR)"
                            className="cg-focusable"
                            style={{
                                border: "none",
                                borderRadius: "7px",
                                padding: "6px 12px",
                                background:
                                    selectedCountry === "IN"
                                        ? "#FFFFFF"
                                        : "transparent",
                                color:
                                    selectedCountry === "IN"
                                        ? INK
                                        : MUTED,
                                fontSize: "12.5px",
                                fontWeight:
                                    selectedCountry === "IN" ? 700 : 500,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                cursor: "pointer",
                                boxShadow:
                                    selectedCountry === "IN"
                                        ? "0 1px 3px rgba(0,0,0,0.08)"
                                        : "none",
                                transition: "all 0.15s ease",
                            }}
                        >
                            <IndiaFlag /> INR
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedCountry("US")}
                            aria-label="United States pricing (USD)"
                            title="United States pricing (USD)"
                            className="cg-focusable"
                            style={{
                                border: "none",
                                borderRadius: "7px",
                                padding: "6px 12px",
                                background:
                                    selectedCountry === "US"
                                        ? "#FFFFFF"
                                        : "transparent",
                                color:
                                    selectedCountry === "US"
                                        ? INK
                                        : MUTED,
                                fontSize: "12.5px",
                                fontWeight:
                                    selectedCountry === "US" ? 700 : 500,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                cursor: "pointer",
                                boxShadow:
                                    selectedCountry === "US"
                                        ? "0 1px 3px rgba(0,0,0,0.08)"
                                        : "none",
                                transition: "all 0.15s ease",
                            }}
                        >
                            <USFlag /> USD
                        </button>
                    </div>
                </div>
            </div>

            <div className="cg-grid">
                {courses.map((course, idx) => (
                    <CourseCard
                        key={course.mangoId}
                        course={course}
                        country={selectedCountry ?? "US"}
                        countryFailed={countryFailed}
                        accentColor={accentColor}
                        showCategory={showCategory}
                        idx={idx}
                    />
                ))}
            </div>

            <style>{sharedStyle}</style>
        </div>
    )
}
