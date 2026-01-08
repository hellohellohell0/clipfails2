'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function RedirectPoller() {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Don't poll on admin pages
        if (pathname?.startsWith('/admin')) return

        const checkRedirect = async () => {
            try {
                const res = await fetch('/api/redirect-status')
                const data = await res.json()

                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl
                }
            } catch (e) {
                console.error('Redirect poll failed', e)
            }
        }

        const interval = setInterval(checkRedirect, 2000)
        return () => clearInterval(interval)
    }, [pathname, router])

    return null
}
