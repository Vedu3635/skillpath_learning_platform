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
            {/* Status indicators for Step 2 debugging */}
            <div style={{ marginBottom: "16px", fontSize: "13px", color: "#64748B" }}>
                {loading && <span>⏳ Fetching course & country data...</span>}
                {error && <span style={{ color: "#EF4444" }}>❌ Course API Error!</span>}
                {!loading && !error && (
                    <span>
                        ✅ Loaded {courses.length} courses | Country: <strong>{country}</strong>
                        {countryFailed && <span style={{ color: "#F59E0B" }}> (Fallback applied: Country API failed)</span>}
                    </span>
                )}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                }}
            >
                {courses.map((course) => (
                    <div
                        key={course.mangoId}
                        style={{
                            border: "1px solid #E5E7EB",
                            borderRadius: "16px",
                            padding: "20px",
                            background: "#FFFFFF",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                        }}
                    >
                        <h3
                            style={{
                                margin: "0 0 10px",
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#0F172A",
                            }}
                        >
                            {course.courseName}
                        </h3>

                        <p
                            style={{
                                margin: "0 0 12px",
                                color: "#6B7280",
                                fontSize: "14px",
                                lineHeight: 1.5,
                            }}
                        >
                            {course.description}
                        </p>

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
                                {course.mainCategory}
                            </div>
                        )}

                        <div
                            style={{
                                fontSize: "20px",
                                fontWeight: 700,
                                color: accentColor,
                            }}
                        >
                            {country === "IN"
                                ? `₹${(course.pricePaise / 100).toFixed(2)}`
                                : `$${(course.priceUsdCents / 100).toFixed(2)}`}
                        </div>
                    </div>
                ))}
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