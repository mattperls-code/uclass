import React from "react"

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import DefaultScreen from "./screens/Default"
import ProfileScreen from "./screens/Profile"
import ChatScreen from "./screens/Chat"

import { colors } from "../../../constants"

const FriendsTab = () => {
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
            <Stack.Screen name={"Profile"} component={ProfileScreen} />
            <Stack.Screen name={"Chat"} component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default FriendsTab