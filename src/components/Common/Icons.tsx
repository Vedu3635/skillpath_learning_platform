import * as React from "react"

void React

export function SunIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

export function MoonIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
    )
}

export function BrandMark({ accentColor }: { accentColor: string }) {
    return (
        <svg width="26" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="22" height="18" rx="5" fill={accentColor} />
            <circle cx="1" cy="10" r="3.4" fill="var(--sp-bg)" />
            <circle cx="23" cy="10" r="3.4" fill="var(--sp-bg)" />
        </svg>
    )
}

export function IndiaFlag() {
    return (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ borderRadius: '2px', overflow: 'hidden', display: 'inline-block', verticalAlign: 'middle', border: '1px solid rgba(0,0,0,0.1)' }}>
            <rect width="20" height="4.67" fill="#FF9933" />
            <rect y="4.67" width="20" height="4.67" fill="#FFFFFF" />
            <rect y="9.34" width="20" height="4.66" fill="#128807" />
            <circle cx="10" cy="7" r="1.8" fill="none" stroke="#000080" strokeWidth="0.7" />
            <circle cx="10" cy="7" r="0.4" fill="#000080" />
        </svg>
    )
}

export function USFlag() {
    return (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ borderRadius: '2px', overflow: 'hidden', display: 'inline-block', verticalAlign: 'middle', border: '1px solid rgba(0,0,0,0.1)' }}>
            <rect width="20" height="14" fill="#FFFFFF" />
            <rect width="20" height="2" fill="#B22234" />
            <rect y="4" width="20" height="2" fill="#B22234" />
            <rect y="8" width="20" height="2" fill="#B22234" />
            <rect y="12" width="20" height="2" fill="#B22234" />
            <rect width="9" height="8" fill="#3C3B6E" />
            <circle cx="2.5" cy="2" r="0.6" fill="#FFFFFF" />
            <circle cx="6.5" cy="2" r="0.6" fill="#FFFFFF" />
            <circle cx="4.5" cy="4" r="0.6" fill="#FFFFFF" />
            <circle cx="2.5" cy="6" r="0.6" fill="#FFFFFF" />
            <circle cx="6.5" cy="6" r="0.6" fill="#FFFFFF" />
        </svg>
    )
}
