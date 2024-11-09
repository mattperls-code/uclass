import React, { useState } from "react"

import { ScrollView, View, Text, Pressable } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { screen, colors } from "../../../../constants"

const DefaultScreen = ({ navigation }) => {
    const [dayIndex, setDayIndex] = useState(new Date().getDay())

    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex]
    
    const lastDay = () => setDayIndex((dayIndex - 1 + 6) % 6)
    const nextDay = () => setDayIndex((dayIndex + 1) % 6)

    const hourChunks = []

    hourChunks.push("12 AM")
    for (let i = 1;i<12;i++) hourChunks.push(`${i} AM`);
    hourChunks.push("12 PM")
    for (let i = 1;i<12;i++) hourChunks.push(`${i} PM`);

    const hourHeight = 60

    const hourChunkRenders = hourChunks.map((time, index) => (
        <View key={index} style={{ width: "100%", height: hourHeight }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
                <Text style={{ marginHorizontal: 10, marginVertical: 2, fontSize: 10, color: colors.darkGrey, transform: [{ translateY: "-70%" }] }}>
                    {
                        time
                    }
                </Text>
                <View style={{ marginRight: 5, flex: 1, height: 1, backgroundColor: colors.grey }} />
            </View>
        </View>
    ))

    const timeToRenderOffset = (time) => {
        const components = time.split(" ")

        const hoursAndMinutes = components[0].split(":")
        const hour = parseInt(hoursAndMinutes[0])
        const minutes = parseInt(hoursAndMinutes[1])

        const hourOffset = hour == 12 ? 0 : hourHeight * hour
        const minuteOffset = hourHeight * (minutes / 60)

        const ampmOffset = components[1] == "AM" ? 0 : 12 * hourHeight

        return ampmOffset + hourOffset + minuteOffset
    }

    const scheduleToday = [
        {
            name: "English",
            startTime: "2:30 PM",
            endTime: "4:00 PM",
            building: "Barlett Hall"
        },
        {
            name: "Math",
            startTime: "8:00 AM",
            endTime: "8:50 AM",
            building: "Engineering"
        },
        {
            name: "DSA",
            startTime: "3:45 PM",
            endTime: "5:00 PM",
            building: "Goessman"
        },
        {
            name: "test terrible case",
            startTime: "11:00 PM",
            endTime: "1:00 AM",
            building: "idc"
        }
    ].sort((a, b) => timeToRenderOffset(a.startTime) - timeToRenderOffset(b.startTime))

    const scheduleItemRenders = scheduleToday.map(({ name, startTime, endTime, building }, index) => {
        const startTimeOffset = timeToRenderOffset(startTime)
        const endTimeOffset = timeToRenderOffset(endTime)
        
        const renderHeight = endTimeOffset > startTimeOffset ? endTimeOffset - startTimeOffset : (24 * hourHeight) - startTimeOffset

        const openDetails = () => navigation.push("Details", { name, startTime, endTime, building })

        return (
            <View key={index} style={{ position: "absolute", left: 60, right: 20, top: startTimeOffset + 2, height: renderHeight - 4, borderRadius: 10, backgroundColor: `hsl(${(60 * index) % 360}, 80%, 60%)` }}>
                <Pressable onPress={openDetails}>
                    <View style={{ width: "100%", height: "100%", padding: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 14 }}>
                            {
                                name
                            }
                        </Text>
                    </View>
                </Pressable>
            </View>
        )
    })

    const now = new Date()
    const backhourCount = 4
    const initialScrollOffset = Math.max(hourHeight * (now.getHours() + now.getMinutes() / 60 - backhourCount), 0)

    return (
        <React.Fragment>
            <View style={{ paddingTop: screen.top + 20, paddingBlock: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.white }}>
                <Pressable onPress={lastDay}>
                    <View>
                        <FontAwesomeIcon icon={faChevronLeft} color={colors.red} size={24} />
                    </View>
                </Pressable>
                <Text style={{ fontSize: 18, color: colors.black }}>
                    {
                        day
                    }
                </Text>
                <Pressable onPress={nextDay}>
                    <View>
                        <FontAwesomeIcon icon={faChevronRight} color={colors.red} size={24} />
                    </View>
                </Pressable>
            </View>
            <ScrollView contentOffset={{ x: 0, y: initialScrollOffset }} contentContainerStyle={{ marginVertical: 10 }}>
                {
                    hourChunkRenders
                }
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <Text style={{ marginHorizontal: 10, marginVertical: 2, fontSize: 10, color: colors.darkGrey, transform: [{ translateY: "-70%" }] }}>12 AM</Text>
                    <View style={{ marginRight: 5, flex: 1, height: 1, backgroundColor: colors.grey }} />
                </View>
                {
                    scheduleItemRenders
                }
            </ScrollView>
        </React.Fragment>
    )
}

export default DefaultScreen