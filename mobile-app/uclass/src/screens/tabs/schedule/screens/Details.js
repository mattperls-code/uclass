import React from "react"

import { View, Text, Pressable } from "react-native"

import { colors, screen } from "../../../../constants"
import { getClassNameFromComposedName } from "../../../../scripts/schedule"

const DetailsScreen = ({ navigation, route: { params: { name, startTime, endTime, location } } }) => {
    const viewClassmates = () => navigation.navigate("Classes", { screen: "Classmates", params: { name: getClassNameFromComposedName(name) } })

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ flex: 1 }} onPress={navigation.goBack}>
                <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 20, backgroundColor: colors.lightGrey, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Pressable style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ paddingVertical: 20, fontSize: 24, fontWeight: "700", textAlign: "center" }}>
                                {
                                    name
                                }
                            </Text>
                            <Text style={{ paddingVertical: 5, fontSize: 16, textAlign: "center" }}>
                                {
                                    `${startTime} - ${endTime}`
                                }
                            </Text>
                            <Text style={{ paddingVertical: 5, fontSize: 16, textAlign: "center" }}>
                                {
                                    location
                                }
                            </Text>
                            <Pressable onPress={viewClassmates}>
                                <View style={{ marginTop: 20, width: screen.width - 40, height: 60, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.red }}>
                                    <Text style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>View Classmates</Text>
                                </View>
                            </Pressable>
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

export default DetailsScreen