import React, { useState, useEffect } from "react"

import { View, Text, Image, Pressable } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

import supabase from "../../../../scripts/supabase"

import { colors, screen } from "../../../../constants"

const ProfileScreen = ({ navigation, route: { params: { id } } }) => {
    const [profilePicture, setProfilePicture] = useState(null)
    const [displayName, setDisplayName] = useState(null)
    const [friendshipStatus, setFriendshipStatus] = useState("none")

    const getProfileInfo = async (callback) => {
        const session = await supabase.auth.getSession()

        const selfId = session.data.session.user.id
        const self = (await supabase.from("profiles").select().eq("id", selfId)).data[0]

        const profile = (await supabase.from("profiles").select().eq("id", id)).data[0]

        const newProfilePicture = profile.avatar_url ? (await supabase.storage.from("avatars").createSignedUrl(profile.avatar_url, 60 * 60 * 24)).data.signedUrl : null
        const newDisplayName = profile.display_name

        const amFriendsWithThem = self.friends.includes(id)
        const areFriendsWithMe = profile.friends.includes(selfId)

        let newFriendshipStatus

        if (amFriendsWithThem && areFriendsWithMe) newFriendshipStatus = "friends"
        if (!amFriendsWithThem && areFriendsWithMe) newFriendshipStatus = "requested me"
        if (amFriendsWithThem && !areFriendsWithMe) newFriendshipStatus = "requested them"
        if (!amFriendsWithThem && !areFriendsWithMe) newFriendshipStatus = "none"

        callback(newProfilePicture, newDisplayName, newFriendshipStatus)
    }
    
    useEffect(() => {
        let isMounted = true

        getProfileInfo((newProfilePicture, newDisplayName, newFriendshipStatus) => {
            if (isMounted) {
                setProfilePicture(newProfilePicture)
                setDisplayName(newDisplayName)
                setFriendshipStatus(newFriendshipStatus)
            }
        })

        return () => isMounted = false
    })
    
    const FriendsButtonOptions = () => {
        const unfollow = async () => {
            const session = await supabase.auth.getSession()

            const selfId = session.data.session.user.id
            const self = (await supabase.from("profiles").select().eq("id", selfId)).data[0]

            self.friends = self.friends.filter((friendId) => friendId != id)

            await supabase.from("profiles").update({ friends: self.friends }).eq("id", selfId)

            setFriendshipStatus("requested me")
        }

        const goToChat = () => navigation.push("Chat", { id, displayName, profilePicture })

        return (
            <View style={{ width: screen.width - 40, flexDirection: "row", justifyContent: "space-between" }}>
                <Pressable onPress={unfollow}>
                    <View style={{ width: screen.width - 110, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Following</Text>
                    </View>
                </Pressable>
                <Pressable onPress={goToChat}>
                    <View style={{ width: 60, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <FontAwesomeIcon icon={faPaperPlane} color={colors.white} size={18} />
                    </View>
                </Pressable>
            </View>
        )
    }

    const RequestedMeButtonsOptions = () => {
        const follow = async () => {
            const session = await supabase.auth.getSession()

            const selfId = session.data.session.user.id
            const self = (await supabase.from("profiles").select().eq("id", selfId)).data[0]

            self.friends.push(id)

            await supabase.from("profiles").update({ friends: self.friends }).eq("id", selfId)

            setFriendshipStatus("friends")
        }

        return (
            <Pressable onPress={follow}>
                <View style={{ width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                    <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Follow Back</Text>
                </View>
            </Pressable>
        )
    }

    const RequestedThemButtonOptions = () => {
        const unfollow = async () => {
            const session = await supabase.auth.getSession()

            const selfId = session.data.session.user.id
            const self = (await supabase.from("profiles").select().eq("id", selfId)).data[0]

            self.friends = self.friends.filter((friendId) => friendId != id)

            await supabase.from("profiles").update({ friends: self.friends }).eq("id", selfId)

            setFriendshipStatus("requested me")
        }

        return (
            <Pressable onPress={unfollow}>
                <View style={{ width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                    <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Request Sent</Text>
                </View>
            </Pressable>
        )
    }

    const NoneButtonOptions = () => {
        const follow = async () => {
            const session = await supabase.auth.getSession()

            const selfId = session.data.session.user.id
            const self = (await supabase.from("profiles").select().eq("id", selfId)).data[0]

            self.friends.push(id)

            await supabase.from("profiles").update({ friends: self.friends }).eq("id", selfId)

            setFriendshipStatus("requested them")
        }

        return (
            <Pressable onPress={follow}>
                <View style={{ width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                    <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Follow</Text>
                </View>
            </Pressable>
        )
    }

    const ButtonOptions = {
        "friends": FriendsButtonOptions,
        "requested me": RequestedMeButtonsOptions,
        "requested them": RequestedThemButtonOptions,
        "none": NoneButtonOptions
    }[friendshipStatus]

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ flex: 1 }} onPress={navigation.goBack}>
                <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 20, backgroundColor: colors.lightGrey, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Pressable style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={{ marginTop: 20, width: 160, height: 160, borderRadius: 80, backgroundColor: colors.grey, overflow: "hidden" }}>
                                    <Image src={profilePicture} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <Text style={{ padding: 20, fontSize: 24, fontWeight: "700", color: colors.black }}>
                                    {
                                        displayName
                                    }
                                </Text>
                                <ButtonOptions />
                            </View>
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

export default ProfileScreen