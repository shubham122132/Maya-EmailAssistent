console.log("Maya Email Assistant Loaded");


//    Create AI Reply Button

function createAIButton() {
    const button = document.createElement("div");
    button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";
    button.style.marginRight = "8px";
    button.innerText = "AI Reply";
    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip", "Generate AI Reply");
    return button;
}


//    Get Email Content (READ MODE)
function getEmailContent() {
    const bodies = document.querySelectorAll("div.a3s");

    if (!bodies.length) return "";

    const latest = bodies[bodies.length - 1];

    // Clone to avoid mutating Gmail UI
    const clone = latest.cloneNode(true);

    // Remove quoted replies
    clone.querySelectorAll(".gmail_quote").forEach(q => q.remove());

    // Remove signatures (common Gmail pattern)
    clone.querySelectorAll(".gmail_signature").forEach(s => s.remove());

    const text = clone.innerText.trim();

    return text.length > 20 ? text : "";
}




//    Find Compose Toolbar

function findComposeToolbar() {
    const selectors = [".btC", ".aDh", ".gU.Up"];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;
}

//    Inject AI Button

function injectButton() {
    // Avoid duplicate buttons
    if (document.querySelector(".ai-reply-button")) return;

    const toolbar = findComposeToolbar();
    if (!toolbar) return;

    const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
    );
    if (!composeBox) return; // not a compose window

    const button = createAIButton();

    button.addEventListener("click", () => {
        button.innerText = "Generating...";
        button.style.pointerEvents = "none";

        const emailContent = getEmailContent();
        console.log("📧 Extracted email content:", emailContent);
        console.log("📏 Length:", emailContent.length);
        if (!emailContent) {
            alert("No email content detected.");
            button.innerText = "AI Reply";
            button.style.pointerEvents = "auto";
            return;
        }

        // SEND MESSAGE TO BACKGROUND SCRIPT
        chrome.runtime.sendMessage(
            {
                type: "GENERATE_EMAIL",
                payload: {
                    content: emailContent,
                    tone: "professional",
                },
            },
            (response) => {
                button.innerText = "AI Reply";
                button.style.pointerEvents = "auto";

                if (!response || !response.success) {
                    console.error("AI generation failed", response?.error);
                    alert("Failed to generate AI reply");
                    return;
                }

                const reply = response.reply;
                const box = document.querySelector(
                    '[role="textbox"][g_editable="true"]'
                );

                if (box) {
                    box.focus();
                    document.execCommand("insertText", false, reply);
                }
            }
        );
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}


//    Observe Gmail DOM Changes

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);

        const hasComposeElement = addedNodes.some(
            (node) =>
                node.nodeType === Node.ELEMENT_NODE &&
                (node.matches(".aDh, .btC, [role='dialog']") ||
                    node.querySelector?.(".aDh, .btC, [role='dialog']"))
        );

        if (hasComposeElement) {
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
