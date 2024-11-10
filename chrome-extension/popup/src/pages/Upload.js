import React, { useState } from "react"

import parseSchedule from "../scripts/parseSchedule"

import supabase from "../scripts/supabase"

import { colors, screen } from "../constants"

const UploadPage = () => {
    const [scheduleUploadStatus, setScheduleUploadStatus] = useState("No schedule detected. Make sure you are on 'Manage Classes' and clicked 'Printable Page'.")

    const scrape = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, null).then((rawSchedule) => {
                if (rawSchedule == null) return setScheduleUploadStatus("No schedule detected. Make sure you are on the correct page and clicked 'Printable Page'.")

                parseSchedule(rawSchedule, async (json) => {
                    const { data: { session }, error } = await supabase.auth.getSession()

                    if (error) return setScheduleUploadStatus("Failed to upload schedule. Try again.")

                    if (session) {
                        const id = session.user.id

                        const { error } = await supabase.from("profiles").update({ schedule: json }).eq("id", id)
                        
                        if (error) return setScheduleUploadStatus("An error occurred uploading to the UClass database. Try again.") 
                            
                        setScheduleUploadStatus("Successfully uploaded schedule. Reload the UClass app to view it.")
                    } else {
                        setScheduleUploadStatus("An error occurred uploading to the UClass database. Try again.")
                    }
                })
            }).catch((err) => {
                console.log({ err })

                setScheduleUploadStatus("An error occurred. Try again.")
            })
        })
    }

    const logout = () => supabase.auth.signOut()

    return (
        <div style={{ position: "relative", display: "flex", alignItems: "center", flexDirection: "column", height: "100%", backgroundColor: colors.white }}>
            <div style={{ fontSize: 24, fontWeight: "700", padding: 20, paddingBottom: 0, color: colors.black }}>Instructions</div>
            <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", fontSize: 14, color: colors.black }}>
                <ul style={{ display: "inline-block", padding: 10, paddingLeft: 20, paddingTop: 0 }}>
                    <li>Login on <a style={{ color: colors.red }} href={"https://spire.umass.edu"} target={"_blank"}>spire.umass.edu</a></li>
                    <li>Click 'Manage Classes'</li>
                    <li>Select 'By Class'</li>
                    <li>Click 'Printable Page'</li>
                    <li>Upload Your Schedule</li>
                </ul>
            </div>
            <div onClick={scrape}>
                <div style={{ width: screen.width - 40, height: 50, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                    <div style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Upload Schedule</div>
                </div>
            </div>
            <div style={{ fontSize: 12, padding: 10, textAlign: "center" }}>
                {
                    scheduleUploadStatus
                }
            </div>
            <div onClick={logout}>
                <div style={{ position: "absolute", bottom: 10, left: 20, right: 20, height: 50, borderRadius: 10, alignContent: "center", justifyContent: "center", borderWidth: 2, borderColor: colors.red, borderStyle: "solid" }}>
                    <div style={{ textAlign: "center", color: colors.black, fontSize: 18 }}>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage