import React, { useState, useEffect } from "react"

import { FlatList, View, Text, Image, Pressable } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { getClassmates } from "../../../../scripts/schedule"

import supabase from "../../../../scripts/supabase"

import { colors, screen } from "../../../../constants"

const ClassScreen = ({ navigation, route: { params: { name } } }) => {
    const [classmates, setClassmates] = useState([])

    useEffect(() => {
        let isMounted = true

        getClassmates(name, (foundClassmates) => {
            if (isMounted) setClassmates(foundClassmates)
        })

        return () => isMounted = false
    }, [])

    const viewProfile = (profileId) => navigation.navigate("Friends", { screen: "Profile", params: { id: profileId } })

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ flex: 1 }} onPress={navigation.goBack}>
                <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 20, backgroundColor: colors.lightGrey, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Pressable style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ paddingVertical: 20, fontSize: 24, fontWeight: "700", textAlign: "center" }}>
                                {
                                    name + " Classmates"
                                }
                            </Text>
                            <FlatList style={{ maxHeight: 200 }} data={classmates} renderItem={({ item, index }) => {
                                return (
                                    <Pressable key={index} onPress={() => viewProfile(item.id)}>
                                        <View style={{ marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, borderRadius: 10, backgroundColor: colors.grey }}>
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
                                <Text style={{ textAlign: "center", padding: 20, fontSize: 16, color: colors.darkGrey }}>No Classmates Yet</Text>
                            } />
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

export default ClassScreen