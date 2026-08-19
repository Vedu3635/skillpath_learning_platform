import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { CourseGrid } from "../src/components/CourseGrid/CourseGrid"

void React

export default CourseGrid

;(CourseGrid as any).defaultProps = {
    accentColor: "#2563EB",
    showCategory: true,
}

addPropertyControls(CourseGrid as any, {
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