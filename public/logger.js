const sessionId = crypto.randomUUID() || Date.now().toString(36) + Math.random().toString(36).slice(2);

(async () => {
    try {
        // Send to backend
        await fetch('/api/sendwebhook', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId: sessionId,
                clientTime: new Date().toISOString()
            })
        });

        document.getElementById("sessionLabel").textContent = "Session ID: " + sessionId;

    } catch (err) {
        console.error("Logging failed:", err);
    }
})();