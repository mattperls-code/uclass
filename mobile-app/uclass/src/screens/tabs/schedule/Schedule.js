import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultScreen from "./screens/Default"
import DetailsScreen from "./screens/Details"

import { colors } from "../../../constants"

const ScheduleTab = (props) => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            presentation: "modal",
            cardStyle: {
                backgroundColor: route.name == "Default" ? colors.lightGrey : "transparent"
            }
        })}>
            <Stack.Screen name={"Default"} component={DefaultScreen} />
            <Stack.Screen name={"Details"} component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default ScheduleTab