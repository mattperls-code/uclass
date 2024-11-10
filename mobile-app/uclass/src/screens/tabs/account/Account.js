import React from "react"

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import DefaultScreen from "./screens/Default"
import PrivacyPolicyScreen from "./screens/PrivacyPolicy"
import TermsAndConditionsScreen from "./screens/TermsAndConditions"

import { colors } from "../../../constants"

const AccountTab = () => {
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
        <Stack.Navigator screenOptions={{
            headerShown: false,
            presentation: "modal",
            cardStyle: {
                backgroundColor: colors.lightGrey
            },
            cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator
        }}>
            <Stack.Screen name={"Default"} component={DefaultScreen} />
            <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen} />
            <Stack.Screen name={"TermsAndConditions"} component={TermsAndConditionsScreen} />
        </Stack.Navigator>
    )
}

export default AccountTab