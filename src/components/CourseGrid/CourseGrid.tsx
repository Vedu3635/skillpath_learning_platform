import * as React from "react"
import { Course, CourseGridProps } from "../../types/course"
import { fetchCourses, fetchCountry } from "../../services/courseApi"
import { CourseCard } from "./CourseCard"
import { CourseGridSkeleton } from "./CourseGridSkeleton"
import { CourseGridError } from "./CourseGridError"
import { CourseGridEmpty } from "./CourseGridEmpty"
import { DISPLAY_FONT, INK, FONT_IMPORT } from "../../constants/theme"

export function CourseGrid({
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
            <div className="cg-grid">
                {courses.map((course, idx) => (
                    <CourseCard
                        key={course.mangoId}
                        course={course}
                        country={country}
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
