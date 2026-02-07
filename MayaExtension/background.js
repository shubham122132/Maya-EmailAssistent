console.log("Background service worker started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GENERATE_EMAIL") {
        fetch("http://localhost:8080/api/email/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailContent: message.payload.content,
                tone: message.payload.tone
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Backend API failed");
            }
            return response.text();
        })
        .then(reply => {
            sendResponse({ success: true, reply });
        })
        .catch(error => {
            console.error("Background fetch error:", error);
            sendResponse({ success: false, error: error.message });
        });

        // VERY IMPORTANT
        return true; // keeps the message channel open for async response
    }
});

