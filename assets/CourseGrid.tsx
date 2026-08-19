import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// Ensure React is referenced if using strict noUnusedLocals
void React

interface Course {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: boolean
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

interface CountryResponse {
    country_code: "IN" | "US"
}

const COURSE_API =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

const COUNTRY_API =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

// ---------------------------------------------------------------------------
// Design tokens
// Cards are treated as course "tickets" — a perforated stub separates the
// summary from the price/enrol stub, and the course code doubles as the
// ticket serial. Keeps the accent color fully driven by the property control
// so it stays reusable across any Framer project, and self-hosts its fonts
// so it doesn't depend on the host page's <head>.
// ---------------------------------------------------------------------------
const INK = "#12141C"
const MUTED = "#5B6272"
const FAINT = "#9297A6"
const PAPER = "#FFFFFF"
const LINE = "#E4E6EC"
const DASH = "#D3D6DE"
const DISPLAY_FONT =
    "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
const MONO_FONT =
    "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');`

async function fetchCourses(signal?: AbortSignal): Promise<Course[]> {
    const response = await fetch(COURSE_API, { signal })

    if (!response.ok) {
        throw new Error(`Course API failed: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
        throw new Error("Invalid course data received")
    }

    return data
}

async function fetchCountry(signal?: AbortSignal): Promise<CountryResponse> {
    const response = await fetch(COUNTRY_API, { signal })

    if (!response.ok) {
        throw new Error(`Country API failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.country_code !== "IN" && data.country_code !== "US") {
        throw new Error("Invalid country code received")
    }

    return data
}

function formatPrice(course: Course, country: "IN" | "US" | null): string {
    if (country === "IN") {
        return `₹${(course.pricePaise / 100).toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`
    }

    return `$${(course.priceUsdCents / 100).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`
}

interface CourseGridProps {
    accentColor: string
    showCategory: boolean
}

export default function CourseGrid({
    accentColor,
    showCategory,
}: CourseGridProps) {
    const [courses, setCourses] = React.useState<Course[]>([])
    const [country, setCountry] = React.useState<"IN" | "US" | null>(null)

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [countryFailed, setCountryFailed] = React.useState(false)

    const loadData = React.useCallback(async (signal?: AbortSignal) => {
        setLoading(true)
        setError(false)
        setCountryFailed(false)
        setCountry(null)
        setCourses([])

        try {
            const courseData = await fetchCourses(signal)

            if (signal?.aborted) return

            setCourses(courseData)

            try {
                const countryData = await fetchCountry(signal)

                if (signal?.aborted) return

                setCountry(countryData.country_code)
            } catch (err) {
                if (signal?.aborted) return

                setCountry("US")
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

    // -----------------------------------------------------------------
    // Loading — skeleton tickets, shaped like the real card, so layout
    // never jumps once data lands.
    // -----------------------------------------------------------------
    if (loading) {
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
                <style>{sharedStyle}</style>
            </div>
        )
    }

    // -----------------------------------------------------------------
    // Error — direct, no apology, one clear recovery action.
    // -----------------------------------------------------------------
    if (error) {
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
                        onClick={() => loadData()}
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
                <style>{sharedStyle}</style>
            </div>
        )
    }

    // -----------------------------------------------------------------
    // Empty — an invitation, not an apology.
    // -----------------------------------------------------------------
    if (courses.length === 0) {
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
                <style>{sharedStyle}</style>
            </div>
        )
    }

    // -----------------------------------------------------------------
    // Loaded — ticket-stub cards.
    // -----------------------------------------------------------------
    return (
        <div className="cg-root" style={{ padding: "22px" }} data-cg-accent={accentColor}>
            <div className="cg-grid">
                {courses.map((course, idx) => (
                    <div
                        key={course.mangoId}
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
                ))}
            </div>

            <style>{sharedStyle}</style>
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