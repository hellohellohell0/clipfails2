import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import prisma from './lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ClipFails - Find your streaming moment',
    description: 'The best streaming clips from Twitch.',
}

async function checkGlobalRedirect() {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('admin_session')?.value === 'true'

    // If admin, strict bypass of redirect logic
    if (isAdmin) return

    const settings = await prisma.systemSettings.findUnique({
        where: { id: 1 },
    })

    // If redirect is set and we are not admin, bye bye
    if (settings?.redirectUrl) {
        redirect(settings.redirectUrl)
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Check redirect on every root layout render (effectively every navigation)
    // Note: This works for Server Components pages.
    await checkGlobalRedirect()

    return (
        <html lang="en">
            <body className={outfit.className}>
                <Header />
                <main>{children}</main>
                <div id="sessionLabel"></div>
            </body>
        </html>
    )
}
