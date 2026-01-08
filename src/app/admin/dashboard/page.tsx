import prisma from '@/app/lib/prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import DashboardClient from './DashboardClient'

export default async function AdminDashboard() {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || session.value !== 'true') {
        redirect('/admin')
    }

    const clips = await prisma.clip.findMany({
        orderBy: { createdAt: 'desc' },
    })

    const settings = await prisma.systemSettings.findUnique({
        where: { id: 1 },
    })

    return <DashboardClient clips={clips} redirectUrl={settings?.redirectUrl || null} />
}
