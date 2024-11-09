import { initialWindowMetrics } from "react-native-safe-area-context"

const colors = {
    red: "rgb(136, 28, 28)",
    black: "rgb(33, 39, 33)",
    white: "rgb(255, 255, 255)",
    lightGrey: "rgb(245, 245, 245)",
    grey: "rgb(210, 215, 218)",
    darkGrey: "rgb(122, 130, 133)"
}

const screen = {
    width: initialWindowMetrics.frame.width - initialWindowMetrics.insets.left - initialWindowMetrics.insets.right,
    height: initialWindowMetrics.frame.height - initialWindowMetrics.insets.top - initialWindowMetrics.insets.bottom,
    top: initialWindowMetrics.insets.top,
    bottom: initialWindowMetrics.insets.bottom
}

export {
    colors,
    screen
}