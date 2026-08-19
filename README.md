# Skillpath Course Grid — Framer Code Component

A modern, high-performance **React 18 + TypeScript** Framer Code Component and local testing environment for rendering course catalog grids with dynamic regional pricing, property controls, and resilient API fallback handling.

---

## 🌟 Features & Highlights

- **Framer Property Controls**: Native support for Framer controls (`accentColor`, `showCategory`) with local stubbing for Vite preview environments.
- **Resilient Dual-API Architecture**:
  - **Course API**: Fetches course data with strict validation for HTTP status and payload integrity.
  - **Country Geo-API**: Automatically detects user location (`IN` for **₹ INR** / `US` for **$ USD**).
  - **Graceful Fallback**: If the Country API fails, the component automatically defaults to **USD ($)**, ensuring courses are always displayed without blocking the user.
- **4-Stage UI Pipeline**:
  - ⏳ **Loading State**: Animated CSS spinner with status feedback.
  - ⚠️ **Error State**: User-friendly, non-technical error notification when the Course API fails.
  - 📚 **Empty State**: Dedicated empty view when the API returns 0 courses.
  - ✅ **Success State**: Grid layout displaying course cards with dynamic currency formatting.
- **Light Mode Default & Theme Switcher**: Modern light-mode interface with an interactive theme toggle in the local preview environment.

---

## 📂 Project Structure

```text
skillpath-course-grid/
├── assets/
│   └── CourseGrid.tsx     # Main Framer Code Component (API, logic & UI states)
├── src/
│   ├── App.tsx            # Local preview sandbox simulating Framer Property Controls
│   ├── main.tsx           # React 18 application entry point
│   └── framer-stub.ts     # Property control stub for local Vite compilation
├── index.html             # HTML entry with Google Font (Plus Jakarta Sans)
├── package.json           # Dependencies & build scripts
├── tsconfig.json          # TypeScript compiler configuration (bundler mode)
└── vite.config.ts         # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Vedu3635/skillpath-course-grid.git
cd skillpath-course-grid
npm install
```

### Available Scripts

#### 1. Start Local Development Server
```bash
npm run dev
```
> Boots up the Vite dev server at `http://localhost:5173/` with live reloading.

#### 2. Run TypeScript Type Check & Build
```bash
npm run build
```
> Compiles TypeScript (`tsc`) and builds optimized production bundles into the `dist/` directory.

#### 3. Preview Production Build
```bash
npm run preview
```
> Serves the production `dist/` bundle locally for verification.

---

## 🛠️ Data Contracts & Types

### `Course` Interface
```typescript
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
```

### `CountryResponse` Interface
```typescript
interface CountryResponse {
    country_code: "IN" | "US"
}
```

---

## 🔄 API Execution & Fallback Flow

```text
               CourseGrid Component Mounts
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
           fetchCourses()      fetchCountry()
                 │                   │
             success?             success?
             /      \             /      \
           YES      NO          YES      NO
            │        │           │        │
            ▼        ▼           ▼        ▼
       [Courses]   Error      [IN / US]   USD Fallback
                     UI                   (countryFailed)
```

---

## 📄 License

MIT © [Skillpath Course Grid](https://github.com/Vedu3635/skillpath-course-grid)


## AI Notes
I used chat gpt for help(here is the reference link): https://chatgpt.com/share/6a8552eb-5854-83ee-bb13-2ceda5e47a7b
