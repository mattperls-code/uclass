import React, { useState } from "react"

import parseSchedule from "../scripts/parseSchedule"

import supabase from "../scripts/supabase"

const UploadPage = () => {
    const [schedule, setSchedule] = useState(null)

    const scrape = () => {
        console.log("begin scrape")

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, null).then((rawSchedule) => {

                if (rawSchedule == null) setSchedule("No Schedule Detected")

                else parseSchedule(rawSchedule, async (json) => {
                    console.log({ json })

                    setSchedule(JSON.stringify(json, null, 2))

                    const { data: { session }, error } = await supabase.auth.getSession()

                    if (session) {
                        const id = session.user.id

                        console.log({ id })

                        const { data, error } = await supabase.from("profiles").update({ schedule: json }).eq("id", id)

                        console.log({ data, error })
                    } else {
                        alert("db failed to update")
                    }
                })

            }).catch((err) => {
                console.log({ err })
            })
        })
    }

    return (
        <div>
            <button onClick={scrape}>scrape page</button>
            {
                schedule
            }
        </div>
    )
}

export default UploadPage