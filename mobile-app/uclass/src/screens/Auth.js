import React, { useState } from "react"

import { SafeAreaView, View, Pressable, Text, TextInput } from "react-native"

import Svg, { Path } from "react-native-svg"

import supabase from "../scripts/supabase"

import { screen, colors } from "../constants"

const AuthScreen = () => {
    const [onWelcomeScreen, setOnWelcomeScreen] = useState(true)
    const [hasAccount, setHasAccount] = useState(true)

    const WelcomeComponent = () => {
        const goToSignup = () => {
            setOnWelcomeScreen(false)
            setHasAccount(false)
        }

        const goToLogin = () => {
            setOnWelcomeScreen(false)
            setHasAccount(true)
        }

        return (
            <React.Fragment>
                <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 40, color: colors.black }}>Welcome to UClass!</Text>
                <Pressable onPress={goToSignup}>
                    <View style={{ width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Create Account</Text>
                    </View>
                </Pressable>
                <View style={{ height: 10 }} />
                <Pressable onPress={goToLogin}>
                    <View style={{ width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: colors.red, borderStyle: "solid" }}>
                        <Text style={{ textAlign: "center", color: colors.black, fontSize: 18 }}>Login</Text>
                    </View>
                </Pressable>
            </React.Fragment>
        )
    }

    const LoginComponent = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const credentials = { email, password }
        
        const login = () => {
            supabase.auth.signInWithPassword(credentials).then(({ data, error }) => {
                if (error) return alert(error.message)
            })
        }

        const goToSignup = () => {
            setHasAccount(false)
        }

        return (
            <React.Fragment>
                <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 40, color: colors.black }}>Login to UClass</Text>
                <View style={{ width: screen.width - 40, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.grey }}>
                    <TextInput autoCorrect={false} autoCapitalize={"none"} value={email} onChangeText={setEmail} placeholder={"student@gmail.com"} placeholderTextColor={colors.darkGrey} selectionColor={colors.red} style={{ padding: 10, color: colors.black, fontSize: 14 }} />
                </View>
                <View style={{ height: 10 }} />
                <View style={{ width: screen.width - 40, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.grey }}>
                    <TextInput value={password} onChangeText={setPassword} placeholder={"password"} placeholderTextColor={colors.darkGrey} selectionColor={colors.red} secureTextEntry style={{ padding: 10, color: colors.black, fontSize: 14 }} />
                </View>
                <Pressable onPress={login}>
                    <View style={{ marginTop: 20, width: screen.width - 180, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Login</Text>
                    </View>
                </Pressable>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text style={{ fontSize: 12, color: colors.black }}>Don't have an account? </Text>
                    <Pressable onPress={goToSignup}>
                        <Text style={{ fontSize: 12, color: colors.red }}>Create One</Text>
                    </Pressable>
                </View>
            </React.Fragment>
        )
    }

    const SignupComponent = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const credentials = { email, password }
        
        const signup = () => {
            supabase.auth.signUp(credentials).then(({ data, error }) => {
                if (error) return alert(error.message)
            })
        }

        const goToLogin = () => {
            setHasAccount(true)
        }
        
        return (
            <React.Fragment>
                <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 40, color: colors.black }}>Create UClass Account</Text>
                <View style={{ width: screen.width - 40, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.grey }}>
                    <TextInput autoCorrect={false} autoCapitalize={"none"} value={email} onChangeText={setEmail} placeholder={"student@gmail.com"} placeholderTextColor={colors.darkGrey} selectionColor={colors.red} style={{ padding: 10, color: colors.black, fontSize: 14 }} />
                </View>
                <View style={{ height: 10 }} />
                <View style={{ width: screen.width - 40, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.grey }}>
                    <TextInput value={password} onChangeText={setPassword} placeholder={"password"} placeholderTextColor={colors.darkGrey} selectionColor={colors.red} secureTextEntry style={{ padding: 10, color: colors.black, fontSize: 14 }} />
                </View>
                <Pressable onPress={signup}>
                    <View style={{ marginTop: 20, width: screen.width - 180, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Sign Up</Text>
                    </View>
                </Pressable>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text style={{ fontSize: 12, color: colors.black }}>Already have an account? </Text>
                    <Pressable onPress={goToLogin}>
                        <Text style={{ fontSize: 12, color: colors.red }}>Login</Text>
                    </Pressable>
                </View>
            </React.Fragment>
        )
    }

    return (
        <View>
            <View style={{ width: "100%", height: screen.top, backgroundColor: colors.red }} />
            <SafeAreaView style={{ height: "100%" }}>
                <View style={{ position: "relative", height: "17.5%", backgroundColor: colors.red, justifyContent: "space-between" }}>
                    <Svg style={{ position: "absolute", bottom: 0, backgroundColor: colors.white }} width={screen.width} height={0.1 * screen.width} viewBox={"0 0 100 10"}>
                        <Path d={"M 0 0 L 100 0 50 10 0 0"} stroke={"transparent"} fill={colors.red} />
                    </Svg>
                </View>
                <View style={{ flex: 1, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" }}>
                    {
                        onWelcomeScreen ? <WelcomeComponent /> : hasAccount ? <LoginComponent /> : <SignupComponent />
                    }
                </View>
                <View style={{ height: "40%", backgroundColor: colors.white }} />
            </SafeAreaView>
        </View>
    )
}

export default AuthScreen