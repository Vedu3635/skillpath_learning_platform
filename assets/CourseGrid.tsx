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

async function fetchCourses(): Promise<Course[]> {
    const response = await fetch(COURSE_API)

    if (!response.ok) {
        throw new Error(`Course API failed: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
        throw new Error("Invalid course data received")
    }

    return data
}

async function fetchCountry(): Promise<CountryResponse> {
    const response = await fetch(COUNTRY_API)

    if (!response.ok) {
        throw new Error(`Country API failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.country_code !== "IN" && data.country_code !== "US") {
        throw new Error("Invalid country code received")
    }

    return data
}

function formatPrice(
    course: Course,
    country: "IN" | "US" | null
): string {
    if (country === "IN") {
        return `₹${(course.pricePaise / 100).toFixed(2)}`
    }

    return `$${(course.priceUsdCents / 100).toFixed(2)}`
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

    React.useEffect(() => {
        async function loadData() {
            setLoading(true)
            setError(false)
            setCountryFailed(false)

            try {
                const courseData = await fetchCourses()

                setCourses(courseData)

                try {
                    const countryData = await fetchCountry()
                    setCountry(countryData.country_code)
                } catch {
                    setCountry("US")
                    setCountryFailed(true)
                }
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    // Step 3A — Loading state
    if (loading) {
        return (
            <div
                style={{
                    width: "100%",
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    boxSizing: "border-box",
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        color: "#6B7280",
                    }}
                >
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            border: "3px solid #E5E7EB",
                            borderTopColor: accentColor,
                            borderRadius: "50%",
                            margin: "0 auto 12px",
                            animation: "spin 1s linear infinite",
                        }}
                    />

                    <div
                        style={{
                            fontSize: "14px",
                        }}
                    >
                        Loading courses...
                    </div>
                </div>

                <style>
                    {`
                        @keyframes spin {
                            from {
                                transform: rotate(0deg);
                            }
                            to {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                </style>
            </div>
        )
    }

    // Step 3B — Error state
    if (error) {
        return (
            <div
                style={{
                    width: "100%",
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    boxSizing: "border-box",
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        maxWidth: "420px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            margin: "0 auto 16px",
                            borderRadius: "50%",
                            background: "#FEE2E2",
                            color: "#EF4444",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                            fontWeight: "bold",
                        }}
                    >
                        !
                    </div>

                    <h3
                        style={{
                            margin: "0 0 8px",
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#111827",
                        }}
                    >
                        Unable to load courses
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            lineHeight: 1.5,
                            color: "#6B7280",
                        }}
                    >
                        We couldn't load the course information right now.
                        Please try again later.
                    </p>
                </div>
            </div>
        )
    }

    // Step 3C — Empty state
    if (courses.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    boxSizing: "border-box",
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        maxWidth: "400px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "40px",
                            marginBottom: "12px",
                        }}
                    >
                        📚
                    </div>

                    <h3
                        style={{
                            margin: "0 0 8px",
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#111827",
                        }}
                    >
                        No courses available
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            lineHeight: 1.5,
                            color: "#6B7280",
                        }}
                    >
                        There are currently no courses to display.
                    </p>
                </div>
            </div>
        )
    }

    // Step 4B & 4C — Production-ready Card Grid & Responsive Layout
    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
                boxSizing: "border-box",
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
        >
            <div className="course-grid">
                {courses.map((course) => (
                    <div
                        key={course.mangoId}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid #E5E7EB",
                            borderRadius: "16px",
                            padding: "20px",
                            background: "#FFFFFF",
                            boxSizing: "border-box",
                            minWidth: 0,
                        }}
                    >
                        {/* Course type */}
                        <div
                            style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: accentColor,
                                marginBottom: "8px",
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                            }}
                        >
                            {course.courseType}
                        </div>

                        {/* Course name */}
                        <h3
                            style={{
                                margin: "0 0 10px",
                                fontSize: "19px",
                                lineHeight: 1.3,
                                fontWeight: 650,
                                color: "#111827",
                            }}
                        >
                            {course.courseName}
                        </h3>

                        {/* Description */}
                        <p
                            style={{
                                margin: "0 0 14px",
                                fontSize: "14px",
                                lineHeight: 1.5,
                                color: "#6B7280",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {course.description}
                        </p>

                        {/* Category */}
                        {showCategory && (
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignSelf: "flex-start",
                                    padding: "5px 9px",
                                    marginBottom: "16px",
                                    borderRadius: "999px",
                                    background: "#F3F4F6",
                                    color: "#4B5563",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                }}
                            >
                                {course.mainCategory}
                            </div>
                        )}

                        {/* Bottom section */}
                        <div
                            style={{
                                marginTop: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "12px",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: accentColor,
                                    }}
                                >
                                    {formatPrice(course, country)}
                                </div>

                                {countryFailed && (
                                    <div
                                        style={{
                                            marginTop: "3px",
                                            fontSize: "11px",
                                            color: "#9CA3AF",
                                        }}
                                    >
                                        Estimated pricing
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "10px 14px",
                                    background: accentColor,
                                    color: "#FFFFFF",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                View Course
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style>
                {`
                    .course-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 20px;
                    }

                    @media (max-width: 900px) {
                        .course-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }
                    }

                    @media (max-width: 600px) {
                        .course-grid {
                            grid-template-columns: minmax(0, 1fr);
                        }
                    }
                `}
            </style>
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