import { Course, CountryResponse } from "../types/course"

const COURSE_API =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

const COUNTRY_API =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

export async function fetchCourses(signal?: AbortSignal): Promise<Course[]> {
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

export async function fetchCountry(signal?: AbortSignal): Promise<CountryResponse> {
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

export function formatPrice(course: Course, country: "IN" | "US" | null): string {
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
