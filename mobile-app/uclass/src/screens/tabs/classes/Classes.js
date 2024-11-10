import React from "react"

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import DefaultScreen from "./screens/Default"
import ClassmatesScreen from "./screens/Classmates"

import { colors } from "../../../constants"

const ClassmatesTab = () => {
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
            },
            cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator
        })}>
            <Stack.Screen name={"Default"} component={DefaultScreen} />
            <Stack.Screen name={"Classmates"} component={ClassmatesScreen} />
        </Stack.Navigator>
    )
}

export default ClassmatesTab