import React, { useState, useEffect } from "react"

import { SafeAreaView, View, Text, FlatList, Pressable } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import supabase from "../../../../scripts/supabase"

import { colors, screen } from "../../../../constants"

const DefaultScreen = ({ navigation }) => {
    const [friends, setFriends] = useState([])

    const getFriends = async (callback) => {
        const session = await supabase.auth.getSession()

        const id = session.data.session.user.id

        const friendIds = (await supabase.from("profiles").select().eq("id", id)).data[0].friends

        const friendProfiles = (await supabase.from("profiles").select().in("id", friendIds)).data

        callback(friendProfiles)
    }

    useEffect(() => {
        let isMounted = true

        getFriends((userFriends) => {
            if (isMounted) setFriends(userFriends)
        })

        const unsubscribe = navigation.addListener("state", () => {
            getFriends((userFriends) => {
                if (isMounted) setFriends(userFriends)
            })
        })

        return () => {
            isMounted = false

            unsubscribe()
        }
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: colors.white }}>
            <View style={{ width: "100%", padding: 20, backgroundColor: colors.white }}>
                <Text style={{ fontSize: 24, fontWeight: "700", color: colors.black, textAlign: "center" }}>Your Friends</Text>
            </View>
            <FlatList style={{ backgroundColor: colors.lightGrey }} contentContainerStyle={{ height: "100%", alignItems: "center" }} data={friends} renderItem={({ item, index }) => {
                const viewProfile = () => navigation.push("Profile", { id: item.id })

                return (
                    <Pressable key={index} onPress={viewProfile}>
                        <View style={{ width: screen.width - 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, marginTop: 20, borderRadius: 10, backgroundColor: colors.grey }}>
                            <Text style={{ marginLeft: 10, fontSize: 16, color: colors.black }}>
                                {
                                    item.display_name
                                }
                            </Text>
                            <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChevronRight} color={colors.red} size={18} />
                        </View>
                    </Pressable>
                )
            }} ListEmptyComponent={
                <Text style={{ padding: 20, fontSize: 16, color: colors.darkGrey }}>No Friends Yet</Text>
            } />
        </SafeAreaView>
    )
}

export default DefaultScreen