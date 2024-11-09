import React from "react"

import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native"

import { colors, screen } from "../../../../constants"

import supabase from "../../../../scripts/supabase"

const AccountTab = ({ navigation }) => {
    const logout = () => {
        supabase.auth.signOut()
    }

    const goToPrivacyPolicy = () => navigation.push("PrivacyPolicy")

    const goToTermsAndConditions = () => navigation.push("TermsAndConditions")

    return (
        <SafeAreaView>
            <ScrollView style={{ width: "100%", height: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
                <Pressable onPress={logout}>
                    <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Logout</Text>
                    </View>
                </Pressable>
                <Pressable onPress={goToPrivacyPolicy}>
                    <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Privacy Policy</Text>
                    </View>
                </Pressable>
                <Pressable onPress={goToTermsAndConditions}>
                    <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Terms and Conditions</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AccountTab