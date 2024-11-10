import Groq from "groq-sdk"

import LocalStorageCache from "./localStorageCache"

const groqKey = process.env.REACT_APP_GROQ_API_KEY

const parseSchedule = (rawSchedule, callback) => {
    // avoid overcalling groq during development
    const parseScheduleCache = new LocalStorageCache("parseScheduleCache")

    if (parseScheduleCache.has(rawSchedule)) {
        callback(parseScheduleCache.get(rawSchedule))
    } else {
        const client = new Groq({ apiKey: groqKey, dangerouslyAllowBrowser: true })

        client.chat.completions.create({
            messages: [{
                role: "user",
                content: "Given the following table content, generate a schedule represented with json where each entry contains the name (string, number space name) of the class and a nullable object for lecture, discussion, seminar, and lab which contains a location (string), start date (string), end date (string), days (string array), and time (string). The format for class names is subject, class number, class name. For example History 101 Intro to US History. Output only json. Do not say other words before or after. Input: " + rawSchedule
            }],
            model: "llama3-70b-8192"
        }).then((completion) => {
            const outputText = completion.choices[0].message.content
            const outputJSON = JSON.parse(outputText)

            parseScheduleCache.set(rawSchedule, outputJSON)

            callback(outputJSON)
        })
    }
}

export default parseSchedule