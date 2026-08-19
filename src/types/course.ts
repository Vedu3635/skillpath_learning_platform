export interface Course {
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

export interface CountryResponse {
    country_code: "IN" | "US"
}

export interface CourseGridProps {
    accentColor: string
    showCategory: boolean
}
