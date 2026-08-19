import { Course, CountryResponse } from "../types/course"

const COURSE_API =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

const COUNTRY_API =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

export async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 2
): Promise<Response> {
    let lastError: unknown

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options)

            if (response.ok) {
                return response
            }

            lastError = new Error(
                `Request failed with status ${response.status}`
            )
        } catch (error) {
            lastError = error
        }

        if (attempt < retries) {
            const delay = 500 * Math.pow(2, attempt)
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }

    throw lastError
}

export async function fetchCourses(signal?: AbortSignal): Promise<Course[]> {
    const response = await fetchWithRetry(
        COURSE_API,
        { signal },
        2
    )

    const data = await response.json()

    if (!Array.isArray(data)) {
        throw new Error("Invalid course data received")
    }

    return data
}

export async function fetchCountry(signal?: AbortSignal): Promise<CountryResponse> {
    const response = await fetchWithRetry(
        COUNTRY_API,
        { signal },
        2
    )

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
