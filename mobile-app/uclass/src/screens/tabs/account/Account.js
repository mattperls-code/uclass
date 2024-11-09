import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultScreen from "./screens/Default"
import PrivacyPolicyScreen from "./screens/PrivacyPolicy"
import TermsAndConditionsScreen from "./screens/TermsAndConditions"

import { colors } from "../../../constants"

const AccountTab = (props) => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            presentation: "modal",
            cardStyle: {
                backgroundColor: colors.lightGrey
            }
        }}>
            <Stack.Screen name={"Default"} component={DefaultScreen} />
            <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen} />
            <Stack.Screen name={"TermsAndConditions"} component={TermsAndConditionsScreen} />
        </Stack.Navigator>
    )
}

export default AccountTab