import Groq from "groq-sdk"

import LocalStorageCache from "./localStorageCache"

const groqKey = process.env.REACT_APP_GROQ_API_KEY

const parseSchedule = (rawSchedule, callback) => {
    // avoid overcalling groq during development
    const parseScheduleCache = new LocalStorageCache("parseScheduleCache")

    if (parseScheduleCache.has(rawSchedule)) {
        console.log("cache hit")

        callback(parseScheduleCache.get(rawSchedule))
    } else {
        console.log("cache miss")

        const client = new Groq({ apiKey: groqKey, dangerouslyAllowBrowser: true })

        client.chat.completions.create({
            messages: [{
                role: "user",
                content: "Given the following table content, generate a schedule represented with json where each entry contains the name of the class and a nullable object for lecture, discussion, seminar, and lab which contains a location, start date, end date, days, and time. Output only json. Do not say other words before or after. Input: " + rawSchedule
            }],
            model: "llama3-8b-8192"
        }).then((completion) => {
            const outputText = completion.choices[0].message.content
            const outputJSON = JSON.parse(outputText)

            parseScheduleCache.set(rawSchedule, outputJSON)

            callback(outputJSON)
        })
    }
}

export default parseSchedule