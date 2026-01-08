import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const settings = await prisma.systemSettings.findUnique({
        where: { id: 1 },
    })

    return NextResponse.json({
        redirectUrl: settings?.redirectUrl || null
    })
}
