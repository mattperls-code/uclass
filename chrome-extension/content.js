console.log("content is running")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const url = document.location.href

    // must be on spire
    if (!url.startsWith("https://www.spire.umass.edu/")) return sendResponse(null)
    
    const modalTitleElem = document.querySelector("[id^='ptModTitle']")
    const modalContentElem = document.querySelector("[id^='ptModFrame']")

    // must have a modal
    if (!modalTitleElem || !modalContentElem) return sendResponse(null)

    const modalTitleText = modalTitleElem.textContent.trim()

    // guarantees modal is calender
    if (modalTitleText != "View My Classes") return sendResponse(null)

    const datePickerElem = document.getElementById("SSR_DER0_CAL_FL_SSR_FROM_DATE")

    // guarantees calender is by class not by time
    if (datePickerElem) return sendResponse(null)

    const modalContentText = modalContentElem.contentDocument.body.textContent.trim().split("var bMDTarget")[0].replace(/\n+/g, '\n')

    // TODO: insert clickable here as an alternative trigger
    modalTitleElem.parentNode.insertBefore(document.createTextNode("UClass has identified this schedule"), modalTitleElem.nextSibling)

    sendResponse(modalContentText)
})