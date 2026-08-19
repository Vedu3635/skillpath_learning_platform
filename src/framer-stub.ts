export enum ControlType {
    Control = "Control",
    Boolean = "Boolean",
    Number = "Number",
    String = "String",
    Enum = "Enum",
    SegmentedEnum = "SegmentedEnum",
    Color = "Color",
    Image = "Image",
    File = "File",
    ComponentInstance = "ComponentInstance",
    Array = "Array",
    Object = "Object",
    Date = "Date",
    Link = "Link",
    EventHandler = "EventHandler",
    Transition = "Transition",
}

export function addPropertyControls(component: any, controls: any) {
    if (component) {
        component.propertyControls = controls
    }
}
