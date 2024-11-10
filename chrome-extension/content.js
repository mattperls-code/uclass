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
    modalTitleElem.parentNode.insertBefore(document.createTextNode("UClass has uploaded this schedule"), modalTitleElem.nextSibling)

    sendResponse(modalContentText)
})

const observeDOMChanges = () => {
    const targetNode = document.body
    const config = { attributes: true, childList: true, subtree: true }
  
    const observer = new MutationObserver(() => {
        if (document.getElementById("UCLASS_CUSTOM_CLICKABLE") != null) return

        const url = document.location.href

        // must be on spire
        if (!url.startsWith("https://www.spire.umass.edu/")) return
        
        const modalTitleElem = document.querySelector("[id^='ptModTitle']")
        const modalContentElem = document.querySelector("[id^='ptModFrame']")

        // must have a modal
        if (!modalTitleElem || !modalContentElem) return

        const modalTitleText = modalTitleElem.textContent.trim()

        // guarantees modal is calender
        if (modalTitleText != "View My Classes") return

        const datePickerElem = document.getElementById("SSR_DER0_CAL_FL_SSR_FROM_DATE")

        // guarantees calender is by class not by time
        if (datePickerElem) return

        const banner = document.createElement("div")
        banner.innerHTML = "Valid UClass Schedule Detected!"
        banner.style = "background-color: rgb(136, 28, 28); color: rgb(255, 255, 255); font-size: 36px; padding: 20px;"
        banner.id = "UCLASS_CUSTOM_CLICKABLE"
        
        modalTitleElem.parentNode.insertBefore(banner, modalTitleElem.previousSibling)
    })
  
    observer.observe(targetNode, config)
}
  
observeDOMChanges()