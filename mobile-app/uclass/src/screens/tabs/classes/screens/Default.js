import React, { useState, useEffect } from "react"

import { SafeAreaView, FlatList, View, Text, Pressable } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { getSchedule, getClasses } from "../../../../scripts/schedule"

import { colors, screen } from "../../../../constants"

const DefaultScreen = ({ navigation }) => {
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        let isMounted = true

        getSchedule((computedSchedule) => {
            if (isMounted) setSchedule(computedSchedule)
        })

        return () => isMounted = false
    }, [])

    const classes = getClasses(schedule)

    return (
        <SafeAreaView style={{ flexShrink: 1, backgroundColor: colors.white }}>
            <View style={{ width: "100%", padding: 20, backgroundColor: colors.white }}>
                <Text style={{ fontSize: 24, fontWeight: "700", color: colors.black, textAlign: "center" }}>Your Classes</Text>
            </View>
            <View style={{ flexShrink: 1 }}>
                <FlatList data={classes} style={{ backgroundColor: colors.lightGrey }} contentContainerStyle={{ alignItems: "center" }} renderItem={({ item: name, index }) => {
                    const viewClassmates = () => navigation.push("Classmates", { name })

                    return (
                        <Pressable onPress={viewClassmates}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, width: screen.width - 40, padding: 30, borderRadius: 10, backgroundColor: `hsl(${(30 * index) % 360}, 70%, 80%)` }}>
                                <Text style={{ fontSize: 16, color: colors.black }}>
                                    {
                                        name
                                    }
                                </Text>
                                <FontAwesomeIcon icon={faChevronRight} color={colors.black} />
                            </View>
                        </Pressable>
                    )
                }} ListFooterComponent={
                    <View style={{ height: 20 }} />
                } ListEmptyComponent={
                    <Text style={{ padding: 20, fontSize: 16, color: colors.darkGrey }}>No Classes Yet</Text>
                } />
            </View>
        </SafeAreaView>
    )
}

export default DefaultScreen