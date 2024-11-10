import React, { useEffect, useState } from "react"

import { SafeAreaView, ScrollView, View, Text, TextInput, Image, Pressable, Alert } from "react-native"

import { colors, screen } from "../../../../constants"

import { launchImageLibrary } from "react-native-image-picker"

import { generate } from "randomstring"
import { decode } from "base64-arraybuffer"

import supabase from "../../../../scripts/supabase"

const AccountTab = ({ navigation }) => {
    const [profilePicture, setProfilePicture] = useState(null)
    
    const retrieveProfilePicture = async (callback) => {
        const { data, error } = await supabase.auth.getSession()

        if (error) return console.warn(error)

        const id = data.session.user.id

        const profilePicturePath = (await supabase.from("profiles").select().eq("id", id)).data[0].avatar_url

        if (!profilePicturePath) return callback(null)
        
        const signedUrlRes = await supabase.storage.from("avatars").createSignedUrl(profilePicturePath, 60 * 60 * 24)

        if (signedUrlRes.error) return console.warn(signedUrlRes.error)

        callback(signedUrlRes.data.signedUrl)
    }

    const uploadProfilePicture = async () => {
        const imageResults = await launchImageLibrary({ includeBase64: true })

        if (imageResults.didCancel) return

        const { base64 } = imageResults.assets[0]

        const { data, error } = await supabase.auth.getSession()

        if (error) return console.warn(error)

        const id = data.session.user.id

        const profilePicturePath = (await supabase.from("profiles").select().eq("id", id)).data.avatar_url
        
        // TODO: why isnt this actually being applied?
        await supabase.storage.from("avatars").remove([ profilePicturePath ])

        const storagePath = "public/avatar-" + generate() + ".png"

        await supabase.from("profiles").update({ avatar_url: storagePath }).eq("id", id)

        await supabase.storage.from("avatars").upload(storagePath, decode(base64))

        const signedUrlRes = await supabase.storage.from("avatars").createSignedUrl(storagePath, 60 * 60 * 24)

        if (signedUrlRes.error) return console.warn(signedUrlRes.error)

        setProfilePicture(signedUrlRes.data.signedUrl)
    }

    const [displayNameInput, setDisplayNameInput] = useState("")

    const getDisplayName = async (callback) => {
        const { data, error } = await supabase.auth.getSession()

        if (error) return console.warn(error)

        const id = data.session.user.id

        const displayName = (await supabase.from("profiles").select().eq("id", id)).data[0].display_name

        callback(displayName)
    }

    useEffect(() => {
        let isMounted = true

        retrieveProfilePicture((profilePictureURL) => {
            if (isMounted) setProfilePicture(profilePictureURL)
        })

        getDisplayName((storedDisplayName) => {
            if (isMounted) setDisplayNameInput(storedDisplayName)
        })

        return () => isMounted = false
    }, [])

    const setDisplayName = async () => {
        if (displayNameInput.length < 3) return Alert("Display name is too short.")

        const { data, error } = await supabase.auth.getSession()

        if (error) return console.warn(error)

        const id = data.session.user.id

        await supabase.from("profiles").update({ display_name: displayNameInput }).eq("id", id)

        Alert.alert("Successfully Updated Display Name")
    }

    const goToPrivacyPolicy = () => navigation.push("PrivacyPolicy")

    const goToTermsAndConditions = () => navigation.push("TermsAndConditions")

    const logout = () => supabase.auth.signOut()


    return (
        <SafeAreaView>
            <ScrollView style={{ width: "100%", height: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
                <Pressable onPress={uploadProfilePicture}>
                    <View style={{ marginTop: 20, width: 120, height: 120, borderRadius: 60, backgroundColor: colors.grey, overflow: "hidden" }}>
                        <Image src={profilePicture} style={{ width: "100%", height: "100%" }} />
                    </View>
                </Pressable>
                <View style={{ marginTop: 20, width: screen.width - 40, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.grey }}>
                    <TextInput autoCorrect={false} value={displayNameInput} onChangeText={setDisplayNameInput} placeholder={"John Doe"} placeholderTextColor={colors.darkGrey} selectionColor={colors.red} style={{ padding: 10, color: colors.black, fontSize: 14, textAlign: "center" }} />
                </View>
                <Pressable onPress={setDisplayName}>
                    <View style={{ marginTop: 10, width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Update Display Name</Text>
                    </View>
                </Pressable>
                <View style={{ width: "100%", height: 2, backgroundColor: colors.red, marginTop: 30, marginBottom: 10 }} />
                <Pressable onPress={goToPrivacyPolicy}>
                    <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Privacy Policy</Text>
                    </View>
                </Pressable>
                <Pressable onPress={goToTermsAndConditions}>
                    <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Terms and Conditions</Text>
                    </View>
                </Pressable>
                <Pressable onPress={logout}>
                    <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Logout</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AccountTab