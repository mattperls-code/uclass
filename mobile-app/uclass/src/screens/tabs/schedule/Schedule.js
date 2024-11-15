import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultScreen from "./screens/Default"
import DetailsScreen from "./screens/Details"

import { colors } from "../../../constants"
import { TransitionPresets } from "@react-navigation/stack"

const ScheduleTab = (props) => {
    const Stack = createStackNavigator()

    const forModalPresentationIOS = (props) => {
        const config = TransitionPresets.ModalPresentationIOS.cardStyleInterpolator(props)

        config.cardStyle.borderBottomLeftRadius = undefined
        config.cardStyle.borderBottomRightRadius = undefined

        return config
    };
    
    const fixTabNestedStackCardStyleInterpolator = Platform.select({
        ios: forModalPresentationIOS,
        default: TransitionPresets.BottomSheetAndroid.cardStyleInterpolator
    })

    return (
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            presentation: "modal",
            cardStyle: {
                backgroundColor: route.name == "Default" ? colors.lightGrey : "transparent",
                borderBottomLeftRadius: undefined
            },
            cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator
        })}>
            <Stack.Screen name={"Default"} component={DefaultScreen} />
            <Stack.Screen name={"Details"} component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default ScheduleTab