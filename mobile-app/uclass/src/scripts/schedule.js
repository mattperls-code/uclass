import supabase from "./supabase"

import capitalize from "capitalize"
import stringSplice from "string-splice"

const rawScheduleToScheduleItems = (rawSchedule) => {
    const scheduleItems = []

    rawSchedule.forEach((classInfo) => {
        const className = classInfo.name

        delete classInfo.name
        
        Object.entries(classInfo).forEach(([ meetingType, meetingDetails ]) => {
            if (meetingDetails == null) return

            const name = capitalize.words(className + " " + meetingType)
            const location = meetingDetails.location

            // groq nooooo
            const meetingDays = typeof meetingDetails.days == "string" ? meetingDetails.days.split(", ") : meetingDetails.days

            meetingDays.forEach((day) => {
                const timeSeparator = meetingDetails.time.includes("-") ? "-" : "to"
                let [startTime, endTime] = meetingDetails.time.split(timeSeparator).map(s => s.trim())

                // groq why...
                if (!startTime.includes(" ")) startTime = stringSplice(startTime, startTime.length - 2, 0, " ")
                if (!endTime.includes(" ")) endTime = stringSplice(endTime, endTime.length - 2, 0, " ");

                const scheduleItem = { name, day, startTime, endTime, location }

                scheduleItems.push(scheduleItem)
            })
        })
    })

    return scheduleItems
}

const getSchedule = async (callback) => {
    try {
        const sessionRes = await supabase.auth.getSession()

        const id = sessionRes.data.session.user.id

        const profile = await (await supabase.from("profiles").select().eq("id", id)).data[0]

        const scheduleItems = rawScheduleToScheduleItems(profile.schedule)

        callback(scheduleItems)
    } catch (e) {
        console.warn(e)

        callback(null)
    }
}

const getClassNameFromComposedName = (composedName) => {
    const nameComponents = composedName.split(" ")

    nameComponents.pop()

    const className = nameComponents.join(" ")

    return className
}

// potentially wrong for weird class types, would be safer to do this by actual db but costs another call
const getClasses = (schedule) => {
    const classes = {}

    if (!Array.isArray(schedule)) return []

    schedule.forEach((scheduleItem) => {
        const className = getClassNameFromComposedName(scheduleItem.name)

        classes[className] = true
    })

    return Object.keys(classes)
}

const rawScheduleToClassIdentifiers = (rawSchedule) => {
    const scheduleItems = rawScheduleToScheduleItems(rawSchedule)

    const classIdentifiers = scheduleItems.map(({ name, day, startTime, endTime, location }) => `${name} on ${day} at ${location} from ${startTime} to ${endTime}`)

    return classIdentifiers
}

// this is probably susceptible to weird cases 
const getClassmates = async (className, callback) => {
    try {
        const sessionRes = await supabase.auth.getSession()

        const id = sessionRes.data.session.user.id

        const profile = await (await supabase.from("profiles").select().eq("id", id)).data[0]

        const userClassIdentifiers = rawScheduleToClassIdentifiers(profile.schedule).filter((classIdentifier) => classIdentifier.startsWith(className))

        const otherProfiles = (await supabase.from("profiles").select().neq("id", id)).data

        const classmates = []

        otherProfiles.forEach((otherProfile) => {
            const otherUserClassIdentifiers = rawScheduleToClassIdentifiers(otherProfile.schedule).filter((classIdentifier) => classIdentifier.startsWith(className))

            const sharesClass = userClassIdentifiers.some((userClassIdentifier) => otherUserClassIdentifiers.includes(userClassIdentifier))

            if (sharesClass) classmates.push(otherProfile)
        })

        callback(classmates)
    } catch (e) {
        console.warn(e)

        callback(null)
    }
}

export {
    getSchedule,
    getClassNameFromComposedName,
    getClasses,
    getClassmates
}