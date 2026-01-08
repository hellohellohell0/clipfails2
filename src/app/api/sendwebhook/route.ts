import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

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
